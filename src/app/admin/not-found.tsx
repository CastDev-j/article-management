import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileQuestion,
  LayoutDashboard,
  Newspaper,
  FolderOpen,
} from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto flex min-h-[500px] max-w-2xl flex-col items-center justify-center text-center">
        <div className="mb-8 rounded-full bg-muted p-6">
          <FileQuestion className="h-16 w-16 text-muted-foreground" />
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight">404</h1>
        <h2 className="mb-4 text-2xl font-semibold">Página no encontrada</h2>

        <p className="mb-8 max-w-md text-pretty text-lg text-muted-foreground">
          La página del panel de administración que buscas no existe. Verifica
          la URL o navega a una sección conocida.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/admin">
            <Button size="lg">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Panel de Admin
            </Button>
          </Link>
          <Link href="/admin/articulos">
            <Button variant="outline" size="lg">
              <Newspaper className="mr-2 h-4 w-4" />
              Artículos
            </Button>
          </Link>
          <Link href="/admin/categorias">
            <Button variant="outline" size="lg">
              <FolderOpen className="mr-2 h-4 w-4" />
              Categorías
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
