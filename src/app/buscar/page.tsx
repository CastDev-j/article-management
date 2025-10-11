import { Header } from "@/components/header"
import { ArticleCard } from "@/components/article-card"
import { getArticulos } from "@/app/actions/articulos"
import { getCategorias } from "@/app/actions/categorias"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buscar Artículos | Gestión de Artículos",
  description:
    "Busca artículos por título, descripción o contenido. Filtra por categorías para encontrar exactamente lo que necesitas.",
  openGraph: {
    title: "Buscar Artículos | Gestión de Artículos",
    description:
      "Busca artículos por título, descripción o contenido. Filtra por categorías para encontrar exactamente lo que necesitas.",
    type: "website",
  },
}

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>
}) {
  const params = await searchParams
  const [articulos, categorias] = await Promise.all([
    getArticulos({
      publicado: true,
      search: params.q,
      categoriaSlug: params.categoria,
    }),
    getCategorias(),
  ])

  const categoriaActual = categorias.find((c) => c.slug === params.categoria)

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-6 text-4xl font-bold">Buscar Artículos</h1>

          <form action="/buscar" method="get" className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Buscar por título, descripción o contenido..."
                  defaultValue={params.q}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Buscar</Button>
            </div>
            {params.categoria && <input type="hidden" name="categoria" value={params.categoria} />}
          </form>

          <div className="space-y-4">
            <div>
              <h2 className="mb-3 text-sm font-medium text-muted-foreground">Filtrar por categoría</h2>
              <div className="flex flex-wrap gap-2">
                <Link href="/buscar">
                  <Badge variant={!params.categoria ? "default" : "outline"} className="cursor-pointer">
                    Todas
                  </Badge>
                </Link>
                {categorias.map((categoria) => (
                  <Link
                    key={categoria.id}
                    href={`/buscar?categoria=${categoria.slug}${params.q ? `&q=${params.q}` : ""}`}
                  >
                    <Badge
                      variant={params.categoria === categoria.slug ? "default" : "outline"}
                      className="cursor-pointer"
                    >
                      {categoria.nombre}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            {(params.q || params.categoria) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtros activos:</span>
                {params.q && (
                  <Badge variant="secondary" className="gap-1">
                    Búsqueda: {params.q}
                    <Link href={`/buscar${params.categoria ? `?categoria=${params.categoria}` : ""}`}>
                      <X className="h-3 w-3 cursor-pointer" />
                    </Link>
                  </Badge>
                )}
                {categoriaActual && (
                  <Badge variant="secondary" className="gap-1">
                    Categoría: {categoriaActual.nombre}
                    <Link href={`/buscar${params.q ? `?q=${params.q}` : ""}`}>
                      <X className="h-3 w-3 cursor-pointer" />
                    </Link>
                  </Badge>
                )}
                <Link href="/buscar">
                  <Button variant="ghost" size="sm">
                    Limpiar filtros
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {articulos.length} {articulos.length === 1 ? "artículo encontrado" : "artículos encontrados"}
          </p>
        </div>

        {articulos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-2 text-muted-foreground">No se encontraron artículos con los filtros seleccionados.</p>
            <Link href="/buscar">
              <Button variant="link">Limpiar filtros</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articulos.map((articulo) => (
              <ArticleCard key={articulo.id} articulo={articulo} />
            ))}
          </div>
        )}
      </main>
    </>
  )
}
