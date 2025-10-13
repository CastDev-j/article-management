"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface CategoryBadgeProps {
  slug: string;
  nombre: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function CategoryBadge({
  slug,
  nombre,
  variant = "secondary",
  className = "",
}: CategoryBadgeProps) {
  return (
    <Link
      href={`/todos-los-articulos?categorias=${slug}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Badge
        variant={variant}
        className={`cursor-pointer hover:bg-secondary/80 transition-colors ${className}`}
      >
        {nombre}
      </Badge>
    </Link>
  );
}
