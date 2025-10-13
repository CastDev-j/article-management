"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { togglePublished } from "@/app/actions/articulos";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function TogglePublishedButton({
  articleId,
  published,
}: {
  articleId: string;
  published: boolean;
}) {
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await togglePublished(articleId);
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
      ) : published ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </Button>
  );
}
