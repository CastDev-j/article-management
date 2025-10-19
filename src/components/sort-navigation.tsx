"use client";

import { useRouter } from "next/navigation";
import { SortSelect } from "./sort-select";

interface SortNavigationProps {
  value: string;
  categorySlugs: string[];
  searchQuery: string;
}

export function SortNavigation({ 
  value, 
  categorySlugs, 
  searchQuery 
}: SortNavigationProps) {
  const router = useRouter();

  const buildFilterUrl = (newCategories: string[], newSearch?: string, newSort?: string) => {
    const params = new URLSearchParams();
    if (newCategories.length > 0) {
      params.set("categorias", newCategories.join(","));
    }
    if (newSearch !== undefined ? newSearch : searchQuery) {
      params.set("q", newSearch !== undefined ? newSearch : searchQuery);
    }
    if (newSort !== undefined ? newSort : value) {
      params.set("sort", newSort !== undefined ? newSort : value);
    }
    return `/todos-los-articulos${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  };

  const handleSortChange = (newSort: string) => {
    const url = buildFilterUrl(categorySlugs, searchQuery, newSort);
    router.push(url);
  };

  return (
    <SortSelect value={value} onValueChange={handleSortChange} />
  );
}
