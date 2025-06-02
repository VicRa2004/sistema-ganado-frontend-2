import { Button } from "@heroui/react";
import { Modal } from "../ui/Modal";
import { useGround } from "../../hooks/useGround";
import { GroundType } from "../../types";

interface GroundDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  ground: GroundType | null;
}

export const GroundDeleteModal = ({
  isOpen,
  onClose,
  ground,
}: GroundDeleteModalProps) => {
  const { deleteGround } = useGround();

  return (
    <Modal
      footer={
        <>
          <Button onPress={() => onClose()} color="primary" variant="light">
            Cancelar
          </Button>
          <Button
            onPress={() => {
              if (ground?.id_ground) {
                deleteGround.mutate({
                  id: ground.id_ground,
                });
              }
              onClose();
            }}
            color="danger"
          >
            Eliminar
          </Button>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      title="Eliminar Terreno"
    >
      <p>Desea eliminar el terreno permanentemente?</p>
    </Modal>
  );
};
