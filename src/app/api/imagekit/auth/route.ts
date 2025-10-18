import { NextResponse } from "next/server";
import crypto from "crypto";
const PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;

export async function GET() {
  if (!PRIVATE_KEY) {
    return NextResponse.json(
      { error: "IMAGEKIT_PRIVATE_KEY no configurada en el servidor" },
      { status: 500 }
    );
  }

  const token = crypto.randomBytes(20).toString("hex");
  const expire = Math.floor(Date.now() / 1000) + 2400;
  const signature = crypto
    .createHmac("sha1", PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");

  return NextResponse.json({ token, expire, signature });
}
