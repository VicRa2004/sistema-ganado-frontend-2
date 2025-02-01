import { Modal } from "../ui/Modal";
import { GroundCreateForm } from "./GroundCreateForm";

interface GroundCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GroundCreateModal = ({
  isOpen,
  onClose,
}: GroundCreateModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Terreno">
      <GroundCreateForm handleClose={onClose} />
    </Modal>
  );
};
