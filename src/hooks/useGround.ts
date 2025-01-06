import { useAuth } from "./useAuth";
import { GroundService } from "../services/grounds.service";
import { useQuery } from "@tanstack/react-query";

export const useGround = () => {
   const { getToken } = useAuth();
   const token = getToken();

   // Clase para pasar el token al servicio
   const groundService = new GroundService(token);

   const getAll = async () => {
      return await groundService.getGrouns();
   };

   const { data, isLoading, error } = useQuery({
      queryKey: [""],
      queryFn: getAll,
   });

   return { data, isLoading, error };
};
