import { CattleType } from "../../types";
import { Input } from "../ui/Input";
import { Button } from "@heroui/react";
import { TextArea } from "../ui/TextArea";
import { CattleSelect } from "./select/CattleSelect";
import { CattleFormInputs } from "../../lib/schemas/cattle.schema";
import { IronSelect } from "./select/IronSelect";
import { Select } from "../ui/Select";
import { RaceSelect } from "./select/RaceSelect";
import { GroundSelect } from "./select/GroundSelect";
import { Switch } from "@heroui/react";
import { CustomInput } from "../ui/CustomInput";
import { useState } from "react";
import { useCattleForm } from "./use-cattle-form";

interface CattleFormProps {
  cattle?: CattleType | null;
  action: "create" | "update";
  handleClose: () => void;
}

export const CattleForm = ({
  action,
  cattle,
  handleClose,
}: CattleFormProps) => {
  const {
    createMutate,
    createPending,
    errors,
    handleSubmit,
    register,
    updateMutate,
    updatePending,
  } = useCattleForm({ cattle });

  const [isSelected, setIsSelected] = useState(false);

  const onSubmit = async (data: CattleFormInputs) => {
    // ! Si el estado es falso, entonces el status es 1, de lo contrario es 0
    // Esto porque 1 es activo y 0 es inactivo, se meneja
    // asi por la forma de usar el switch en el formulario
    const status = !data.status ? 1 : 0;

    const newData = {
      ...data,
      birthdate: new Date(data.birthdate).toISOString(),
      status,
    };

    console.log(newData)

    if (action == "create") {
      createMutate({
        data: newData,
        image: data.image[0],
      }).finally(() => {
        handleClose();
      });
    }

    if (action == "update") {
      if (cattle) {
        console.log({
          id: cattle.id_cattle,
          cattle: newData,
          image: data.image[0],
        });

        updateMutate({
          id: cattle.id_cattle,
          cattle: newData,
          image: data.image[0],
        })
          .catch((e) => console.log(e))
          .finally(() => {
            handleClose();
          });
      }
    }
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
          gender="male"
          label="Selecione el padre"
          error={errors.father?.message}
          {...register("father")}
        />

        {/** Madre (select de ejemplo) */}
        <CattleSelect
          gender="female"
          label="Selecione la madre"
          error={errors.mother?.message}
          {...register("mother")}
        />

        {/** Género */}
        <Select labelText="Selecione el genero" {...register("gender")}>
          <option value="male">Masculino</option>
          <option value="female">Femenino</option>
        </Select>

        <Input type="file" labelText="Imagen" {...register("image")} />

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

        <CustomInput labelText="Dar de baja ">
          <Switch
            isSelected={isSelected}
            onValueChange={setIsSelected}
            {...register("status")}
          />
        </CustomInput>

        {/** Motivo de retiro */}
        <TextArea
          {...register("reason_for_withdrawal")}
          labelText="Motivo de baja (Solo en caso de estar dado de baja)"
          placeholder="Motivo del retiro..."
          error={errors.reason_for_withdrawal?.message}
          disabled={!isSelected}
        />

        {/** Fierro (select de ejemplo) */}
        <IronSelect
          label="Selecione el fierro"
          {...register("id_iron")}
          error={errors.id_iron?.message}
        />

        {/** Raza (select de ejemplo) */}
        <RaceSelect
          label="Selecione la raza"
          {...register("id_race")}
          error={errors.id_race?.message}
        />

        {/** Terreno (select de ejemplo) */}
        <GroundSelect
          label="Seleciona el terreo"
          {...register("id_ground")}
          error={errors.id_ground?.message}
        />

        {/** Botón de envío */}
        <Button
          className="col-span-full"
          color="primary"
          variant="shadow"
          type="submit"
          isLoading={createPending || updatePending}
        >
          {action === "create" ? "Crear" : "Actualizar"}
        </Button>
      </form>
    </div>
  );
};
