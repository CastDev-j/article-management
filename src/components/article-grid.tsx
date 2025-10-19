import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string | null;
  imagen: string | null;
  createdAt: Date;
  publishedAt: Date | null;
  autors: string[];
  articuloCategorias?: {
    categoria: {
      nombre: string;
      slug: string;
    };
  }[];
}

interface ArticleGridProps {
  articles: Article[];
  title?: string;
  showViewAll?: boolean;
}

export function ArticleGrid({
  articles,
  title,
  showViewAll = false,
}: ArticleGridProps) {
  return (
    <section className="py-8 md:py-12">
      {title && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold">
            {title}
          </h2>
          {showViewAll && (
            <Link href="/todos-los-articulos">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/articulos/${article.slug}`}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group pt-0">
              <div className="relative h-48 md:h-64 overflow-hidden">
                {article.imagen ? (
                  <img
                    src={article.imagen}
                    alt={article.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-serif text-primary/40">
                      {article.titulo.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-4 md:p-6">
                {article.articuloCategorias &&
                  article.articuloCategorias.length > 0 && (
                    <Link
                      href={`/todos-los-articulos?categorias=${article.articuloCategorias[0].categoria.slug}`}
                    >
                      <Badge
                        variant="secondary"
                        className="mb-2 md:mb-3 cursor-pointer hover:bg-secondary/80 transition-colors text-xs"
                      >
                        {article.articuloCategorias[0].categoria.nombre}
                      </Badge>
                    </Link>
                  )}
                <h3 className="text-lg md:text-xl font-serif font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.titulo}
                </h3>
                {article.descripcion && (
                  <p className="text-muted-foreground line-clamp-3 text-xs md:text-sm">
                    {article.descripcion}
                  </p>
                )}
              </CardContent>
              <CardFooter className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
                <div className="flex flex-wrap gap-2 md:gap-3 text-[10px] md:text-xs text-muted-foreground">
                  {article.autors && article.autors.length > 0 && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span className="truncate max-w-[100px] md:max-w-none">
                        {article.autors[0]}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time>
                      {new Date(
                        article.publishedAt || article.createdAt
                      ).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
