import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Skeleton className="h-8 md:h-10 w-48 md:w-64" />
          <Skeleton className="h-4 w-64 md:w-96" />
        </div>
        <Button disabled className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Artículo
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border-2 bg-card transition-all hover:shadow-lg flex flex-col"
          >
            <div className="p-4 md:p-6 flex-1 flex flex-col">
              <div className="mb-2 flex items-start justify-between gap-2">
                <Skeleton className="h-5 md:h-6 w-36 md:w-48" />
                <Skeleton className="h-4 md:h-5 w-16 md:w-20 rounded-full" />
              </div>
              <Skeleton className="mb-2 h-3.5 md:h-4 w-full" />
              <Skeleton className="mb-3 md:mb-4 h-3.5 md:h-4 w-5/6" />
              <div className="mt-3 flex flex-wrap gap-1.5 md:gap-2">
                <Skeleton className="h-4 md:h-5 w-14 md:w-16 rounded-full" />
                <Skeleton className="h-4 md:h-5 w-16 md:w-20 rounded-full" />
              </div>
              <div className="mt-auto pt-3 md:pt-4 border-t">
                <div className="flex gap-2">
                  <Skeleton className="h-8 md:h-9 flex-1" />
                  <Skeleton className="h-8 md:h-9 w-16 md:w-20" />
                  <Skeleton className="h-8 md:h-9 w-8 md:w-9" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
