import { Header } from "@/components/header"
import { CategoriaForm } from "@/components/categoria-form"
import { requireAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Editar Categoría | Admin",
  description: "Editar categoría existente",
}

export default async function EditarCategoriaPage({ params }: { params: { id: string } }) {
  await requireAuth()

  const categoria = await prisma.categoria.findUnique({
    where: { id: params.id },
  })

  if (!categoria) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-8 font-serif text-4xl font-bold">Editar Categoría</h1>
        <CategoriaForm categoria={categoria} />
      </main>
    </>
  )
}
