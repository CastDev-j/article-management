import { Skeleton } from "@/components/ui/skeleton";
import { PublicHeader } from "@/components/public-header";
import { Search } from "lucide-react";

export default function TodosLosArticulosLoading() {
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto mb-8 md:mb-12 max-w-3xl text-center">
          <Skeleton className="mx-auto mb-6 md:mb-8 h-10 md:h-12 w-64 md:w-96" />
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-20 md:w-24" />
          </div>
        </div>

        <div className="mb-6 md:mb-8 rounded-lg border bg-muted/30 p-4 md:p-6">
          <div className="mb-3 md:mb-4">
            <Skeleton className="mb-2 md:mb-3 h-5 w-32 md:w-40" />
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-6 md:h-7 w-20 md:w-24 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {[...Array(10)].map((_, i) => (
            <div key={i}>
              <div className="flex gap-3 md:gap-6 px-2 md:px-4 py-4 md:py-6">
                <Skeleton className="h-20 w-24 md:h-24 md:w-32 flex-shrink-0 rounded-md" />

                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-5 md:h-6 w-3/4" />
                    <Skeleton className="mb-1 h-3.5 md:h-4 w-full" />
                    <Skeleton className="mb-2 md:mb-3 h-3.5 md:h-4 w-5/6" />
                    <div className="mb-2 flex flex-wrap gap-1.5 md:gap-2">
                      <Skeleton className="h-4 md:h-5 w-16 md:w-20 rounded-full" />
                      <Skeleton className="h-4 md:h-5 w-14 md:w-16 rounded-full" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <Skeleton className="h-3 w-24 md:w-32" />
                    <Skeleton className="h-8 md:h-9 w-24 md:w-28" />
                  </div>
                </div>
              </div>
              {i < 9 && <div className="border-b" />}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24" />
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-10" />
              ))}
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </main>
    </>
  );
}
