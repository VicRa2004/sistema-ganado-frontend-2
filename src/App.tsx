import { NextUIProvider } from "@nextui-org/react";
import { Routes, Route, useNavigate, useHref } from "react-router-dom";
import { Home } from "./pages/Home";
import { Error404 } from "./pages/Error404";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { SendEmail } from "./pages/SendEmail";

import { HomeLayout } from "./pages/layouts/HomeLayout";

export const App = () => {
   const navigate = useNavigate();

   return (
      <NextUIProvider navigate={navigate} useHref={useHref}>
         <Routes>
            <Route path="/" element={<HomeLayout />}>
               <Route index element={<Home />}></Route>
               <Route path="/login" element={<Login />}></Route>
               <Route path="/register" element={<Register />}></Route>
               <Route path="/send-email/:email" element={<SendEmail />}></Route>
               <Route path="*" element={<Error404 />}></Route>
            </Route>
         </Routes>
      </NextUIProvider>
   );
};
