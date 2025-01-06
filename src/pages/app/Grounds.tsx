import { useGround } from "../../hooks/useGround";

export const Grounds = () => {
   const { getAllGrounds } = useGround();

   const { isPending, data } = getAllGrounds;

   return (
      <div>
         {isPending ? (
            "cargando"
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
