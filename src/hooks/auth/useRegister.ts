import { useState } from "react";
import { authService } from "../../services/auth.service";
import type { RegisterType } from "../../vite-env";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useError } from "../useError";

export const useRegister = () => {
   const navigate = useNavigate();
   const { handleError } = useError();

   const [loading, setLoading] = useState(false);

   const registerUser = async (data: RegisterType) => {
      setLoading(true);

      try {
         const resp = await authService.register(data);

         console.log(resp);

         setLoading(false);

         toast.success("Se creo correctamente la cuenta");

         navigate("/login");
      } catch (error) {
         handleError(error);
      } finally {
         setLoading(false);
      }
   };

   return { registerUser, loading };
};
