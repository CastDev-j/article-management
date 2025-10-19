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

  // Generar token con alta entropía usando múltiples fuentes de aleatoriedad
  const timestamp = Date.now();
  const nanoTime = process.hrtime.bigint().toString();
  const uuid = crypto.randomUUID();
  const randomBytes1 = crypto.randomBytes(16).toString('hex');
  const randomBytes2 = crypto.randomBytes(8).toString('hex');
  const processId = process.pid.toString(36);
  
  // Combinar todas las fuentes para máxima unicidad
  const token = `${timestamp}_${uuid}_${randomBytes1}_${nanoTime.slice(-8)}_${randomBytes2}_${processId}`;

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
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.headers.set("Surrogate-Control", "no-store");
  res.headers.set("Pragma", "no-cache");
  return res;
}
