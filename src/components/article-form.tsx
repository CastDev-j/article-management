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
import { createArticulo, updateArticulo } from "@/app/actions/articulos";
import type { Articulo, Categoria } from "@/lib/types";
import { Loader2, Plus, X } from "lucide-react";

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
      console.error(error);
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
      <Card>
        <CardHeader>
          <CardTitle>Información del Artículo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              name="titulo"
              defaultValue={articulo?.titulo}
              required
              placeholder="Título del artículo"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              defaultValue={articulo?.descripcion || ""}
              placeholder="Breve descripción del artículo"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido">Contenido *</Label>
            <Textarea
              id="contenido"
              name="contenido"
              defaultValue={articulo?.contenido}
              required
              placeholder="Contenido completo del artículo"
              rows={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagen">URL de Imagen</Label>
            <Input
              id="imagen"
              name="imagen"
              type="url"
              defaultValue={articulo?.imagen || ""}
              placeholder="https://ejemplo.com/imagen.jpg"
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
                <Plus className="mr-1 h-4 w-4" />
                Agregar autor
              </Button>
            </div>
            <div className="space-y-2">
              {autors.map((autor, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={autor}
                    onChange={(e) => updateAutor(index, e.target.value)}
                    placeholder="Nombre del autor"
                    disabled={loading}
                  />
                  {autors.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeAutor(index)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Agrega uno o más autores del artículo. Independiente de quien lo
              publica.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorías</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publicación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Checkbox
              id="publicado"
              name="publicado"
              defaultChecked={articulo?.publicado}
            />
            <Label htmlFor="publicado" className="cursor-pointer">
              Publicar artículo
            </Label>
          </div>
        </CardContent>
      </Card>

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
