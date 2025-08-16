import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const RouteProtectec = () => {
  const { isLogged } = useAuth();

  if (!isLogged) return <Navigate to="/login" />;

  return <Outlet />;
};
