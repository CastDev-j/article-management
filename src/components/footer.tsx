import { checkIsAdmin } from "@/app/actions/auth";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export async function Footer() {
  let userId: string | null = null;
  let isAdmin = false;

  try {
    const authResult = await auth();
    userId = authResult.userId;
    if (userId) {
      isAdmin = await checkIsAdmin(userId);
    }
  } catch (error) {
    console.log("Auth not available in this context");
  }

  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-semibold">
              Gestión de Artículos
            </h3>
            <div>
              <p className="text-pretty text-xs md:text-sm text-muted-foreground mb-3">
                Plataforma para gestionar y consultar artículos de manera
                eficiente, proporcionando acceso rápido a la información
                relevante.
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-3 md:mb-4 text-sm font-semibold">Navegación</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/todos-los-articulos"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Todos los Artículos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 md:mb-4 text-sm font-semibold">
              Administración
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {isAdmin ? (
                <>
                  <li>
                    <Link
                      href="/admin"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/articulos"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Gestionar Artículos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/categorias"
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Gestionar Categorías
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/admin" className="text-muted-foreground">
                    Inicia sesión para acceder a la administración
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 md:mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <span className="text-muted-foreground">
                  © 2025 Gestión de Artículos
                </span>
              </li>
            </ul>
          </div>
        </div>

        {userId && !isAdmin && (
          <div className="mt-6 md:mt-8 border-t pt-4 md:pt-6 text-center">
            <p className="text-xs md:text-sm text-muted-foreground">
              ¿Necesitas acceso de administrador?{" "}
              <span className="font-medium text-foreground">
                Contacta con los administradores del sitio.
              </span>
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
