import { Skeleton } from "@/components/ui/skeleton";
import { PublicHeader } from "@/components/public-header";

export default function Loading() {
  return (
    <>
      <PublicHeader />
      <main>
        <section className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-xl bg-muted">
            <Skeleton className="h-[400px] md:h-[500px] w-full" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-2xl px-8 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-2 w-8 rounded-full bg-white/20"
                />
              ))}
            </div>

            <Skeleton className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" />
            <Skeleton className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full" />
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-lg border-2 bg-card transition-all hover:shadow-lg flex flex-col"
              >
                <Skeleton className="aspect-[16/9] w-full border-b-2" />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="mb-3 h-7 w-full" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="h-4 w-4/5 mb-4" />
                  <div className="mt-auto pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-9 w-28" />
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
