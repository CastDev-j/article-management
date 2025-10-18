"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Copy,
  ExternalLink,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";

interface ShareButtonProps {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: ShareButtonProps) {
  const [open, setOpen] = useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({ title, text: title, url: shareUrl });
      } catch (err) {
        console.error("Share failed", err);
      }
      return;
    }

    // Fallback: toggle local menu with social links + copy
    setOpen((s) => !s);
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const el = document.createElement("textarea");
        el.value = shareUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      // Small feedback
      setOpen(false);
      alert("URL copiada al portapapeles");
    } catch (err) {
      console.error("No se pudo copiar la URL", err);
      alert("No se pudo copiar la URL en tu navegador.");
    }
  };

  const encoded = (s: string) => encodeURIComponent(s);

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        onClick={handleShare}
        className="flex items-center"
      >
        <Share2 className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Compartir</span>
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-2 shadow-md z-50">
          <div className="flex flex-col gap-2">
            <a
              className="flex items-center px-2 py-1 rounded hover:bg-accent"
              href={`https://twitter.com/intent/tweet?text=${encoded(
                title
              )}&url=${encoded(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </a>
            <a
              className="flex items-center px-2 py-1 rounded hover:bg-accent"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encoded(
                shareUrl
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </a>
            <a
              className="flex items-center px-2 py-1 rounded hover:bg-accent"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded(
                shareUrl
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
            <button
              type="button"
              onClick={copyToClipboard}
              className="flex items-center px-2 py-1 rounded hover:bg-accent text-left"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar enlace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
