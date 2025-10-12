import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenSquare, Search, Menu, FolderOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export async function Header() {
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

          <SignedIn>
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
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" size="sm">
                Iniciar Sesión
              </Button>
            </SignInButton>
          </SignedOut>
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
                <SignedIn>
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
                  <UserButton />
                </SignedIn>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
