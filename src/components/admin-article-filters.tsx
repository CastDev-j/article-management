"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

interface AdminArticleFiltersProps {
  searchQuery: string;
  publishedFilter: string;
  sortBy: string;
}

export function AdminArticleFilters({
  searchQuery,
  publishedFilter,
  sortBy,
}: AdminArticleFiltersProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState(searchQuery);

  // Sincronizar el estado local con las props cuando cambien
  useEffect(() => {
    setSearchValue(searchQuery);
  }, [searchQuery]);

  const buildFilterUrl = useCallback((newParams: Partial<{
    q?: string;
    published?: string;
    sort?: string;
  }>) => {
    const params = new URLSearchParams();
    
    // Mantener valores actuales y aplicar nuevos
    const q = newParams.q !== undefined ? newParams.q : searchQuery;
    const published = newParams.published !== undefined ? newParams.published : publishedFilter;
    const sort = newParams.sort !== undefined ? newParams.sort : sortBy;
    
    // Agregar parámetros si no están vacíos o son valores por defecto
    if (q && q.trim() !== "") params.set("q", q.trim());
    if (published !== "all") params.set("published", published);
    if (sort !== "publishedAt-desc") params.set("sort", sort);
    
    return `/admin/articulos${params.toString() ? `?${params.toString()}` : ""}`;
  }, [searchQuery, publishedFilter, sortBy]);

  const handleSearchSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("q") as string;
    router.push(buildFilterUrl({ q: searchTerm }));
  }, [router, buildFilterUrl]);

  const clearFilters = useCallback(() => {
    setSearchValue("");
    router.push("/admin/articulos");
  }, [router]);

  return (
    <div className="mb-6 rounded-lg p-4 bg-muted/30">
      {/* Búsqueda y filtros básicos */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Búsqueda */}
        <form onSubmit={handleSearchSubmit} className="flex-1">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="q"
                placeholder="Buscar por título..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">
              Buscar
            </Button>
          </div>
        </form>

        {/* Filtro por estado de publicación */}
        <Select
          value={publishedFilter}
          onValueChange={(value) => {
            router.push(buildFilterUrl({ published: value }));
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="true">Publicados</SelectItem>
            <SelectItem value="false">Borradores</SelectItem>
          </SelectContent>
        </Select>

        {/* Ordenamiento */}
        <Select
          value={sortBy}
          onValueChange={(value) => {
            router.push(buildFilterUrl({ sort: value }));
          }}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Ordenar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="publishedAt-desc">Más recientes</SelectItem>
            <SelectItem value="publishedAt-asc">Más antiguos</SelectItem>
            <SelectItem value="titulo-asc">Título A-Z</SelectItem>
            <SelectItem value="titulo-desc">Título Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Indicador de filtros activos */}
      {(searchQuery || publishedFilter !== "all" || sortBy !== "publishedAt-desc") && (
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando resultados
            {searchQuery && ` para "${searchQuery}"`}
            {publishedFilter !== "all" && ` - ${publishedFilter === "true" ? "Solo publicados" : "Solo borradores"}`}
            {sortBy !== "publishedAt-desc" && ` - ${sortBy === "publishedAt-asc" ? "Más antiguos" : sortBy === "titulo-asc" ? "A-Z" : "Z-A"}`}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
}