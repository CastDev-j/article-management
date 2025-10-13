import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center min-h-[70vh] flex flex-col justify-center">
        <h1 className="mb-6 text-balance text-5xl font-bold leading-tight lg:text-6xl">
          Sistema de Gestión de Artículos
        </h1>
        <p className="mb-8 text-pretty text-xl leading-relaxed text-muted-foreground">
          Crea, organiza y publica artículos con un sistema completo de
          categorías y búsqueda.
        </p>

        <div className="mb-8 flex justify-center gap-8 text-sm">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Skeleton className="h-11 w-48" />
          <Skeleton className="h-11 w-44" />
        </div>
      </div>
    </div>
  );
}
