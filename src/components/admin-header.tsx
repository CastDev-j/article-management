import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenSquare, Search, Menu, FolderOpen, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { checkIsAdmin } from "@/app/actions/auth";

export async function AdminHeader() {
  const { userId } = await auth();
  const isAdmin = await checkIsAdmin(userId);
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
            {isAdmin && (
              <>
                <Link
                  href="/admin/articulos"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <PenSquare className="mr-1 inline h-4 w-4" />
                  Artículos del sitio
                </Link>
                <Link
                  href="/admin/categorias"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <FolderOpen className="mr-1 inline h-4 w-4" />
                  Categorías
                </Link>
              </>
            )}
            <UserButton
              fallback={<div className="w-8 h-8 bg-gray-300 rounded-full" />}
            />
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
            <SheetContent className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 pt-6">
                <nav className="flex flex-col gap-6">
                  <Link
                    href="/"
                    className="text-lg font-medium transition-colors hover:text-primary px-4"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/buscar"
                    className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-primary px-4"
                  >
                    <Search className="h-5 w-5" />
                    Buscar
                  </Link>
                  {isAdmin && (
                    <SignedIn>
                      <Link
                        href="/admin/articulos"
                        className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-primary px-4"
                      >
                        <PenSquare className="h-5 w-5" />
                        Artículos del sitio
                      </Link>
                      <Link
                        href="/admin/categorias"
                        className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-primary px-4"
                      >
                        <FolderOpen className="h-5 w-5" />
                        Categorías
                      </Link>
                    </SignedIn>
                  )}
                </nav>

                <div className="border-t pt-6 mx-4">
                  <SignedIn>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <UserButton
                          fallback={
                            <div className="w-8 h-8 bg-gray-300 rounded-full" />
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          Mi cuenta
                        </span>
                      </div>
                      <SignOutButton>
                        <Button variant="outline" className="w-full gap-2">
                          <LogOut className="h-4 w-4" />
                          Cerrar Sesión
                        </Button>
                      </SignOutButton>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton>
                      <Button className="w-full">Iniciar Sesión</Button>
                    </SignInButton>
                  </SignedOut>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
