import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ArticleForm } from "@/components/article-form";
import { getArticleById } from "@/app/actions/articulos";
import { getCategories } from "@/app/actions/categorias";
import type { Metadata } from "next";
import { checkIsAdmin } from "@/app/actions/auth";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const article = await getArticleById(id);

  if (!article) {
    return {
      title: "Editar Artículo | Admin",
    };
  }

  return {
    title: `Editar: ${article.titulo} | Admin`,
    description: `Edita el artículo "${article.titulo}".`,
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

  const [article, categories] = await Promise.all([
    getArticleById(id),
    getCategories(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Editar Artículo</h1>
      <ArticleForm article={article} categories={categories} />
    </div>
  );
}
