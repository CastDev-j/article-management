"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { deleteArticle } from "@/app/actions/articulos";
import { Trash2, Loader2 } from "lucide-react";

export function DeleteButton({ articleId }: { articleId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("¿Estás seguro de que quieres eliminar este artículo?")) {
      return;
    }

    setLoading(true);
    try {
      await deleteArticle(articleId);
    } catch (error) {
      alert("Error al eliminar el artículo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
