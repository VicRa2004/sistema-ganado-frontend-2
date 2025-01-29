import { Button } from "@nextui-org/react";
import { GroundType } from "../../types";

interface GroundCardProps {
  ground: GroundType;
  handleUpdate: (id: number) => void;
}

export const GroundCard = ({ ground, handleUpdate }: GroundCardProps) => {
  if (!ground.image) {
    // Se pone una imagen por defecto
    ground.image = "img/default-image.png";
  }

  return (
    <div className="p-6 border dark:border-none rounded-2xl shadow-lg dark:bg-neutral-950 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-neutral-900 dark:to-neutral-950">
      <img
        src={ground.image}
        alt="Terreno"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-extrabold text-gray-800 dark:text-white">
        {ground.name}
      </h2>

      <div className="grid gap-3 text-gray-700 dark:text-gray-300 mt-3">
        <div>
          <h3 className="text-lg font-semibold">Notas del Terreno</h3>
          <p className="text-sm">
            {ground.notes || "No hay notas para este terreno"}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Medidas</h3>
          <ul className="text-sm">
            <li>
              <span className="font-semibold">Alto: </span>
              {ground.length}
            </li>
            <li>
              <span className="font-semibold">Ancho: </span>
              {ground.width}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Dirección</h3>
          <p className="text-sm">
            {ground.address || "No hay dirección para este terreno"}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Button
          onPress={() => handleUpdate(ground.id_ground)}
          variant="shadow"
          color="primary"
        >
          Editar
        </Button>
        <Button variant="shadow" color="danger">
          Eliminar
        </Button>
      </div>
    </div>
  );
};
