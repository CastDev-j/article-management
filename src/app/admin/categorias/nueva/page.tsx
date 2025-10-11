import { Header } from "@/components/header"
import { CategoriaForm } from "@/components/categoria-form"
import { requireAuth } from "@/lib/auth"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nueva Categoría | Admin",
  description: "Crear una nueva categoría",
}

export default async function NuevaCategoriaPage() {
  await requireAuth()

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-8 font-serif text-4xl font-bold">Nueva Categoría</h1>
        <CategoriaForm />
      </main>
    </>
  )
}
