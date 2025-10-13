import { PublicHeader } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar } from "lucide-react";

export default function Loading() {
  return (
    <>
      <PublicHeader />
      <main className="container mx-auto px-4 pt-4 pb-8 md:pb-12">
        <Button
          variant="ghost"
          className="mb-6 md:mb-8 font-sans text-sm"
          disabled
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a artículos
        </Button>

        <article className="mx-auto max-w-4xl">
          <Skeleton className="mb-3 md:mb-4 h-12 md:h-16 w-full" />
          <Skeleton className="mb-4 h-10 md:h-14 w-3/4" />

          <div className="mb-6 md:mb-8 border-b border-t border-border py-4 md:py-6">
            <Skeleton className="mb-2 md:mb-3 h-5 md:h-6 w-full" />
            <Skeleton className="h-5 md:h-6 w-5/6" />
          </div>

          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-x-6 md:gap-y-2 border-b border-border pb-4 md:pb-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20 md:w-24" />
              <Skeleton className="h-4 w-28 md:w-32" />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Skeleton className="h-4 w-28 md:w-32" />
            </div>
          </div>

          <div className="mb-6 md:mb-8 flex flex-wrap gap-1.5 md:gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-5 md:h-6 w-20 md:w-24 rounded-full"
              />
            ))}
          </div>

          <figure className="mb-8 md:mb-12">
            <Skeleton className="aspect-[16/10] w-full rounded-lg" />
            <Skeleton className="mx-auto mt-2 md:mt-3 h-3.5 md:h-4 w-40 md:w-48" />
          </figure>

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="mb-4 md:mb-6 h-4 md:h-5 w-5/6" />

            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="mb-4 md:mb-6 h-4 md:h-5 w-4/5" />

            <Skeleton className="mb-4 md:mb-6 h-40 md:h-48 w-full rounded-lg" />

            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-3/4" />

            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="mb-3 md:mb-4 h-4 md:h-5 w-full" />
            <Skeleton className="h-4 md:h-5 w-2/3" />
          </div>
        </article>
      </main>
    </>
  );
}
