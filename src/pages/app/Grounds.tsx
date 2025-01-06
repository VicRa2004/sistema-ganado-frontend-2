import { useGround } from "../../hooks/useGround";
import { SkeletonGrid } from "../../components/ui/SkeletonGrid";
import { useEffect } from "react";

export const Grounds = () => {
   const { getAllGrounds } = useGround();

   const { isPending, isError, error, data } = getAllGrounds;

   useEffect(() => {
      if (error) {
         console.log(error);
      }
   }, [error]);

   return (
      <div>
         {isPending && isError ? (
            <SkeletonGrid />
         ) : (
            <div>
               {data?.data.map((ground, index) => {
                  return (
                     <div key={index}>
                        <h1>{ground.name}</h1>
                        <img width={300} src={ground.image} alt="" />
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
};
