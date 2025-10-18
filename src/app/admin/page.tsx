import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { checkIsAdmin } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Panel de Administración | Aula de periodismo",
  description: "Gestiona el contenido del sitio",
};

export default async function AdminPage() {
  const { userId } = await auth();
  const isAdmin = await checkIsAdmin(userId);

  let totalArticulos = 0;
  let totalCategorias = 0;
  let articulosPublicados = 0;

  if (isAdmin) {
    const articulos = await prisma.articulo.findMany({});
    totalArticulos = articulos.length;
    totalCategorias = (await prisma.categoria.findMany({})).length;
    articulosPublicados = articulos.filter((a) => a.publicado).length;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center min-h-[70vh] flex flex-col justify-center">
        <h1 className="mb-6 text-balance text-5xl font-bold leading-tight lg:text-6xl">
          Sistema de Gestión de Artículos
        </h1>
        <p className="mb-8 text-pretty text-xl leading-relaxed text-muted-foreground">
          Crea, organiza y publica artículos con un sistema completo de
          categorías y búsqueda.
        </p>

        {isAdmin ? (
          <>
            {/* Estadísticas discretas */}
            <div className="mb-8 flex justify-center gap-8 text-sm text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">
                  {totalArticulos}
                </span>{" "}
                artículos
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {articulosPublicados}
                </span>{" "}
                publicados
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {totalCategorias}
                </span>{" "}
                categorías
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/admin/articulos">
                <Button size="lg" className="gap-2">
                  Gestionar Artículos
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/admin/categorias">
                <Button size="lg" variant="outline">
                  Gestionar Categorías
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <p className="text-lg text-muted-foreground">
            Solicita a los administradores del sitio permiso para edición.
          </p>
        )}
      </div>
    </div>
  );
}
