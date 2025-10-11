import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Skeleton className="h-8 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="border-b py-20">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="mx-auto mb-6 h-12 w-3/4 max-w-3xl" />
            <Skeleton className="mx-auto mb-8 h-6 w-2/3 max-w-2xl" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <Skeleton className="mb-8 h-10 w-64" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border bg-card"
                >
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="mb-2 h-7 w-full" />
                    <Skeleton className="mb-4 h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
