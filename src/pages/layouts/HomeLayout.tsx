import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navigation/Navbar";
import { Toaster } from "sonner";

export const HomeLayout = () => {
   return (
      <div className="min-h-screen flex flex-col">
         <Navbar />

         <Outlet />

         <Toaster />
      </div>
   );
};
