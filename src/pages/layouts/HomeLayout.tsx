import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navigation/Navbar";
import { Toaster } from "sonner";

export const HomeLayout = () => {
   return (
      <div className="min-h-screen">
         <Navbar />
         <>
            <Outlet />
         </>
         <Toaster />
      </div>
   );
};
