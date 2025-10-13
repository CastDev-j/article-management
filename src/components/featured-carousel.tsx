"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

interface FeaturedArticle {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string | null;
  imagen: string | null;
  createdAt: Date;
  autors: string[];
  articuloCategorias?: {
    categoria: {
      nombre: string;
      slug: string;
    };
  }[];
}

interface FeaturedCarouselProps {
  articles: FeaturedArticle[];
}

export function FeaturedCarousel({ articles }: FeaturedCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent>
        {articles.map((article) => (
          <CarouselItem key={article.id}>
            <Link href={`/articulos/${article.slug}`}>
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
                  {article.imagen ? (
                    <img
                      src={article.imagen}
                      alt={article.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl font-serif text-primary/40">
                        {article.titulo.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <CardContent className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                    {article.articuloCategorias &&
                      article.articuloCategorias.length > 0 && (
                        <Link
                          href={`/todos-los-articulos?categorias=${article.articuloCategorias[0].categoria.slug}`}
                        >
                          <Badge
                            variant="secondary"
                            className="mb-3 bg-primary/90 hover:bg-primary cursor-pointer transition-colors"
                          >
                            {article.articuloCategorias[0].categoria.nombre}
                          </Badge>
                        </Link>
                      )}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 line-clamp-2">
                      {article.titulo}
                    </h2>
                    {article.descripcion && (
                      <p className="text-base md:text-lg text-white/90 mb-4 line-clamp-2">
                        {article.descripcion}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-white/80">
                      {article.autors && article.autors.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <User className="h-4 w-4" />
                          <span>{article.autors[0]}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <time>
                          {new Date(article.createdAt).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
