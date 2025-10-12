import { CategoriaForm } from "@/components/categoria-form";
import { AdminHeader } from "@/components/admin-header";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { checkIsAdmin } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Nueva Categoría | Admin",
  description: "Crear una nueva categoría",
};

export default async function NuevaCategoriaPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const isAdmin = await checkIsAdmin(userId);

  if (!isAdmin) {
    redirect("/");
  }

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="mb-8 font-serif text-4xl font-bold">Nueva Categoría</h1>
        <CategoriaForm />
      </main>
    </>
  );
}
