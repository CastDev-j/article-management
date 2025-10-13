"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";
import type { ArticuloFormData, Articulo } from "@/lib/types";
import { requireAdmin } from "./auth";

export async function createArticle(data: ArticuloFormData) {
  await requireAdmin();

  const baseSlug = generateSlug(data.titulo);
  const slug = await generateUniqueSlug(baseSlug, async (s) => {
    const existing = await prisma.articulo.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const article = await prisma.articulo.create({
    data: {
      titulo: data.titulo,
      slug,
      descripcion: data.descripcion || null,
      contenido: data.contenido,
      imagen: data.imagen || null,
      autors: data.autors && data.autors.length > 0 ? data.autors : ["Anónimo"],
      publicado: data.publicado,
      articuloCategorias: {
        create: data.categorias.map((categoryId) => ({
          categoriaId: categoryId,
        })),
      },
    },
  });

  revalidatePath("/admin/articulos");
  revalidatePath("/articulos");
  redirect("/admin/articulos");
}

export async function updateArticle(id: string, data: ArticuloFormData) {
  await requireAdmin();

  const article = await prisma.articulo.findUnique({
    where: { id },
  });

  if (!article) {
    throw new Error("Artículo no encontrado");
  }

  let slug = article.slug;
  if (data.titulo !== article.titulo) {
    const baseSlug = generateSlug(data.titulo);
    slug = await generateUniqueSlug(
      baseSlug,
      async (s) => {
        const existing = await prisma.articulo.findUnique({
          where: { slug: s },
        });
        return existing ? existing.id !== id : false;
      },
      id
    );
  }

  await prisma.articulo.update({
    where: { id },
    data: {
      titulo: data.titulo,
      slug,
      descripcion: data.descripcion || null,
      contenido: data.contenido,
      imagen: data.imagen || null,
      autors: data.autors && data.autors.length > 0 ? data.autors : ["Anónimo"],
      publicado: data.publicado,
      articuloCategorias: {
        deleteMany: {},
        create: data.categorias.map((categoryId) => ({
          categoriaId: categoryId,
        })),
      },
    },
  });

  revalidatePath("/admin/articulos");
  revalidatePath(`/articulos/${slug}`);
  revalidatePath("/articulos");
  redirect("/admin/articulos");
}

export async function deleteArticle(id: string) {
  await requireAdmin();

  const article = await prisma.articulo.findUnique({
    where: { id },
  });

  if (!article) {
    throw new Error("Artículo no encontrado");
  }

  await prisma.articulo.delete({
    where: { id },
  });

  revalidatePath("/admin/articulos");
  revalidatePath("/articulos");
}

export async function togglePublished(id: string) {
  await requireAdmin();

  const article = await prisma.articulo.findUnique({
    where: { id },
  });

  if (!article) {
    throw new Error("Artículo no encontrado");
  }

  await prisma.articulo.update({
    where: { id },
    data: {
      publicado: !article.publicado,
    },
  });

  revalidatePath("/admin/articulos");
  revalidatePath("/articulos");
}

export async function getArticles(options?: {
  published?: boolean;
  categorySlug?: string;
  search?: string;
}): Promise<Articulo[]> {
  const where: any = {};

  if (options?.published !== undefined) {
    where.publicado = options.published;
  }

  if (options?.categorySlug) {
    where.articuloCategorias = {
      some: {
        categoria: {
          slug: options.categorySlug,
        },
      },
    };
  }

  if (options?.search) {
    where.OR = [
      { titulo: { contains: options.search, mode: "insensitive" } },
      { descripcion: { contains: options.search, mode: "insensitive" } },
      { contenido: { contains: options.search, mode: "insensitive" } },
    ];
  }

  return prisma.articulo.findMany({
    where,
    include: {
      articuloCategorias: {
        include: {
          categoria: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  }) as Promise<Articulo[]>;
}

export async function getArticlesWithPagination(options?: {
  published?: boolean;
  categorySlug?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = options?.page || 1;
  const pageSize = options?.pageSize || 12;
  const skip = (page - 1) * pageSize;

  const where: any = {};

  if (options?.published !== undefined) {
    where.publicado = options.published;
  }

  if (options?.categorySlug) {
    where.articuloCategorias = {
      some: {
        categoria: {
          slug: options.categorySlug,
        },
      },
    };
  }

  if (options?.search) {
    where.OR = [
      { titulo: { contains: options.search, mode: "insensitive" } },
      { descripcion: { contains: options.search, mode: "insensitive" } },
      { contenido: { contains: options.search, mode: "insensitive" } },
    ];
  }

  const allArticles = await prisma.articulo.findMany({
    where,
    include: {
      articuloCategorias: {
        include: {
          categoria: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = allArticles.length;
  const articles = allArticles.slice(skip, skip + pageSize);

  return {
    articles: articles as Articulo[],
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
    total,
  };
}

export async function getArticleBySlug(slug: string) {
  return prisma.articulo.findUnique({
    where: { slug },
    include: {
      articuloCategorias: {
        include: {
          categoria: true,
        },
      },
    },
  });
}

export async function getArticleById(id: string) {
  return prisma.articulo.findUnique({
    where: { id },
    include: {
      articuloCategorias: {
        include: {
          categoria: true,
        },
      },
    },
  });
}
