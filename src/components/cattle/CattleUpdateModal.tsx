import { CattleType } from "../../types";
import { Modal } from "../ui/Modal";
import { CattleForm } from "./CattleForm";

interface CattleUpdateModalProps {
  cattle: CattleType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CattleUpdateModal = ({
  isOpen,
  onClose,
  cattle,
}: CattleUpdateModalProps) => {
  return (
    <Modal
      size="4xl"
      isOpen={isOpen}
      onClose={onClose}
      title="Actualizar Ganado"
    >
      <CattleForm cattle={cattle} action="update" handleClose={onClose} />
    </Modal>
  );
};
