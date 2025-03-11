import { Modal } from "../ui/Modal";
import { CattleForm } from "./CattleForm";

interface CattleCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroundCreateModal = ({
  isOpen,
  onClose,
}: CattleCreateModalProps) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onClose={onClose} title="Crear Terreno">
      <CattleForm action="create" handleClose={onClose} />
    </Modal>
  );
};
