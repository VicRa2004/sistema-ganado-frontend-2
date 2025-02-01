import { GroundType } from "../../types";
import { Modal } from "../ui/Modal";
import { GroundUpdateForm } from "./GroundUpdateForm";

interface GroundUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  ground: GroundType | null;
}

export const GroundUpdateModal = ({
  isOpen,
  onClose,
  ground,
}: GroundUpdateModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Actualizar Terreno">
      <GroundUpdateForm ground={ground} handleClose={onClose} />
    </Modal>
  );
};
