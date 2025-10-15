import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { CategoryDialog } from "@/components/category-dialog";

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
        <CategoryDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Categoría
          </Button>
        </CategoryDialog>
      </div>

      {categoriesWithCount.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border bg-muted/30 px-4 py-12 text-center">
          <div className="mb-6 rounded-full bg-muted p-6">
            <Plus className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">
            {total === 0
              ? "No hay categorías creadas"
              : "No se encontraron categorías en esta página"}
          </h3>
          <p className="mb-6 max-w-md text-pretty text-muted-foreground">
            {total === 0
              ? "Comienza creando tu primera categoría para organizar tus artículos."
              : currentPage > 1
              ? "Esta página no tiene categorías. Intenta volver a la primera página."
              : "No se encontraron resultados."}
          </p>
          {total === 0 ? (
            <CategoryDialog>
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Crear primera categoría
              </Button>
            </CategoryDialog>
          ) : (
            <Link href="/admin/categorias">
              <Button size="lg">Volver a la primera página</Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead className="w-[180px] text-right">
                    Artículos
                  </TableHead>
                  <TableHead className="w-[240px] text-right">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesWithCount.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium max-w-[140px] sm:max-w-md truncate">
                      {category.nombre}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        {category.articleCount} artículos
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <CategoryDialog category={category}>
                          <Button variant="outline" size="sm">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </Button>
                        </CategoryDialog>
                        <DeleteCategoryButton
                          categoryId={category.id}
                          disabled={category.articleCount > 0}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
