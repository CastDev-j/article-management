import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import { AdminHeader } from "@/components/admin-header";

export default function NotFound() {
  return (
    <>
      <AdminHeader />
      <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <FileQuestion className="mb-6 h-24 w-24 text-muted-foreground" />
        <h1 className="mb-4 text-4xl font-bold">Página no encontrada</h1>
        <p className="mb-8 text-muted-foreground">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button>Volver al inicio</Button>
          </Link>
          <Link href="/articulos">
            <Button variant="outline">Ver artículos</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
