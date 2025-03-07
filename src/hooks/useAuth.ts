import { useAuthStore } from "../store/auth_store";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useError } from "./useError";

export const useAuth = () => {
  const navigate = useNavigate();
  const { handleError } = useError();
  const setUser = useAuthStore((state) => state.setUser);
  const getToken = useAuthStore((state) => state.getToken);

  const sendEmailUser = async (email: string) => {
    try {
      const resp = await authService.sendEmail(email);

      console.log(resp);
    } catch (error) {
      handleError(error);
    }
  };

  const confirmEmailUser = async (token: string) => {
    try {
      await authService.verifyEmail(token);
    } catch (error) {
      handleError(error);
    } finally {
      navigate("/login");
    }
  };

  const logoutUser = () => {
    setUser(null);
    navigate("/login");
  };

  const isLogged = useAuthStore((state) => {
    return state.user !== null;
  });

  return {
    sendEmailUser,
    logoutUser,
    isLogged,
    getToken,
    confirmEmailUser,
  };
};
