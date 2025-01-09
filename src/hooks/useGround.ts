import { useAuth } from "./useAuth";
import { GroundService } from "../services/grounds.service";
import { useQuery } from "@tanstack/react-query";
import { ResponseGroundAllType } from "../types";

export const useGround = () => {
   const { getToken } = useAuth();
   const token = getToken();

   // Clase para pasar el token al servicio
   const groundService = new GroundService(token);

   const getAllGrounds = useQuery<ResponseGroundAllType>({
      queryKey: ["grounds"],
      queryFn: async () => {
         const res = await groundService.getGrouns();
         return res;
      },
   });

   return { getAllGrounds };
};
