import { useGround } from "../../hooks/useGround";
import { SkeletonGrid } from "../../components/ui/SkeletonGrid";
import { useEffect } from "react";
import { GroundCard } from "../../components/ground/GroundCard";
import { useError } from "../../hooks/useError";

export const Grounds = () => {
   const { handleError } = useError();
   const { getAllGrounds } = useGround();
   const { isPending, error, data } = getAllGrounds;

   useEffect(() => {
      if (error) {
         handleError(error);
      }
   }, [error]);

   return (
      <div className="flex-grow h-full flex flex-col p-4 justify-start items-center gap-4">
         <h1 className="text-2xl font-bold text-primary">Terrenos</h1>

         {isPending ? (
            <SkeletonGrid />
         ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
               {data?.data &&
                  data?.data.length === 0 &&
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
   );
};
