/*
  NeonDB Database Layer
  
  Lightweight database abstraction using Neon's serverless driver optimized for Next.js.
  Provides a Prisma-like API for convenience but uses raw SQL queries.
  
  Implements:
  - db.articulo.findUnique/findMany/create/update/delete
  - db.categoria.findUnique/findMany/create/update/delete
  - db.articuloCategoria.count
  
  The `prisma` export name is kept for backward compatibility but this is NOT Prisma ORM.
*/

import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL not set");

// Create a serverless connection using Neon's driver
const sql = neon(connectionString);

async function query(sqlQuery: string, params: any[] = []) {
  try {
    // Use sql.query for parameterized queries with Neon serverless
    const res = await sql.query(sqlQuery, params);
    return { rows: res };
  } catch (error) {
    throw error;
  }
}

function mapRowToArticulo(row: any) {
  return {
    id: row.id,
    titulo: row.titulo,
    slug: row.slug,
    descripcion: row.descripcion,
    contenido: row.contenido,
    imagen: row.imagen,
    autors:
      typeof row.autors === "string"
        ? JSON.parse(row.autors)
        : row.autors || [],
    publicado: row.publicado,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRowToCategoria(row: any) {
  return {
    id: row.id,
    nombre: row.nombre,
    slug: row.slug,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const prisma = {
  articulo: {
    async findUnique({ where, include }: { where: any; include?: any }) {
      let articulo: any = null;

      if (where.id) {
        const res = await query("SELECT * FROM articulos WHERE id = $1", [
          where.id,
        ]);
        articulo = res.rows[0] ? mapRowToArticulo(res.rows[0]) : null;
      } else if (where.slug) {
        const res = await query("SELECT * FROM articulos WHERE slug = $1", [
          where.slug,
        ]);
        articulo = res.rows[0] ? mapRowToArticulo(res.rows[0]) : null;
      }

      if (!articulo) return null;

      // Handle include relations
      if (include?.articuloCategorias) {
        const acRes = await query(
          `SELECT ac.id, ac.articulo_id, ac.categoria_id, c.id as cat_id, c.nombre, c.slug, c.created_at as cat_created_at, c.updated_at as cat_updated_at
           FROM articulo_categorias ac
           JOIN categorias c ON c.id = ac.categoria_id
           WHERE ac.articulo_id = $1`,
          [articulo.id]
        );

        articulo.articuloCategorias = acRes.rows.map((row: any) => ({
          id: row.id,
          articuloId: row.articulo_id,
          categoriaId: row.categoria_id,
          categoria: {
            id: row.cat_id,
            nombre: row.nombre,
            slug: row.slug,
            createdAt: row.cat_created_at,
            updatedAt: row.cat_updated_at,
          },
        }));
      }

      return articulo;
    },
    async findMany(opts: any = {}) {
      const whereClauses: string[] = [];
      const params: any[] = [];
      let idx = 1;

      if (opts.where) {
        if (opts.where.publicado !== undefined) {
          whereClauses.push(`publicado = $${idx++}`);
          params.push(opts.where.publicado);
        }
      }

      // category filter (joins)
      if (
        opts.where &&
        opts.where.articuloCategorias &&
        opts.where.articuloCategorias.some
      ) {
        // Only support slug filter used in the app
        const slug = opts.where.articuloCategorias.some.categoria.slug;
        const res = await query(
          `SELECT a.* FROM articulos a JOIN articulo_categorias ac ON ac.articulo_id = a.id JOIN categorias c ON c.id = ac.categoria_id WHERE c.slug = $1 ORDER BY a.created_at DESC`,
          [slug]
        );
        const articulos = res.rows.map(mapRowToArticulo);

        // Add relations if include is specified
        if (opts.include?.articuloCategorias) {
          for (const articulo of articulos) {
            const acRes = await query(
              `SELECT ac.id, ac.articulo_id, ac.categoria_id, c.id as cat_id, c.nombre, c.slug, c.created_at as cat_created_at, c.updated_at as cat_updated_at
               FROM articulo_categorias ac
               JOIN categorias c ON c.id = ac.categoria_id
               WHERE ac.articulo_id = $1`,
              [articulo.id]
            );

            (articulo as any).articuloCategorias = acRes.rows.map(
              (row: any) => ({
                id: row.id,
                articuloId: row.articulo_id,
                categoriaId: row.categoria_id,
                categoria: {
                  id: row.cat_id,
                  nombre: row.nombre,
                  slug: row.slug,
                  createdAt: row.cat_created_at,
                  updatedAt: row.cat_updated_at,
                },
              })
            );
          }
        }

        return articulos;
      }

      const whereSql = whereClauses.length
        ? "WHERE " + whereClauses.join(" AND ")
        : "";
      const orderBy = opts.orderBy ? "ORDER BY created_at DESC" : "";
      const res = await query(
        `SELECT * FROM articulos ${whereSql} ${orderBy}`,
        params
      );
      const articulos = res.rows.map(mapRowToArticulo);

      // Add relations if include is specified
      if (opts.include?.articuloCategorias) {
        for (const articulo of articulos) {
          const acRes = await query(
            `SELECT ac.id, ac.articulo_id, ac.categoria_id, c.id as cat_id, c.nombre, c.slug, c.created_at as cat_created_at, c.updated_at as cat_updated_at
             FROM articulo_categorias ac
             JOIN categorias c ON c.id = ac.categoria_id
             WHERE ac.articulo_id = $1`,
            [articulo.id]
          );

          (articulo as any).articuloCategorias = acRes.rows.map((row: any) => ({
            id: row.id,
            articuloId: row.articulo_id,
            categoriaId: row.categoria_id,
            categoria: {
              id: row.cat_id,
              nombre: row.nombre,
              slug: row.slug,
              createdAt: row.cat_created_at,
              updatedAt: row.cat_updated_at,
            },
          }));
        }
      }

      return articulos;
    },
    async create({ data }: { data: any }) {
      const id = data.id || require("crypto").randomUUID();
      const autorsJson = JSON.stringify(data.autors || ["Anónimo"]);
      const res = await query(
        `INSERT INTO articulos (id, titulo, slug, descripcion, contenido, imagen, autors, publicado, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW(),NOW()) RETURNING *`,
        [
          id,
          data.titulo,
          data.slug,
          data.descripcion,
          data.contenido,
          data.imagen,
          autorsJson,
          data.publicado || false,
        ]
      );

      // handle articuloCategorias creation
      if (data.articuloCategorias && data.articuloCategorias.create) {
        for (const ac of data.articuloCategorias.create) {
          await query(
            `INSERT INTO articulo_categorias (id, articulo_id, categoria_id) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
            [require("crypto").randomUUID(), id, ac.categoriaId]
          );
        }
      }

      return mapRowToArticulo(res.rows[0]);
    },
    async update({ where, data }: { where: any; data: any }) {
      const existing = await prisma.articulo.findUnique({ where });
      if (!existing) return null;

      const fields: string[] = [];
      const params: any[] = [];
      let idx = 1;

      for (const key of [
        "titulo",
        "slug",
        "descripcion",
        "contenido",
        "imagen",
        "publicado",
      ]) {
        if (key in data) {
          fields.push(`${key} = $${idx++}`);
          params.push((data as any)[key] ?? null);
        }
      }

      // Handle autors separately since it needs JSON stringification
      if ("autors" in data) {
        fields.push(`autors = $${idx++}`);
        params.push(JSON.stringify(data.autors || ["Anónimo"]));
      }

      params.push(where.id);
      const sql = `UPDATE articulos SET ${fields.join(
        ", "
      )}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;
      const res = await query(sql, params);

      // handle articuloCategorias replace
      if (
        data.articuloCategorias &&
        data.articuloCategorias.deleteMany !== undefined
      ) {
        await query("DELETE FROM articulo_categorias WHERE articulo_id = $1", [
          where.id,
        ]);
      }
      if (data.articuloCategorias && data.articuloCategorias.create) {
        for (const ac of data.articuloCategorias.create) {
          await query(
            `INSERT INTO articulo_categorias (id, articulo_id, categoria_id) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
            [require("crypto").randomUUID(), where.id, ac.categoriaId]
          );
        }
      }

      return res.rows[0] ? mapRowToArticulo(res.rows[0]) : null;
    },
    async delete({ where }: { where: any }) {
      await query("DELETE FROM articulo_categorias WHERE articulo_id = $1", [
        where.id,
      ]);
      const res = await query(
        "DELETE FROM articulos WHERE id = $1 RETURNING *",
        [where.id]
      );
      return res.rows[0] ? mapRowToArticulo(res.rows[0]) : null;
    },
  },

  categoria: {
    async findUnique({ where, include }: { where: any; include?: any }) {
      let categoria: any = null;

      if (where.id) {
        const res = await query("SELECT * FROM categorias WHERE id = $1", [
          where.id,
        ]);
        categoria = res.rows[0] ? mapRowToCategoria(res.rows[0]) : null;
      } else if (where.slug) {
        const res = await query("SELECT * FROM categorias WHERE slug = $1", [
          where.slug,
        ]);
        categoria = res.rows[0] ? mapRowToCategoria(res.rows[0]) : null;
      }

      if (!categoria) return null;

      // Handle include relations
      if (include?.articuloCategorias) {
        const acRes = await query(
          `SELECT ac.id, ac.articulo_id, ac.categoria_id
           FROM articulo_categorias ac
           WHERE ac.categoria_id = $1`,
          [categoria.id]
        );

        (categoria as any).articuloCategorias = acRes.rows.map((row: any) => ({
          id: row.id,
          articuloId: row.articulo_id,
          categoriaId: row.categoria_id,
        }));
      }

      return categoria;
    },
    async findMany(opts: any = {}) {
      const order = opts.orderBy ? "ORDER BY nombre ASC" : "";
      const res = await query(`SELECT * FROM categorias ${order}`);
      return res.rows.map(mapRowToCategoria);
    },
    async create({ data }: { data: any }) {
      const id = data.id || require("crypto").randomUUID();
      const res = await query(
        `INSERT INTO categorias (id, nombre, slug, created_at, updated_at) VALUES ($1,$2,$3,NOW(),NOW()) RETURNING *`,
        [id, data.nombre, data.slug]
      );
      return mapRowToCategoria(res.rows[0]);
    },
    async update({ where, data }: { where: any; data: any }) {
      const fields: string[] = [];
      const params: any[] = [];
      let idx = 1;
      for (const key of ["nombre", "slug"]) {
        if (key in data) {
          fields.push(`${key} = $${idx++}`);
          params.push((data as any)[key]);
        }
      }
      params.push(where.id);
      const sql = `UPDATE categorias SET ${fields.join(
        ", "
      )}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;
      const res = await query(sql, params);
      return res.rows[0] ? mapRowToCategoria(res.rows[0]) : null;
    },
    async delete({ where }: { where: any }) {
      await query("DELETE FROM articulo_categorias WHERE categoria_id = $1", [
        where.id,
      ]);
      const res = await query(
        "DELETE FROM categorias WHERE id = $1 RETURNING *",
        [where.id]
      );
      return res.rows[0] ? mapRowToCategoria(res.rows[0]) : null;
    },
  },

  articuloCategoria: {
    async count({ where }: { where: any }) {
      if (where && where.categoriaId) {
        const res = await query(
          "SELECT COUNT(*) FROM articulo_categorias WHERE categoria_id = $1",
          [where.categoriaId]
        );
        return parseInt(res.rows[0].count, 10);
      }
      return 0;
    },
  },
};

export { query as dbQuery };
