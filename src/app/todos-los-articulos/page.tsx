import { PublicHeader } from "@/components/public-header";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CategoryBadge } from "@/components/category-badge";

export const metadata: Metadata = {
  title: "Todos los Artículos | El Periódico",
  description:
    "Explora todos nuestros artículos. Busca y filtra por categorías.",
};

const ARTICULOS_POR_PAGINA = 9;

export default async function TodosLosArticulosPage({
  searchParams,
}: {
  searchParams: { q?: string; categorias?: string; page?: string };
}) {
  const busqueda = searchParams.q || "";
  const categoriasParam = searchParams.categorias || "";
  const categoriasSlugs = categoriasParam ? categoriasParam.split(",") : [];
  const paginaActual = parseInt(searchParams.page || "1", 10);

  const todasCategorias = await prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });

  const todosArticulos = await prisma.articulo.findMany({
    where: {
      publicado: true,
    },
    include: {
      articuloCategorias: {
        include: {
          categoria: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let articulosFiltrados = todosArticulos;

  if (categoriasSlugs.length > 0) {
    articulosFiltrados = articulosFiltrados.filter((articulo: any) =>
      categoriasSlugs.every((slug: string) =>
        articulo.articuloCategorias?.some(
          (ac: any) => ac.categoria.slug === slug
        )
      )
    );
  }

  if (busqueda) {
    articulosFiltrados = articulosFiltrados.filter(
      (articulo: any) =>
        articulo.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        articulo.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  const totalArticulos = articulosFiltrados.length;
  const articulosPaginados = articulosFiltrados.slice(
    (paginaActual - 1) * ARTICULOS_POR_PAGINA,
    paginaActual * ARTICULOS_POR_PAGINA
  );

  const totalPaginas = Math.ceil(totalArticulos / ARTICULOS_POR_PAGINA);
  const categoriasActivas = todasCategorias.filter((c) =>
    categoriasSlugs.includes(c.slug)
  );

  const buildFilterUrl = (newCategorias: string[], newBusqueda?: string) => {
    const params = new URLSearchParams();
    if (newCategorias.length > 0) {
      params.set("categorias", newCategorias.join(","));
    }
    if (newBusqueda !== undefined ? newBusqueda : busqueda) {
      params.set("q", newBusqueda !== undefined ? newBusqueda : busqueda);
    }
    return `/todos-los-articulos${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  };

  const toggleCategoria = (slug: string) => {
    const newCategorias = categoriasSlugs.includes(slug)
      ? categoriasSlugs.filter((s) => s !== slug)
      : [...categoriasSlugs, slug];
    return buildFilterUrl(newCategorias);
  };

  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 md:mb-8">
            Todos los Artículos
          </h1>

          <form action="/todos-los-articulos" method="get" className="mb-0">
            <input type="hidden" name="categorias" value={categoriasParam} />
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Buscar artículos..."
                  defaultValue={busqueda}
                  className="pl-10 h-10"
                />
              </div>
              <Button type="submit" className="px-4 md:px-6">
                Buscar
              </Button>
            </div>
          </form>
        </div>

        <div className="mb-6 md:mb-8 rounded-lg p-4 md:p-6 bg-muted/30">
          <div className="mb-3 md:mb-4">
            <h2 className="text-sm font-semibold mb-2 md:mb-3">
              Filtrar por categoría:
            </h2>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {todasCategorias.map((categoria) => (
                <Link key={categoria.id} href={toggleCategoria(categoria.slug)}>
                  <Badge
                    variant={
                      categoriasSlugs.includes(categoria.slug)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs md:text-sm"
                  >
                    {categoria.nombre}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {(busqueda || categoriasSlugs.length > 0) && (
            <div className="pt-3 md:pt-4 border-t">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">
                    Filtros activos:
                  </span>
                  {busqueda && (
                    <Link href={buildFilterUrl(categoriasSlugs, "")}>
                      <Badge
                        variant="default"
                        className="cursor-pointer hover:bg-primary/80 text-xs"
                      >
                        Búsqueda: &quot;{busqueda}&quot;
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    </Link>
                  )}
                  {categoriasActivas.map((categoria) => (
                    <Link
                      key={categoria.id}
                      href={toggleCategoria(categoria.slug)}
                    >
                      <Badge
                        variant="default"
                        className="cursor-pointer hover:bg-primary/80 text-xs"
                      >
                        {categoria.nombre}
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    </Link>
                  ))}
                </div>
                <Link href="/todos-los-articulos">
                  <Badge
                    variant="destructive"
                    className="cursor-pointer hover:bg-destructive/80 text-xs whitespace-nowrap"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Limpiar todo
                  </Badge>
                </Link>
              </div>
            </div>
          )}
        </div>

        {(busqueda || categoriasSlugs.length > 0) && (
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Mostrando {totalArticulos} resultado
            {totalArticulos !== 1 ? "s" : ""}
            {busqueda && ` para "${busqueda}"`}
            {categoriasActivas.length > 0 &&
              ` en: ${categoriasActivas.map((c) => c.nombre).join(", ")}`}
          </p>
        )}

        {articulosPaginados.length > 0 ? (
          <div className="space-y-0">
            {articulosPaginados.map((articulo: any, index: number) => (
              <div key={articulo.id}>
                <Link
                  href={`/articulos/${articulo.slug}`}
                  className="block group"
                >
                  <article className="py-4 md:py-6 flex gap-3 md:gap-6 hover:bg-muted/50 transition-colors rounded-lg px-2 md:px-4">
                    {articulo.imagen && (
                      <div className="relative w-24 h-20 md:w-32 md:h-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={articulo.imagen}
                          alt={articulo.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h2 className="text-lg md:text-xl font-serif font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {articulo.titulo}
                          </h2>
                          {articulo.descripcion && (
                            <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                              {articulo.descripcion}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-2">
                            {articulo.articuloCategorias?.map((ac: any) => (
                              <CategoryBadge
                                key={ac.categoriaId}
                                slug={ac.categoria.slug}
                                nombre={ac.categoria.nombre}
                                variant="secondary"
                                className="text-[10px] md:text-xs"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end mt-1 md:mt-2">
                          <span className="text-[10px] md:text-xs text-muted-foreground">
                            {new Date(articulo.createdAt).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
                {index < articulosPaginados.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 md:py-12">
            <p className="text-lg md:text-xl text-muted-foreground mb-2">
              No se encontraron artículos.
            </p>
            {(busqueda || categoriasSlugs.length > 0) && (
              <Link href="/todos-los-articulos">
                <Button variant="outline" className="mt-4">
                  Ver todos los artículos
                </Button>
              </Link>
            )}
          </div>
        )}

        {totalPaginas > 1 && articulosPaginados.length > 0 && (
          <div className="mt-12 flex justify-center gap-2">
            {paginaActual > 1 && (
              <Link
                href={`/todos-los-articulos?page=${paginaActual - 1}${
                  categoriasParam ? `&categorias=${categoriasParam}` : ""
                }${busqueda ? `&q=${busqueda}` : ""}`}
              >
                <Button variant="outline">Anterior</Button>
              </Link>
            )}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                (page) => (
                  <Link
                    key={page}
                    href={`/todos-los-articulos?page=${page}${
                      categoriasParam ? `&categorias=${categoriasParam}` : ""
                    }${busqueda ? `&q=${busqueda}` : ""}`}
                  >
                    <Button
                      variant={page === paginaActual ? "default" : "outline"}
                      size="sm"
                    >
                      {page}
                    </Button>
                  </Link>
                )
              )}
            </div>
            {paginaActual < totalPaginas && (
              <Link
                href={`/todos-los-articulos?page=${paginaActual + 1}${
                  categoriasParam ? `&categorias=${categoriasParam}` : ""
                }${busqueda ? `&q=${busqueda}` : ""}`}
              >
                <Button variant="outline">Siguiente</Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </>
  );
}
