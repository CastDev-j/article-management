"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CustomPagination } from "@/components/custom-pagination";

interface PaginationWrapperProps {
  currentPage: number;
  totalPages: number;
  /**
   * Base path for pagination navigation
   * If not provided, uses current pathname
   * @example "/articulos", "/admin/categorias"
   */
  basePath?: string;
  /**
   * Additional query params to preserve during navigation
   * @example { q: "search", categoria: "tech" }
   */
  preserveParams?: boolean;
  className?: string;
}

export function PaginationWrapper({
  currentPage,
  totalPages,
  basePath,
  preserveParams = true,
  className = "mt-8",
}: PaginationWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(
      preserveParams ? searchParams.toString() : ""
    );
    params.set("page", page.toString());

    const targetPath = basePath || pathname;
    router.push(`${targetPath}?${params.toString()}`);
  };

  return (
    <CustomPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      className={className}
    />
  );
}
