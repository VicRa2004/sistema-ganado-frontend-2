import { Button } from "@nextui-org/react";
import { IronModal } from "../../components/iron/IronCreateModal";
import { useModal } from "../../hooks/useModal";

export const Irons = () => {
  const { closeModal, modalType, openModal } = useModal();

  return (
    <div className="flex-grow h-full w-full flex flex-col py-4 px-16  justify-start items-center gap-4">
      <h1 className="text-3xl font-bold text-primary">Fierros</h1>

      <div className="py-4 flex flex-col items-center gap-3 bg-gray-100 dark:bg-neutral-900 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Crear un Registro de Fierro
        </h3>
        <Button
          onPress={() => openModal("create-iron")}
          color="primary"
          variant="shadow"
          className="px-6 py-2 text-sm"
        >
          + Crear
        </Button>
      </div>

      <IronModal
        isOpen={modalType === "create-iron"}
        onClose={closeModal}
      ></IronModal>
    </div>
  );
};
