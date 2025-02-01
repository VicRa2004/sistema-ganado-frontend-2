import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/Input";
import { Button } from "@nextui-org/react";
import { GroundType } from "../../types";
import { useGround } from "../../hooks/useGround";

// Esquema de validación con zod
const groundSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  length: z
    .number({
      required_error: "El largo es requerido",
      invalid_type_error: "El largo es requerido",
    })
    .positive("El largo debe ser un número positivo"),
  width: z
    .number({
      required_error: "El ancho es requerido",
      invalid_type_error: "El ancho es requerido",
    })
    .positive("El ancho debe ser un número positivo"),
  address: z.string().min(1, "La dirección es obligatoria"),
  notes: z.string().min(1, "Las notas son requeridas"),
  image: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.type.startsWith("image/"),
      "El archivo debe ser una imagen válida"
    ),
});

// Tipos derivados del esquema
type GroundFormInputs = z.infer<typeof groundSchema>;

interface PropsGroundUpdate {
  handleClose: () => void;
  ground: GroundType | null;
}

export const GroundUpdateForm = ({
  handleClose,
  ground,
}: PropsGroundUpdate) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroundFormInputs>({
    resolver: zodResolver(groundSchema),
    defaultValues: {
      name: ground?.name,
      width: ground?.width,
      notes: ground?.notes,
      address: ground?.address,
      length: ground?.length,
    },
  });

  const { updateGround } = useGround();

  const onSubmit = async (groundForm: GroundFormInputs) => {
    const newGround = {
      name: groundForm.name,
      length: groundForm.length,
      width: groundForm.width,
      address: groundForm.address,
      notes: groundForm.notes,
    };

    if (ground) {
      updateGround
        .mutateAsync({
          id: ground.id_ground,
          newGround,
          image: groundForm.image[0],
        })
        .finally(() => handleClose());
    }
  };

  return (
    <div className="p-2 flex flex-col items-center">
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-full">
          <Input
            {...register("name")}
            labelText="Nombre"
            placeholder="Rancho San Martin"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div>
          <Input
            {...register("length", { valueAsNumber: true })}
            labelText="Largo del terreno"
            placeholder="10.20"
            type="number"
          />
          {errors.length && (
            <span className="text-red-500 text-sm">
              {errors.length.message}
            </span>
          )}
        </div>

        <div>
          <Input
            {...register("width", { valueAsNumber: true })}
            labelText="Ancho del terreno"
            placeholder="20.34"
            type="number"
          />
          {errors.width && (
            <span className="text-red-500 text-sm">{errors.width.message}</span>
          )}
        </div>

        <div className="col-span-full">
          <Input
            {...register("address")}
            labelText="Dirección"
            placeholder="Carretera principal"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        <div className="col-span-full">
          <Input
            {...register("notes")}
            labelText="Notas"
            placeholder="Terreno inundado la mitad del año"
          />
        </div>

        <div className="col-span-full">
          <Input {...register("image")} labelText="Imagen" type="file" />
          {errors.image && (
            <span className="text-red-500 text-sm">
              {errors.image.message?.toString()}
            </span>
          )}
        </div>

        <Button
          className="col-span-full"
          color="primary"
          variant="shadow"
          type="submit"
          isLoading={updateGround.isPending}
        >
          Actualizar terreno
        </Button>
      </form>
    </div>
  );
};
