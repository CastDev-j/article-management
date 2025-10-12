"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { generateSlug, generateUniqueSlug } from "@/lib/utils/slug";
import type { ArticuloFormData, Articulo } from "@/lib/types";
import { requireAdmin } from "./auth";

export async function createArticulo(data: ArticuloFormData) {
  // Verificar que el usuario sea admin
  await requireAdmin();

  const baseSlug = generateSlug(data.titulo);
  const slug = await generateUniqueSlug(baseSlug, async (s) => {
    const existing = await prisma.articulo.findUnique({ where: { slug: s } });
    return !!existing;
  });

  const articulo = await prisma.articulo.create({
    data: {
      titulo: data.titulo,
      slug,
      descripcion: data.descripcion || null,
      contenido: data.contenido,
      imagen: data.imagen || null,
      autors: data.autors && data.autors.length > 0 ? data.autors : ["Anónimo"],
      publicado: data.publicado,
      articuloCategorias: {
        create: data.categorias.map((categoriaId) => ({
          categoriaId,
        })),
      },
    },
  });

  revalidatePath("/admin/articulos");
  revalidatePath("/articulos");
  redirect("/admin/articulos");
}

export async function updateArticulo(id: string, data: ArticuloFormData) {
  // Verificar que el usuario sea admin
  await requireAdmin();

  const articulo = await prisma.articulo.findUnique({
    where: { id },
  });

  if (!articulo) {
    throw new Error("Artículo no encontrado");
  }

  let slug = articulo.slug;
  if (data.titulo !== articulo.titulo) {
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
        create: data.categorias.map((categoriaId) => ({
          categoriaId,
        })),
      },
    },
  });

  revalidatePath("/admin/articulos");
  revalidatePath(`/articulos/${slug}`);
  revalidatePath("/articulos");
  redirect("/admin/articulos");
}

export async function deleteArticulo(id: string) {
  // Verificar que el usuario sea admin
  await requireAdmin();

  const articulo = await prisma.articulo.findUnique({
    where: { id },
  });

  if (!articulo) {
    throw new Error("Artículo no encontrado");
  }

  await prisma.articulo.delete({
    where: { id },
  });

  revalidatePath("/admin/articulos");
  revalidatePath("/articulos");
}

export async function togglePublicado(id: string) {
  // Verificar que el usuario sea admin
  await requireAdmin();

  const articulo = await prisma.articulo.findUnique({
    where: { id },
  });

  if (!articulo) {
    throw new Error("Artículo no encontrado");
  }

  await prisma.articulo.update({
    where: { id },
    data: {
      publicado: !articulo.publicado,
    },
  });

  revalidatePath("/admin/articulos");
  revalidatePath("/articulos");
}

export async function getArticulos(options?: {
  publicado?: boolean;
  categoriaSlug?: string;
  search?: string;
}): Promise<Articulo[]> {
  const where: any = {};

  if (options?.publicado !== undefined) {
    where.publicado = options.publicado;
  }

  if (options?.categoriaSlug) {
    where.articuloCategorias = {
      some: {
        categoria: {
          slug: options.categoriaSlug,
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

export async function getArticuloBySlug(slug: string) {
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

export async function getArticuloById(id: string) {
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
