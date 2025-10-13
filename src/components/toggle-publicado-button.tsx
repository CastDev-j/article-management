"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { togglePublicado } from "@/app/actions/articulos";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function TogglePublicadoButton({
  articuloId,
  publicado,
}: {
  articuloId: string;
  publicado: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await togglePublicado(articuloId);
    } catch (error) {
      alert("Error al cambiar el estado de publicación");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : publicado ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </Button>
  );
}
