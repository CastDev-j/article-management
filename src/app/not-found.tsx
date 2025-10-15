import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, Newspaper } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-muted p-6">
            <FileQuestion className="h-16 w-16 text-muted-foreground" />
          </div>
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Página no encontrada</h2>

        <p className="mb-8 text-pretty text-lg text-muted-foreground">
          Lo sentimos, la página que buscas no existe o ha sido movida. Verifica
          la URL o regresa a una página conocida.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button size="lg">
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
          <Link href="/todos-los-articulos">
            <Button variant="outline" size="lg">
              <Newspaper className="mr-2 h-4 w-4" />
              Ver artículos
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
