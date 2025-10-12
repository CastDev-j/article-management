"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";
import { requireAdmin } from "./auth";

export async function createCategoria(nombre: string) {
  await requireAdmin();

  const baseSlug = generateSlug(nombre);
  const slug = await generateUniqueSlug(baseSlug, async (s) => {
    const existing = await prisma.categoria.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const categoria = await prisma.categoria.create({
    data: {
      nombre,
      slug,
    },
  });

  revalidatePath("/admin/categorias");
  return categoria;
}

export async function updateCategoria(id: string, nombre: string) {
  await requireAdmin();

  const categoria = await prisma.categoria.findUnique({
    where: { id },
  });

  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  let slug = categoria.slug;
  if (nombre !== categoria.nombre) {
    const baseSlug = generateSlug(nombre);
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
      nombre,
      slug,
    },
  });

  revalidatePath("/admin/categorias");
  revalidatePath("/categorias");
  return updated;
}

export async function deleteCategoria(id: string) {
  await requireAdmin();

  const categoria = await prisma.categoria.findUnique({
    where: { id },
    include: {
      articuloCategorias: true,
    },
  });

  if (!categoria) {
    throw new Error("Categoría no encontrada");
  }

  if (categoria.articuloCategorias.length > 0) {
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

export async function getCategorias() {
  return prisma.categoria.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
}

export async function getCategoriaBySlug(slug: string) {
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
