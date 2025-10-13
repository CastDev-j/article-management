import { Skeleton } from "@/components/ui/skeleton";
import { PublicHeader } from "@/components/public-header";
import { Search } from "lucide-react";

export default function TodosLosArticulosLoading() {
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Skeleton className="mx-auto mb-8 h-12 w-96" />
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="mb-8 rounded-lg border bg-muted/30 p-6">
          <div className="mb-4">
            <Skeleton className="mb-3 h-5 w-40" />
            <div className="flex flex-wrap gap-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-7 w-24 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-0">
          {[...Array(10)].map((_, i) => (
            <div key={i}>
              <div className="flex gap-6 px-4 py-6">
                <Skeleton className="h-24 w-32 flex-shrink-0 rounded-md" />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex-1">
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="mb-1 h-4 w-full" />
                    <Skeleton className="mb-3 h-4 w-5/6" />
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Skeleton className="h-5 w-20 rounded-full" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-9 w-28" />
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
