import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getArticulos } from "@/app/actions/articulos";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/delete-button";
import { TogglePublicadoButton } from "@/components/toggle-publicado-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mis Artículos | Admin",
  description: "Gestiona tus artículos. Crea, edita y publica contenido.",
};

export default async function AdminArticulosPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const articulos = await getArticulos(); // Obtener todos los artículos (ya que cualquier admin puede editar)

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Mis Artículos</h1>
          <Link href="/admin/articulos/nuevo">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Artículo
            </Button>
          </Link>
        </div>

        {articulos.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="mb-4 text-muted-foreground">
                Aún no has creado ningún artículo.
              </p>
              <Link href="/admin/articulos/nuevo">
                <Button>Crear tu primer artículo</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articulos.map((articulo) => (
              <Card key={articulo.id}>
                <CardHeader>
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-balance text-lg font-semibold">
                      {articulo.titulo}
                    </h3>
                    <Badge
                      variant={articulo.publicado ? "default" : "secondary"}
                    >
                      {articulo.publicado ? "Publicado" : "Borrador"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {articulo.descripcion && (
                    <p className="line-clamp-3 text-pretty text-sm text-muted-foreground">
                      {articulo.descripcion}
                    </p>
                  )}
                  {(articulo as any).articuloCategorias?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(articulo as any).articuloCategorias.map(({ categoria }: any) => (
                        <Badge key={categoria.id} variant="outline">
                          {categoria.nombre}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link
                    href={`/admin/articulos/${articulo.id}/editar`}
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
                  <TogglePublicadoButton
                    articuloId={articulo.id}
                    publicado={articulo.publicado}
                  />
                  <DeleteButton articuloId={articulo.id} />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
