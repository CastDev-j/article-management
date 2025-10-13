import { Skeleton } from "@/components/ui/skeleton";
import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function TodosLosArticulosLoading() {
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto mb-8 md:mb-12 text-center">
          <Skeleton className="mx-auto mb-6 md:mb-8 h-10 md:h-12 lg:h-14 w-64 md:w-80 lg:w-96" />

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                disabled
                placeholder="Buscar artículos..."
                className="pl-10 h-10"
              />
            </div>
            <Button disabled className="px-4 md:px-6">
              Buscar
            </Button>
          </div>
        </div>

        <div className="mb-6 md:mb-8 rounded-lg p-4 md:p-6 bg-muted/30">
          <div className="mb-3 md:mb-4">
            <Skeleton className="mb-2 md:mb-3 h-4 w-36" />
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
          {[...Array(9)].map((_, index) => (
            <div key={index}>
              <div className="py-4 md:py-6 flex gap-3 md:gap-6 px-2 md:px-4">
                <Skeleton className="relative w-24 h-20 md:w-32 md:h-24 flex-shrink-0 rounded-md" />

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <Skeleton className="h-5 md:h-6 w-3/4 mb-1 md:mb-2" />
                      <Skeleton className="h-3.5 md:h-4 w-full mb-1" />
                      <Skeleton className="h-3.5 md:h-4 w-5/6 mb-2 md:mb-3" />
                      <div className="flex items-center gap-1.5 md:gap-2 flex-wrap mb-2">
                        <Skeleton className="h-4 md:h-5 w-16 md:w-20 rounded-full" />
                        <Skeleton className="h-4 md:h-5 w-14 md:w-18 rounded-full" />
                      </div>
                    </div>
                    <div className="flex justify-end mt-1 md:mt-2">
                      <Skeleton className="h-3 md:h-3.5 w-32 md:w-40" />
                    </div>
                  </div>
                </div>
              </div>
              {index < 8 && <Separator />}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-2">
          <Skeleton className="h-10 w-20" />
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
      </main>
    </>
  );
}
