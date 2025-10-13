import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenSquare, FolderOpen, Menu, LogOut, Home } from "lucide-react";
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
          href="/admin"
          className="font-serif text-xl font-semibold transition-colors hover:text-primary"
        >
          Panel de Administración
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            Ver sitio
          </Link>
          {isAdmin && (
            <>
              <Link
                href="/admin"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
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
            </>
          )}

          <SignedIn>
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
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 pt-8 px-4">
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="flex items-center gap-3 text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-muted"
                  >
                    <Home className="h-4 w-4" />
                    Ver sitio
                  </Link>
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin"
                        className="text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-muted"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/admin/articulos"
                        className="flex items-center gap-3 text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-muted"
                      >
                        <PenSquare className="h-4 w-4" />
                        Artículos
                      </Link>
                      <Link
                        href="/admin/categorias"
                        className="flex items-center gap-3 text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-muted"
                      >
                        <FolderOpen className="h-4 w-4" />
                        Categorías
                      </Link>
                    </>
                  )}
                </nav>

                <div className="border-t pt-4">
                  <SignedIn>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 px-2">
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
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          size="sm"
                        >
                          <LogOut className="h-4 w-4" />
                          Cerrar Sesión
                        </Button>
                      </SignOutButton>
                    </div>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton>
                      <Button className="w-full" size="sm">
                        Iniciar Sesión
                      </Button>
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
