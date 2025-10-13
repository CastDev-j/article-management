import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin-header";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { getCategoriaBySlug } from "@/app/actions/categorias";
import { getArticulosWithPagination } from "@/app/actions/articulos";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { PaginationWrapper } from "@/components/pagination-wrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoria = await getCategoriaBySlug(slug);

  if (!categoria) {
    return {
      title: "Categoría no encontrada",
    };
  }

  const { total } = await getArticulosWithPagination({
    publicado: true,
    categoriaSlug: slug,
    page: 1,
    pageSize: 10,
  });

  return {
    title: `${categoria.nombre} | Categorías`,
    description: `Explora ${total} ${
      total === 1 ? "artículo" : "artículos"
    } en la categoría ${categoria.nombre}.`,
    openGraph: {
      title: `${categoria.nombre} | Categorías`,
      description: `Explora ${total} ${
        total === 1 ? "artículo" : "artículos"
      } en la categoría ${categoria.nombre}.`,
      type: "website",
    },
  };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1");

  const [categoria, { articulos, totalPages, total }] = await Promise.all([
    getCategoriaBySlug(slug),
    getArticulosWithPagination({
      publicado: true,
      categoriaSlug: slug,
      page: currentPage,
      pageSize: 10,
    }),
  ]);

  if (!categoria) {
    notFound();
  }

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <Link href="/categorias">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a categorías
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">{categoria.nombre}</h1>
          <p className="text-muted-foreground">
            {total} {total === 1 ? "artículo" : "artículos"}
          </p>
        </div>

        {articulos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No hay artículos en esta categoría.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articulos.map((articulo) => (
                <ArticleCard key={articulo.id} articulo={articulo} />
              ))}
            </div>
            <PaginationWrapper
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </main>
    </>
  );
}
