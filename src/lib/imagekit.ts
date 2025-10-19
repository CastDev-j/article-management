// Validar que las variables de entorno estén configuradas
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;

if (!urlEndpoint) {
  throw new Error('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT no está configurada');
}

if (!publicKey) {
  throw new Error('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY no está configurada');
}

export const IMAGEKIT_CONFIG = {
  urlEndpoint: urlEndpoint as string,
  publicKey: publicKey as string,
};

async function uploadWithRetry(file: File, maxRetries: number = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", IMAGEKIT_CONFIG.publicKey);

      // Generar timestamp único con máxima entropía para cada intento
      const timestamp = Date.now();
      const randomSuffix = crypto.randomUUID() + '_' + Math.random().toString(36).substring(2);
      const attemptSuffix = `_attempt_${attempt}_${Date.now()}`;
      const uniqueParam = `${timestamp}_${randomSuffix}${attemptSuffix}`;
      
      const authResponse = await fetch(`/api/imagekit/auth?t=${uniqueParam}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
      });

      if (!authResponse.ok) {
        const text = await authResponse.text().catch(() => "");
        throw new Error(
          `No se pudo obtener la autenticación para ImageKit: ${authResponse.status} ${text}`
        );
      }

      const authData = await authResponse.json();

      if (!authData || !authData.signature || !authData.token || !authData.expire) {
        throw new Error("Respuesta inválida de autenticación de ImageKit");
      }

      formData.append("signature", authData.signature);
      formData.append("expire", authData.expire);
      formData.append("token", authData.token);

      // Debug logging solo en desarrollo
      if (process.env.NODE_ENV === 'development') {
        try {
          console.log(
            `[imagekit] attempt ${attempt}, using token:`,
            authData.token?.toString?.()?.slice?.(0, 12)
          );
        } catch (e) {}
      }

      const response = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        
        // Si es el error de token usado, intentar de nuevo
        if (response.status === 400 && body.includes('has been used before')) {
          if (attempt < maxRetries) {
            console.warn(`[imagekit] Token duplicado en intento ${attempt}, reintentando...`);
            // Esperar un poco antes del siguiente intento
            await new Promise(resolve => setTimeout(resolve, 100 * attempt));
            continue;
          }
        }
        
        throw new Error(`Error al subir la imagen: ${response.status} ${body}`);
      }

      const data = await response.json();
      return data.url;
      
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Si no es el último intento y el error es de token duplicado, continuar
      if (error instanceof Error && error.message.includes('has been used before')) {
        console.warn(`[imagekit] Reintentando upload, intento ${attempt + 1}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 200 * attempt));
        continue;
      }
      
      // Para otros errores, lanzar inmediatamente
      throw error;
    }
  }
  
  throw new Error('Upload falló después de todos los intentos');
}

export async function uploadImageToImageKit(file: File): Promise<string> {
  return uploadWithRetry(file, 3);
}
