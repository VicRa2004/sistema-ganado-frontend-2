import { useGround } from "../../hooks/useGround";
import { useEffect, useState } from "react";
import { useError } from "../../hooks/useError";
import { GroundCard } from "../../components/ground/GroundCard";
import { SkeletonGrid } from "../../components/ui/SkeletonGrid";
import { Button, Pagination } from "@heroui/react";
import { GroundType } from "../../types";
import { GroundCreateModal } from "../../components/ground/GroundCreateModal";
import { GroundUpdateModal } from "../../components/ground/GroundUpdateModal";
import { GroundDeleteModal } from "../../components/ground/GroundDeleteModal";
import { useModal } from "../../hooks/useModal";

export const Grounds = () => {
  const { handleError } = useError();
  const { useGetAllGround } = useGround();
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, error, data } = useGetAllGround(currentPage);

  const [ground, setGround] = useState<GroundType | null>(null);

  const { modalType, closeModal, openModal } = useModal();

  const handleModal = (type: string, ground: GroundType) => {
    openModal(type);
    setGround(ground);
  };

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
          onPress={() => openModal("create-ground")}
          color="primary"
          variant="shadow"
          className="px-6 py-2 text-sm"
        >
          + Crear
        </Button>
      </div>

      <GroundCreateModal
        isOpen={modalType == "create-ground"}
        onClose={closeModal}
      />

      <GroundUpdateModal
        isOpen={modalType == "update-ground"}
        onClose={closeModal}
        ground={ground}
      />

      <GroundDeleteModal
        isOpen={modalType == "delete-ground"}
        ground={ground}
        onClose={closeModal}
      />

      <div className="w-full flex flex-col items-center gap-4">
        {isPending ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.data &&
              data?.data.length !== 0 &&
              data.data.map((ground, index) => (
                <GroundCard
                  handleUpdate={() => handleModal("update-ground", ground)}
                  handleDelete={() => handleModal("delete-ground", ground)}
                  key={index}
                  ground={ground}
                />
              ))}

            {data?.data && data?.data.length === 0 && (
              <h1 className="text-2xl col-span-3 font-semibold">
                No hay datos
              </h1>
            )}
          </div>
        )}

        {!isPending && data && (
          <Pagination
            onChange={setCurrentPage}
            total={data?.maxPages || 1}
            page={currentPage}
            showControls
          />
        )}
      </div>
    </div>
  );
};
