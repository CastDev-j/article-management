import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-6 md:py-8">
      <Button variant="ghost" className="mb-6 md:mb-8" disabled>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a artículos
      </Button>

      <Skeleton className="mb-6 md:mb-8 h-8 md:h-10 w-48 md:w-64" />

      <div className="space-y-4 md:space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-14 md:w-16" />
          <Skeleton className="h-9 md:h-10 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-20 md:w-24" />
          <Skeleton className="h-16 md:h-20 w-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-18 md:w-20" />
          <Skeleton className="h-48 md:h-64 w-full rounded-md" />
          <Skeleton className="h-3.5 md:h-4 w-40 md:w-48" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-24 md:w-28" />
          <Skeleton className="h-9 md:h-10 w-full" />
          <Skeleton className="h-3.5 md:h-4 w-48 md:w-64" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 md:h-5 w-20 md:w-24" />
          <div className="grid gap-2 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 md:h-5 w-20 md:w-24" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border p-3 md:p-4">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>

        <div className="flex gap-4 border-t pt-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
