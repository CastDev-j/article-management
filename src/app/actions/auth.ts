"use server"

import { login as loginUser, logout as logoutUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const result = await loginUser(email, password)

  if (!result.success) {
    return { error: result.error }
  }

  redirect("/admin/articulos")
}

export async function logout() {
  await logoutUser()
  redirect("/")
}
