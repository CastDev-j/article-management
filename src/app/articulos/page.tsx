import { ArticleCard } from "@/components/article-card";
import { getArticulos } from "@/app/actions/articulos";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin-header";

export const metadata: Metadata = {
  title: "Artículos | Gestión de Artículos",
  description:
    "Explora todos los artículos publicados. Encuentra contenido sobre tecnología, diseño, desarrollo web y más.",
  openGraph: {
    title: "Artículos | Gestión de Artículos",
    description:
      "Explora todos los artículos publicados. Encuentra contenido sobre tecnología, diseño, desarrollo web y más.",
    type: "website",
  },
};

export default async function ArticulosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const params = await searchParams;
  const articulos = await getArticulos({
    publicado: true,
    search: params.q,
    categoriaSlug: params.categoria,
  });

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold">Artículos</h1>
          <form action="/articulos" method="get" className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              placeholder="Buscar artículos..."
              defaultValue={params.q}
              className="pl-10"
            />
          </form>
        </div>

        {articulos.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron artículos.
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
