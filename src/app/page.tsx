import type { Metadata } from "next";
import { PublicHeader } from "@/components/public-header";
import { FeaturedCarousel } from "@/components/featured-carousel";
import { ArticleGrid } from "@/components/article-grid";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Aula de periodismo | Inicio",
  description:
    "Lee los últimos artículos y noticias. Mantente informado con nuestro contenido actualizado.",
  keywords: ["artículos", "noticias", "blog", "información", "actualidad"],
  openGraph: {
    title: "Aula de periodismo | Inicio",
    description:
      "Lee los últimos artículos y noticias. Mantente informado con nuestro contenido actualizado.",
    type: "website",
  },
};

export default async function HomePage() {
  const featuredArticles = await prisma.articulo.findMany({
    where: {
      publicado: true,
    },
    include: {
      articuloCategorias: true,
    },
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  const featured = featuredArticles.slice(0, 4);
  const recent = featuredArticles.slice(0, 6);
  return (
    <>
      <PublicHeader />
      <main className="flex-grow">
        {featured.length > 0 && (
          <section className="container mx-auto">
            <FeaturedCarousel articles={featured} />
          </section>
        )}

        {recent.length > 0 && (
          <section className="container mx-auto px-4">
            <ArticleGrid
              articles={recent}
              title="Últimos Artículos"
              showViewAll={true}
            />
          </section>
        )}

        {featuredArticles.length === 0 && (
          <section className="container mx-auto px-4 py-24">
            <div className="text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Próximamente
              </h2>
              <p className="text-muted-foreground text-lg">
                Estamos preparando contenido interesante para ti.
              </p>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
