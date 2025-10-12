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
      <Card className="h-full overflow-hidden border-2 transition-all hover:border-foreground hover:shadow-xl pt-0">
        {articulo.imagen && (
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2">
            <Image
              src={articulo.imagen || "/placeholder.svg"}
              alt={articulo.titulo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader className="space-y-3">
          {articulo.articuloCategorias.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {articulo.articuloCategorias.slice(0, 2).map(({ categoria }) => (
                <Badge
                  key={categoria.id}
                  variant="outline"
                  className="font-sans text-xs uppercase tracking-wider"
                >
                  {categoria.nombre}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="line-clamp-2 text-balance font-serif text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
            {articulo.titulo}
          </h3>
        </CardHeader>
        <CardContent>
          {articulo.descripcion && (
            <p className="line-clamp-3 text-pretty font-sans text-base leading-relaxed text-muted-foreground">
              {articulo.descripcion}
            </p>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex w-full items-center justify-between font-sans text-xs uppercase tracking-wide text-muted-foreground">
            <span className="font-semibold">{articulo.autors.join(", ")}</span>
            <time dateTime={articulo.createdAt.toISOString()}>
              {format(new Date(articulo.createdAt), "d MMM yyyy", {
                locale: es,
              })}
            </time>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
