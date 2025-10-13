import { AdminHeader } from "@/components/admin-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategoriasWithPagination } from "@/app/actions/categorias";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { FolderOpen } from "lucide-react";
import type { Metadata } from "next";
import { PaginationWrapper } from "@/components/pagination-wrapper";
export const metadata: Metadata = {
  title: "Categorías | Gestión de Artículos",
  description:
    "Explora artículos organizados por categorías. Encuentra contenido sobre tecnología, diseño, desarrollo web, marketing y negocios.",
  openGraph: {
    title: "Categorías | Gestión de Artículos",
    description:
      "Explora artículos organizados por categorías. Encuentra contenido sobre tecnología, diseño, desarrollo web, marketing y negocios.",
    type: "website",
  },
};

export default async function CategoriasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");

  const { categorias, totalPages, total } = await getCategoriasWithPagination({
    page: currentPage,
    pageSize: 10,
  });

  const categoriasConConteo = await Promise.all(
    categorias.map(async (categoria) => {
      const count = await prisma.articuloCategoria.count({
        where: {
          categoriaId: categoria.id,
          articulo: {
            publicado: true,
          },
        },
      });
      return { ...categoria, count };
    })
  );

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Categorías</h1>
          <p className="text-muted-foreground">
            Explora artículos por categoría
          </p>
        </div>

        {categoriasConConteo.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No hay categorías disponibles.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categoriasConConteo.map((categoria) => (
                <Link key={categoria.id} href={`/categorias/${categoria.slug}`}>
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <FolderOpen className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">
                        {categoria.nombre}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="secondary">
                        {categoria.count}{" "}
                        {categoria.count === 1 ? "artículo" : "artículos"}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <PaginationWrapper
              currentPage={currentPage}
              totalPages={totalPages}
              basePath="/categorias"
            />
          </>
        )}
      </main>
    </>
  );
}
