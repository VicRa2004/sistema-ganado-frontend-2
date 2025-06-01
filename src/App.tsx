import { NextUIProvider } from "@nextui-org/react";
import { Routes, Route, useNavigate, useHref } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error404 } from "./pages/Error404";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SendEmail } from "./pages/SendEmail";
import { ConfirmEmail } from "./pages/ConfirmEmail";

import { HomeLayout } from "./pages/layouts/HomeLayout";
import { AppMain } from "./pages/app/AppMain";
import { Grounds } from "./pages/app/Grounds";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Irons } from "./pages/app/Irons";
import { Cattles } from "./pages/app/Cattles";

import { RouteProtectec } from "./components/RouteProtectec";
import { AppLayout } from "./pages/layouts/AppLayout";
import { GroundCattle } from "./pages/app/ground/GroundCattle";
import Cattle from "./pages/app/cattle/Cattle";

const queryClient = new QueryClient();

export const App = () => {
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider navigate={navigate} useHref={useHref}>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/send-email/:email" element={<SendEmail />}></Route>
            <Route path="/verify-email/:token" element={<ConfirmEmail />} />
            <Route path="/app" element={<RouteProtectec />}>
              <Route element={<AppLayout />}>
                <Route index element={<AppMain />}></Route>
                <Route path="grounds" element={<Grounds />}></Route>
                <Route
                  path="grounds/cattles/:id"
                  element={<GroundCattle />}
                ></Route>
                <Route path="irons" element={<Irons />}></Route>
                <Route path="cattles" element={<Cattles />}></Route>
                <Route path="cattles/:id" element={<Cattle/>} ></Route>
              </Route>
            </Route>
            <Route path="*" element={<Error404 />}></Route>
          </Route>
        </Routes>
      </NextUIProvider>
    </QueryClientProvider>
  );
};
