import { Modal } from "../ui/Modal";
import { CattleForm } from "./CattleForm";

interface CattleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CattleCreateModal = ({ isOpen, onClose }: CattleModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Ganado">
      <CattleForm action="create" handleClose={onClose} />
    </Modal>
  );
};
