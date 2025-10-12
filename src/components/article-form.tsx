"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createArticulo, updateArticulo } from "@/app/actions/articulos";
import type { Articulo, Categoria } from "@/lib/types";
import { Loader2, Plus, X, Eye, Edit } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

interface ArticleFormProps {
  articulo?: Articulo;
  categorias: Categoria[];
}

export function ArticleForm({ articulo, categorias }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>(
    articulo?.articuloCategorias.map((ac) => ac.categoria.id) || []
  );
  const [autors, setAutors] = useState<string[]>(
    articulo?.autors && articulo.autors.length > 0 ? articulo.autors : [""]
  );

  const [titulo, setTitulo] = useState(articulo?.titulo || "");
  const [descripcion, setDescripcion] = useState(articulo?.descripcion || "");
  const [contenido, setContenido] = useState(articulo?.contenido || "");
  const [imagen, setImagen] = useState(articulo?.imagen || "");

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
        categorias: selectedCategorias,
        publicado: formData.get("publicado") === "on",
      };

      if (articulo) {
        await updateArticulo(articulo.id, data);
      } else {
        await createArticulo(data);
      }
    } catch (error) {
      alert("Error al guardar el artículo");
      setLoading(false);
    }
  }

  function toggleCategoria(categoriaId: string) {
    setSelectedCategorias((prev) =>
      prev.includes(categoriaId)
        ? prev.filter((id) => id !== categoriaId)
        : [...prev, categoriaId]
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
              {/* Título y URL de Imagen en dos columnas */}
              <div className="grid gap-4 md:grid-cols-2">
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

                <div className="space-y-2">
                  <Label htmlFor="imagen">URL de Imagen</Label>
                  <Input
                    id="imagen"
                    name="imagen"
                    type="url"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {imagen && (
                    <p className="text-xs text-muted-foreground">
                      ✓ Imagen configurada
                    </p>
                  )}
                </div>
              </div>

              {/* Descripción - Ancho completo */}
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

              {/* Autores - Flex wrap con tags compactos */}
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
                      className="flex items-center gap-1 rounded-md border border-input bg-background px-3 py-2"
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
                      {autors.length > 1 && (
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
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contenido (Markdown)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                id="contenido"
                name="contenido"
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                required
                placeholder="Escribe el contenido del artículo usando Markdown..."
                rows={20}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Usa Markdown para formatear: **negrita**, *cursiva*, # títulos,
                listas, enlaces, imágenes, etc.
              </p>
            </CardContent>
          </Card>

          {/* Categorías y Publicación en una sola carta */}
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
                  {categorias.map((categoria) => (
                    <div key={categoria.id} className="flex items-center gap-2">
                      <Checkbox
                        id={categoria.id}
                        checked={selectedCategorias.includes(categoria.id)}
                        onCheckedChange={() => toggleCategoria(categoria.id)}
                      />
                      <Label htmlFor={categoria.id} className="cursor-pointer">
                        {categoria.nombre}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedCategorias.length > 0 && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    ✓ {selectedCategorias.length} categoría
                    {selectedCategorias.length > 1 ? "s" : ""} seleccionada
                    {selectedCategorias.length > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="publicado"
                    name="publicado"
                    defaultChecked={articulo?.publicado}
                  />
                  <Label htmlFor="publicado" className="cursor-pointer">
                    Publicar artículo inmediatamente
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

                {selectedCategorias.length > 0 && (
                  <div className="mb-8 flex flex-wrap gap-2">
                    {categorias
                      .filter((c) => selectedCategorias.includes(c.id))
                      .map((categoria) => (
                        <span
                          key={categoria.id}
                          className="rounded-full border border-border px-3 py-1 font-sans text-xs uppercase tracking-wider"
                        >
                          {categoria.nombre}
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
                          className="mb-6 mt-10 text-4xl font-bold leading-tight tracking-tight"
                          {...props}
                        />
                      ),
                      h2: ({ node, ...props }) => (
                        <h2
                          className="mb-4 mt-8 border-b-2 border-foreground/10 pb-2 text-3xl font-bold tracking-tight"
                          {...props}
                        />
                      ),
                      h3: ({ node, ...props }) => (
                        <h3
                          className="mb-3 mt-6 text-2xl font-bold tracking-tight"
                          {...props}
                        />
                      ),
                      h4: ({ node, ...props }) => (
                        <h4
                          className="mb-2 mt-4 text-xl font-bold tracking-tight"
                          {...props}
                        />
                      ),
                      p: ({ node, ...props }) => (
                        <p
                          className="mb-4 text-lg leading-relaxed text-foreground/90"
                          {...props}
                        />
                      ),
                      a: ({ node, ...props }) => (
                        <a
                          className="font-semibold text-foreground underline decoration-foreground/30 decoration-2 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                          {...props}
                        />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote
                          className="my-6 border-l-4 border-foreground bg-muted/50 py-4 pl-6 italic text-foreground/80"
                          {...props}
                        />
                      ),
                      strong: ({ node, ...props }) => (
                        <strong
                          className="font-bold text-foreground"
                          {...props}
                        />
                      ),
                      code: ({ node, inline, ...props }: any) =>
                        inline ? (
                          <code
                            className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
                            {...props}
                          />
                        ) : (
                          <code
                            className="block rounded border-2 border-border bg-muted/30 p-4 font-mono text-sm"
                            {...props}
                          />
                        ),
                      ul: ({ node, ...props }) => (
                        <ul
                          className="my-4 list-disc space-y-2 pl-8"
                          {...props}
                        />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol
                          className="my-4 list-decimal space-y-2 pl-8"
                          {...props}
                        />
                      ),
                      li: ({ node, ...props }) => (
                        <li
                          className="text-lg leading-relaxed text-foreground/90"
                          {...props}
                        />
                      ),
                      hr: ({ node, ...props }) => (
                        <hr
                          className="my-8 border-t-2 border-foreground/20"
                          {...props}
                        />
                      ),
                      img: ({ node, ...props }) => (
                        <span className="my-8 block">
                          <img
                            {...props}
                            className="w-full rounded-lg border-2 border-border"
                            loading="lazy"
                          />
                          {props.alt && (
                            <span className="mt-2 block text-center text-sm italic text-muted-foreground">
                              {props.alt}
                            </span>
                          )}
                        </span>
                      ),
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
          {articulo ? "Actualizar" : "Crear"} Artículo
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
