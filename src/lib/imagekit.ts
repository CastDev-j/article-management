export const IMAGEKIT_CONFIG = {
  urlEndpoint: "https://ik.imagekit.io/pcddcn6rq/",
  publicKey: "public_uYRJXjLiPIz3z0dICFHuFLmSh2A=",
  privateKey: "private_G8y47KFr1iE4uldf6uOqkQ+NcAs=",
};

export async function uploadImageToImageKit(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", IMAGEKIT_CONFIG.publicKey);

  const authResponse = await fetch("/api/imagekit/auth");
  const authData = await authResponse.json();

  formData.append("signature", authData.signature);
  formData.append("expire", authData.expire);
  formData.append("token", authData.token);

  const response = await fetch(
    "https://upload.imagekit.io/api/v1/files/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  const data = await response.json();
  return data.url;
}
