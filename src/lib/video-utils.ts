export interface VideoInfo {
  platform: "youtube" | "facebook" | "unknown";
  videoId: string | null;
  embedUrl: string | null;
}

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    /(?:youtu\.be\/)([^&\n?#]+)/,
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function extractFacebookId(url: string): string | null {
  const patterns = [
    /(?:m\.|www\.|)facebook\.com\/.*\/videos\/(\d+)/,
    /fb\.watch\/([^\/\?&]+)/,
    /(?:m\.|www\.|)facebook\.com\/watch\/\?v=(\d+)/,
    /(?:m\.|www\.|)facebook\.com\/share\/v\/([^\/\?&]+)/,
    /(?:m\.|www\.|)facebook\.com\/share\/r\/([^\/\?&]+)/,
    /(?:m\.|www\.|)facebook\.com\/reel\/([^\/\?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function parseVideoUrl(url: string): VideoInfo {
  const cleanUrl = url.trim().toLowerCase();
  const originalUrl = url.trim();

  if (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) {
    const videoId = extractYouTubeId(originalUrl);
    return {
      platform: "youtube",
      videoId,
      embedUrl: videoId
        ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
        : null,
    };
  }

  if (cleanUrl.includes("facebook.com") || cleanUrl.includes("fb.watch") || cleanUrl.includes("m.facebook.com")) {
    const videoId = extractFacebookId(originalUrl);

    if (!videoId) {
      return {
        platform: "facebook",
        videoId: null,
        embedUrl: null,
      };
    }

    let embedUrl = originalUrl;
    
    // Normalizar URLs de Facebook para asegurar compatibilidad con CSP
    // Reemplazar m.facebook.com con www.facebook.com
    embedUrl = embedUrl.replace(/https?:\/\/m\.facebook\.com/g, "https://www.facebook.com");
    embedUrl = embedUrl.replace(/https?:\/\/facebook\.com/g, "https://www.facebook.com");
    
    if (cleanUrl.includes("/share/v/") || cleanUrl.includes("/share/r/")) {
      if (!embedUrl.includes("facebook.com")) {
        embedUrl = `https://www.facebook.com/share/v/${videoId}/`;
      }
    }
    
    // Asegurar que la URL final siempre use www.facebook.com
    if (!embedUrl.startsWith("https://www.facebook.com")) {
      embedUrl = embedUrl.replace(/https?:\/\/[^.]*\.?facebook\.com/g, "https://www.facebook.com");
    }

    return {
      platform: "facebook",
      videoId,
      embedUrl: `https://www.facebook.com/plugins/video.php?height=314&href=${encodeURIComponent(
        embedUrl
      )}&show_text=false&width=560&t=0`,
    };
  }

  return {
    platform: "unknown",
    videoId: null,
    embedUrl: null,
  };
}

export function isValidVideoUrl(url: string): boolean {
  const videoInfo = parseVideoUrl(url);
  return videoInfo.platform !== "unknown" && videoInfo.videoId !== null;
}
