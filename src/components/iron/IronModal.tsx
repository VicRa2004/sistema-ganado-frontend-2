import { Modal } from "../ui/Modal";

interface IronModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IronModal = ({ isOpen, onClose }: IronModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details">
      <p>Modal de Fierros</p>
    </Modal>
  );
};
