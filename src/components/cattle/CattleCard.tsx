import { CattleType } from "../../types";
import { CardRegistro } from "../ui/CardRegistro";

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
    >
      <div className="grid gap-3 text-gray-700 dark:text-gray-300 mt-3">
        <div>
          <h3 className="text-lg font-semibold">Descripción</h3>
          <p className="text-sm">{cattle.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Aretes</h3>

          <ul className="text-sm">
            <li>
              <span className="font-semibold">Numero de Lote: </span>
              {cattle.lotNumber}
            </li>
            <li>
              <span className="font-semibold">Numero de registro: </span>
              {cattle.registrationNumber}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm">
            <span className="font-semibold">Estatus: </span>
            {cattle.status == 1 ? "Activo" : "Inactivo"}
          </p>
        </div>

        <div>
          <p className="text-sm">
            <span className="font-semibold">Genero: </span>
            {cattle.gender == "male" ? "Macho" : "Hembra"}
          </p>
        </div>
      </div>
    </CardRegistro>
  );
};
