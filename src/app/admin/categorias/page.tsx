import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getCategorias } from "@/app/actions/categorias"
import { Plus, Pencil } from "lucide-react"
import { DeleteCategoriaButton } from "@/components/delete-categoria-button"
import { requireAuth } from "@/lib/auth"
import type { Metadata } from "next"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Gestión de Categorías | Admin",
  description: "Administra las categorías de artículos",
}

export default async function AdminCategoriasPage() {
  await requireAuth()

  const categorias = await getCategorias()

  // Obtener conteo de artículos por categoría
  const categoriasConConteo = await Promise.all(
    categorias.map(async (categoria) => {
      const count = await prisma.articuloCategoria.count({
        where: { categoriaId: categoria.id },
      })
      return { ...categoria, articulosCount: count }
    }),
  )

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-serif text-4xl font-bold">Gestión de Categorías</h1>
          <Link href="/admin/categorias/nueva">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Categoría
            </Button>
          </Link>
        </div>

        {categoriasConConteo.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-muted-foreground">No hay categorías creadas.</p>
              <Link href="/admin/categorias/nueva">
                <Button>Crear primera categoría</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoriasConConteo.map((categoria) => (
              <Card key={categoria.id}>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">{categoria.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{categoria.articulosCount} artículos</Badge>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/admin/categorias/${categoria.id}/editar`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                  <DeleteCategoriaButton categoriaId={categoria.id} disabled={categoria.articulosCount > 0} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
