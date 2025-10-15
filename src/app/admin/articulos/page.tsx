import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getArticlesWithPagination } from "@/app/actions/articulos";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/delete-button";
import { TogglePublishedButton } from "@/components/toggle-publicado-button";
import type { Metadata } from "next";
import { checkIsAdmin } from "@/app/actions/auth";
import { PaginationWrapper } from "@/components/pagination-wrapper";

export const metadata: Metadata = {
  title: "Artículos del sitio | Admin",
  description: "Gestiona tus artículos. Crea, edita y publica contenido.",
};

export default async function AdminArticulosPage({
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

  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");

  const { articles, totalPages, total } = await getArticlesWithPagination({
    page: currentPage,
    pageSize: 9,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Artículos del sitio</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {total} {total === 1 ? "artículo" : "artículos"} en total
          </p>
        </div>
        <Link href="/admin/articulos/nuevo">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Artículo
          </Button>
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border bg-muted/30 px-4 py-12 text-center">
          <div className="mb-6 rounded-full bg-muted p-6">
            <Plus className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">
            {total === 0
              ? "No hay artículos creados"
              : "No se encontraron artículos en esta página"}
          </h3>
          <p className="mb-6 max-w-md text-pretty text-muted-foreground">
            {total === 0
              ? "Comienza a escribir tu primer artículo y compártelo con el mundo."
              : currentPage > 1
              ? "Esta página no tiene artículos. Intenta volver a la primera página."
              : "No se encontraron resultados."}
          </p>
          {total === 0 ? (
            <Link href="/admin/articulos/nuevo">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                Crear primer artículo
              </Button>
            </Link>
          ) : (
            <Link href="/admin/articulos">
              <Button size="lg">Volver a la primera página</Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-balance text-lg font-semibold">
                        {article.titulo}
                      </h3>
                      <Badge
                        variant={article.publicado ? "default" : "secondary"}
                      >
                        {article.publicado ? "Publicado" : "Borrador"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {article.descripcion && (
                      <p className="line-clamp-3 text-pretty text-sm text-muted-foreground">
                        {article.descripcion}
                      </p>
                    )}
                    {(article as any).articuloCategorias?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(article as any).articuloCategorias.map(
                          ({ categoria }: any) => (
                            <Badge key={categoria.id} variant="outline">
                              {categoria.nombre}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                  </CardContent>
                </div>

                <CardFooter className="flex gap-2">
                  <Link
                    href={`/admin/articulos/${article.id}/editar`}
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
                  <TogglePublishedButton
                    articleId={article.id}
                    published={article.publicado}
                  />
                  <DeleteButton articleId={article.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
          <PaginationWrapper
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/admin/articulos"
          />
        </>
      )}
    </div>
  );
}
