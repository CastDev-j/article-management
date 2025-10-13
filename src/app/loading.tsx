import { Skeleton } from "@/components/ui/skeleton";
import { PublicHeader } from "@/components/public-header";

export default function Loading() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="container mx-auto px-4 sm:py-0 py-8">
          <div className="relative overflow-hidden rounded-xl bg-muted">
            <Skeleton className="h-[300px] md:h-[400px] lg:h-[500px] w-full" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-2xl px-4 md:px-8 space-y-2 md:space-y-4">
                <Skeleton className="h-6 md:h-8 w-3/4" />
                <Skeleton className="h-4 md:h-6 w-1/2" />
                <Skeleton className="hidden md:block h-4 w-full" />
                <Skeleton className="hidden md:block h-4 w-5/6" />
              </div>
            </div>

            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-1.5 md:h-2 w-6 md:w-8 rounded-full bg-white/20"
                />
              ))}
            </div>

            <Skeleton className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full" />
            <Skeleton className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full" />
          </div>
        </section>

        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Skeleton className="h-8 md:h-10 w-48 md:w-64" />
            <Skeleton className="h-9 md:h-10 w-28 md:w-32" />
          </div>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-lg border-2 bg-card transition-all hover:shadow-lg flex flex-col"
              >
                <Skeleton className="aspect-[16/9] w-full border-b-2" />
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  <div className="mb-2 md:mb-3 flex flex-wrap gap-1.5 md:gap-2">
                    <Skeleton className="h-4 md:h-5 w-16 md:w-20 rounded-full" />
                    <Skeleton className="h-4 md:h-5 w-14 md:w-16 rounded-full" />
                  </div>
                  <Skeleton className="mb-2 md:mb-3 h-6 md:h-7 w-full" />
                  <Skeleton className="mb-2 h-3.5 md:h-4 w-full" />
                  <Skeleton className="h-3.5 md:h-4 w-4/5 mb-3 md:mb-4" />
                  <div className="mt-auto pt-3 md:pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-20 md:w-24" />
                      <Skeleton className="h-8 md:h-9 w-24 md:w-28" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
