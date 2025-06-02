import { Button, Pagination } from "@heroui/react";
import { IronModal } from "../../components/iron/IronCreateModal";
import { useModal } from "../../hooks/useModal";
import { SkeletonGrid } from "../../components/ui/SkeletonGrid";
import { useIron } from "../../hooks/useIron";
import { useState } from "react";
import { IronCard } from "../../components/iron/IronCard";
import { IronUpdateModal } from "../../components/iron/IronUpdateModal";
import { IronType } from "../../types";
import { IronDeleteModal } from "../../components/iron/IronDeleteModal";

export const Irons = () => {
  const { closeModal, modalType, openModal } = useModal();
  const { useGetAllIrons } = useIron();
  const [currentPage, setCurrentPage] = useState(0);

  const { isPending, data } = useGetAllIrons(currentPage);

  const [iron, setIron] = useState<IronType | null>(null);

  const handleIron = (iron: IronType, typeModal: string) => {
    setIron(iron);
    openModal(typeModal);
  };

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

      <IronUpdateModal
        isOpen={modalType == "update-iron"}
        onClose={closeModal}
        iron={iron}
      ></IronUpdateModal>

      <IronDeleteModal
        iron={iron}
        isOpen={modalType == "delete-iron"}
        onClose={closeModal}
      />

      <div className="w-full flex flex-col items-center gap-4">
        {isPending ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.data &&
              data?.data.length !== 0 &&
              data.data.map((iron) => (
                <IronCard
                  key={iron.id_iron}
                  handleUpdate={() => handleIron(iron, "update-iron")}
                  handleDelete={() => handleIron(iron, "delete-iron")}
                  iron={iron}
                />
              ))}
          </div>
        )}
      </div>

      {!isPending && data && (
        <Pagination
          onChange={setCurrentPage}
          total={data?.maxPages || 1}
          page={currentPage}
          showControls
        />
      )}
    </div>
  );
};
