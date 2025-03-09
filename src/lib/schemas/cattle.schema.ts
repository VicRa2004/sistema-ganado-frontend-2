import { z } from "zod";

// Función para procesar y validar fechas
const parseDate = (arg: unknown): Date | undefined => {
  if (typeof arg === "string" || arg instanceof Date) {
    const date = new Date(arg);
    return isNaN(date.getTime()) ? undefined : date;
  }
  return undefined;
};

// Función para convertir cadenas a números
const parseNumber = (arg: unknown): number | undefined => {
  if (typeof arg === "string") {
    const num = Number(arg);
    return isNaN(num) ? undefined : num;
  }
  if (typeof arg === "number") {
    return arg;
  }
  return undefined;
};

export const cattleSchema = z.object({
  description: z
    .string({
      required_error: "La descripción es requerida",
    })
    .trim()
    .min(1, "La descripción es requerida"),

  father: z.preprocess(parseNumber, z.number().optional()),

  mother: z.preprocess(parseNumber, z.number().optional()),

  gender: z.enum(["male", "female"]).optional().default("male"),

  registrationNumber: z
    .string({
      required_error: "El número de registro es requerido",
    })
    .trim()
    .min(8, "El número de registro debe tener al menos 8 caracteres")
    .max(15, "El número de registro debe tener máximo 15 caracteres"),

  lotNumber: z
    .string({ required_error: "El número de lote es requerido" })
    .trim()
    .min(6, "El número de lote debe tener al menos 6 caracteres")
    .max(12, "El número de lote debe tener máximo 12 caracteres"),

  color: z
    .string({ required_error: "El color es requerido" })
    .trim()
    .min(1, "El color es requerido")
    .max(50, "El color debe tener máximo 50 caracteres"),

  birthdate: z.preprocess(
    parseDate,
    z.date({ required_error: "La fecha de nacimiento es requerida" })
  ),

  observations: z.string().optional(),

  reason_for_withdrawal: z.string().optional(),

  status: z.preprocess(parseNumber, z.number().min(0).max(1).optional()),

  id_iron: z.preprocess(
    parseNumber,
    z
      .number({
        required_error: "El fierro es requerido",
      })
      .positive("El fierro debe ser un número positivo")
  ),

  id_race: z.preprocess(
    parseNumber,
    z
      .number({
        required_error: "La raza es requerida",
      })
      .positive("La raza debe ser un número positivo")
  ),

  id_ground: z.preprocess(
    parseNumber,
    z
      .number({
        required_error: "El terreno es requerido",
      })
      .positive("El terreno debe ser un número positivo")
  ),
});

export type CattleFormInputs = z.infer<typeof cattleSchema>;
