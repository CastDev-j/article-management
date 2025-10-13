import { CategoriaForm } from "@/components/categoria-form";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { checkIsAdmin } from "@/app/actions/auth";

export const metadata: Metadata = {
  title: "Editar Categoría | Admin",
  description: "Editar categoría existente",
};

export default async function EditarCategoriaPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const isAdmin = await checkIsAdmin(userId);

  if (!isAdmin) {
    redirect("/");
  }

  const categoria = await prisma.categoria.findUnique({
    where: { id: params.id },
  });

  if (!categoria) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-8 font-serif text-4xl font-bold">Editar Categoría</h1>
      <CategoriaForm categoria={categoria} />
    </div>
  );
}
