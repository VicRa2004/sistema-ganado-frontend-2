import { Button } from "@heroui/react";
import { GroundType } from "../../types";
import { CardRegistro } from "../ui/CardRegistro";
import { useNavigate } from "react-router-dom";

interface GroundCardProps {
  ground: GroundType;
  handleDelete: (ground: GroundType) => void;
  handleUpdate: (ground: GroundType) => void;
}

export const GroundCard = ({
  ground,
  handleUpdate,
  handleDelete,
}: GroundCardProps) => {
  const navigate = useNavigate();

  if (!ground.image) {
    ground.image = "img/default-image-2.png";
  }

  return (
    <CardRegistro
      title={`Terreno - ${ground.name}`}
      image={ground.image}
      data={ground}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      ExtraButton={
        <Button
          onPress={() => navigate(`/app/grounds/${ground.id_ground}`)}
          color="primary"
          radius="lg"
          variant="bordered"
        >
          Ver detalles
        </Button>
      }
    >
      <div className="grid gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            Notas
          </h3>
          <p className="text-sm leading-relaxed">
            {ground.notes || "No hay notas para este terreno"}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            Dimensiones
          </h3>
          <ul className="space-y-1">
            <li>
              <span className="font-medium">Alto:</span> {ground.length}
            </li>
            <li>
              <span className="font-medium">Ancho:</span> {ground.width}
            </li>
          </ul>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            Dirección
          </h3>
          <p className="text-sm">
            {ground.address || "No hay dirección para este terreno"}
          </p>
        </div>
      </div>
    </CardRegistro>
  );
};
