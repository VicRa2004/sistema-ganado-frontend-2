import { useState } from "react";
import { authService } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth_store";
import type { LoginType } from "../../vite-env";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useError } from "../useError";

export const useLogin = () => {
   const navigate = useNavigate();
   const { handleError } = useError();
   const setUser = useAuthStore((state) => state.setUser);

   const [loading, setLoading] = useState(false);

   const loginUser = async (data: LoginType) => {
      setLoading(true);

      try {
         const resp = await authService.login(data);

         setUser(resp);
         setLoading(false);

         toast.success("Se inicio sesión correctamente");

         console.log(resp);

         if (resp.rol == "admin") {
            navigate("/admin");
            return;
         }

         navigate("/app");
      } catch (error) {
         handleError(error, {
            email: data.email,
         });
      } finally {
         setLoading(false);
      }
   };

   return { loginUser, loading };
};
