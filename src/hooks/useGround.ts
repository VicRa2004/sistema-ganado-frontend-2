import { useAuth } from "./useAuth";
import { getGrouns } from "../api/ground";

export const useGround = () => {
   const { getToken } = useAuth();

   const getAll = async () => {
      const token = getToken();
      return await getGrouns(token);
   };

   return { getAll };
};
