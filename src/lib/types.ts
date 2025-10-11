export interface Articulo {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string | null;
  contenido: string;
  imagen: string | null;
  autors: string[]; // Array de autores (nombres separados)
  publicado: boolean;
  createdAt: Date;
  updatedAt: Date;
  articuloCategorias: {
    categoria: {
      id: string;
      nombre: string;
      slug: string;
    };
  }[];
}

export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticuloFormData {
  titulo: string;
  descripcion?: string;
  contenido: string;
  imagen?: string;
  autors: string[]; // Array de nombres de autores
  categorias: string[];
  publicado: boolean;
}
