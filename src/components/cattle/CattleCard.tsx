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
    cattle.image = "img/default-image.png";
  }

  return (
    <CardRegistro
      data={cattle}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      title={`Ganado - ${cattle.lotNumber}`}
      image={cattle.image}
    ></CardRegistro>
  );
};
