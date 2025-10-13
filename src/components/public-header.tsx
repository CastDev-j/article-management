import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold transition-colors hover:text-primary"
        >
          El Periódico
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Inicio
          </Link>
          <Link
            href="/todos-los-articulos"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            Todos los artículos
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <div className="flex flex-col gap-6 pt-8">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-3 text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-muted"
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/todos-los-articulos"
                    className="flex items-center gap-3 text-base font-medium transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-muted"
                  >
                    <Search className="h-4 w-4" />
                    Todos los artículos
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
