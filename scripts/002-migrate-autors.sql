-- Migración: Cambiar campo 'autor' por 'autors' (array de autores) y eliminar autor_id
-- Fecha: 2025-10-11

-- Paso 1: Agregar nueva columna 'autors' como TEXT (almacenará JSON array)
ALTER TABLE articulos
ADD COLUMN IF NOT EXISTS autors TEXT;

-- Paso 2: Migrar datos existentes: convertir 'autor' único a array JSON
UPDATE articulos
SET autors = json_build_array(autor)::text
WHERE autors IS NULL
    AND autor IS NOT NULL;

-- Paso 3: Establecer valor por defecto para registros sin autor
UPDATE articulos
SET autors = '["Anónimo"]'
WHERE autors IS NULL;

-- Paso 4: Hacer la columna NOT NULL
ALTER TABLE articulos
ALTER COLUMN autors
SET NOT NULL;

-- Paso 5: Establecer valor por defecto para nuevos registros
ALTER TABLE articulos
ALTER COLUMN autors
SET DEFAULT '["Anónimo"]';

-- Paso 6: Eliminar columna antigua 'autor'
ALTER TABLE articulos DROP COLUMN IF EXISTS autor;

-- Paso 7: Eliminar columna 'autor_id' (ya no se usa autenticación por usuario)
ALTER TABLE articulos DROP COLUMN IF EXISTS autor_id;

-- Verificación: Ver algunos registros migrados
SELECT id, titulo, autors FROM articulos LIMIT 5;