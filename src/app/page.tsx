import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ArrowRight, BookOpen, FolderOpen, Search, Sparkles } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gestión de Artículos | Sistema de Gestión de Contenido",
  description:
    "Sistema completo de gestión de artículos con categorías, búsqueda avanzada y autenticación. Crea, organiza y publica contenido fácilmente.",
  keywords: ["gestión de artículos", "CMS", "blog", "categorías", "búsqueda"],
  openGraph: {
    title: "Gestión de Artículos | Sistema de Gestión de Contenido",
    description: "Sistema completo de gestión de artículos con categorías, búsqueda avanzada y autenticación.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestión de Artículos",
    description: "Sistema completo de gestión de artículos con categorías, búsqueda avanzada y autenticación.",
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4" />
            <span>Sistema completo de gestión de contenido</span>
          </div>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight lg:text-6xl">
            Sistema de Gestión de Artículos
          </h1>
          <p className="mb-8 text-pretty text-xl leading-relaxed text-muted-foreground">
            Crea, organiza y publica artículos con un sistema completo de categorías y búsqueda avanzada.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/articulos">
              <Button size="lg" className="gap-2">
                Ver Artículos
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/admin/articulos">
              <Button size="lg" variant="outline">
                Crear Artículo
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-24 grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Gestión Completa</h3>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Crea, edita y elimina artículos con un editor completo y control de publicación.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <FolderOpen className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Categorías</h3>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Organiza tus artículos con categorías personalizadas y navegación intuitiva.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 text-center transition-shadow hover:shadow-lg">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Search className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Búsqueda Avanzada</h3>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Encuentra artículos rápidamente con búsqueda por texto y filtros por categoría.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
