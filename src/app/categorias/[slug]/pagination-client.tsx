"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { CustomPagination } from "@/components/custom-pagination";

interface CategoriaSlugPaginationClientProps {
  totalPages: number;
  currentPage: number;
}

export function CategoriaSlugPaginationClient({
  totalPages,
  currentPage,
}: CategoriaSlugPaginationClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <CustomPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      className="mt-8"
    />
  );
}
