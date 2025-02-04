import { Modal } from "../ui/Modal";
import { IronForm } from "./IronForm";

interface IronModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IronModal = ({ isOpen, onClose }: IronModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details">
      <IronForm action="create" handleClose={onClose} />
    </Modal>
  );
};
