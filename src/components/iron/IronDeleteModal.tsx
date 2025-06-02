import { Button } from "@heroui/react";
import { IronType } from "../../types";
import { Modal } from "../ui/Modal";

interface IronDeleteModalProps {
  isOpen: boolean;
  iron: IronType | null;
  onClose: () => void;
}

export const IronDeleteModal = ({
  isOpen,
  onClose,
  iron,
}: IronDeleteModalProps) => {
  const Footer = () => (
    <>
      <Button
        onPress={onClose}
        color="primary"
        variant="light"
        className="px-6 py-2 text-sm"
      >
        Cancelar
      </Button>
      <Button onPress={onClose} color="danger" className="px-6 py-2 text-sm">
        Eliminar
      </Button>
    </>
  );

  return (
    <Modal
      footer={<Footer />}
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar fierro"
    >
      Desea eliminar el fierro {iron?.name}?
    </Modal>
  );
};
