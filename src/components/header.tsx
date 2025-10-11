import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenSquare, Search, Menu, LogOut, FolderOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/app/actions/auth";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold transition-colors hover:text-primary"
        >
          El Periódico
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Inicio
          </Link>
          <Link
            href="/buscar"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            <Search className="h-4 w-4" />
          </Link>

          {user ? (
            <>
              <Link
                href="/admin/articulos"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <PenSquare className="mr-1 inline h-4 w-4" />
                Artículos
              </Link>
              <Link
                href="/admin/categorias"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                <FolderOpen className="mr-1 inline h-4 w-4" />
                Categorías
              </Link>
              <form action={logout}>
                <Button variant="ghost" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Salir
                </Button>
              </form>
            </>
          ) : (
            <>
              <SignedOut>
                <SignInButton>
                  <Button variant="outline" size="sm">
                    Iniciar Sesión
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-4 pt-8">
                <Link
                  href="/"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Inicio
                </Link>
                <Link
                  href="/buscar"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  Buscar
                </Link>
                {user ? (
                  <>
                    <Link
                      href="/admin/articulos"
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      Mis Artículos
                    </Link>
                    <Link
                      href="/admin/categorias"
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      Categorías
                    </Link>
                    <form action={logout}>
                      <Button variant="ghost" className="w-full justify-start">
                        <LogOut className="mr-2 h-4 w-4" />
                        Salir
                      </Button>
                    </form>
                  </>
                ) : (
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-transparent">
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
