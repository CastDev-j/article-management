import { checkIsAdmin } from "@/app/actions/auth";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export async function Footer() {
  const { userId } = await auth();
  const isAdmin = await checkIsAdmin(userId);

  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Gestión de Artículos</h3>
            <div>
              <p className="text-pretty text-sm text-muted-foreground mb-3">
                Sistema completo de gestión de artículos con categorías y
                búsqueda avanzada.
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/articulos"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Artículos
                </Link>
              </li>
              <li>
                <Link
                  href="/categorias"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Categorías
                </Link>
              </li>
              <li>
                <Link
                  href="/buscar"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Buscar
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Administración</h4>
            <ul className="space-y-2 text-sm">
              {isAdmin ? (
                <>
                  <li>
                    <Link
                      href="/admin/articulos"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Artículos del sitio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/articulos/nuevo"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Crear Artículo
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <span className="text-muted-foreground">
                    Inicia sesión para acceder a la administración
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">
                  © 2025 Gestión de Artículos
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
