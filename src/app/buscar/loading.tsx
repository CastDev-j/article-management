import { AdminHeader } from "@/components/admin-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

export default function Loading() {
  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Skeleton className="mb-4 h-10 w-48" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Skeleton className="h-10 w-full max-w-2xl pl-10" />
          </div>
        </div>

        <div className="mb-6">
          <Skeleton className="h-6 w-64" />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border bg-card">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <div className="mb-2 flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <Skeleton className="mb-2 h-7 w-full" />
                <Skeleton className="mb-4 h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="mt-4 flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
