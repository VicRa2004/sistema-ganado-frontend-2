import { IronType } from "../../types";
import { Modal } from "../ui/Modal";
import { IronForm } from "./IronForm";

interface IronUpdateModalProps {
  isOpen: boolean;
  iron: IronType | null;
  onClose: () => void;
}

export const IronUpdateModal = ({
  isOpen,
  onClose,
  iron,
}: IronUpdateModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Product Details">
      <IronForm action="update" handleClose={onClose} iron={iron} />
    </Modal>
  );
};
