import { AdminHeader } from "@/components/admin-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <AdminHeader />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Skeleton className="mb-8 h-10 w-64" />

        <div className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </main>
    </>
  );
}
