"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";

interface FeaturedArticle {
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

interface FeaturedCarouselProps {
  articles: FeaturedArticle[];
}

export function FeaturedCarousel({ articles }: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }

    const autoScrollInterval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    const carouselElement = api.rootNode();
    const handleMouseEnter = () => clearInterval(autoScrollInterval);
    const handleMouseLeave = () => {
      const newInterval = setInterval(() => {
        api.scrollNext();
      }, 4000);
      return newInterval;
    };

    carouselElement.addEventListener("mouseenter", handleMouseEnter);
    carouselElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(autoScrollInterval);
      carouselElement.removeEventListener("mouseenter", handleMouseEnter);
      carouselElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
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
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 py-0 rounded-none">
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
                  <CardContent className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 text-white">
                    {article.articuloCategorias &&
                      article.articuloCategorias.length > 0 && (
                        <div>
                          <Badge
                            variant="secondary"
                            className="mb-2 md:mb-3 bg-primary/90 hover:bg-primary text-white cursor-pointer transition-colors text-xs md:text-sm"
                          >
                            {article.articuloCategorias[0].categoria.nombre}
                          </Badge>
                        </div>
                      )}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-2 md:mb-3 line-clamp-2 leading-tight">
                      {article.titulo}
                    </h2>
                    {article.descripcion && (
                      <p className="text-sm md:text-base lg:text-lg text-white/90 mb-3 md:mb-4 line-clamp-2 hidden sm:block">
                        {article.descripcion}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-white/80">
                      {article.autors && article.autors.length > 0 && (
                        <div className="flex items-center gap-1 md:gap-1.5">
                          <User className="h-3 w-3 md:h-4 md:w-4" />
                          <span className="truncate max-w-[120px] md:max-w-none">
                            {article.autors[0]}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 md:gap-1.5">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        <time>
                          {new Date(
                            article.publishedAt || article.createdAt
                          ).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
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
