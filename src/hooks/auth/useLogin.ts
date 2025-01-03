import { useState } from "react";
import { authService } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth_store";
import type { LoginType } from "../../vite-env";
import { toast } from "sonner";
import { handleError } from "../../lib/handleError";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
   const navigate = useNavigate();
   const setUser = useAuthStore((state) => state.setUser);

   const [loading, setLoading] = useState(false);

   const loginUser = async (data: LoginType) => {
      setLoading(true);

      try {
         const resp = await authService.login(data);

         setUser(resp);
         setLoading(false);

         toast.success("Se inicio sesión correctamente");

         navigate("/app");
      } catch (error) {
         const { message } = handleError(error);
         toast.error(message, { className: "bg-danger text-white" });
      } finally {
         setLoading(false);
      }
   };

   return { loginUser, loading };
};
