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
import { PublicHeader } from "@/components/public-header";

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
      <PublicHeader />
      <main className="container mx-auto px-4 pt-4 pb-8 md:pb-12">
        <Link href="/todos-los-articulos">
          <Button variant="ghost" className="mb-6 md:mb-8 font-sans text-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a artículos
          </Button>
        </Link>

        <article className="mx-auto max-w-4xl">
          <h1 className="mb-3 md:mb-4 text-balance font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
            {articulo.titulo}
          </h1>

          {articulo.descripcion && (
            <p className="mb-6 md:mb-8 border-b border-t border-border py-4 md:py-6 text-pretty font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90">
              {articulo.descripcion}
            </p>
          )}

          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-x-6 md:gap-y-2 border-b border-border pb-4 md:pb-6 font-sans text-xs md:text-sm">
            <div className="flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
              <span className="font-semibold text-foreground">Por</span>
              <span className="truncate max-w-[200px] md:max-w-none">
                {articulo.autors.join(", ")}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start sm:items-end">
              <div className="flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time
                  dateTime={articulo.createdAt.toISOString()}
                  className="font-medium"
                >
                  {format(new Date(articulo.createdAt), "d 'de' MMMM, yyyy", {
                    locale: es,
                  })}
                </time>
              </div>
              {articulo.updatedAt &&
                new Date(articulo.updatedAt).getTime() !==
                  new Date(articulo.createdAt).getTime() && (
                  <span className="text-[10px] md:text-[11px] italic text-muted-foreground/70">
                    Última actualización:{" "}
                    {format(new Date(articulo.updatedAt), "d 'de' MMMM, yyyy", {
                      locale: es,
                    })}
                  </span>
                )}
            </div>
          </div>

          {articulo.articuloCategorias.length > 0 && (
            <div className="mb-6 md:mb-8 flex flex-wrap gap-1.5 md:gap-2">
              {articulo.articuloCategorias.map(({ categoria }: any) => (
                <Link
                  key={categoria.id}
                  href={`/todos-los-articulos?categorias=${categoria.slug}`}
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer font-sans text-[10px] md:text-xs uppercase tracking-wider transition-colors hover:bg-foreground hover:text-background"
                  >
                    {categoria.nombre}
                  </Badge>
                </Link>
              ))}
            </div>
          )}

          {articulo.imagen && (
            <figure className="mb-8 md:mb-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border-2 border-border">
                <Image
                  src={articulo.imagen || "/placeholder.svg"}
                  alt={articulo.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-2 md:mt-3 text-center font-sans text-xs md:text-sm italic text-muted-foreground">
                {articulo.titulo}
              </figcaption>
            </figure>
          )}

          <div className="article-content mx-auto max-w-none overflow-hidden break-words">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="mb-4 md:mb-6 mt-8 md:mt-10 font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight break-words"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="mb-3 md:mb-4 mt-6 md:mt-8 border-b-2 border-foreground/10 pb-2 font-serif text-xl md:text-2xl lg:text-3xl font-bold tracking-tight break-words"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="mb-2 md:mb-3 mt-5 md:mt-6 font-serif text-lg md:text-xl lg:text-2xl font-bold tracking-tight break-words"
                    {...props}
                  />
                ),
                h4: ({ node, ...props }) => (
                  <h4
                    className="mb-2 mt-4 font-serif text-base md:text-lg lg:text-xl font-bold tracking-tight break-words"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="mb-4 md:mb-6 text-base md:text-[18px] leading-[1.65] md:leading-[1.75] tracking-wide text-foreground/95 break-words"
                    style={{
                      fontFamily:
                        'Georgia, Cambria, "Times New Roman", Times, serif',
                    }}
                    {...props}
                  />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="font-semibold text-foreground underline decoration-foreground/30 decoration-2 underline-offset-2 transition-colors hover:text-primary hover:decoration-primary break-words"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="my-6 border-l-4 border-foreground bg-muted/50 py-4 pl-6 pr-4 font-serif italic text-[17px] leading-[1.7] text-foreground/80 break-words overflow-hidden"
                    {...props}
                  />
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="font-semibold text-foreground break-words"
                    {...props}
                  />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[15px] text-foreground break-words"
                      {...props}
                    />
                  ) : (
                    <pre className="block rounded border-2 border-border bg-muted/30 p-4 overflow-x-auto max-w-full">
                      <code
                        className="font-mono text-sm leading-relaxed whitespace-pre"
                        {...props}
                      />
                    </pre>
                  ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="my-5 list-disc space-y-3 pl-8 break-words"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="my-5 list-decimal space-y-3 pl-8 break-words"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="text-[18px] leading-[1.75] text-foreground/95 break-words"
                    style={{
                      fontFamily:
                        'Georgia, Cambria, "Times New Roman", Times, serif',
                    }}
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
                  <span className="my-8 block max-w-full">
                    <img
                      {...props}
                      className="w-full max-w-full h-auto rounded-lg border-2 border-border"
                      loading="lazy"
                    />
                    {props.alt && (
                      <span className="mt-2 block text-center font-sans text-sm italic text-muted-foreground break-words">
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
