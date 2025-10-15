import { NextResponse } from "next/server";
import crypto from "crypto";
import { IMAGEKIT_CONFIG } from "@/lib/imagekit";

export async function GET() {
  const token = crypto.randomBytes(20).toString("hex");
  const expire = Math.floor(Date.now() / 1000) + 2400;
  const signature = crypto
    .createHmac("sha1", IMAGEKIT_CONFIG.privateKey)
    .update(token + expire)
    .digest("hex");

  return NextResponse.json({
    token,
    expire,
    signature,
  });
}
