import { useAuthStore } from "../store/auth_store";
import { authService } from "../services/auth.service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
   const navigate = useNavigate();
   const setUser = useAuthStore((state) => state.setUser);
   const getToken = useAuthStore((state) => state.getToken);

   const sendEmailUser = async (email: string) => {
      try {
         const resp = await authService.sendEmail(email);

         console.log(resp);
      } catch {
         toast.error("Error al enviar el correo, token invalido o expirado");
      }
   };

   const confirmEmailUser = async (token: string) => {
      try {
         await authService.verifyEmail(token);
      } catch {
         toast.error("Error al confirmar el correo", {
            className: "bg-danger text-white text-lg",
         });
      } finally {
         navigate("/login");
      }
   };

   const logoutUser = () => setUser(null);

   const isLogged = useAuthStore((state) => state.user !== null);

   return {
      sendEmailUser,
      logoutUser,
      isLogged,
      getToken,
      confirmEmailUser,
   };
};
