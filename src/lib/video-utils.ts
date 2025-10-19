/**
 * Utilidades para manejar videos de YouTube y Facebook
 */

export interface VideoInfo {
  platform: 'youtube' | 'facebook' | 'unknown';
  videoId: string | null;
  embedUrl: string | null;
}

/**
 * Extrae el ID de video de una URL de YouTube
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    // Formato estándar: youtube.com/watch?v=ID
    /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
    // Formato corto: youtu.be/ID (con o sin parámetros)
    /(?:youtu\.be\/)([^&\n?#]+)/,
    // Formato embed: youtube.com/embed/ID
    /(?:youtube\.com\/embed\/)([^&\n?#]+)/,
    // Formato con parámetros adicionales
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

/**
 * Extrae el ID de video de una URL de Facebook
 */
export function extractFacebookId(url: string): string | null {
  const patterns = [
    // Formato tradicional: facebook.com/user/videos/123456
    /facebook\.com\/.*\/videos\/(\d+)/,
    // Formato fb.watch: fb.watch/abc123
    /fb\.watch\/([^\/\?&]+)/,
    // Formato watch: facebook.com/watch/?v=123456
    /facebook\.com\/watch\/\?v=(\d+)/,
    // Nuevo formato share: facebook.com/share/r/abc123/ o facebook.com/share/v/abc123/
    /facebook\.com\/share\/[rv]\/([^\/\?&]+)/,
    // Formato share con parámetros
    /facebook\.com\/share\/\?.*[rv]=([^\/\?&]+)/,
    // Formato share específico para videos: facebook.com/share/v/ID/
    /facebook\.com\/share\/v\/([^\/\?&]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Identifica la plataforma y extrae información del video
 */
export function parseVideoUrl(url: string): VideoInfo {
  const cleanUrl = url.trim().toLowerCase();
  
  // YouTube
  if (cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be')) {
    const videoId = extractYouTubeId(url);
    return {
      platform: 'youtube',
      videoId,
      embedUrl: videoId ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1` : null,
    };
  }
  
  // Facebook
  if (cleanUrl.includes('facebook.com') || cleanUrl.includes('fb.watch')) {
    const videoId = extractFacebookId(url);
    return {
      platform: 'facebook',
      videoId,
      // Facebook embed es más restrictivo, usar URL directa para el enlace
      embedUrl: videoId 
        ? `https://www.facebook.com/plugins/video.php?height=314&href=${encodeURIComponent(url)}&show_text=false&width=560&app_id=`
        : null,
    };
  }
  
  return {
    platform: 'unknown',
    videoId: null,
    embedUrl: null,
  };
}

/**
 * Valida si una URL es un video soportado
 */
export function isValidVideoUrl(url: string): boolean {
  const videoInfo = parseVideoUrl(url);
  return videoInfo.platform !== 'unknown' && videoInfo.videoId !== null;
}