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

  const ts = Date.now().toString(36);
  const uuidPart =
    typeof (crypto as any).randomUUID === "function"
      ? (crypto as any).randomUUID()
      : crypto.randomBytes(16).toString("hex");
  const randomPart = crypto.randomBytes(12).toString("hex");
  const token = `${ts}-${uuidPart}-${randomPart}`;

  const expire = Math.floor(Date.now() / 1000) + 2400;
  const signature = crypto
    .createHmac("sha1", PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");

  // Temporary debug logging to help track token issuance in production logs.
  try {
    // Log a shortened token and requester info (avoid logging secrets).
    // eslint-disable-next-line no-console
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

  const res = NextResponse.json({ token, expire, signature });
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  res.headers.set("Surrogate-Control", "no-store");
  res.headers.set("Pragma", "no-cache");
  return res;
}
