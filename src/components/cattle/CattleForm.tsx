import { CattleType } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "@nextui-org/react";
import { TextArea } from "../ui/TextArea";
import { CattleSelect } from "./select/CattleSelect";
import {
  CattleFormInputs,
  cattleSchema,
} from "../../lib/schemas/cattle.schema";
import { IronSelect } from "./select/IronSelect";
import { Select } from "../ui/Select";

interface CattleFormProps {
  cattle?: CattleType | null;
  action: "create" | "update";
}

export const CattleForm = ({ action, cattle }: CattleFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CattleFormInputs>({
    resolver: zodResolver(cattleSchema),
    defaultValues: {
      ...cattle,
    },
  });

  console.log(watch());

  const onSubmit = async (data: CattleFormInputs) => {
    console.log("Datos del formulario:", data);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 w-full"
      >
        {/** Descripción */}

        <TextArea
          {...register("description")}
          labelText="Descripción"
          placeholder="Un ganado con un cuerno roto"
          error={errors.description?.message}
        />

        {/** Padre (select de ejemplo) */}
        <CattleSelect
          label="Selecione el padre"
          error={errors.father?.message}
          {...register("father")}
        />

        {/** Madre (select de ejemplo) */}
        <CattleSelect
          label="Selecione la madre"
          error={errors.mother?.message}
          {...register("mother")}
        />

        {/** Género */}
        <Select labelText="Selecione el genero" {...register("gender")}>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </Select>

        {/** Número de registro */}

        <Input
          {...register("registrationNumber")}
          labelText="Número de registro"
          placeholder="12-12-12-12"
          error={errors.registrationNumber?.message}
        />

        {/** Número de lote */}
        <Input
          {...register("lotNumber")}
          labelText="Número de lote"
          placeholder="Lote-001"
          error={errors.lotNumber?.message}
        />

        {/** Color */}
        <Input
          {...register("color")}
          labelText="Color"
          placeholder="Marrón"
          error={errors.color?.message}
        />

        {/** Fecha de nacimiento */}
        <Input
          {...register("birthdate")}
          labelText="Fecha de nacimiento"
          type="date"
          error={errors.birthdate?.message}
        />

        {/** Observaciones */}
        <TextArea
          {...register("observations")}
          labelText="Observaciones"
          placeholder="Escribe aquí las observaciones..."
          error={errors.observations?.message}
        />

        {/** Motivo de retiro */}
        <TextArea
          {...register("reason_for_withdrawal")}
          labelText="Motivo de retiro"
          placeholder="Motivo del retiro..."
          error={errors.reason_for_withdrawal?.message}
        />

        {/** Fierro (select de ejemplo) */}
        <IronSelect
          label="Selecione el fierro"
          {...register("id_iron")}
          error={errors.id_iron?.message}
        />

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
