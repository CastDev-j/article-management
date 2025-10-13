-- Script de Seed para la Base de Datos
-- Fecha: 2025-10-12
-- Este script limpia e inserta: 15 categorías, 12 artículos y sus relaciones
-- =============================================================================
-- 1. LIMPIAR DATOS EXISTENTES
-- =============================================================================
DELETE FROM articulo_categorias;
DELETE FROM articulos;
DELETE FROM categorias;
-- =============================================================================
-- 2. INSERTAR 15 CATEGORÍAS
-- =============================================================================
INSERT INTO categorias (id, nombre, slug, created_at, updated_at)
VALUES (
        'cat-001',
        'Tecnología',
        'tecnologia',
        NOW(),
        NOW()
    ),
    (
        'cat-002',
        'Programación',
        'programacion',
        NOW(),
        NOW()
    ),
    (
        'cat-003',
        'Desarrollo Web',
        'desarrollo-web',
        NOW(),
        NOW()
    ),
    (
        'cat-004',
        'Inteligencia Artificial',
        'inteligencia-artificial',
        NOW(),
        NOW()
    ),
    (
        'cat-005',
        'Ciberseguridad',
        'ciberseguridad',
        NOW(),
        NOW()
    ),
    (
        'cat-006',
        'Bases de Datos',
        'bases-de-datos',
        NOW(),
        NOW()
    ),
    ('cat-007', 'DevOps', 'devops', NOW(), NOW()),
    (
        'cat-008',
        'Cloud Computing',
        'cloud-computing',
        NOW(),
        NOW()
    ),
    (
        'cat-009',
        'Mobile Development',
        'mobile-development',
        NOW(),
        NOW()
    ),
    (
        'cat-010',
        'Machine Learning',
        'machine-learning',
        NOW(),
        NOW()
    ),
    ('cat-011', 'Frontend', 'frontend', NOW(), NOW()),
    ('cat-012', 'Backend', 'backend', NOW(), NOW()),
    (
        'cat-013',
        'Data Science',
        'data-science',
        NOW(),
        NOW()
    ),
    (
        'cat-014',
        'Blockchain',
        'blockchain',
        NOW(),
        NOW()
    ),
    ('cat-015', 'IoT', 'iot', NOW(), NOW()) ON CONFLICT (id) DO NOTHING;
-- =============================================================================
-- 3. INSERTAR 12 ARTÍCULOS
-- =============================================================================
-- Artículo 1: Next.js 15
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
        'art-001',
        'Next.js 15: Las Nuevas Características que Revolucionarán el Desarrollo Web',
        'nextjs-15-nuevas-caracteristicas-desarrollo-web',
        'Explora las innovaciones de Next.js 15 que están transformando la forma en que construimos aplicaciones web modernas.',
        '# Next.js 15: El Futuro del Desarrollo Web

Next.js 15 introduce cambios revolucionarios que mejoran significativamente la experiencia del desarrollador y el rendimiento de las aplicaciones.

## Características Principales

### 1. Turbopack Estable
Turbopack, el sucesor de Webpack, ahora es estable y ofrece compilaciones hasta 700 veces más rápidas en desarrollo.

### 2. React Server Components Mejorados
Los componentes de servidor ahora tienen mejor soporte para streaming y partial hydration, mejorando los tiempos de carga.

### 3. App Router Optimizado
El App Router ha sido optimizado con mejores prefetching strategies y cache management automático.

## Mejoras de Rendimiento

- **Build times reducidos**: Hasta un 50% más rápido en producción
- **Bundle size optimizado**: Tree-shaking mejorado reduce el tamaño final
- **Image optimization**: Nuevo formato AVIF por defecto

## Migración desde Next.js 14

La migración es sencilla gracias a las herramientas automáticas de codemod que Next.js proporciona.

## Conclusión

Next.js 15 consolida su posición como el framework líder para React, ofreciendo un equilibrio perfecto entre potencia y simplicidad.',
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop',
        '["Laura Martínez", "Diego Torres"]',
        true,
        NOW(),
        NOW()
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 2: Python AI
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
        'art-002',
        'Inteligencia Artificial con Python: Guía Completa para Principiantes',
        'inteligencia-artificial-python-guia-principiantes',
        'Aprende a crear tus primeros modelos de IA usando Python, TensorFlow y las mejores prácticas de la industria.',
        '# IA con Python: Tu Camino hacia el Machine Learning

Python se ha convertido en el lenguaje dominante para la inteligencia artificial. En esta guía, exploraremos por qué y cómo empezar.

## ¿Por qué Python para IA?

### Ecosistema Rico
- **TensorFlow**: Framework de Google para deep learning
- **PyTorch**: Preferido por investigadores
- **Scikit-learn**: Perfecto para comenzar con ML clásico

### Sintaxis Clara
Python permite expresar ideas complejas de forma simple y legible.

## Primeros Pasos

### 1. Instalación del Entorno
```python
pip install tensorflow numpy pandas matplotlib
```

### 2. Tu Primera Red Neuronal
Comenzaremos con un modelo simple de clasificación de imágenes usando MNIST.

### 3. Entrenamiento y Validación
Aprende a dividir tus datos correctamente y evaluar el rendimiento del modelo.

## Proyectos Prácticos

- Clasificador de imágenes
- Chatbot con procesamiento de lenguaje natural
- Sistema de recomendación

## Recursos Adicionales

Cursos recomendados, libros y comunidades para seguir aprendiendo.

## Conclusión

La IA con Python es más accesible que nunca. Con dedicación y práctica, estarás creando modelos sofisticados en poco tiempo.',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
        '["Carlos Ramírez", "Ana Silva"]',
        true,
        NOW() - INTERVAL '1 day',
        NOW() - INTERVAL '1 day'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 3: Docker y Kubernetes
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
        'art-003',
        'Docker y Kubernetes: La Dupla Perfecta para DevOps Moderno',
        'docker-kubernetes-devops-moderno',
        'Domina la containerización y orquestación de aplicaciones con Docker y Kubernetes en entornos de producción.',
        '# Docker y Kubernetes: Infraestructura como Código

En el mundo DevOps moderno, Docker y Kubernetes se han convertido en herramientas esenciales.

## Docker: Containerización Simplificada

### ¿Qué es Docker?
Docker permite empaquetar aplicaciones con todas sus dependencias en contenedores portables.

### Ventajas Clave
- **Consistencia**: Mismo comportamiento en desarrollo y producción
- **Eficiencia**: Más ligero que máquinas virtuales
- **Velocidad**: Deploy en segundos

## Kubernetes: Orquestación a Escala

### Características Principales
- **Auto-scaling**: Escala automáticamente según la demanda
- **Self-healing**: Reinicia contenedores fallidos automáticamente
- **Load balancing**: Distribuye tráfico inteligentemente

## Arquitectura Básica

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mi-app
spec:
  containers:
  - name: web
    image: nginx:latest
```

## Best Practices

1. **Usa multi-stage builds** para reducir el tamaño de imágenes
2. **Implementa health checks** en todos los contenedores
3. **Configura resource limits** para evitar overconsumption

## Herramientas Complementarias

- Helm: Gestión de paquetes para Kubernetes
- Prometheus: Monitoreo y alertas
- Istio: Service mesh para microservicios

## Conclusión

La combinación de Docker y Kubernetes es fundamental para cualquier estrategia DevOps moderna.',
        'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=630&fit=crop',
        '["Miguel Ángel Pérez"]',
        true,
        NOW() - INTERVAL '2 days',
        NOW() - INTERVAL '2 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 4: React Hooks
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
        'art-004',
        'React Hooks Avanzados: Patrones y Mejores Prácticas 2025',
        'react-hooks-avanzados-patrones-mejores-practicas',
        'Descubre patrones avanzados de React Hooks para crear aplicaciones más eficientes y mantenibles.',
        '# React Hooks Avanzados

Los Hooks revolucionaron React, pero dominar los patrones avanzados lleva tu código al siguiente nivel.

## Hooks Personalizados

### useDebounce
Optimiza búsquedas y llamadas a APIs:

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}
```

### useLocalStorage
Sincroniza estado con localStorage automáticamente.

## Patrones de Optimización

### 1. useMemo para Cálculos Costosos
Evita recalcular valores en cada render.

### 2. useCallback para Funciones Estables
Previene re-renders innecesarios en componentes hijos.

### 3. useTransition para Actualizaciones No Urgentes
Mejora la experiencia del usuario en operaciones pesadas.

## Context API con Hooks

Combina useContext con useReducer para gestión de estado global sin Redux.

## Testing de Hooks

```javascript
import { renderHook } from "@testing-library/react-hooks";

test("useCounter increments", () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

## Conclusión

Dominar estos patrones te convertirá en un desarrollador React más efectivo y eficiente.',
        'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=1200&h=630&fit=crop',
        '["Sofía González", "Javier Ruiz"]',
        true,
        NOW() - INTERVAL '3 days',
        NOW() - INTERVAL '3 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 5: Ciberseguridad Web
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
        'art-005',
        'Ciberseguridad Web: Protege tus Aplicaciones de las Amenazas Más Comunes',
        'ciberseguridad-web-protege-aplicaciones-amenazas',
        'Guía práctica para implementar medidas de seguridad efectivas en aplicaciones web modernas.',
        '# Ciberseguridad Web Esencial

La seguridad no es opcional. Aquí te mostramos cómo proteger tus aplicaciones contra las amenazas más comunes.

## Top 10 de OWASP 2025

### 1. Inyección SQL
**Problema**: Atacantes ejecutan comandos SQL maliciosos.
**Solución**: Usa consultas parametrizadas siempre.

### 2. Autenticación Rota
**Problema**: Sesiones débiles o mal implementadas.
**Solución**: Implementa JWT con refresh tokens y expiración adecuada.

### 3. XSS (Cross-Site Scripting)
**Problema**: Inyección de scripts maliciosos.
**Solución**: Sanitiza todas las entradas del usuario.

## Implementación de Seguridad

### Headers de Seguridad
```javascript
// Next.js middleware
export function middleware(request) {
  const headers = new Headers(request.headers);
  headers.set("X-Frame-Options", "DENY");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Strict-Transport-Security", "max-age=31536000");
  return NextResponse.next({ headers });
}
```

### Rate Limiting
Previene ataques de fuerza bruta limitando peticiones.

### Validación de Entrada
Nunca confíes en los datos del usuario. Valida todo.

## Herramientas Recomendadas

- **OWASP ZAP**: Scanner de vulnerabilidades
- **Snyk**: Detecta vulnerabilidades en dependencias
- **SSL Labs**: Verifica tu configuración HTTPS

## Checklist de Seguridad

- [ ] HTTPS en producción
- [ ] Headers de seguridad configurados
- [ ] Validación de entrada implementada
- [ ] Rate limiting activo
- [ ] Dependencias actualizadas
- [ ] Logs de seguridad configurados

## Conclusión

La seguridad es un proceso continuo. Mantente actualizado y revisa tu código regularmente.',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
        '["Roberto Méndez", "Patricia Vega"]',
        true,
        NOW() - INTERVAL '4 days',
        NOW() - INTERVAL '4 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 6: PostgreSQL Avanzado
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
        'art-006',
        'PostgreSQL Avanzado: Optimización y Técnicas de Alto Rendimiento',
        'postgresql-avanzado-optimizacion-alto-rendimiento',
        'Aprende técnicas avanzadas de PostgreSQL para optimizar consultas y mejorar el rendimiento de tu base de datos.',
        '# PostgreSQL: Más Allá de lo Básico

PostgreSQL es mucho más que una base de datos relacional. Descubre sus capacidades avanzadas.

## Optimización de Consultas

### EXPLAIN ANALYZE
Tu mejor amigo para entender el rendimiento:

```sql
EXPLAIN ANALYZE
SELECT * FROM articulos 
WHERE publicado = true
ORDER BY created_at DESC;
```

### Índices Estratégicos
- **B-Tree**: Por defecto, perfecto para comparaciones
- **GIN**: Ideal para búsquedas en arrays y JSON
- **GiST**: Excelente para datos geoespaciales

## Funciones Avanzadas

### Window Functions
```sql
SELECT titulo,
       autors,
       ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY created_at DESC) as rank
FROM articulos;
```

### CTEs (Common Table Expressions)
Mejora la legibilidad de consultas complejas.

### JSON Operations
```sql
SELECT id, 
       autors->0 as primer_autor
FROM articulos
WHERE autors @> ' ["Carlos Ramírez"] ';
```

## Particionamiento de Tablas

Para tablas masivas, el particionamiento mejora el rendimiento dramáticamente.

## Replicación y Alta Disponibilidad

- **Streaming Replication**: Para read replicas
- **Logical Replication**: Para migraciones y upgrades
- **Patroni**: Alta disponibilidad automática

## Monitoreo

```sql
-- Consultas lentas
SELECT query, calls, mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

## Conclusión

PostgreSQL ofrece herramientas poderosas. Dominarlas te convierte en un DBA de elite.',
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&h=630&fit=crop',
        '["Fernando Castro"]',
        true,
        NOW() - INTERVAL '5 days',
        NOW() - INTERVAL '5 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 7: TypeScript Avanzado
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
        'art-007',
        'TypeScript Avanzado: Tipos Genéricos y Utilidades del Sistema de Tipos',
        'typescript-avanzado-tipos-genericos-utilidades',
        'Domina el sistema de tipos de TypeScript con genéricos, tipos condicionales y utility types avanzados.',
        '# TypeScript Avanzado

El sistema de tipos de TypeScript es increíblemente poderoso. Exploremos sus características avanzadas.

## Genéricos Avanzados

### Constraints y Extends
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### Genéricos en Clases
```typescript
class DataStore<T> {
  private data: T[] = [];
  
  add(item: T): void {
    this.data.push(item);
  }
  
  get(index: number): T | undefined {
    return this.data[index];
  }
}
```

## Tipos Condicionales

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Extract<T, U> = T extends U ? T : never;
```

## Utility Types

### Partial y Required
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // Todos opcionales
type RequiredUser = Required<User>; // Todos requeridos
```

### Pick y Omit
```typescript
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;
```

## Mapped Types

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

## Template Literal Types

```typescript
type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type Endpoint = `api/${string}`;
type Route = `${HTTPMethod} ${Endpoint}`;
```

## Best Practices

1. Usa `unknown` en lugar de `any` cuando sea posible
2. Aprovecha la inferencia de tipos
3. Define tipos en archivos `.d.ts` para bibliotecas
4. Usa `strict` mode siempre

## Conclusión

Dominar estos conceptos te permite escribir código más seguro y mantenible.',
        'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=630&fit=crop',
        '["Isabel Moreno", "Andrés López"]',
        true,
        NOW() - INTERVAL '6 days',
        NOW() - INTERVAL '6 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 8: AWS Cloud
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
        'art-008',
        'AWS para Desarrolladores: De Zero a Cloud en 30 Días',
        'aws-desarrolladores-zero-cloud-30-dias',
        'Guía completa para desarrolladores que quieren dominar Amazon Web Services y desplegar aplicaciones en la nube.',
        '# AWS: Tu Puerta a la Nube

Amazon Web Services domina el mercado cloud. Aquí te enseñamos lo esencial.

## Servicios Fundamentales

### EC2: Computación Elástica
Servidores virtuales escalables bajo demanda.

### S3: Almacenamiento de Objetos
Almacena y recupera cualquier cantidad de datos desde cualquier lugar.

### RDS: Bases de Datos Gestionadas
PostgreSQL, MySQL, MariaDB sin la complejidad de administración.

### Lambda: Serverless Computing
Ejecuta código sin gestionar servidores.

## Arquitectura Moderna en AWS

### Aplicación Web Típica
```
CloudFront (CDN)
    ↓
Application Load Balancer
    ↓
EC2 Auto Scaling Group
    ↓
RDS (Database)
```

### Serverless
```
API Gateway
    ↓
Lambda Functions
    ↓
DynamoDB
```

## Infraestructura como Código

### AWS CDK (TypeScript)
```typescript
const bucket = new s3.Bucket(this, "MyBucket", {
  versioned: true,
  encryption: s3.BucketEncryption.S3_MANAGED,
});
```

### Terraform
Alternativa multi-cloud popular.

## Seguridad en AWS

- **IAM**: Gestión de identidades y permisos
- **VPC**: Redes virtuales aisladas
- **Security Groups**: Firewalls a nivel de instancia
- **KMS**: Gestión de claves de cifrado

## Costos y Optimización

1. Usa **Reserved Instances** para cargas predecibles
2. Implementa **Auto Scaling** para eficiencia
3. Aprovecha **Spot Instances** para workloads tolerantes a fallos
4. Monitorea con **Cost Explorer**

## Certificaciones Recomendadas

- AWS Certified Cloud Practitioner (Básica)
- AWS Certified Developer - Associate
- AWS Certified Solutions Architect - Associate

## Conclusión

AWS puede parecer abrumador, pero con práctica estructurada dominarás la nube.',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        '["Gabriela Soto", "Manuel Herrera"]',
        true,
        NOW() - INTERVAL '7 days',
        NOW() - INTERVAL '7 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 9: React Native
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
        'art-009',
        'React Native 2025: Desarrollo Mobile Multiplataforma con una Sola Base de Código',
        'react-native-2025-desarrollo-mobile-multiplataforma',
        'Aprende a crear aplicaciones móviles nativas para iOS y Android usando React Native y JavaScript.',
        '# React Native: Un Código, Dos Plataformas

React Native permite crear apps móviles verdaderamente nativas usando JavaScript y React.

## ¿Por qué React Native?

### Ventajas Clave
- **Code Sharing**: 90%+ de código compartido entre iOS y Android
- **Hot Reload**: Ver cambios instantáneamente
- **Componentes Nativos**: Rendimiento de app nativa real
- **Comunidad**: Ecosistema rico y maduro

### Empresas que usan React Native
- Facebook, Instagram, Discord, Shopify, Microsoft

## Setup y Primeros Pasos

### Expo vs React Native CLI
**Expo**: Perfecto para comenzar, desarrollo más rápido.
**RN CLI**: Más control, acceso a módulos nativos personalizados.

### Tu Primera App
```javascript
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>¡Hola Mundo!</Text>
    </View>
  );
}
```

## Navegación

### React Navigation
```javascript
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## Estado Global

### Context API + Hooks
Para apps pequeñas a medianas.

### Redux Toolkit
Para aplicaciones complejas con estado complejo.

## Acceso a Características Nativas

```javascript
import * as Location from "expo-location";
import * as Camera from "expo-camera";
import * as Notifications from "expo-notifications";
```

## Performance

- **Optimiza re-renders** con React.memo y useMemo
- **Usa FlatList** para listas largas
- **Lazy load** imágenes y componentes pesados
- **Profile con Flipper**

## Deployment

### iOS
- Apple Developer Program ($99/año)
- TestFlight para beta testing
- App Store submission

### Android
- Google Play Console ($25 único)
- Internal testing tracks
- Play Store publication

## Conclusión

React Native democratiza el desarrollo mobile. Si sabes React, puedes crear apps móviles.',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop',
        '["Valentina Rojas", "Ricardo Núñez"]',
        true,
        NOW() - INTERVAL '8 days',
        NOW() - INTERVAL '8 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 10: Machine Learning
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
        'art-010',
        'Machine Learning Práctico: De los Fundamentos a la Producción',
        'machine-learning-practico-fundamentos-produccion',
        'Guía completa para implementar modelos de machine learning desde el desarrollo hasta el despliegue en producción.',
        '# Machine Learning en Producción

Crear modelos es solo el principio. Llevarlos a producción es el verdadero desafío.

## El Pipeline Completo

### 1. Recolección de Datos
La calidad de tus datos determina el éxito de tu modelo.

```python
import pandas as pd
import numpy as np

# Cargar y explorar datos
df = pd.read_csv("data.csv")
df.describe()
df.info()
```

### 2. Preprocesamiento

```python
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Dividir datos
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Normalizar
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

### 3. Entrenamiento

```python
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100)
model.fit(X_train_scaled, y_train)
```

### 4. Evaluación

```python
from sklearn.metrics import classification_report, confusion_matrix

y_pred = model.predict(X_test_scaled)
print(classification_report(y_test, y_pred))
```

## Despliegue con FastAPI

```python
from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
def predict(features: list):
    prediction = model.predict([features])
    return {"prediction": int(prediction[0])}
```

## MLOps Essentials

### Tracking con MLflow
```python
import mlflow

mlflow.start_run()
mlflow.log_param("n_estimators", 100)
mlflow.log_metric("accuracy", accuracy)
mlflow.sklearn.log_model(model, "model")
mlflow.end_run()
```

### Monitoreo en Producción
- **Data Drift**: Detecta cambios en la distribución de datos
- **Model Decay**: Monitorea la degradación del rendimiento
- **A/B Testing**: Compara modelos en producción

## Best Practices

1. **Version Control**: Versiona datos, código Y modelos
2. **Reproducibilidad**: Fija random seeds y documenta
3. **Validación**: Usa cross-validation siempre
4. **Interpretabilidad**: SHAP values para explicar predicciones

## Herramientas Clave

- **Jupyter**: Experimentación
- **DVC**: Version control para datos
- **Weights & Biases**: Tracking de experimentos
- **Docker**: Containerización de modelos

## Conclusión

ML en producción requiere mucho más que entrenar modelos. Es un proceso end-to-end.',
        'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&h=630&fit=crop',
        '["Daniela Campos", "Sebastián Ortiz"]',
        true,
        NOW() - INTERVAL '9 days',
        NOW() - INTERVAL '9 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 11: GraphQL
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
        'art-011',
        'GraphQL vs REST: La Evolución de las APIs Web',
        'graphql-vs-rest-evolucion-apis-web',
        'Descubre por qué GraphQL está reemplazando REST en aplicaciones modernas y cómo implementarlo correctamente.',
        '# GraphQL: El Futuro de las APIs

GraphQL resuelve muchos problemas inherentes a REST, ofreciendo una forma más eficiente de consumir datos.

## Problemas de REST

### Over-fetching
Recibes más datos de los que necesitas.

### Under-fetching
Necesitas múltiples requests para obtener todos los datos.

### Versionado
REST requiere versionado de APIs (/v1, /v2).

## GraphQL al Rescate

### Una Query, Todos los Datos
```graphql
query {
  user(id: "123") {
    name
    email
    posts {
      title
      comments {
        content
        author {
          name
        }
      }
    }
  }
}
```

### Schema Fuertemente Tipado
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
}
```

## Implementación con Apollo Server

```javascript
import { ApolloServer } from "@apollo/server";

const typeDefs = `#graphql
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;

const resolvers = {
  Query: {
    users: () => User.findAll(),
    user: (_, { id }) => User.findByPk(id),
  },
  Mutation: {
    createUser: (_, { input }) => User.create(input),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
```

## Cliente con Apollo Client

```javascript
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

function Users() {
  const { loading, error, data } = useQuery(GET_USERS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  
  return data.users.map(user => (
    <div key={user.id}>{user.name}</div>
  ));
}
```

## Optimizaciones

### DataLoader
Evita el problema N+1:

```javascript
const userLoader = new DataLoader(async (keys) => {
  const users = await User.findAll({
    where: { id: keys }
  });
  return keys.map(key => users.find(u => u.id === key));
});
```

### Persisted Queries
Reduce el tamaño de las peticiones enviando solo hashes.

### Caching
Apollo Client tiene cache inteligente out-of-the-box.

## Cuándo Usar GraphQL

✅ **SÍ** para:
- Apps con múltiples clientes (web, mobile, etc.)
- UIs complejas con datos relacionados
- Equipos grandes con frontend/backend separados

❌ **NO** para:
- APIs públicas simples
- File uploads (aunque es posible)
- Equipos pequeños que prefieren simplicidad

## Conclusión

GraphQL no reemplaza REST en todos los casos, pero ofrece ventajas significativas para aplicaciones modernas.',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop',
        '["Camila Vargas"]',
        true,
        NOW() - INTERVAL '10 days',
        NOW() - INTERVAL '10 days'
    ) ON CONFLICT (id) DO NOTHING;
-- Artículo 12: Blockchain
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
        'art-012',
        'Blockchain y Smart Contracts: Desarrollo en Ethereum con Solidity',
        'blockchain-smart-contracts-ethereum-solidity',
        'Aprende a desarrollar aplicaciones descentralizadas (dApps) y smart contracts en Ethereum usando Solidity.',
        '# Blockchain Development: Más Allá de las Criptomonedas

Blockchain no es solo Bitcoin. Es una tecnología que está transformando múltiples industrias.

## ¿Qué es Blockchain?

Una base de datos distribuida e inmutable que registra transacciones en bloques encadenados criptográficamente.

### Características Clave
- **Descentralización**: No hay autoridad central
- **Inmutabilidad**: Los datos no pueden modificarse
- **Transparencia**: Todas las transacciones son públicas
- **Seguridad**: Criptografía de grado militar

## Smart Contracts

Programas que se ejecutan automáticamente cuando se cumplen condiciones predefinidas.

### Tu Primer Smart Contract (Solidity)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private storedData;
    
    event DataStored(uint256 newValue);
    
    function set(uint256 x) public {
        storedData = x;
        emit DataStored(x);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}
```

### Contract más Complejo: Token ERC-20

```solidity
contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
}
```

## Desarrollo de dApps

### Stack Tecnológico
- **Smart Contracts**: Solidity
- **Framework**: Hardhat o Truffle
- **Frontend**: React + Web3.js o Ethers.js
- **Wallet**: MetaMask

### Interacción desde Frontend

```javascript
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  signer
);

// Llamar función
const tx = await contract.set(42);
await tx.wait();

// Leer dato
const value = await contract.get();
```

## Testing con Hardhat

```javascript
describe("SimpleStorage", function () {
  it("Should store and retrieve value", async function () {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const storage = await SimpleStorage.deploy();
    
    await storage.set(42);
    expect(await storage.get()).to.equal(42);
  });
});
```

## Gas y Optimización

El gas es el costo de ejecutar operaciones en Ethereum.

### Tips de Optimización
- Usa `uint256` en lugar de tipos más pequeños
- Agrupa variables de storage cuando sea posible
- Evita loops en storage
- Usa `calldata` en lugar de `memory` para arrays

## Seguridad

### Vulnerabilidades Comunes
1. **Reentrancy**: Usa el patrón Checks-Effects-Interactions
2. **Integer Overflow**: Solidity 0.8+ lo previene automáticamente
3. **Access Control**: Implementa roles y permisos

### Auditorías
Antes de desplegar a mainnet, audita tu código con:
- Slither (análisis estático)
- MythX (análisis de seguridad)
- Auditorías profesionales

## Casos de Uso Reales

- **DeFi**: Finanzas descentralizadas (Uniswap, Aave)
- **NFTs**: Tokens no fungibles (arte digital, gaming)
- **DAOs**: Organizaciones autónomas descentralizadas
- **Supply Chain**: Trazabilidad de productos

## Conclusión

Blockchain abre un mundo de posibilidades. El futuro es descentralizado.',
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=630&fit=crop',
        '["Martín Jiménez", "Carolina Reyes"]',
        true,
        NOW() - INTERVAL '11 days',
        NOW() - INTERVAL '11 days'
    ) ON CONFLICT (id) DO NOTHING;
-- =============================================================================
-- 4. INSERTAR RELACIONES ARTÍCULO-CATEGORÍAS
-- =============================================================================
INSERT INTO articulo_categorias (id, articulo_id, categoria_id)
VALUES -- Artículo 1: Next.js (Tecnología, Desarrollo Web, Frontend)
    ('ac-001', 'art-001', 'cat-001'),
    ('ac-002', 'art-001', 'cat-003'),
    ('ac-003', 'art-001', 'cat-011'),
    -- Artículo 2: Python AI (IA, Machine Learning, Programación)
    ('ac-004', 'art-002', 'cat-004'),
    ('ac-005', 'art-002', 'cat-010'),
    ('ac-006', 'art-002', 'cat-002'),
    -- Artículo 3: Docker y Kubernetes (DevOps, Cloud Computing, Tecnología)
    ('ac-007', 'art-003', 'cat-007'),
    ('ac-008', 'art-003', 'cat-008'),
    ('ac-009', 'art-003', 'cat-001'),
    -- Artículo 4: React Hooks (Frontend, Desarrollo Web, Programación)
    ('ac-010', 'art-004', 'cat-011'),
    ('ac-011', 'art-004', 'cat-003'),
    ('ac-012', 'art-004', 'cat-002'),
    -- Artículo 5: Ciberseguridad (Ciberseguridad, Desarrollo Web)
    ('ac-013', 'art-005', 'cat-005'),
    ('ac-014', 'art-005', 'cat-003'),
    -- Artículo 6: PostgreSQL (Bases de Datos, Backend, Tecnología)
    ('ac-015', 'art-006', 'cat-006'),
    ('ac-016', 'art-006', 'cat-012'),
    ('ac-017', 'art-006', 'cat-001'),
    -- Artículo 7: TypeScript (Programación, Desarrollo Web, Frontend)
    ('ac-018', 'art-007', 'cat-002'),
    ('ac-019', 'art-007', 'cat-003'),
    ('ac-020', 'art-007', 'cat-011'),
    -- Artículo 8: AWS (Cloud Computing, DevOps, Tecnología)
    ('ac-021', 'art-008', 'cat-008'),
    ('ac-022', 'art-008', 'cat-007'),
    ('ac-023', 'art-008', 'cat-001'),
    -- Artículo 9: React Native (Mobile Development, Frontend, Programación)
    ('ac-024', 'art-009', 'cat-009'),
    ('ac-025', 'art-009', 'cat-011'),
    ('ac-026', 'art-009', 'cat-002'),
    -- Artículo 10: Machine Learning (ML, Data Science, IA)
    ('ac-027', 'art-010', 'cat-010'),
    ('ac-028', 'art-010', 'cat-013'),
    ('ac-029', 'art-010', 'cat-004'),
    -- Artículo 11: GraphQL (Backend, Desarrollo Web, Programación)
    ('ac-030', 'art-011', 'cat-012'),
    ('ac-031', 'art-011', 'cat-003'),
    ('ac-032', 'art-011', 'cat-002'),
    -- Artículo 12: Blockchain (Blockchain, Programación, Tecnología)
    ('ac-033', 'art-012', 'cat-014'),
    ('ac-034', 'art-012', 'cat-002'),
    ('ac-035', 'art-012', 'cat-001') ON CONFLICT (id) DO NOTHING;
-- =============================================================================
-- 5. VERIFICAR INSERCIÓN
-- =============================================================================
SELECT 'Categorías insertadas:' as info,
    COUNT(*) as total
FROM categorias
UNION ALL
SELECT 'Artículos insertados:',
    COUNT(*)
FROM articulos
UNION ALL
SELECT 'Relaciones creadas:',
    COUNT(*)
FROM articulo_categorias;