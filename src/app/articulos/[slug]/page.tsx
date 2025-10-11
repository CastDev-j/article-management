import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticuloBySlug } from "@/app/actions/articulos";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const articulo = await getArticuloBySlug(slug);

  if (!articulo || !articulo.publicado) {
    return {
      title: "Artículo no encontrado",
    };
  }

  const categorias = articulo.articuloCategorias
    .map((ac: any) => ac.categoria.nombre)
    .join(", ");

  return {
    title: `${articulo.titulo} | Gestión de Artículos`,
    description: articulo.descripcion || articulo.contenido.slice(0, 160),
    authors: articulo.autors.map((name: string) => ({ name })),
    keywords: categorias,
    openGraph: {
      title: articulo.titulo,
      description: articulo.descripcion || articulo.contenido.slice(0, 160),
      type: "article",
      publishedTime: articulo.createdAt.toISOString(),
      modifiedTime: articulo.updatedAt.toISOString(),
      authors: articulo.autors,
      images: articulo.imagen
        ? [{ url: articulo.imagen, alt: articulo.titulo }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: articulo.titulo,
      description: articulo.descripcion || articulo.contenido.slice(0, 160),
      images: articulo.imagen ? [articulo.imagen] : [],
    },
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articulo = await getArticuloBySlug(slug);

  if (!articulo || !articulo.publicado) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Link href="/articulos">
          <Button variant="ghost" className="mb-8 font-sans text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a artículos
          </Button>
        </Link>

        <article className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-balance font-serif text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
            {articulo.titulo}
          </h1>

          {articulo.descripcion && (
            <p className="mb-8 border-b border-t border-border py-6 text-pretty font-serif text-xl leading-relaxed text-foreground/90 lg:text-2xl">
              {articulo.descripcion}
            </p>
          )}

          <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border pb-6 font-sans text-sm uppercase tracking-wide text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Por</span>
              <span>{articulo.autors.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={articulo.createdAt.toISOString()}>
                {format(new Date(articulo.createdAt), "d 'de' MMMM, yyyy", {
                  locale: es,
                })}
              </time>
            </div>
          </div>

          {articulo.articuloCategorias.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {articulo.articuloCategorias.map(({ categoria }: any) => (
                <Link key={categoria.id} href={`/categorias/${categoria.slug}`}>
                  <Badge
                    variant="outline"
                    className="cursor-pointer font-sans text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
                  >
                    {categoria.nombre}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {articulo.imagen && (
            <figure className="mb-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={articulo.imagen || "/placeholder.svg"}
                  alt={articulo.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-3 text-center font-sans text-sm italic text-muted-foreground">
                {articulo.titulo}
              </figcaption>
            </figure>
          )}

          <div className="space-y-6 font-sans text-lg leading-relaxed text-foreground/95">
            {articulo.contenido
              .split("\n")
              .map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-letter:leading-none first-of-type:first-letter:text-foreground"
                >
                  {paragraph}
                </p>
              ))}
          </div>

          <div className="mt-16 border-t-2 border-foreground pt-8">
            <p className="text-center font-serif text-sm uppercase tracking-widest text-muted-foreground">
              Fin del artículo
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
