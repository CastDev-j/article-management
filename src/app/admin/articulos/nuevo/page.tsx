import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Header } from "@/components/header";
import { ArticleForm } from "@/components/article-form";
import { getCategorias } from "@/app/actions/categorias";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuevo Artículo | Admin",
  description: "Crea un nuevo artículo.",
};

export default async function NuevoArticuloPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const categorias = await getCategorias();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Nuevo Artículo</h1>
        <ArticleForm categorias={categorias} />
      </main>
    </>
  );
}
