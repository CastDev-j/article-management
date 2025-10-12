/*
  NOTE: This file implements a simple cookie-based auth used previously in the
  project for local/demo purposes. Authentication has been migrated to Clerk.
  Keep this file only if you need the local fallback for testing, otherwise
  prefer Clerk's server helpers (auth/currentUser) across the app.
*/

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const VALID_USERS = [
  {
    id: "user-1",
    email: "admin@periodico.com",
    password: "Admin2024!",
    nombre: "Editor Principal",
  },
  {
    id: "user-2",
    email: "editor@periodico.com",
    password: "Editor2024!",
    nombre: "Editor Asociado",
  },
];

export async function login(email: string, password: string) {
  const user = VALID_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return { success: false, error: "Credenciales inválidas" };
  }

  const cookieStore = await cookies();
  cookieStore.set("auth-token", user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });

  return {
    success: true,
    user: { id: user.id, email: user.email, nombre: user.nombre },
  };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    return null;
  }

  const user = VALID_USERS.find((u) => u.id === token.value);
  if (!user) {
    return null;
  }

  return { id: user.id, email: user.email, nombre: user.nombre };
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }
  return user;
}
