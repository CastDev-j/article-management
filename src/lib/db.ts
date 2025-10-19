import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL not set");

const sql = neon(connectionString);

async function query(sqlQuery: string, params: any[] = []) {
  try {
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
    publishedAt: row.published_at,
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

        if (opts.where.titulo && opts.where.titulo.contains) {
          whereClauses.push(`titulo ILIKE $${idx++}`);
          params.push(`%${opts.where.titulo.contains}%`);
        }

        if (opts.where.AND && Array.isArray(opts.where.AND)) {
          for (const condition of opts.where.AND) {
            if (condition.titulo && condition.titulo.contains) {
              whereClauses.push(`titulo ILIKE $${idx++}`);
              params.push(`%${condition.titulo.contains}%`);
            }
          }
        }
      }

      if (
        opts.where &&
        opts.where.articuloCategorias &&
        opts.where.articuloCategorias.some
      ) {
        const slug = opts.where.articuloCategorias.some.categoria.slug;
        const res = await query(
          `SELECT a.* FROM articulos a JOIN articulo_categorias ac ON ac.articulo_id = a.id JOIN categorias c ON c.id = ac.categoria_id WHERE c.slug = $1 ORDER BY a.published_at DESC NULLS LAST, a.created_at DESC`,
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

      let orderByClause = "";
      if (opts.orderBy) {
        if (Array.isArray(opts.orderBy)) {
          const orderParts = opts.orderBy.map((order: any) => {
            if (order.publishedAt) {
              return `published_at ${order.publishedAt.toUpperCase()} NULLS LAST`;
            }
            if (order.createdAt) {
              return `created_at ${order.createdAt.toUpperCase()}`;
            }
            if (order.titulo) {
              return `titulo ${order.titulo.toUpperCase()}`;
            }
            if (order.updatedAt) {
              return `updated_at ${order.updatedAt.toUpperCase()}`;
            }
            if (order.publicado) {
              return `publicado ${order.publicado.toUpperCase()}`;
            }
            return "published_at DESC NULLS LAST";
          });
          orderByClause = "ORDER BY " + orderParts.join(", ");
        } else {
          const order = opts.orderBy;
          if (order.publishedAt) {
            orderByClause = `ORDER BY published_at ${order.publishedAt.toUpperCase()} NULLS LAST`;
          } else if (order.createdAt) {
            orderByClause = `ORDER BY created_at ${order.createdAt.toUpperCase()}`;
          } else if (order.titulo) {
            orderByClause = `ORDER BY titulo ${order.titulo.toUpperCase()}`;
          } else if (order.updatedAt) {
            orderByClause = `ORDER BY updated_at ${order.updatedAt.toUpperCase()}`;
          } else if (order.publicado) {
            orderByClause = `ORDER BY publicado ${order.publicado.toUpperCase()}`;
          } else {
            orderByClause =
              "ORDER BY published_at DESC NULLS LAST, created_at DESC";
          }
        }
      } else {
        orderByClause =
          "ORDER BY published_at DESC NULLS LAST, created_at DESC";
      }

      const res = await query(
        `SELECT * FROM articulos ${whereSql} ${orderByClause}`,
        params
      );
      const articulos = res.rows.map(mapRowToArticulo);

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
        `INSERT INTO articulos (id, titulo, slug, descripcion, contenido, imagen, autors, publicado, published_at, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW(),NOW()) RETURNING *`,
        [
          id,
          data.titulo,
          data.slug,
          data.descripcion,
          data.contenido,
          data.imagen,
          autorsJson,
          data.publicado || false,
          data.publishedAt || null,
        ]
      );

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
        "publishedAt",
      ]) {
        if (key in data) {
          const dbKey = key === "publishedAt" ? "published_at" : key;
          fields.push(`${dbKey} = $${idx++}`);
          params.push((data as any)[key] ?? null);
        }
      }

      if ("autors" in data) {
        fields.push(`autors = $${idx++}`);
        params.push(JSON.stringify(data.autors || ["Anónimo"]));
      }

      params.push(where.id);
      const sql = `UPDATE articulos SET ${fields.join(
        ", "
      )}, updated_at = NOW() WHERE id = $${idx} RETURNING *`;
      const res = await query(sql, params);

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
