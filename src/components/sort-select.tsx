"use client";

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SortSelect({ value, onValueChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="publishedAt-desc">Más recientes</SelectItem>
          <SelectItem value="publishedAt-asc">Más antiguos</SelectItem>
          <SelectItem value="createdAt-desc">Creados recientemente</SelectItem>
          <SelectItem value="createdAt-asc">Creados hace tiempo</SelectItem>
          <SelectItem value="updatedAt-desc">Actualizados recientemente</SelectItem>
          <SelectItem value="updatedAt-asc">Actualizados hace tiempo</SelectItem>
          <SelectItem value="titulo-asc">Título A-Z</SelectItem>
          <SelectItem value="titulo-desc">Título Z-A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}