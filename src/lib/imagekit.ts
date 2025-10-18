export const IMAGEKIT_CONFIG = {
  urlEndpoint:
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT ||
    "https://ik.imagekit.io/pcddcn6rq/",
  publicKey:
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ||
    "public_uYRJXjLiPIz3z0dICFHuFLmSh2A=",
};

export async function uploadImageToImageKit(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", IMAGEKIT_CONFIG.publicKey);

  const authResponse = await fetch(`/api/imagekit/auth?t=${Date.now()}`, {
    cache: "no-store",
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

  try {
    console.log(
      "[imagekit] using token:",
      authData.token?.toString?.()?.slice?.(0, 12)
    );
  } catch (e) {}

  const response = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Error al subir la imagen: ${response.status} ${body}`);
  }

  const data = await response.json();
  return data.url;
}
