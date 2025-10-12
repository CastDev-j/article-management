import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin-header";
import { auth } from "@clerk/nextjs/server";
import { checkIsAdmin } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Gestión de Artículos | Sistema de Gestión de Contenido",
  description:
    "Sistema completo de gestión de artículos con categorías, búsqueda avanzada y autenticación. Crea, organiza y publica contenido fácilmente.",
  keywords: ["gestión de artículos", "CMS", "blog", "categorías", "búsqueda"],
  openGraph: {
    title: "Gestión de Artículos | Sistema de Gestión de Contenido",
    description:
      "Sistema completo de gestión de artículos con categorías, búsqueda avanzada y autenticación.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestión de Artículos",
    description:
      "Sistema completo de gestión de artículos con categorías, búsqueda avanzada y autenticación.",
  },
};

export default async function HomePage() {
  const { userId } = await auth();
  const isAdmin = await checkIsAdmin(userId);

  console.log("Usuario ID:", userId);
  console.log("¿Es admin?:", isAdmin);

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center min-h-[70vh] flex flex-col justify-center">
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight lg:text-6xl">
            Sistema de Gestión de Artículos
          </h1>
          <p className="mb-8 text-pretty text-xl leading-relaxed text-muted-foreground">
            Crea, organiza y publica artículos con un sistema completo de
            categorías y búsqueda avanzada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/articulos">
              <Button size="lg" className="gap-2">
                Ver Artículos
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            {isAdmin && (
              <Link href="/admin/articulos">
                <Button size="lg" variant="outline">
                  Crear Artículo
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
