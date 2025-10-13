import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Skeleton className="h-8 md:h-10 w-56 md:w-80" />
          <Skeleton className="h-4 w-64 md:w-96" />
        </div>
        <Button disabled className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nueva Categoría
        </Button>
      </div>

      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border-2 bg-card transition-all hover:shadow-lg flex flex-col"
          >
            <div className="p-4 md:p-6 flex-1 flex flex-col">
              <Skeleton className="h-5 md:h-6 w-32 md:w-40 mb-3 md:mb-4" />
              <Skeleton className="h-4 md:h-5 w-24 md:w-28 mb-4" />
              <div className="mt-auto pt-3 md:pt-4 border-t">
                <div className="flex gap-2">
                  <Skeleton className="h-8 md:h-9 flex-1" />
                  <Skeleton className="h-8 md:h-9 w-16 md:w-20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
