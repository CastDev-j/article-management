import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Articulo } from "@/lib/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ArticleCardProps {
  articulo: Articulo;
}

export function ArticleCard({ articulo }: ArticleCardProps) {
  return (
    <Link href={`/articulos/${articulo.slug}`} className="group">
      <Card className="flex h-full flex-col overflow-hidden border-2 pt-0 transition-all hover:border-foreground hover:shadow-xl">
        {articulo.imagen && (
          <div className="relative aspect-[16/9] w-full overflow-hidden border-b-2">
            <Image
              src={articulo.imagen || "/placeholder.svg"}
              alt={articulo.titulo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="flex-1 space-y-2 md:space-y-3 p-4 md:p-6">
          {articulo.articuloCategorias.length > 0 && (
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {articulo.articuloCategorias.slice(0, 2).map(({ categoria }) => (
                <Badge
                  key={categoria.id}
                  variant="outline"
                  className="font-sans text-[10px] md:text-xs uppercase tracking-wider"
                >
                  {categoria.nombre}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="line-clamp-2 min-h-[3rem] md:min-h-[3.5rem] text-balance font-serif text-xl md:text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
            {articulo.titulo}
          </h3>
        </CardHeader>
        <CardContent className="pb-3 md:pb-4 px-4 md:px-6">
          {articulo.descripcion && (
            <p className="line-clamp-3 min-h-[4rem] md:min-h-[4.5rem] text-pretty font-sans text-sm md:text-base leading-relaxed text-muted-foreground">
              {articulo.descripcion}
            </p>
          )}
        </CardContent>
        <CardFooter className="border-t pt-3 md:pt-4 px-4 md:px-6 pb-4 md:pb-6">
          <div className="flex w-full flex-col gap-1.5 md:gap-2 font-sans text-[10px] md:text-xs">
            <div className="flex items-center justify-end tracking-wide text-muted-foreground">
              <time
                dateTime={(articulo.publishedAt || articulo.createdAt).toISOString()}
                className="font-medium uppercase"
              >
                {format(new Date(articulo.publishedAt || articulo.createdAt), "d MMM yyyy", {
                  locale: es,
                })}
              </time>
            </div>
            {articulo.updatedAt &&
              new Date(articulo.updatedAt).getTime() !==
                new Date(articulo.createdAt).getTime() && (
                <div className="flex justify-end">
                  <span className="text-[9px] md:text-[10px] italic text-muted-foreground/70">
                    Actualizado:{" "}
                    {format(new Date(articulo.updatedAt), "d MMM yyyy", {
                      locale: es,
                    })}
                  </span>
                </div>
              )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
