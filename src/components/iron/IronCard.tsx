import { IronType } from "../../types";
import { CardRegistro } from "../ui/CardRegistro";

interface IronCardProps {
  iron: IronType;
  handleDelete: (iron: IronType) => void;
  handleUpdate: (iron: IronType) => void;
}

export const IronCard = ({
  iron,
  handleDelete,
  handleUpdate,
}: IronCardProps) => {
  return (
    <CardRegistro
      data={iron}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      title={iron.name}
      image={iron.image}
    ></CardRegistro>
  );
};

/**
 * <div className="p-6 border dark:border-none rounded-2xl shadow-lg dark:bg-neutral-950 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-neutral-900 dark:to-neutral-950">
      <img
        src={iron.image}
        alt="Terreno"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-extrabold text-gray-800 dark:text-white">
        {iron.name}
      </h2>

      <div className="flex gap-2 mt-4">
        <Button
          onPress={() => handleUpdate(iron)}
          variant="shadow"
          color="primary"
        >
          Editar
        </Button>
        <Button
          onPress={() => handleDelete(iron)}
          variant="shadow"
          color="danger"
        >
          Eliminar
        </Button>
      </div>
    </div>
 */
