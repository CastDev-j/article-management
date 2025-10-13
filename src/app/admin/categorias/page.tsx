import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategoriesWithPagination } from "@/app/actions/categorias";
import { Plus, Pencil } from "lucide-react";
import { DeleteCategoryButton } from "@/components/delete-categoria-button";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { checkIsAdmin } from "@/app/actions/auth";
import { redirect } from "next/navigation";
import { PaginationWrapper } from "@/components/pagination-wrapper";

export const metadata: Metadata = {
  title: "Gestión de Categorías | Admin",
  description: "Administra las categorías de artículos",
};

export default async function AdminCategoriasPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const isAdmin = await checkIsAdmin(userId);

  if (!isAdmin) {
    redirect("/");
  }

  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;

  const { categories, totalPages, total } = await getCategoriesWithPagination({
    page: currentPage,
    pageSize: 9,
  });

  const categoriesWithCount = await Promise.all(
    categories.map(async (category) => {
      const count = await prisma.articuloCategoria.count({
        where: { categoriaId: category.id },
      });
      return { ...category, articleCount: count };
    })
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold">
            Gestión de Categorías
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {total} categorías en total
          </p>
        </div>
        <Link href="/admin/categorias/nueva">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Button>
        </Link>
      </div>

      {categoriesWithCount.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-4 text-muted-foreground">
              No hay categorías creadas.
            </p>
            <Link href="/admin/categorias/nueva">
              <Button>Crear primera categoría</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesWithCount.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">
                    {category.nombre}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">
                    {category.articleCount} artículos
                  </Badge>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link
                    href={`/admin/categorias/${category.id}/editar`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                  <DeleteCategoryButton
                    categoryId={category.id}
                    disabled={category.articleCount > 0}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
          <PaginationWrapper
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/admin/categorias"
          />
        </>
      )}
    </div>
  );
}
