import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" className="mb-6" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a artículos
        </Button>

        <article>
          <header className="mb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="mb-4 h-12 w-full" />
            <Skeleton className="mb-6 h-6 w-3/4" />

            <Skeleton className="mb-6 h-64 w-full rounded-lg" />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-32" />
              <span>•</span>
              <Skeleton className="h-4 w-24" />
            </div>
          </header>

          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-5/6" />
            <Skeleton className="mb-6 h-4 w-full" />

            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-4/5" />

            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </article>
      </main>
    </>
  );
}
