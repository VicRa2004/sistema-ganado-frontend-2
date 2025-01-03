import { useState } from "react";
import { authService } from "../../services/auth.service";
import type { RegisterType } from "../../vite-env";
import { toast } from "sonner";
import { handleError } from "../../lib/handleError";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
   const navigate = useNavigate();

   const [loading, setLoading] = useState(false);

   const registerUser = async (data: RegisterType) => {
      setLoading(true);

      try {
         const resp = await authService.register(data);

         console.log(resp);

         setLoading(false);

         toast.success("Se creo correctamente la cuenta");

         navigate("/app");
      } catch (error) {
         const { message } = handleError(error);
         toast.error(message, { className: "bg-danger text-white" });
      } finally {
         setLoading(false);
      }
   };

   return { registerUser, loading };
};
