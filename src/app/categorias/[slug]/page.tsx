import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { ArticleCard } from "@/components/article-card";
import { Button } from "@/components/ui/button";
import { getCategoriaBySlug } from "@/app/actions/categorias";
import { getArticulos } from "@/app/actions/articulos";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const categoria = await getCategoriaBySlug(slug);

  if (!categoria) {
    return {
      title: "Categoría no encontrada",
    };
  }

  const articulos = await getArticulos({
    publicado: true,
    categoriaSlug: slug,
  });

  return {
    title: `${categoria.nombre} | Categorías`,
    description: `Explora ${articulos.length} ${
      articulos.length === 1 ? "artículo" : "artículos"
    } en la categoría ${categoria.nombre}.`,
    openGraph: {
      title: `${categoria.nombre} | Categorías`,
      description: `Explora ${articulos.length} ${
        articulos.length === 1 ? "artículo" : "artículos"
      } en la categoría ${categoria.nombre}.`,
      type: "website",
    },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const [categoria, articulos] = await Promise.all([
    getCategoriaBySlug(slug),
    getArticulos({ publicado: true, categoriaSlug: slug }),
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
            {articulos.length}{" "}
            {articulos.length === 1 ? "artículo" : "artículos"}
          </p>
        </div>

        {articulos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No hay artículos en esta categoría.
            </p>
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
  );
}
