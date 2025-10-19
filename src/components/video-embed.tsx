/**
 * Componente para renderizar videos embebidos de YouTube y Facebook
 */

import React, { useState } from 'react';
import { parseVideoUrl } from '@/lib/video-utils';
import { ExternalLink, Play, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoEmbedProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
}

export function VideoEmbed({ 
  src, 
  title = "Video",
  width = 560,
  height = 315
}: VideoEmbedProps) {
  const [loadError, setLoadError] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const videoInfo = parseVideoUrl(src);
  
  // Facebook videos son más restrictivos, mostrar enlace directo por defecto
  const isFacebook = videoInfo.platform === 'facebook';
  const shouldShowDirectLink = isFacebook;
  
  if (!videoInfo.embedUrl) {
    return (
      <div className="my-8 p-4 bg-muted/50 border-2 border-dashed border-border rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          Video no soportado o URL inválida: <br />
          <code className="text-xs">{src}</code>
        </p>
      </div>
    );
  }

  const aspectRatio = (height / width) * 100;

  // Mostrar botón de carga inicial, enlace directo para Facebook, o si hay error
  if (!showIframe || loadError || shouldShowDirectLink) {
    return (
      <figure className="my-8 max-w-full">
        <div 
          className="relative w-full overflow-hidden rounded-lg border-2 border-border bg-muted flex items-center justify-center"
          style={{ paddingBottom: `${aspectRatio}%` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4">
            {loadError ? (
              <>
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground mb-2">
                    No se pudo cargar el video embebido
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Puede deberse a restricciones del navegador o la plataforma
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a 
                      href={src} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver en {videoInfo.platform === 'youtube' ? 'YouTube' : 'Facebook'}
                    </a>
                  </Button>
                </div>
              </>
            ) : shouldShowDirectLink ? (
              <>
                <Play className="h-12 w-12 text-primary" fill="currentColor" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground mb-2">
                    {title || 'Video de Facebook'}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Los videos de Facebook requieren abrir el enlace original
                  </p>
                  <Button asChild size="sm">
                    <a 
                      href={src} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver en Facebook
                    </a>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <Play className="h-16 w-16 text-primary" fill="currentColor" />
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground mb-2">
                    {title || 'Video'}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Plataforma: {videoInfo.platform === 'youtube' ? 'YouTube' : 'Facebook'}
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={() => setShowIframe(true)}
                      size="sm"
                      className="inline-flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Cargar Video
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href={src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Ver en {videoInfo.platform === 'youtube' ? 'YouTube' : 'Facebook'}
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        {title && (
          <figcaption className="mt-2 text-center font-sans text-sm italic text-muted-foreground break-words">
            {title}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-8 max-w-full">
      <div 
        className="relative w-full overflow-hidden rounded-lg border-2 border-border bg-muted"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        <iframe
          src={videoInfo.embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onError={() => setLoadError(true)}
          onLoad={() => setLoadError(false)}
        />
      </div>
      {title && (
        <figcaption className="mt-2 text-center font-sans text-sm italic text-muted-foreground break-words">
          {title}
        </figcaption>
      )}
    </figure>
  );
}

// Componente para usar con ReactMarkdown
export function MarkdownVideo({ node, ...props }: any) {
  const { src, alt, title } = props;
  
  // Debug: Imprimir información recibida
  console.log('MarkdownVideo props:', { src, alt, title, props });
  
  // Solo procesar si es un enlace de video
  const videoInfo = parseVideoUrl(src || '');
  console.log('Video info:', videoInfo);
  
  if (videoInfo.platform === 'unknown') {
    // Renderizar como imagen normal si no es un video
    return (
      <span className="my-8 block max-w-full">
        <img
          {...props}
          className="w-full max-w-full h-auto rounded-lg border-2 border-border"
          loading="lazy"
        />
        {alt && (
          <span className="mt-2 block text-center font-sans text-sm italic text-muted-foreground break-words">
            {alt}
          </span>
        )}
      </span>
    );
  }
  
  // Mostrar información de debug si es un video detectado
  return (
    <div className="my-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
      <p className="text-sm font-bold text-blue-800 mb-2">🎥 VIDEO DETECTADO</p>
      <p className="text-xs text-blue-600">Plataforma: {videoInfo.platform}</p>
      <p className="text-xs text-blue-600">ID: {videoInfo.videoId}</p>
      <p className="text-xs text-blue-600 mb-3">URL: {src}</p>
      <VideoEmbed src={src} title={alt || title} />
    </div>
  );
}