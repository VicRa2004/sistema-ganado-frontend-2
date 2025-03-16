import { IronType } from "../../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import { useIron } from "../../hooks/useIron";

const ironSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  image: z
    .any({ required_error: "La imagen es requerida" })
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.type.startsWith("image/"),
      "El archivo debe ser una imagen válida"
    ),
});

type IronFormInputs = z.infer<typeof ironSchema>;

interface IronFormProps {
  handleClose: () => void;
  iron?: IronType | null;
  action: "create" | "update";
}

export const IronForm = ({ handleClose, iron, action }: IronFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IronFormInputs>({
    resolver: zodResolver(ironSchema),
    defaultValues: {
      name: iron?.name,
    },
  });

  const { useCreateIron, useUpdateIron } = useIron();

  const { isPending, mutateAsync } = useCreateIron();

  const { isPending: isPendingUpdate, mutateAsync: mutateAsyncUpdate } =
    useUpdateIron();

  const onSubmit = async ({ name, image }: IronFormInputs) => {
    if (action === "create") {
      mutateAsync({
        name,
        image: image[0],
      }).finally(() => {
        handleClose();
      });
    } else {
      if (iron) {
        mutateAsyncUpdate({
          id: iron.id_iron,
          name,
          image: image[0],
        }).finally(() => {
          handleClose();
        });
      }
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
            placeholder="Iron 1"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
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
          isLoading={isPending || isPendingUpdate}
        >
          {action === "create" ? "Crear" : "Actualizar"}
        </Button>
      </form>
    </div>
  );
};
