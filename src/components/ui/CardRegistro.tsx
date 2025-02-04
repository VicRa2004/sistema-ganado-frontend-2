import { Button } from "@nextui-org/react";

/**
 * Recordar tratar de cambiar los tipos ANY
 */

interface CardRegistroProps {
  children?: React.ReactNode;
  data: unknown;
  title: string;
  image: string;
  handleUpdate: (data: any) => void;
  handleDelete: (data: any) => void;
}

export const CardRegistro = ({
  children,
  data,
  title,
  image,
  handleUpdate,
  handleDelete,
}: CardRegistroProps) => {
  return (
    <div className="p-6 border dark:border-none rounded-2xl shadow-lg dark:bg-neutral-950 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-neutral-900 dark:to-neutral-950">
      <img
        src={image}
        alt="Terreno"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-extrabold text-gray-800 dark:text-white">
        {title}
      </h2>

      {children}

      <div className="flex gap-2 mt-4">
        <Button
          onPress={() => handleUpdate(data)}
          variant="shadow"
          color="primary"
        >
          Editar
        </Button>
        <Button
          onPress={() => handleDelete(data)}
          variant="shadow"
          color="danger"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
