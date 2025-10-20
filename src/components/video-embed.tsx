"use client";

import React, { useState } from "react";
import { parseVideoUrl } from "@/lib/video-utils";
import { ExternalLink, Play, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  height = 315,
}: VideoEmbedProps) {
  const [loadError, setLoadError] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const videoInfo = parseVideoUrl(src);

  const aspectRatio = (height / width) * 100;

  const VideoContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="my-4 sm:my-6 w-full max-w-4xl mx-auto">
      <div
        className="relative w-full overflow-hidden rounded-sm border border-stone-300 bg-stone-100 shadow-sm"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        {children}
      </div>
      {title && (
        <div className="mt-2 px-2 text-center text-xs sm:text-sm text-stone-600">
          {title}
        </div>
      )}
    </div>
  );

  // Solo soportamos YouTube
  if (!videoInfo.embedUrl || videoInfo.platform !== "youtube") {
    return (
      <div className="my-4 sm:my-6 w-full max-w-4xl mx-auto">
        <div className="p-4 sm:p-6 bg-stone-50 border border-stone-300 rounded-sm text-center">
          <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-stone-400 mx-auto mb-3" />
          <p className="text-xs sm:text-sm font-medium text-stone-900 mb-2">
            Solo soportamos videos de YouTube
          </p>
          <code className="text-xs text-stone-600 bg-white px-2 sm:px-3 py-1 rounded border border-stone-200 break-all">
            {src}
          </code>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <VideoContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 p-3 sm:p-6 bg-stone-50">
          <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-stone-400" />
          <div className="text-center max-w-xs sm:max-w-md px-2">
            <p className="text-xs sm:text-sm font-medium text-stone-900 mb-2">
              No se pudo cargar el video
            </p>
            <p className="text-xs text-stone-600 mb-3 sm:mb-4">
              El video no está disponible debido a restricciones de privacidad o
              no existe
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm"
            >
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-2"
              >
                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                Abrir en YouTube
              </a>
            </Button>
          </div>
        </div>
      </VideoContainer>
    );
  }

  if (!showIframe) {
    return (
      <VideoContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 p-3 sm:p-6 bg-stone-50">
          <div
            className="p-3 sm:p-4 rounded-full bg-stone-200 hover:bg-stone-300 transition-colors cursor-pointer touch-manipulation active:bg-stone-400"
            onClick={() => setShowIframe(true)}
          >
            <Play
              className="h-10 w-10 sm:h-12 sm:w-12 text-stone-900"
              fill="currentColor"
            />
          </div>
          <div className="text-center px-2">
            <div className="flex flex-col gap-2 justify-center items-center">
              <Button
                onClick={() => setShowIframe(true)}
                size="sm"
                className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm min-h-[36px] px-3 sm:px-4 w-full sm:w-auto touch-manipulation"
              >
                <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                Cargar Video
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm w-full sm:w-auto"
              >
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 sm:gap-2 min-h-[36px] px-3 sm:px-4 touch-manipulation"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  Ver en YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </VideoContainer>
    );
  }

  return (
    <VideoContainer>
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
    </VideoContainer>
  );
}

export function MarkdownVideo({ node, ...props }: any) {
  const { src, alt, title } = props;
  const videoInfo = parseVideoUrl(src || "");

  if (videoInfo.platform === "unknown") {
    return (
      <>
        <img
          {...props}
          className="w-full h-auto rounded-sm border border-stone-300"
          loading="lazy"
          style={{ display: "block", margin: "1.5rem 0" }}
        />
        {alt && (
          <span
            className="block text-center text-sm text-stone-600"
            style={{ marginTop: "-1rem", marginBottom: "1.5rem" }}
          >
            <em>{alt}</em>
          </span>
        )}
      </>
    );
  }

  return <VideoEmbedInline src={src} title={alt || title} />;
}

function VideoEmbedInline({ src, title }: { src: string; title?: string }) {
  const [loadError, setLoadError] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const videoInfo = parseVideoUrl(src);

  const aspectRatio = (315 / 560) * 100;

  if (!videoInfo.embedUrl || videoInfo.platform !== "youtube") {
    return (
      <>
        <span
          className="block w-full p-4 sm:p-6 bg-stone-50 border border-stone-300 rounded-sm text-center max-w-4xl mx-auto"
          style={{
            margin: "1rem 0",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-stone-400 mx-auto mb-3" />
          <span className="text-xs sm:text-sm font-medium text-stone-900 mb-2 block">
            Solo soportamos videos de YouTube
          </span>
          <code className="text-xs text-stone-600 bg-white px-2 sm:px-3 py-1 rounded border border-stone-200 break-all">
            {src}
          </code>
        </span>
      </>
    );
  }

  const videoContent = (
    <>
      <span
        className="relative w-full overflow-hidden rounded-sm border border-stone-300 bg-stone-100 block shadow-sm"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        {loadError ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 p-3 sm:p-6 bg-stone-50">
            <AlertCircle className="h-10 w-10 sm:h-12 sm:w-12 text-stone-400" />
            <span className="text-center max-w-xs sm:max-w-md px-2">
              <span className="text-xs sm:text-sm font-medium text-stone-900 mb-2 block">
                No se pudo cargar el video
              </span>
              <span className="text-xs text-stone-600 mb-3 sm:mb-4 block">
                El video no está disponible debido a restricciones de privacidad
                o no existe
              </span>
            </span>
          </span>
        ) : !showIframe ? (
          <span
            className="group absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4 p-3 sm:p-6 bg-stone-50 cursor-pointer"
            onClick={() => setShowIframe(true)}
          >
            <span className="p-3 sm:p-4 rounded-full bg-stone-200 group-hover:bg-stone-300 transition-colors touch-manipulation group-active:bg-stone-400">
              <Play
                className="h-10 w-10 sm:h-12 sm:w-12 text-stone-900"
                fill="currentColor"
              />
            </span>
            <span className="text-center px-2">
              <span className="text-xs sm:text-sm text-stone-600 block">
                Da clic para cargar el video
              </span>
            </span>
          </span>
        ) : (
          <iframe
            src={videoInfo.embedUrl}
            title={title || "Video"}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            onError={() => setLoadError(true)}
            onLoad={() => setLoadError(false)}
          />
        )}
      </span>
      {title && (
        <span
          className="text-center text-xs sm:text-sm text-stone-600 block px-2"
          style={{ marginTop: "0.5rem" }}
        >
          <em>{title}</em>
        </span>
      )}
    </>
  );

  return (
    <span
      className="block w-full max-w-4xl mx-auto"
      style={{ margin: "1rem 0", marginTop: "1.5rem", marginBottom: "1.5rem" }}
    >
      {videoContent}
    </span>
  );
}
