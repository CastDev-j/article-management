"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Image as ImageIcon,
  Minus,
  Quote,
  Bold,
  Italic,
  Link,
  Loader2,
  Upload,
  Play,
  Sparkles,
} from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { Copy, Scissors, Clipboard } from "lucide-react";
import { uploadImageToImageKit } from "@/lib/imagekit";
import { isValidVideoUrl } from "@/lib/video-utils";
import { geminiAI } from "@/lib/gemini-ai";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  name?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  rows = 20,
  name = "contenido",
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAltText, setImageAltText] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isFormattingWithAI, setIsFormattingWithAI] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setSelection({
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    });
  };

  const handleTextareaSelect = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      setSelection({
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
      });
    }
  };

  const executeCommand = useCallback(
    (prefix: string, suffix: string = "", defaultText: string = "") => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = selection.start;
      const end = selection.end;
      const selectedText = value.substring(start, end);
      const replacement = selectedText || defaultText;

      const before = value.substring(0, start);
      const after = value.substring(end);
      const newValue = before + prefix + replacement + suffix + after;

      onChange(newValue);

      setTimeout(() => {
        textarea.focus();
        const newStart = start + prefix.length;
        const newEnd = newStart + replacement.length;
        textarea.setSelectionRange(newStart, newEnd);
        setSelection({ start: newStart, end: newEnd });
      }, 0);
    },
    [value, selection, onChange]
  );

  const insertText = useCallback(
    (text: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = selection.start;
      const before = value.substring(0, start);
      const after = value.substring(selection.end);
      const newValue = before + text + after;

      onChange(newValue);

      setTimeout(() => {
        textarea.focus();
        const newPos = start + text.length;
        textarea.setSelectionRange(newPos, newPos);
        setSelection({ start: newPos, end: newPos });
      }, 0);
    },
    [value, selection, onChange]
  );

  const handleImageInsert = () => {
    setShowImageDialog(true);
  };

  const handleVideoInsert = () => {
    setShowVideoDialog(true);
  };

  const insertImageMarkdown = (url: string, altText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = selection.start;
    const imageMarkdown = `![${altText}](${url})`;
    const before = value.substring(0, start);
    const after = value.substring(start);
    const newValue = before + imageMarkdown + after;

    onChange(newValue);

    setShowImageDialog(false);
    setImageUrl("");
    setImageAltText("");

    setTimeout(() => {
      textarea.focus();
      const newPos = start + imageMarkdown.length;
      textarea.setSelectionRange(newPos, newPos);
      setSelection({ start: newPos, end: newPos });
    }, 0);
  };

  const insertVideoMarkdown = (url: string, title: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = selection.start;
    const videoMarkdown = `![${title}](${url})`;
    const before = value.substring(0, start);
    const after = value.substring(start);
    const newValue = before + videoMarkdown + after;

    onChange(newValue);

    setShowVideoDialog(false);
    setVideoUrl("");
    setVideoTitle("");

    setTimeout(() => {
      textarea.focus();
      const newPos = start + videoMarkdown.length;
      textarea.setSelectionRange(newPos, newPos);
      setSelection({ start: newPos, end: newPos });
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor, selecciona un archivo de imagen válido");
      return;
    }

    try {
      setUploadingImage(true);

      if (typeof uploadImageToImageKit !== "function") {
        throw new Error("uploadImageToImageKit no está disponible");
      }

      const url = await uploadImageToImageKit(file);
      insertImageMarkdown(url, imageAltText);
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Error al subir la imagen. Por favor, intenta de nuevo."
      );
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const copySelection = async () => {
    try {
      const textarea = textareaRef.current;
      const start = textarea ? textarea.selectionStart : selection.start;
      const end = textarea ? textarea.selectionEnd : selection.end;
      const text = value.substring(start, end);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    } catch (err) {
      console.error("Error copiando al portapapeles", err);
    }
  };

  const cutSelection = async () => {
    try {
      const textarea = textareaRef.current;
      const start = textarea ? textarea.selectionStart : selection.start;
      const end = textarea ? textarea.selectionEnd : selection.end;

      await copySelection();
      const before = value.substring(0, start);
      const after = value.substring(end);
      const newValue = before + after;
      onChange(newValue);

      setTimeout(() => {
        if (!textarea) return;
        textarea.focus();
        textarea.setSelectionRange(start, start);
        setSelection({ start, end: start });
      }, 0);
    } catch (err) {
      console.error("Error al cortar", err);
    }
  };

  const pasteAtCursor = async () => {
    try {
      let pasteText = "";
      if (navigator.clipboard && navigator.clipboard.readText) {
        pasteText = await navigator.clipboard.readText();
      } else {
        alert("Tu navegador no soporta lectura del portapapeles desde la web.");
        return;
      }

      insertText(pasteText);
    } catch (err) {
      console.error("Error al pegar", err);
      alert(
        "No se pudo pegar desde el portapapeles. Asegura permisos y vuelve a intentar."
      );
    }
  };

  const handleFormatWithAI = async () => {
    if (!value.trim()) {
      alert("No hay contenido para formatear");
      return;
    }

    if (!geminiAI.isConfigured()) {
      alert(
        "La IA no está configurada. Verifica que la variable GEMINI_API_KEY esté disponible."
      );
      return;
    }

    setIsFormattingWithAI(true);

    try {
      const result = await geminiAI.formatContent(value);

      if (result.success) {
        onChange("" + result.formattedContent + " ");

        setTimeout(() => {
          const textarea = textareaRef.current;
          const hiddenInput = document.querySelector(
            `input[name="${name}"]`
          ) as HTMLInputElement;

          if (textarea) {
            textarea.focus();
            const event = new Event("input", { bubbles: true });
            textarea.dispatchEvent(event);
            const changeEvent = new Event("change", { bubbles: true });
            textarea.dispatchEvent(changeEvent);
          }

          if (hiddenInput) {
            const hiddenEvent = new Event("change", { bubbles: true });
            hiddenInput.dispatchEvent(hiddenEvent);
          }
        }, 100);
      } else {
        alert(result.error || "Error al formatear con IA");
      }
    } catch (error) {
      console.error("Error formatting with AI:", error);
      alert("Error inesperado al formatear con IA");
    } finally {
      setIsFormattingWithAI(false);
    }
  };

  const toolbarButtons = [
    {
      icon: Heading1,
      label: "Título H1",
      action: () => insertText("\n# "),
      group: "heading",
    },
    {
      icon: Heading2,
      label: "Título H2",
      action: () => insertText("\n## "),
      group: "heading",
    },
    {
      icon: Heading3,
      label: "Título H3",
      action: () => insertText("\n### "),
      group: "heading",
    },
    {
      icon: Bold,
      label: "Negrita",
      action: () => executeCommand("**", "**", "texto en negrita"),
      group: "format",
    },
    {
      icon: Italic,
      label: "Cursiva",
      action: () => executeCommand("*", "*", "texto en cursiva"),
      group: "format",
    },
    {
      icon: Link,
      label: "Enlace",
      action: () => executeCommand("[", "](url)", "texto del enlace"),
      group: "insert",
    },
    {
      icon: List,
      label: "Lista",
      action: () => insertText("\n- "),
      group: "insert",
    },
    {
      icon: ListOrdered,
      label: "Lista numerada",
      action: () => insertText("\n1. "),
      group: "insert",
    },
    {
      icon: Quote,
      label: "Cita",
      action: () => insertText("\n> "),
      group: "insert",
    },
    {
      icon: ImageIcon,
      label: "Imagen",
      action: handleImageInsert,
      group: "insert",
    },
    {
      icon: Play,
      label: "Video",
      action: handleVideoInsert,
      group: "insert",
    },
    {
      icon: Minus,
      label: "Separador",
      action: () => insertText("\n\n---\n\n"),
      group: "insert",
    },
    {
      icon: Sparkles,
      label: "Formatear con IA",
      action: handleFormatWithAI,
      group: "ai",
      disabled: isFormattingWithAI,
    },
  ];

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-1 rounded-md border border-input bg-muted/30 p-2">
        {toolbarButtons.map((button, index) => {
          const isNewGroup =
            index > 0 && button.group !== toolbarButtons[index - 1].group;
          return (
            <div key={index} className="flex items-center">
              {isNewGroup && <div className="mx-1 h-6 w-px bg-border" />}
              <Button
                type="button"
                variant={button.group === "ai" ? "outline" : "ghost"}
                size="sm"
                onClick={button.action}
                title={button.label}
                disabled={button.disabled || isFormattingWithAI}
                className={`h-8 ${
                  button.group === "ai" ? "px-3" : "w-8 p-0"
                } hover:bg-accent hover:text-accent-foreground ${
                  isFormattingWithAI && button.group !== "ai"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {button.disabled && button.group === "ai" ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    <span className="text-xs">Formateando...</span>
                  </>
                ) : (
                  <>
                    <button.icon className="h-4 w-4" />
                    {button.group === "ai" && !button.disabled && (
                      <span className="ml-1 text-xs">Formatear con IA</span>
                    )}
                  </>
                )}
              </Button>
            </div>
          );
        })}
      </div>
      <ContextMenu>
        <ContextMenuTrigger disabled={isMobile || isFormattingWithAI}>
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextareaChange}
            onSelect={handleTextareaSelect}
            placeholder={placeholder}
            rows={rows}
            disabled={isFormattingWithAI}
            className={`font-mono text-sm resize-none ${
              isFormattingWithAI ? "opacity-60 cursor-not-allowed" : ""
            }`}
            style={{
              tabSize: 2,
              lineHeight: 1.6,
            }}
          />
        </ContextMenuTrigger>
        {!isMobile && (
          <ContextMenuContent className="w-56">
            {/* Clipboard actions */}
            <ContextMenuItem
              onClick={copySelection}
              disabled={isFormattingWithAI}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copiar
            </ContextMenuItem>
            <ContextMenuItem
              onClick={cutSelection}
              disabled={isFormattingWithAI}
            >
              <Scissors className="mr-2 h-4 w-4" />
              Cortar
            </ContextMenuItem>
            <ContextMenuItem
              onClick={pasteAtCursor}
              disabled={isFormattingWithAI}
            >
              <Clipboard className="mr-2 h-4 w-4" />
              Pegar
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuSub>
              <ContextMenuSubTrigger disabled={isFormattingWithAI}>
                Encabezados
              </ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem
                  onClick={toolbarButtons[0].action}
                  disabled={isFormattingWithAI}
                >
                  <Heading1 className="mr-2 h-4 w-4" />
                  Título H1
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={toolbarButtons[1].action}
                  disabled={isFormattingWithAI}
                >
                  <Heading2 className="mr-2 h-4 w-4" />
                  Título H2
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={toolbarButtons[2].action}
                  disabled={isFormattingWithAI}
                >
                  <Heading3 className="mr-2 h-4 w-4" />
                  Título H3
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={toolbarButtons[3].action}
              disabled={isFormattingWithAI}
            >
              <Bold className="mr-2 h-4 w-4" />
              Negrita
            </ContextMenuItem>
            <ContextMenuItem
              onClick={toolbarButtons[4].action}
              disabled={isFormattingWithAI}
            >
              <Italic className="mr-2 h-4 w-4" />
              Cursiva
            </ContextMenuItem>
            {/*<ContextMenuSeparator />
             <ContextMenuSub>
              <ContextMenuSubTrigger>Multimedia</ContextMenuSubTrigger>
              <ContextMenuSubContent className="w-44">
                <ContextMenuItem onClick={toolbarButtons[9].action}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Imagen
                </ContextMenuItem>
                <ContextMenuItem onClick={toolbarButtons[10].action}>
                  <Play className="mr-2 h-4 w-4" />
                  Video
                </ContextMenuItem>
              </ContextMenuSubContent>
            </ContextMenuSub> */}
            <ContextMenuItem
              onClick={toolbarButtons[5].action}
              disabled={isFormattingWithAI}
            >
              <Link className="mr-2 h-4 w-4" />
              Enlace
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={toolbarButtons[6].action}
              disabled={isFormattingWithAI}
            >
              <List className="mr-2 h-4 w-4" />
              Lista
            </ContextMenuItem>
            <ContextMenuItem
              onClick={toolbarButtons[7].action}
              disabled={isFormattingWithAI}
            >
              <ListOrdered className="mr-2 h-4 w-4" />
              Lista numerada
            </ContextMenuItem>
            <ContextMenuItem
              onClick={toolbarButtons[8].action}
              disabled={isFormattingWithAI}
            >
              <Quote className="mr-2 h-4 w-4" />
              Cita
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={toolbarButtons[11].action}
              disabled={isFormattingWithAI}
            >
              <Minus className="mr-2 h-4 w-4" />
              Separador
            </ContextMenuItem>
          </ContextMenuContent>
        )}
      </ContextMenu>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insertar Imagen</DialogTitle>
            <DialogDescription>
              Sube una imagen desde tu dispositivo o ingresa una URL
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-alt-text">
                Texto Alternativo (Descripción)
              </Label>
              <Input
                id="image-alt-text"
                type="text"
                placeholder="Descripción de la imagen"
                value={imageAltText}
                onChange={(e) => setImageAltText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Subir Imagen</Label>
              <div className="flex gap-2">
                <input
                  type="file"
                  id="markdown-image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("markdown-image-upload")?.click()
                  }
                  disabled={uploadingImage}
                  className="w-full"
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Seleccionar Imagen
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image-url">URL de Imagen</Label>
              <Input
                id="image-url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && imageUrl.trim()) {
                    e.preventDefault();
                    insertImageMarkdown(imageUrl, imageAltText);
                  }
                }}
              />
            </div>
            <Button
              type="button"
              onClick={() =>
                imageUrl.trim() && insertImageMarkdown(imageUrl, imageAltText)
              }
              disabled={!imageUrl.trim()}
              className="w-full"
            >
              Insertar URL
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insertar Video</DialogTitle>
            <DialogDescription>
              Ingresa una URL de YouTube para insertar un video
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="video-title">
                Título del Video (Descripción)
              </Label>
              <Input
                id="video-title"
                type="text"
                placeholder="Descripción del video"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video-url">URL del Video</Label>
              <Input
                id="video-url"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && videoUrl.trim()) {
                    e.preventDefault();
                    if (isValidVideoUrl(videoUrl)) {
                      insertVideoMarkdown(videoUrl, videoTitle);
                    } else {
                      alert("Por favor, ingresa una URL válida de YouTube");
                    }
                  }
                }}
              />
              {videoUrl && !isValidVideoUrl(videoUrl) && (
                <p className="text-sm text-destructive">
                  URL no válida. Soportamos YouTube.
                </p>
              )}
            </div>
            <Button
              type="button"
              onClick={() => {
                if (videoUrl.trim() && isValidVideoUrl(videoUrl)) {
                  insertVideoMarkdown(videoUrl, videoTitle);
                } else {
                  alert("Por favor, ingresa una URL válida de YouTube");
                }
              }}
              disabled={!videoUrl.trim() || !isValidVideoUrl(videoUrl)}
              className="w-full"
            >
              Insertar Video
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
