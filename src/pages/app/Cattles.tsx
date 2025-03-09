import { Button, Pagination } from "@nextui-org/react";
import { SkeletonGrid } from "../../components/ui/SkeletonGrid";
import { useState } from "react";
import { useCattle } from "../../hooks/useCattle";
import { CattleCard } from "../../components/cattle/CattleCard";
import { useNavigate } from "react-router-dom";
import { CattleType } from "../../types";

export const Cattles = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { useGetAllCattles } = useCattle();

  const navigate = useNavigate();

  const { isPending, data } = useGetAllCattles(currentPage);

  const handleCattle = (cattle: CattleType, type: "update" | "delete") => {};

  return (
    <div className="flex-grow h-full w-full flex flex-col py-4 px-16  justify-start items-center gap-4">
      <h1 className="text-3xl font-bold text-primary">Ganados</h1>

      <div className="py-4 flex flex-col items-center gap-3 bg-gray-100 dark:bg-neutral-900 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Crear un Registro de Ganado
        </h3>
        <Button
          onPress={() => navigate("/app/cattles-create")}
          color="primary"
          variant="shadow"
          className="px-6 py-2 text-sm"
        >
          + Crear
        </Button>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        {isPending ? (
          <SkeletonGrid />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.data &&
              data?.data.length !== 0 &&
              data.data.map((cattle) => (
                <CattleCard
                  key={cattle.id_cattle}
                  handleUpdate={() => handleCattle(cattle, "update")}
                  handleDelete={() => handleCattle(cattle, "delete")}
                  cattle={cattle}
                />
              ))}
          </div>
        )}
      </div>

      <Pagination
        total={data?.maxPages || 1}
        page={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
};
