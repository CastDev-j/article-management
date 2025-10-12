import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticuloBySlug } from "@/app/actions/articulos";
import { ArrowLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { AdminHeader } from "@/components/admin-header";

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
      <AdminHeader />
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
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border-2 border-border">
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

          <div className="article-content mx-auto max-w-none font-serif">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="mb-6 mt-10 text-4xl font-bold leading-tight tracking-tight"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="mb-4 mt-8 border-b-2 border-foreground/10 pb-2 text-3xl font-bold tracking-tight"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="mb-3 mt-6 text-2xl font-bold tracking-tight"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="mb-2 mt-4 text-xl font-bold tracking-tight"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="mb-4 text-lg leading-relaxed text-foreground/90"
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="font-semibold text-foreground underline decoration-foreground/30 decoration-2 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="my-6 border-l-4 border-foreground bg-muted/50 py-4 pl-6 italic text-foreground/80"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-bold text-foreground" {...props} />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground"
                      {...props}
                    />
                  ) : (
                    <code
                      className="block rounded border-2 border-border bg-muted/30 p-4 font-mono text-sm"
                      {...props}
                    />
                  ),
                ul: ({ node, ...props }) => (
                  <ul className="my-4 list-disc space-y-2 pl-8" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="my-4 list-decimal space-y-2 pl-8" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="text-lg leading-relaxed text-foreground/90"
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => (
                  <hr
                    className="my-8 border-t-2 border-foreground/20"
                    {...props}
                  />
                ),
                img: ({ node, ...props }) => (
                  <span className="my-8 block">
                    <img
                      {...props}
                      className="w-full rounded-lg border-2 border-border"
                      loading="lazy"
                    />
                    {props.alt && (
                      <span className="mt-2 block text-center text-sm italic text-muted-foreground">
                        {props.alt}
                      </span>
                    )}
                  </span>
                ),
              }}
            >
              {articulo.contenido}
            </ReactMarkdown>
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
