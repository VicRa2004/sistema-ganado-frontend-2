import { useAuthStore } from "../store/auth_store";
import { authService } from "../services/auth.service";
import { toast } from "sonner";

export const useAuth = () => {
   const setUser = useAuthStore((state) => state.setUser);
   const getToken = useAuthStore((state) => state.getToken);

   const sendEmailUser = async (email: string) => {
      try {
         const resp = await authService.sendEmail(email);

         console.log(resp);
      } catch {
         toast.error("Error al enviar el correo");
      }
   };

   const logoutUser = () => setUser(null);

   const isLogged = useAuthStore((state) => state.user !== null);

   return {
      sendEmailUser,
      logoutUser,
      isLogged,
      getToken,
   };
};
