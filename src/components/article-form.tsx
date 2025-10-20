"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createArticle, updateArticle } from "@/app/actions/articulos";
import type { Articulo, Categoria } from "@/lib/types";
import {
  Loader2,
  Plus,
  X,
  Eye,
  Edit,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { uploadImageToImageKit } from "@/lib/imagekit";
import { MarkdownEditor } from "./markdown-editor";
import { MarkdownVideo } from "./video-embed";

interface ArticleFormProps {
  article?: Articulo;
  categories: Categoria[];
}

export function ArticleForm({ article, categories }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [autors, setAutors] = useState<string[]>([""]);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState("");
  const formatDateForInput = (date: Date | string | null) => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  const [publishedAt, setPublishedAt] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    if (article?.publishedAt) {
      setPublishedAt(formatDateForInput(article.publishedAt));
    }
  }, [article?.publishedAt]);

  useEffect(() => {
    if (article) {
      setTitulo(article.titulo || "");
      setDescripcion(article.descripcion || "");
      setContenido(article.contenido || "");
      setImagen(article.imagen || "");
      setSelectedCategories(
        article.articuloCategorias.map((ac) => ac.categoria.id)
      );
      setAutors(
        article.autors && article.autors.length > 0 ? article.autors : [""]
      );
    }
  }, [article]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const filteredAutors = autors.filter((a) => a.trim() !== "");

      const data = {
        titulo: formData.get("titulo") as string,
        descripcion: formData.get("descripcion") as string,
        contenido: formData.get("contenido") as string,
        imagen: formData.get("imagen") as string,
        autors: filteredAutors.length > 0 ? filteredAutors : ["Anónimo"],
        categorias: selectedCategories,
        publicado: formData.get("publicado") === "on",
        publishedAt: publishedAt || undefined,
      };

      if (article) {
        await updateArticle(article.id, data);
      } else {
        await createArticle(data);
      }
    } catch (error) {
      alert("Error al guardar el artículo");
    } finally {
      setLoading(false);
    }
  }

  function toggleCategory(categoryId: string) {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }

  function addAutor() {
    setAutors((prev) => [...prev, ""]);
  }

  function removeAutor(index: number) {
    setAutors((prev) => prev.filter((_, i) => i !== index));
  }

  function updateAutor(index: number, value: string) {
    setAutors((prev) => prev.map((a, i) => (i === index ? value : a)));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido");
      return;
    }

    try {
      setUploadingImage(true);
      const imageUrl = await uploadImageToImageKit(file);
      setImagen(imageUrl);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir la imagen. Por favor, intenta de nuevo.");
    } finally {
      setUploadingImage(false);
    }
    e.target.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </TabsTrigger>
          <TabsTrigger value="preview">
            <Eye className="mr-2 h-4 w-4" />
            Vista Previa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Básica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    name="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    placeholder="Título del artículo"
                  />
                </div>

                <div className="space-y-2 w-fit">
                  <Label>Fecha de publicación (opcional)</Label>
                  <div className="space-y-1">
                    <Input
                      type="date"
                      value={publishedAt}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setPublishedAt(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Máximo hasta la fecha de hoy
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagen">Imagen del Artículo</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      id="imagen"
                      name="imagen"
                      type="url"
                      value={imagen}
                      onChange={(e) => setImagen(e.target.value)}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="pr-10"
                    />
                    {imagen && (
                      <ImageIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage || loading}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                      disabled={uploadingImage || loading}
                      title="Subir imagen"
                    >
                      {uploadingImage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Ingresa una URL o sube una imagen desde tu dispositivo
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  name="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Breve descripción del artículo"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Autores *</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAutor}
                    disabled={loading}
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Agregar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {autors.map((autor, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 rounded-md border border-input bg-muted/50 px-3 py-2 shadow-sm"
                    >
                      <input
                        type="text"
                        value={autor}
                        onChange={(e) => updateAutor(index, e.target.value)}
                        placeholder="Nombre del autor"
                        disabled={loading}
                        style={{
                          width: autor
                            ? `${Math.max(autor.length * 8 + 10, 120)}px`
                            : "120px",
                        }}
                        className="h-auto border-0 bg-transparent p-0 text-sm outline-none transition-all placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeAutor(index)}
                        disabled={loading}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Puedes editar los autores haciendo clic directamente en el
                  texto
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contenido (Markdown)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <MarkdownEditor
                value={contenido}
                onChange={setContenido}
                placeholder="Escribe el contenido del artículo usando Markdown..."
                rows={20}
                name="contenido"
              />
              <p className="text-xs text-muted-foreground">
                Usa la barra de herramientas para formatear el contenido o
                escribe directamente en Markdown
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorías y Publicación</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="mb-3 block text-sm font-medium">
                  Categorías
                </Label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                      />
                      <Label htmlFor={category.id} className="cursor-pointer">
                        {category.nombre}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedCategories.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    ✓ {selectedCategories.length} categoría
                    {selectedCategories.length > 1 ? "s" : ""} seleccionada
                    {selectedCategories.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="publicado"
                    name="publicado"
                    defaultChecked={article?.publicado}
                  />
                  <Label htmlFor="publicado" className="cursor-pointer">
                    Publicar artículo
                  </Label>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Si no está marcado, el artículo se guardará como borrador
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <article className="mx-auto max-w-4xl">
                <h1 className="mb-4 text-balance font-serif text-5xl font-bold leading-tight tracking-tight">
                  {titulo || "Título del artículo"}
                </h1>

                {descripcion && (
                  <p className="mb-8 border-b border-t border-border py-6 text-pretty font-serif text-xl leading-relaxed text-foreground/90">
                    {descripcion}
                  </p>
                )}

                <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-6 font-sans text-sm uppercase tracking-wide text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">Por</span>
                    <span>
                      {autors.filter((a) => a.trim()).join(", ") || "Anónimo"}
                    </span>
                  </div>
                </div>

                {selectedCategories.length > 0 && (
                  <div className="mb-8 flex flex-wrap gap-2">
                    {categories
                      .filter((c) => selectedCategories.includes(c.id))
                      .map((category) => (
                        <span
                          key={category.id}
                          className="rounded-full border border-border px-3 py-1 font-sans text-xs uppercase tracking-wider"
                        >
                          {category.nombre}
                        </span>
                      ))}
                  </div>
                )}

                {imagen && (
                  <figure className="mb-12">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border-2 border-border">
                      <Image
                        src={imagen}
                        alt={titulo || "Imagen del artículo"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </figure>
                )}

                <div className="article-content mx-auto max-w-none font-serif">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <h1
                          className="mb-4 md:mb-6 mt-8 md:mt-10 font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight break-words"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="mb-3 md:mb-4 mt-6 md:mt-8 border-b-2 border-foreground/10 pb-2 font-serif text-xl md:text-2xl lg:text-3xl font-bold tracking-tight break-words"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="mb-2 md:mb-3 mt-5 md:mt-6 font-serif text-lg md:text-xl lg:text-2xl font-bold tracking-tight break-words"
                          {...props}
                        />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4
                          className="mb-2 mt-4 font-serif text-base md:text-lg lg:text-xl font-bold tracking-tight break-words"
                          {...props}
                        />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="font-semibold text-foreground underline decoration-foreground/30 decoration-2 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary break-words"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="my-6 border-l-4 border-foreground bg-muted/50 py-4 pl-6 pr-4 font-serif italic text-[17px] leading-[1.7] text-foreground/80 break-words overflow-hidden"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-semibold text-foreground break-words"
                          {...props}
                        />
                      ),
                      code: ({ node, inline, ...props }: any) =>
                        inline ? (
                          <code
                            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[15px] text-foreground break-words"
                            {...props}
                          />
                        ) : (
                          <pre className="block rounded border-2 border-border bg-muted/30 p-4 overflow-x-auto max-w-full">
                            <code
                              className="font-mono text-sm leading-relaxed whitespace-pre"
                              {...props}
                            />
                          </pre>
                        ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="my-5 list-disc space-y-3 pl-8 break-words"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="my-5 list-decimal space-y-3 pl-8 break-words"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          className="text-[18px] leading-[1.75] text-foreground/95 break-words"
                          style={{
                            fontFamily:
                              'Georgia, Cambria, "Times New Roman", Times, serif',
                          }}
                          {...props}
                        />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr
                          className="my-8 border-t-2 border-foreground/20"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="mb-4 md:mb-6 text-base md:text-[18px] leading-[1.65] md:leading-[1.75] tracking-wide text-foreground/95 break-words"
                          style={{
                            fontFamily:
                              'Georgia, Cambria, "Times New Roman", Times, serif',
                          }}
                          {...props}
                        />
                      ),
                      img: (props) => <MarkdownVideo {...props} />,
                    }}
                  >
                    {contenido ||
                      "*Escribe contenido en Markdown para ver la vista previa...*"}
                  </ReactMarkdown>
                </div>
              </article>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {article ? "Actualizar" : "Crear"} Artículo
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
