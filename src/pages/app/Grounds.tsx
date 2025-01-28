import { useGround } from "../../hooks/useGround";
import { useEffect } from "react";
import { useError } from "../../hooks/useError";
import {GroundCard} from "../../components/ground/GroundCard"
import { SkeletonGrid } from "../../components/ui/SkeletonGrid";
import { GroundCreateForm } from "../../components/ground/GroundCreateForm";

export const Grounds = () => {
   const { handleError } = useError();
   const { getAllGrounds } = useGround();
   const { isPending, error, data } = getAllGrounds;

   useEffect(() => {
      if (error) {
         handleError(error);
      }
   }, [error, handleError]);

   return (
      <div className="flex-grow h-full w-full flex flex-col py-4 px-16  justify-start items-center gap-4">
         <h1 className="text-2xl font-bold text-primary">Terrenos</h1>

         <GroundCreateForm />

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

/**
 * {isPending ? (
            
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
 * 
 */
