import { z } from "zod";
import { CattleType } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "@nextui-org/react";
import { TextArea } from "../ui/TextArea";

// Para procesar la fecha de nacimiento a Date si se envía como string
const parseDate = (arg: unknown) => {
  if (typeof arg === "string" || arg instanceof Date) {
    const date = new Date(arg);
    return isNaN(date.getTime()) ? undefined : date;
  }
  return undefined;
};

const cattleSchema = z.object({
  description: z
    .string({
      required_error: "La descripción es requerida",
    })
    .trim()
    .min(1, "La descripción es requerida"),
  father: z.number().optional(),
  mother: z.number().optional(),
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
  status: z.number().min(0).max(1).optional(),
  id_iron: z
    .number({ required_error: "El fierro es requerido" })
    .positive("El fierro debe ser un número positivo"),
  id_race: z
    .number({ required_error: "La raza es requerida" })
    .positive("La raza debe ser un número positivo"),
  id_ground: z
    .number({ required_error: "El terreno es requerido" })
    .positive("El terreno debe ser un número positivo"),
});

type CattleFormInputs = z.infer<typeof cattleSchema>;

interface CattleFormProps {
  handleClose: () => void;
  cattle?: CattleType | null;
  action: "create" | "update";
}

export const CattleForm = ({
  action,
  cattle,
  handleClose,
}: CattleFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CattleFormInputs>({
    resolver: zodResolver(cattleSchema),
    defaultValues: {
      ...cattle,
    },
  });

  const onSubmit = async (data: CattleFormInputs) => {
    console.log("Datos del formulario:", data);
    // Aquí enviarás los datos
    handleClose();
  };

  return (
    <div className="p-2 flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 w-full"
      >
        {/** Descripción */}
        <div className="col-span-full">
          <TextArea
            {...register("description")}
            labelText="Descripción"
            placeholder="Un ganado con un cuerno roto"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/** Padre (select de ejemplo) */}
        <div className="col-span-full">
          <label className="block mb-1">Padre</label>
          <select {...register("father")} className="w-full p-2 border rounded">
            <option value="">Sin seleccionar</option>
            <option value="1">Ganado 1</option>
            <option value="2">Ganado 2</option>
          </select>
          {errors.father && (
            <span className="text-red-500 text-sm">
              {errors.father.message}
            </span>
          )}
        </div>

        {/** Madre (select de ejemplo) */}
        <div className="col-span-full">
          <label className="block mb-1">Madre</label>
          <select {...register("mother")} className="w-full p-2 border rounded">
            <option value="">Sin seleccionar</option>
            <option value="1">Ganado 1</option>
            <option value="2">Ganado 2</option>
          </select>
          {errors.mother && (
            <span className="text-red-500 text-sm">
              {errors.mother.message}
            </span>
          )}
        </div>

        {/** Género */}
        <div className="col-span-full">
          <label className="block mb-1">Género</label>
          <select {...register("gender")} className="w-full p-2 border rounded">
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-sm">
              {errors.gender.message}
            </span>
          )}
        </div>

        {/** Número de registro */}
        <div className="col-span-full">
          <Input
            {...register("registrationNumber")}
            labelText="Número de registro"
            placeholder="12-12-12-12"
          />
          {errors.registrationNumber && (
            <span className="text-red-500 text-sm">
              {errors.registrationNumber.message}
            </span>
          )}
        </div>

        {/** Número de lote */}
        <div className="col-span-full">
          <Input
            {...register("lotNumber")}
            labelText="Número de lote"
            placeholder="Lote-001"
          />
          {errors.lotNumber && (
            <span className="text-red-500 text-sm">
              {errors.lotNumber.message}
            </span>
          )}
        </div>

        {/** Color */}
        <div className="col-span-full">
          <Input
            {...register("color")}
            labelText="Color"
            placeholder="Marrón"
          />
          {errors.color && (
            <span className="text-red-500 text-sm">{errors.color.message}</span>
          )}
        </div>

        {/** Fecha de nacimiento */}
        <div className="col-span-full">
          <Input
            {...register("birthdate")}
            labelText="Fecha de nacimiento"
            type="date"
          />
          {errors.birthdate && (
            <span className="text-red-500 text-sm">
              {errors.birthdate.message as string}
            </span>
          )}
        </div>

        {/** Observaciones */}
        <div className="col-span-full">
          <label className="block mb-1">Observaciones</label>
          <TextArea
            {...register("observations")}
            placeholder="Escribe aquí las observaciones..."
          />
          {errors.observations && (
            <span className="text-red-500 text-sm">
              {errors.observations.message}
            </span>
          )}
        </div>

        {/** Motivo de retiro */}
        <div className="col-span-full">
          <label className="block mb-1">Motivo de retiro</label>
          <TextArea
            {...register("reason_for_withdrawal")}
            placeholder="Motivo del retiro..."
          />
          {errors.reason_for_withdrawal && (
            <span className="text-red-500 text-sm">
              {errors.reason_for_withdrawal.message}
            </span>
          )}
        </div>

        {/** Fierro (select de ejemplo) */}
        <div className="col-span-full">
          <label className="block mb-1">Fierro</label>
          <select
            {...register("id_iron")}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un fierro</option>
            <option value="1">Fierro 1</option>
            <option value="2">Fierro 2</option>
          </select>
          {errors.id_iron && (
            <span className="text-red-500 text-sm">
              {errors.id_iron.message}
            </span>
          )}
        </div>

        {/** Raza (select de ejemplo) */}
        <div className="col-span-full">
          <label className="block mb-1">Raza</label>
          <select
            {...register("id_race")}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione una raza</option>
            <option value="1">Raza 1</option>
            <option value="2">Raza 2</option>
          </select>
          {errors.id_race && (
            <span className="text-red-500 text-sm">
              {errors.id_race.message}
            </span>
          )}
        </div>

        {/** Terreno (select de ejemplo) */}
        <div className="col-span-full">
          <label className="block mb-1">Terreno</label>
          <select
            {...register("id_ground")}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un terreno</option>
            <option value="1">Terreno 1</option>
            <option value="2">Terreno 2</option>
          </select>
          {errors.id_ground && (
            <span className="text-red-500 text-sm">
              {errors.id_ground.message}
            </span>
          )}
        </div>

        {/** Botón de envío */}
        <Button
          className="col-span-full"
          color="primary"
          variant="shadow"
          type="submit"
        >
          {action === "create" ? "Crear" : "Actualizar"}
        </Button>
      </form>
    </div>
  );
};
