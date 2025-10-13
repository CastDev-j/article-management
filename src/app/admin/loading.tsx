import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center min-h-[70vh] flex flex-col justify-center">
        <Skeleton className="mb-4 md:mb-6 h-12 md:h-16 w-full max-w-2xl mx-auto" />
        <Skeleton className="mb-2 md:mb-4 h-12 md:h-14 w-3/4 mx-auto" />

        <div className="mb-6 md:mb-8 flex justify-center">
          <Skeleton className="h-6 md:h-8 w-full max-w-xl" />
        </div>

        {/* Estadísticas discretas */}
        <div className="mb-6 md:mb-8 flex flex-wrap justify-center gap-4 md:gap-8">
          <Skeleton className="h-5 md:h-6 w-24 md:w-32" />
          <Skeleton className="h-5 md:h-6 w-28 md:w-36" />
          <Skeleton className="h-5 md:h-6 w-24 md:w-32" />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
          <Button size="lg" disabled className="gap-2 w-full sm:w-auto">
            Gestionar Artículos
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            disabled
            className="w-full sm:w-auto"
          >
            Gestionar Categorías
          </Button>
        </div>
      </div>
    </div>
  );
}
