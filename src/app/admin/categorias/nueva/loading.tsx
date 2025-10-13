import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <Button variant="ghost" className="mb-8" disabled>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a categorías
      </Button>

      <Skeleton className="mb-8 h-10 w-64" />

      <div className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="flex gap-4 border-t pt-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
