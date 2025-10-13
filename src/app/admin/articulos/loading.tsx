import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Plus, Pencil } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-10 w-56 mb-2" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Button disabled>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Artículo
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col justify-between">
            <div>
              <CardHeader>
                <div className="mb-2 flex items-start justify-between gap-2">
                  <Skeleton className="h-6 w-40" />
                  <Badge variant="secondary">
                    <Skeleton className="h-4 w-16" />
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-3" />
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="outline">
                    <Skeleton className="h-4 w-14" />
                  </Badge>
                  <Badge variant="outline">
                    <Skeleton className="h-4 w-16" />
                  </Badge>
                </div>
              </CardContent>
            </div>

            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex-1 bg-transparent"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-8" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
