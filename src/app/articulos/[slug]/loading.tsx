import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar } from "lucide-react";

export default function Loading() {
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 pt-4 pb-12">
        <Button variant="ghost" className="mb-8 font-sans text-sm" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a artículos
        </Button>

        <article className="mx-auto max-w-4xl">
          <Skeleton className="mb-4 h-16 w-full" />
          <Skeleton className="mb-4 h-14 w-3/4" />

          <div className="mb-8 border-b border-t border-border py-6">
            <Skeleton className="mb-3 h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
          </div>

          <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-border pb-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-24 rounded-full" />
            ))}
          </div>

          <figure className="mb-12">
            <Skeleton className="aspect-[16/10] w-full rounded-lg" />
            <Skeleton className="mx-auto mt-3 h-4 w-48" />
          </figure>

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="mb-6 h-5 w-5/6" />

            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="mb-6 h-5 w-4/5" />

            <Skeleton className="mb-6 h-48 w-full rounded-lg" />

            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="mb-4 h-5 w-3/4" />

            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="mb-4 h-5 w-full" />
            <Skeleton className="h-5 w-2/3" />
          </div>
        </article>
      </main>
    </>
  );
}
