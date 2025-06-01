import { Button } from "@nextui-org/react";
import { CattleType } from "../../types";
import { CardRegistro } from "../ui/CardRegistro";
import { useNavigate } from "react-router-dom";

interface CattleCardProps {
  cattle: CattleType;
  handleDelete: (ground: CattleType) => void;
  handleUpdate: (ground: CattleType) => void;
}

export const CattleCard = ({
  cattle,
  handleDelete,
  handleUpdate,
}: CattleCardProps) => {
  
  const navigate = useNavigate();
  
  if (!cattle.image) {
    // Se pone una imagen por defecto
    cattle.image = "img/default-image-3.png";
  }

  return (
    <CardRegistro
      data={cattle}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      title={`Ganado - ${cattle.lotNumber}`}
      image={cattle.image}
      ExtraButton={<Button
          onPress={() => navigate(`${cattle.id_cattle}`)}
          color="primary"
          radius="lg"
          variant="bordered"
        >
          Ver detalles
        </Button>}
    >
      <div className="grid gap-4 mt-4 text-sm text-gray-700 dark:text-gray-300">

        <div>
          <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            Descripción
          </h3>
          <p className="text-sm leading-relaxed">{cattle.description}</p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <h3 className="text-base font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            Aretes
          </h3>
          <ul className="space-y-1">
            <li>
              <span className="font-medium">N° de Lote:</span>{" "}
              {cattle.lotNumber}
            </li>
            <li>
              <span className="font-medium">N° de Registro:</span>{" "}
              {cattle.registrationNumber}
            </li>
          </ul>
        </div>

        <div className="flex justify-between items-center text-sm border-t border-gray-200 dark:border-gray-700 pt-2">
          <p>
            <span className="font-medium text-gray-800 dark:text-gray-200">Estatus:</span>{" "}
            <span className={cattle.status === 1 ? "text-emerald-600" : "text-red-500"}>
              {cattle.status === 1 ? "Activo" : "Inactivo"}
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-800 dark:text-gray-200">Género:</span>{" "}
            {cattle.gender === "male" ? "Macho" : "Hembra"}
          </p>
        </div>
      </div>
    </CardRegistro>
  );
};
