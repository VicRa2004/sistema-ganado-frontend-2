import { useGround } from "../../hooks/useGround";
import { useEffect } from "react";
import { useError } from "../../hooks/useError";
import { GroundCard } from "../../components/ground/GroundCard";
import { SkeletonGrid } from "../../components/ui/SkeletonGrid";
import { GroundCreateForm } from "../../components/ground/GroundCreateForm";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export const Grounds = () => {
  const { handleError } = useError();
  const { getAllGrounds } = useGround();
  const { isPending, error, data } = getAllGrounds;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (error) {
      handleError(error);
    }
  }, [error, handleError]);

  return (
    <div className="flex-grow h-full w-full flex flex-col py-4 px-16  justify-start items-center gap-4">
      <h1 className="text-3xl font-bold text-primary">Terrenos</h1>

      <div className="py-4 flex flex-col items-center gap-3 bg-gray-100 dark:bg-neutral-900 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Crear un nuevo Terreno
        </h3>
        <Button
          onPress={onOpen}
          color="primary"
          variant="shadow"
          className="px-6 py-2 text-sm"
        >
          + Crear
        </Button>
      </div>
      <Modal onOpenChange={onOpenChange} isOpen={isOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Crear Terreno</ModalHeader>
              <ModalBody>
                <GroundCreateForm handleClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full flex flex-col items-center gap-4">
        {isPending ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.data &&
              data?.data.length !== 0 &&
              data.data.map((ground, index) => (
                <GroundCard key={index} ground={ground} />
              ))}

            {data?.data && data?.data.length === 0 && (
              <h1 className="text-2xl col-span-3 font-semibold">
                No hay datos
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
