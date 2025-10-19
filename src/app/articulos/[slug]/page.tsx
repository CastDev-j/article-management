import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticleBySlug } from "@/app/actions/articulos";
import { ArrowLeft, Calendar, Settings } from "lucide-react";
import dynamic from "next/dynamic";

const ShareButton = dynamic(() => import("@/components/share-button"), {
  ssr: false,
});
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import { PublicHeader } from "@/components/public-header";
import { auth } from "@clerk/nextjs/server";
import { checkIsAdmin } from "@/app/actions/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.publicado) {
    return {
      title: "Artículo no encontrado",
    };
  }

  const categories = article.articuloCategorias
    .map((ac: any) => ac.categoria.nombre)
    .join(", ");

  return {
    title: `${article.titulo} | Gestión de Artículos`,
    description: article.descripcion || article.contenido.slice(0, 160),
    authors: article.autors.map((name: string) => ({ name })),
    keywords: categories,
    openGraph: {
      title: article.titulo,
      description: article.descripcion || article.contenido.slice(0, 160),
      type: "article",
      publishedTime: (article.publishedAt || article.createdAt).toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      authors: article.autors,
      images: article.imagen
        ? [{ url: article.imagen, alt: article.titulo }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titulo,
      description: article.descripcion || article.contenido.slice(0, 160),
      images: article.imagen ? [article.imagen] : [],
    },
  };
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || !article.publicado) {
    notFound();
  }

  const { userId } = await auth();
  const isAdmin = userId ? await checkIsAdmin(userId) : false;

  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 pt-4 pb-8 md:pb-12">
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <Link href="/todos-los-articulos">
            <Button variant="ghost" className="font-sans text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a artículos
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link href={`/admin/articulos/${article.id}/editar`}>
                <Button variant="outline" size="sm">
                  <Settings className="mr-0 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Editar artículo</span>
                </Button>
              </Link>
            )}

            <ShareButton
              title={article.titulo}
              url={`${process.env.NEXT_PUBLIC_SITE_URL || ""}/articulos/${
                article.slug
              }`}
            />
          </div>
        </div>

        <article className="mx-auto max-w-4xl">
          <div className="mb-3 md:mb-4 relative">
            <h1 className="text-balance font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight pr-12 md:pr-16">
              {article.titulo}
            </h1>
          </div>

          {article.descripcion && (
            <p className="mb-6 md:mb-8 border-b border-t border-border py-4 md:py-6 text-pretty font-serif text-lg md:text-xl lg:text-2xl leading-relaxed text-foreground/90">
              {article.descripcion}
            </p>
          )}

          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-x-6 md:gap-y-2 border-b border-border pb-4 md:pb-6 font-sans text-xs md:text-sm">
            <div className="flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
              <span className="font-semibold text-foreground">Por</span>
              <span className="truncate max-w-[200px] md:max-w-none">
                {article.autors.join(", ")}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start sm:items-end">
              <div className="flex items-center gap-2 uppercase tracking-wide text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time
                  dateTime={(article.publishedAt || article.createdAt).toISOString()}
                  className="font-medium"
                >
                  {format(new Date(article.publishedAt || article.createdAt), "d 'de' MMMM, yyyy", {
                    locale: es,
                  })}
                </time>
              </div>
              {article.updatedAt &&
                new Date(article.updatedAt).getTime() !==
                  new Date(article.createdAt).getTime() && (
                  <span className="text-[10px] md:text-[11px] italic text-muted-foreground/70">
                    Última actualización:{" "}
                    {format(new Date(article.updatedAt), "d 'de' MMMM, yyyy", {
                      locale: es,
                    })}
                  </span>
                )}
            </div>
          </div>

          {article.articuloCategorias.length > 0 && (
            <div className="mb-6 md:mb-8 flex flex-wrap gap-1.5 md:gap-2">
              {article.articuloCategorias.map(({ categoria }: any) => (
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

          {article.imagen && (
            <figure className="mb-8 md:mb-12">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border-2 border-border">
                <Image
                  src={article.imagen || "/placeholder.svg"}
                  alt={article.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-2 md:mt-3 text-center font-sans text-xs md:text-sm italic text-muted-foreground">
                {article.titulo}
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
              {article.contenido}
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
