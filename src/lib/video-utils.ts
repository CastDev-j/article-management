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
