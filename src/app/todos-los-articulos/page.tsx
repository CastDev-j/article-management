import { PublicHeader } from "@/components/public-header";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";
import { SortNavigation } from "@/components/sort-navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CategoryBadge } from "@/components/category-badge";

export const metadata: Metadata = {
  title: "Todos los Artículos | Aula de periodismo",
  description:
    "Explora todos nuestros artículos. Busca y filtra por categorías.",
};

const ARTICLES_PER_PAGE = 9;

export default async function TodosLosArticulosPage({
  searchParams,
}: {
  searchParams: { q?: string; categorias?: string; page?: string; sort?: string };
}) {
  const searchQuery = searchParams.q || "";
  const categoriesParam = searchParams.categorias || "";
  const categorySlugs = categoriesParam ? categoriesParam.split(",") : [];
  const currentPage = parseInt(searchParams.page || "1", 10);
  const sortBy = searchParams.sort || "publishedAt-desc";

  const allCategories = await prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });

  // Determinar el ordenamiento
  const getSortConfig = (sortBy: string) => {
    switch (sortBy) {
      case "publishedAt-desc":
        return [{ publishedAt: "desc" as const }, { createdAt: "desc" as const }];
      case "publishedAt-asc":
        return [{ publishedAt: "asc" as const }, { createdAt: "asc" as const }];
      case "createdAt-desc":
        return { createdAt: "desc" as const };
      case "createdAt-asc":
        return { createdAt: "asc" as const };
      case "updatedAt-desc":
        return { updatedAt: "desc" as const };
      case "updatedAt-asc":
        return { updatedAt: "asc" as const };
      case "titulo-asc":
        return { titulo: "asc" as const };
      case "titulo-desc":
        return { titulo: "desc" as const };
      default:
        return [{ publishedAt: "desc" as const }, { createdAt: "desc" as const }];
    }
  };

  const allArticles = await prisma.articulo.findMany({
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
    orderBy: getSortConfig(sortBy),
  });

  let filteredArticles = allArticles;

  if (categorySlugs.length > 0) {
    filteredArticles = filteredArticles.filter((article: any) =>
      categorySlugs.every((slug: string) =>
        article.articuloCategorias?.some(
          (ac: any) => ac.categoria.slug === slug
        )
      )
    );
  }

  if (searchQuery) {
    filteredArticles = filteredArticles.filter(
      (article: any) =>
        article.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const totalArticles = filteredArticles.length;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const activeCategories = allCategories.filter((c) =>
    categorySlugs.includes(c.slug)
  );

  const buildFilterUrl = (newCategories: string[], newSearch?: string, newSort?: string) => {
    const params = new URLSearchParams();
    if (newCategories.length > 0) {
      params.set("categorias", newCategories.join(","));
    }
    if (newSearch !== undefined ? newSearch : searchQuery) {
      params.set("q", newSearch !== undefined ? newSearch : searchQuery);
    }
    if (newSort !== undefined ? newSort : sortBy) {
      params.set("sort", newSort !== undefined ? newSort : sortBy);
    }
    return `/todos-los-articulos${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  };

  const toggleCategory = (slug: string) => {
    const newCategories = categorySlugs.includes(slug)
      ? categorySlugs.filter((s) => s !== slug)
      : [...categorySlugs, slug];
    return buildFilterUrl(newCategories);
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
            <input type="hidden" name="categorias" value={categoriesParam} />
            <input type="hidden" name="sort" value={sortBy} />
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Buscar artículos..."
                  defaultValue={searchQuery}
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <h2 className="text-sm font-semibold mb-2 md:mb-3">
                  Filtrar por categoría:
                </h2>
              </div>
              <SortNavigation
                value={sortBy}
                categorySlugs={categorySlugs}
                searchQuery={searchQuery}
              />
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {allCategories.map((category) => (
                <Link key={category.id} href={toggleCategory(category.slug)}>
                  <Badge
                    variant={
                      categorySlugs.includes(category.slug)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs md:text-sm"
                  >
                    {category.nombre}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>

          {(searchQuery || categorySlugs.length > 0) && (
            <div className="pt-3 md:pt-4 border-t">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <span className="text-xs md:text-sm font-medium text-muted-foreground">
                    Filtros activos:
                  </span>
                  {searchQuery && (
                    <Link href={buildFilterUrl(categorySlugs, "")}>
                      <Badge
                        variant="default"
                        className="cursor-pointer hover:bg-primary/80 text-xs"
                      >
                        Búsqueda: &quot;{searchQuery}&quot;
                        <X className="h-3 w-3 ml-1" />
                      </Badge>
                    </Link>
                  )}
                  {activeCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={toggleCategory(category.slug)}
                    >
                      <Badge
                        variant="default"
                        className="cursor-pointer hover:bg-primary/80 text-xs"
                      >
                        {category.nombre}
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

        {(searchQuery || categorySlugs.length > 0) && (
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
            Mostrando {totalArticles} resultado
            {totalArticles !== 1 ? "s" : ""}
            {searchQuery && ` para "${searchQuery}"`}
            {activeCategories.length > 0 &&
              ` en: ${activeCategories.map((c) => c.nombre).join(", ")}`}
          </p>
        )}

        {paginatedArticles.length > 0 ? (
          <div className="space-y-0">
            {paginatedArticles.map((article: any, index: number) => (
              <div key={article.id}>
                <Link
                  href={`/articulos/${article.slug}`}
                  className="block group"
                >
                  <article className="py-4 md:py-6 flex gap-3 md:gap-6 hover:bg-muted/50 transition-colors rounded-lg px-2 md:px-4">
                    {article.imagen && (
                      <div className="relative w-24 h-20 md:w-32 md:h-24 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={article.imagen}
                          alt={article.titulo}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <h2 className="text-lg md:text-xl font-serif font-bold mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.titulo}
                          </h2>
                          {article.descripcion && (
                            <p className="text-muted-foreground text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                              {article.descripcion}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-2">
                            {article.articuloCategorias?.map((ac: any) => (
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
                            {new Date(
                              article.publishedAt || article.createdAt
                            ).toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
                {index < paginatedArticles.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border bg-muted/30 px-4 py-12 text-center">
            <div className="mb-6 rounded-full bg-muted p-6">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              No se encontraron artículos
            </h3>
            <p className="mb-6 max-w-md text-pretty text-muted-foreground">
              {searchQuery || categorySlugs.length > 0
                ? "No hay artículos que coincidan con tu búsqueda. Intenta con otros términos o elimina los filtros."
                : currentPage > 1
                ? "Esta página no tiene artículos. Intenta volver a la primera página."
                : "Aún no hay artículos publicados."}
            </p>
            {(searchQuery || categorySlugs.length > 0) && (
              <Link href="/todos-los-articulos">
                <Button size="lg">
                  <X className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              </Link>
            )}
            {currentPage > 1 && !searchQuery && categorySlugs.length === 0 && (
              <Link href="/todos-los-articulos">
                <Button size="lg">Volver a la primera página</Button>
              </Link>
            )}
          </div>
        )}

        {totalPages > 1 && paginatedArticles.length > 0 && (
          <div className="mt-12 flex justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/todos-los-articulos?page=${currentPage - 1}${
                  categoriesParam ? `&categorias=${categoriesParam}` : ""
                }${searchQuery ? `&q=${searchQuery}` : ""}${
                  sortBy !== "publishedAt-desc" ? `&sort=${sortBy}` : ""
                }`}
              >
                <Button variant="outline">Anterior</Button>
              </Link>
            )}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Link
                    key={page}
                    href={`/todos-los-articulos?page=${page}${
                      categoriesParam ? `&categorias=${categoriesParam}` : ""
                    }${searchQuery ? `&q=${searchQuery}` : ""}${
                      sortBy !== "publishedAt-desc" ? `&sort=${sortBy}` : ""
                    }`}
                  >
                    <Button
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                    >
                      {page}
                    </Button>
                  </Link>
                )
              )}
            </div>
            {currentPage < totalPages && (
              <Link
                href={`/todos-los-articulos?page=${currentPage + 1}${
                  categoriesParam ? `&categorias=${categoriesParam}` : ""
                }${searchQuery ? `&q=${searchQuery}` : ""}${
                  sortBy !== "publishedAt-desc" ? `&sort=${sortBy}` : ""
                }`}
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
