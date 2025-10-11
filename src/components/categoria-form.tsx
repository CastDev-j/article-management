"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { createCategoria, updateCategoria } from "@/app/actions/categorias"

interface CategoriaFormProps {
  categoria?: {
    id: string
    nombre: string
  }
}

export function CategoriaForm({ categoria }: CategoriaFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const nombre = formData.get("nombre") as string

    try {
      if (categoria) {
        await updateCategoria(categoria.id, nombre)
      } else {
        await createCategoria(nombre)
      }
      router.push("/admin/categorias")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la categoría")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Categoría</Label>
            <Input
              id="nombre"
              name="nombre"
              defaultValue={categoria?.nombre}
              placeholder="Ej: Política, Deportes, Cultura..."
              required
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : categoria ? "Actualizar" : "Crear Categoría"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
