import { Button } from "@nextui-org/react";
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
    // Se pone una imagen por defecto
    ground.image = "img/default-image-2.png";
  }

  return (
    <CardRegistro
      title={ground.name}
      image={ground.image}
      data={ground}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      ExtraButton={<Button
            onPress={() => navigate(`/app/grounds/${ground.id_ground}`)}
            variant="bordered"
            color="primary"
          >
            Ver detalles
          </Button>}
    >
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
    </CardRegistro>
  );
};
