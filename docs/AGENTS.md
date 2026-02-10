# Documentación del Proyecto: Sistema Ganado Frontend

## 1. Visión General

Este es un proyecto frontend desarrollado con **React**, **Vite** y **TypeScript**. La arquitectura sigue los principios de **Clean Architecture** (Arquitectura Limpia) para separar las capas de dominio, aplicación e infraestructura. El objetivo es mantener el código desacoplado, testearle y fácil de mantener.

## 2. Estructura del Proyecto

### Directorios Principales (`src/`)

- **`modules/`**: El núcleo de la lógica de negocio. Cada módulo (ej. `user`, `ground`) encapsula su propia vertical.
  - **`domain/`**: Entidades, Value Objects e interfaces de repositorio. **Sin dependencias de frameworks.**
  - **`application/`**: Casos de uso y servicios. Orquesta la lógica usando interfaces del dominio.
  - **`infrastructure/`**: Implementaciones concretas (Repositorios con Axios, DTOs).
- **`core/`**: Código compartido transversal (Configuración HTTP, tipos globales como `Pagination`, utilidades).
- **`components/ui/`**: Librería de componentes reutilizables (Inputs, Cards, Modales).
- **`hooks/`**: Hooks personalizados (generalmente para consumir servicios con React Query).
- **`pages/`**: Vistas y rutas de la aplicación.

## 3. Arquitectura y Ejemplos Completos

Tomaremos el módulo `Ground` (Terrenos) como ejemplo canónico de cómo implementar una funcionalidad completa.

### Capa de Dominio (Domain)

Define **qué** es y **qué** hace el negocio. Solo contiene interfaces y tipos puros.

**Archivo: `src/modules/ground/domain/Ground.ts`**

```typescript
export interface Ground {
  id: number;
  name: string;
  image?: string; // URL de la imagen
  width: number;
  length: number;
  address: string;
  notes: string; // Value Object podría ir aquí si fuera complejo
  createdAt: Date;
  updatedAt: Date;
}

// DTOs para creación y actualización
export interface GroundCreate {
  name: string;
  image?: File; // Aquí manejamos File para subidas
  width: number;
  // ... resto de propiedades
}
```

**Archivo: `src/modules/ground/domain/GroundRepository.ts`**

```typescript
import { Pagination } from "@/core/shared/domain/Pagination";
import { Ground, GroundCreate, GroundUpdate } from "./Ground";

export interface GroundFilters {
  page: number;
  limit: number;
}

export interface GroundRepository {
  find(filters: GroundFilters): Promise<Pagination<Ground>>;
  findById(id: number): Promise<Ground | null>;
  create(ground: GroundCreate): Promise<Ground>;
  update(ground: GroundUpdate): Promise<Ground>;
  delete(id: number): Promise<void>;
}
```

### Capa de Infraestructura (Infrastructure)

Define **cómo** se obtienen los datos. Implementa la interfaz del repositorio usando una librería concreta (Axios).

**Archivo: `src/modules/ground/infrastructure/repositories/AxiosGroundRepository.ts`**

```typescript
import { axiosClient } from "@/core/http/axiosClient";
import { GroundRepository, GroundFilters } from "../../domain/GroundRepository";
import { Ground } from "../../domain/Ground";

export class AxiosGroundRepository implements GroundRepository {
  async find(filters: GroundFilters): Promise<Pagination<Ground>> {
    const { data } = await axiosClient.get("/ground", { params: filters });

    // Mapeo de respuesta de API a Dominio (si es necesario)
    // Es CRÍTICO convertir cadenas de fecha a objetos Date aquí
    const mappedItems = data.data.items.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));

    return { ...data.data, items: mappedItems };
  }

  async create(ground: GroundCreate): Promise<Ground> {
    // Manejo de FormData para subida de archivos
    const formData = new FormData();
    formData.append("data", JSON.stringify(ground));
    if (ground.image) formData.append("image", ground.image);

    const { data } = await axiosClient.post("/ground", formData);
    return data.data;
  }

  // ... implementación de update, delete, findById
}
```

### Capa de Aplicación (Application)

Define los **casos de uso**. Utilizamos un patrón de factoría para inyectar el repositorio.

**Archivo: `src/modules/ground/application/GroundService.ts`**

```typescript
import { GroundRepository } from "../domain/GroundRepository";

export const createGroundService = (repository: GroundRepository) => {
  return {
    getAll(filters) {
      return repository.find(filters);
    },
    create(ground) {
      // Aquí podría ir lógica de validación de negocio adicional
      return repository.create(ground);
    },
    // ... otros métodos expuestos
  };
};
```

## 4. Consumo en React (Hooks & UI)

### Hooks (Wiring)

Conectamos la capa de aplicación con la vista usando React Query.

**Archivo: `src/hooks/useGround.ts`**

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroundService } from "@/modules/ground/application/GroundService";
import { AxiosGroundRepository } from "@/modules/ground/infrastructure/repositories/AxiosGroundRepository";

// Instancia del servicio (puede ser global o useMemo si tiene dependencias variables)
const repository = new AxiosGroundRepository();
const groundService = createGroundService(repository);

export const useGrounds = (page = 1) => {
  const query = useQuery({
    queryKey: ["grounds", page],
    queryFn: () => groundService.getAll({ page, limit: 10 }),
  });

  return query;
};

export const useCreateGround = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: groundService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grounds"] });
    },
  });
};
```

### UI Component Example

Ejemplo de componente reutilizable siguiendo estilos.

**Archivo: `src/components/ui/Input.tsx`**

```tsx
import { forwardRef } from "react";

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ labelText, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {labelText && <label>{labelText}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${className}`}
          {...props}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  },
);
```

## 5. Flujo de Trabajo Recomendado

Para agregar una nueva funcionalidad:

1.  **Domain**: Crea la carpeta del módulo. Define la interfaz de la Entidad y la interfaz del Repositorio en `domain/`.
    - _Tip_: Define claramente los tipos de entrada (ej. `UserCreate`) vs la entidad completa (`User`).
2.  **Infrastructure**: Crea la clase repository en `infrastructure/repositories/` implementando la interfaz definida.
    - _Tip_: Usa `axiosClient` de `@/core`. Asegúrate de transformar datos crudos (strings de fecha) a tipos de dominio correctos (`Date`).
3.  **Application**: Crea el servicio en `application/` inyectando el repositorio.
4.  **Hook**: Crea un custom hook en `src/hooks/` que use `useQuery` o `useMutation` llamando a los métodos del servicio.
5.  **UI**: Construye la interfaz usando los componentes de `src/components/ui` y conecta el hook.

## 6. Dependencias y Estilos

- **Librerías**: `react-hook-form` + `zod` para validación de formularios. `@heroui/react` para componentes base.
- **Estilos**: Tailwind CSS puro para layout y espaciado.
- **Utilidades**: Usa `cn` (de `src/lib/utils.ts`) para combinar clases condicionalmente:
  ```tsx
  <div className={cn("p-4 bg-white", isActive && "bg-blue-50")}>
  ```

## 7. Notas Adicionales

- **Legacy Alert**: Puedes encontrar servicios antiguos en `src/services/`. Evita replicar este patrón. Prefiere siempre la estructura modular en `src/modules/`.
- **Axios**: Usa siempre la instancia configurada en `@/core/http/axiosClient` (o `src/lib/axios.ts`) para tener los interceptores de auth automáticos.
