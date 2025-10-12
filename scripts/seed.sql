-- Script completo para poblar la base de datos con datos de ejemplo
-- Fecha: 2025-10-11
-- Ejecutar DESPUÉS de 002-migrate-autors.sql
-- Este script inserta: categorías, artículos y relaciones
-- =============================================================================
-- 1. INSERTAR CATEGORÍAS
-- =============================================================================
INSERT INTO categorias (id, nombre, slug, created_at, updated_at)
VALUES (
        'cat-tech-001',
        'Tecnología',
        'tecnologia',
        NOW(),
        NOW()
    ),
    (
        'cat-prog-002',
        'Programación',
        'programacion',
        NOW(),
        NOW()
    ),
    (
        'cat-web-003',
        'Desarrollo Web',
        'desarrollo-web',
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO NOTHING;
-- =============================================================================
-- 2. INSERTAR ARTÍCULOS
-- =============================================================================
INSERT INTO articulos (
        id,
        titulo,
        slug,
        descripcion,
        contenido,
        imagen,
        autors,
        publicado,
        created_at,
        updated_at
    )
VALUES (
        'art-nextjs-001',
        'Introducción a Next.js 14: El Framework React del Futuro',
        'introduccion-nextjs-14-framework-react',
        'Descubre las nuevas características de Next.js 14 y cómo revolucionan el desarrollo web moderno con React Server Components y App Router.',
        'Next.js 14 marca un antes y un después en el desarrollo de aplicaciones web con React. Este framework, desarrollado por Vercel, ha evolucionado significativamente desde sus primeras versiones.

## ¿Qué es Next.js?

Next.js es un framework de React que permite crear aplicaciones web completas con renderizado del lado del servidor (SSR), generación de sitios estáticos (SSG) y muchas más características out-of-the-box.

## Características Principales

### 1. App Router
El nuevo App Router introduce un paradigma completamente nuevo para el enrutamiento en Next.js, permitiendo layouts anidados, loading states y error boundaries de manera más intuitiva.

### 2. Server Components
Los React Server Components permiten renderizar componentes en el servidor, reduciendo el JavaScript enviado al cliente y mejorando el rendimiento.

### 3. Streaming
Con el streaming, puedes enviar partes de tu UI al cliente de manera progresiva, mejorando significativamente los tiempos de carga percibidos.

## Ventajas sobre React tradicional

- **Mejor SEO**: Renderizado del lado del servidor por defecto
- **Rendimiento optimizado**: Code splitting automático
- **Developer Experience**: Hot reload, TypeScript integrado, y más
- **Optimización de imágenes**: Componente Image optimizado

## Conclusión

Next.js 14 es una opción excelente para cualquier proyecto React, desde blogs personales hasta aplicaciones empresariales complejas. Su ecosistema maduro y la comunidad activa lo convierten en una elección segura para el desarrollo moderno.',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop',
        '["María García", "Carlos Rodríguez"]',
        true,
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 2: TypeScript para Principiantes
INSERT INTO articulos (
        id,
        titulo,
        slug,
        descripcion,
        contenido,
        imagen,
        autors,
        publicado,
        created_at,
        updated_at
    )
VALUES (
        'art-typescript-002',
        'TypeScript para Principiantes: Guía Completa 2025',
        'typescript-principiantes-guia-completa-2025',
        'Aprende TypeScript desde cero con esta guía completa. Descubre cómo añadir tipos estáticos a JavaScript y mejorar tu código.',
        'TypeScript se ha convertido en el estándar de facto para el desarrollo JavaScript moderno. En esta guía, exploraremos todo lo que necesitas saber para comenzar.

## ¿Por qué TypeScript?

TypeScript es un superset de JavaScript que añade tipos estáticos opcionales. Esto significa que todo el código JavaScript válido también es código TypeScript válido.

## Ventajas de usar TypeScript

### 1. Detección temprana de errores
Los tipos te ayudan a detectar errores antes de ejecutar el código, ahorrando tiempo de debugging.

### 2. Mejor autocompletado
Los editores modernos como VS Code ofrecen un autocompletado increíble gracias a los tipos.

### 3. Documentación automática
Los tipos sirven como documentación que siempre está actualizada.

## Conceptos Básicos

### Tipos Primitivos
```typescript
let nombre: string = "Juan";
let edad: number = 25;
let activo: boolean = true;
```

### Interfaces
```typescript
interface Usuario {
  id: string;
  nombre: string;
  email: string;
}
```

### Types vs Interfaces
Ambos sirven para definir la forma de los objetos, pero tienen diferencias sutiles en casos de uso avanzados.

## Configuración

Para empezar con TypeScript, solo necesitas:
1. Instalar TypeScript: `npm install -D typescript`
2. Crear tsconfig.json: `npx tsc --init`
3. Comenzar a escribir código .ts

## Conclusión

TypeScript puede parecer intimidante al principio, pero los beneficios superan ampliamente la curva de aprendizaje inicial. Tu futuro yo te lo agradecerá.',
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=630&fit=crop',
        '["Ana Martínez", "Luis Fernández", "Sofia López"]',
        true,
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '1 day'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 3: PostgreSQL vs MySQL
INSERT INTO articulos (
        id,
        titulo,
        slug,
        descripcion,
        contenido,
        imagen,
        autors,
        publicado,
        created_at,
        updated_at
    )
VALUES (
        'art-postgresql-003',
        'PostgreSQL vs MySQL: ¿Cuál elegir en 2025?',
        'postgresql-vs-mysql-cual-elegir-2025',
        'Comparativa detallada entre PostgreSQL y MySQL. Descubre cuál base de datos se adapta mejor a las necesidades de tu proyecto.',
        'Elegir la base de datos correcta es una decisión crucial para cualquier proyecto. En este artículo, compararemos dos de las bases de datos relacionales más populares.

## Introducción

Tanto PostgreSQL como MySQL son sistemas de gestión de bases de datos relacionales (RDBMS) de código abierto, pero tienen diferencias significativas que pueden afectar tu decisión.

## PostgreSQL: La Base de Datos Avanzada

### Características Destacadas

**1. Conformidad con SQL**
PostgreSQL es conocido por su estricto cumplimiento de los estándares SQL, lo que garantiza mayor portabilidad.

**2. Tipos de Datos Avanzados**
Soporta JSON, JSONB, arrays, hstore y tipos personalizados, perfecto para aplicaciones modernas.

**3. Extensibilidad**
Puedes crear tus propias funciones, operadores y tipos de datos.

### Casos de Uso Ideales
- Aplicaciones que requieren consultas complejas
- Sistemas que manejan datos geoespaciales (PostGIS)
- Proyectos que necesitan ACID estricto

## MySQL: La Base de Datos Popular

### Características Destacadas

**1. Rendimiento en Lecturas**
MySQL tradicionalmente ha sido más rápido en operaciones de lectura simple.

**2. Facilidad de Uso**
Configuración más sencilla y curva de aprendizaje menor.

**3. Replicación**
Excelentes opciones de replicación y clustering.

### Casos de Uso Ideales
- Aplicaciones web tradicionales
- Sistemas que priorizan velocidad sobre funcionalidades avanzadas
- Proyectos que requieren compatibilidad con herramientas legacy

## Comparación Directa

| Característica | PostgreSQL | MySQL |
|---------------|------------|-------|
| Licencia | PostgreSQL License | GPL |
| ACID | ✅ Completo | ✅ Con InnoDB |
| JSON | ✅ Nativo | ⚠️ Limitado |
| Replicación | ✅ Streaming | ✅ Master-Slave |
| Extensiones | ✅ Muchas | ⚠️ Limitadas |

## Tendencias Actuales

En 2025, PostgreSQL ha ganado popularidad especialmente en:
- Startups tecnológicas
- Aplicaciones cloud-native
- Proyectos que usan servicios como Neon, Supabase o Railway

MySQL sigue siendo dominante en:
- WordPress y CMS tradicionales
- Aplicaciones legacy
- Hosting compartido

## Conclusión

No hay una respuesta única. PostgreSQL es ideal si necesitas características avanzadas y conformidad SQL estricta. MySQL es excelente si priorizas simplicidad y tienes un ecosistema existente.

Mi recomendación personal: Para proyectos nuevos en 2025, considera PostgreSQL, especialmente con servicios modernos como NeonDB que simplifican el despliegue.',
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=630&fit=crop',
        '["Roberto Sánchez"]',
        true,
        NOW() - INTERVAL '3 days',
        NOW() - INTERVAL '3 days'
    ) ON CONFLICT (id) DO NOTHING;
-- =============================================================================
-- 3. INSERTAR RELACIONES ARTÍCULO-CATEGORÍAS
-- =============================================================================
INSERT INTO articulo_categorias (id, articulo_id, categoria_id)
VALUES ('ac-001', 'art-nextjs-001', 'cat-tech-001'),
    ('ac-002', 'art-nextjs-001', 'cat-web-003'),
    ('ac-003', 'art-typescript-002', 'cat-prog-002'),
    ('ac-004', 'art-typescript-002', 'cat-web-003'),
    ('ac-005', 'art-postgresql-003', 'cat-tech-001'),
    ('ac-006', 'art-postgresql-003', 'cat-prog-002') ON CONFLICT (id) DO NOTHING;
-- =============================================================================
-- 4. VERIFICAR INSERCIÓN
-- =============================================================================
SELECT a.id,
    a.titulo,
    a.autors,
    a.publicado,
    COUNT(ac.id) as num_categorias
FROM articulos a
    LEFT JOIN articulo_categorias ac ON a.id = ac.articulo_id
WHERE a.id IN (
        'art-nextjs-001',
        'art-typescript-002',
        'art-postgresql-003'
    )
GROUP BY a.id,
    a.titulo,
    a.autors,
    a.publicado
ORDER BY a.created_at DESC;