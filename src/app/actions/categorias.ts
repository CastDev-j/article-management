"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";
import { requireAdmin } from "./auth";

export async function createCategory(name: string) {
  await requireAdmin();

  const baseSlug = generateSlug(name);
  const slug = await generateUniqueSlug(baseSlug, async (s) => {
    const existing = await prisma.categoria.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const category = await prisma.categoria.create({
    data: {
      nombre: name,
      slug,
    },
  });

  revalidatePath("/admin/categorias");
  return category;
}

export async function updateCategory(id: string, name: string) {
  await requireAdmin();

  const category = await prisma.categoria.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Categoría no encontrada");
  }

  let slug = category.slug;
  if (name !== category.nombre) {
    const baseSlug = generateSlug(name);
    slug = await generateUniqueSlug(
      baseSlug,
      async (s) => {
        const existing = await prisma.categoria.findUnique({
          where: { slug: s },
        });
        return existing ? existing.id !== id : false;
      },
      id
    );
  }

  const updated = await prisma.categoria.update({
    where: { id },
    data: {
      nombre: name,
      slug,
    },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/categorias");
  return updated;
}

export async function deleteCategory(id: string) {
  await requireAdmin();

  const category = await prisma.categoria.findUnique({
    where: { id },
    include: {
      articuloCategorias: true,
    },
  });

  if (!category) {
    throw new Error("Categoría no encontrada");
  }

  if (category.articuloCategorias.length > 0) {
    throw new Error(
      "No se puede eliminar una categoría con artículos asociados"
    );
  }

  await prisma.categoria.delete({
    where: { id },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/categorias");
}

export async function getCategories() {
  return prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
}

export async function getCategoriesWithPagination({
  page = 1,
  pageSize = 9,
}: {
  page?: number;
  pageSize?: number;
}) {
  const skip = (page - 1) * pageSize;

  const categories = await prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });

  const total = categories.length;
  const paginatedCategories = categories.slice(skip, skip + pageSize);
  const totalPages = Math.ceil(total / pageSize);

  return {
    categories: paginatedCategories,
    totalPages,
    currentPage: page,
    total,
  };
}

export async function getCategoryBySlug(slug: string) {
  return prisma.categoria.findUnique({
    where: { slug },
    include: {
      articuloCategorias: {
        include: {
          articulo: true,
        },
      },
    },
  });
}
