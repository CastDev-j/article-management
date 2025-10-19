import { NextResponse } from "next/server";
import crypto from "crypto";

const PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

export async function GET(request: Request) {
  if (!PRIVATE_KEY) {
    return NextResponse.json(
      { error: "IMAGEKIT_PRIVATE_KEY no configurada en el servidor" },
      { status: 500 }
    );
  }

  // Generar token con máxima entropía y unicidad garantizada
  const timestamp = Date.now();
  const microseconds = process.hrtime.bigint();
  const uuid1 = crypto.randomUUID();
  const uuid2 = crypto.randomUUID(); 
  const randomBytes1 = crypto.randomBytes(24).toString('hex');
  const randomBytes2 = crypto.randomBytes(16).toString('hex');
  const randomBytes3 = crypto.randomBytes(8).toString('hex');
  const processInfo = `${process.pid}_${Math.random().toString(36).substring(2)}`;
  const requestId = crypto.randomBytes(12).toString('base64url');
  
  // Añadir parámetro de request para más unicidad
  const url = new URL(request.url);
  const requestParam = url.searchParams.get('t') || 'no-param';
  
  // Token ultra-único combinando múltiples fuentes de entropía
  const tokenParts = [
    timestamp.toString(36),
    microseconds.toString(36),
    uuid1.replace(/-/g, ''),
    uuid2.replace(/-/g, ''),
    randomBytes1,
    randomBytes2,
    randomBytes3,
    processInfo,
    requestId,
    requestParam.slice(-10), // Usar parte del parámetro de request
    Math.random().toString(36).substring(2),
    Date.now().toString(36) // Timestamp adicional justo antes de crear el token
  ];
  
  const token = tokenParts.join('_');

  const expire = Math.floor(Date.now() / 1000) + 2400;
  const signature = crypto
    .createHmac("sha1", PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");

  // Debug logging solo en desarrollo
  if (process.env.NODE_ENV === 'development') {
    try {
      console.log(
        "[imagekit-auth] token:",
        token.slice(0, 12),
        "expire:",
        expire,
        "from:",
        request?.headers?.get("x-forwarded-for") ||
          request?.headers?.get("host") ||
          "-"
      );
    } catch (e) {
      /* ignore logging errors */
    }
  }

  const res = NextResponse.json({ token, expire, signature });
  // Headers anti-cache más estrictos
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0, s-maxage=0");
  res.headers.set("Surrogate-Control", "no-store");
  res.headers.set("Pragma", "no-cache");
  res.headers.set("Expires", "0");
  res.headers.set("ETag", `"${Date.now()}-${Math.random()}"`);
  return res;
}
