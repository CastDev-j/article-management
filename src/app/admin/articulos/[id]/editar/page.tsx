import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ArticleForm } from "@/components/article-form";
import { getArticuloById } from "@/app/actions/articulos";
import { getCategorias } from "@/app/actions/categorias";
import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin-header";
import { checkIsAdmin } from "@/app/actions/auth";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const articulo = await getArticuloById(id);

  if (!articulo) {
    return {
      title: "Editar Artículo | Admin",
    };
  }

  return {
    title: `Editar: ${articulo.titulo} | Admin`,
    description: `Edita el artículo "${articulo.titulo}".`,
  };
}

export default async function EditarArticuloPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  const { id } = params;

  if (!userId) {
    redirect("/");
  }

  const isAdmin = await checkIsAdmin(userId);

  if (!isAdmin) {
    redirect("/");
  }

  const [articulo, categorias] = await Promise.all([
    getArticuloById(id),
    getCategorias(),
  ]);

  if (!articulo) {
    notFound();
  }

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Editar Artículo</h1>
        <ArticleForm articulo={articulo} categorias={categorias} />
      </main>
    </>
  );
}
