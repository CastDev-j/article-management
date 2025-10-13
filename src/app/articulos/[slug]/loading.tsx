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
          <Skeleton className="mb-3 md:mb-4 h-10 md:h-14 lg:h-16 xl:h-20 w-full" />
          <Skeleton className="mb-3 md:mb-4 h-10 md:h-14 lg:h-16 xl:h-20 w-3/4" />

          <div className="mb-6 md:mb-8 border-b border-t border-border py-4 md:py-6 space-y-2.5">
            <Skeleton className="h-6 md:h-7 lg:h-8 w-full" />
            <Skeleton className="h-6 md:h-7 lg:h-8 w-5/6" />
          </div>

          <div className="mb-6 md:mb-8 flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3 md:gap-x-6 md:gap-y-2 border-b border-border pb-4 md:pb-6 font-sans text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-32 md:w-40" />
            </div>
            <div className="flex flex-col gap-1 items-start sm:items-end">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-36 md:w-40" />
              </div>
              <Skeleton className="h-3 w-48 md:w-52" />
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
            <Skeleton className="mx-auto mt-2 md:mt-3 h-3 md:h-3.5 w-40 md:w-48" />
          </figure>

          <div className="article-content mx-auto max-w-none space-y-4 md:space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-11/12" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-4/5" />
            </div>

            <Skeleton className="mt-6 md:mt-8 h-7 md:h-8 lg:h-9 w-2/3" />

            <div className="space-y-3">
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-3/4" />
            </div>

            <div className="my-6 border-l-4 border-muted bg-muted/50 py-4 pl-6 pr-4 space-y-2.5">
              <Skeleton className="h-[17px] w-full" />
              <Skeleton className="h-[17px] w-5/6" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-2/3" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-full" />
              <Skeleton className="h-[18px] md:h-5 w-5/6" />
            </div>
          </div>

          <div className="mt-16 border-t-2 border-foreground pt-8">
            <Skeleton className="mx-auto h-4 w-32" />
          </div>
        </article>
      </main>
    </>
  );
}
