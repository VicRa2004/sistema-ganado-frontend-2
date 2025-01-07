import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/navigation/Navbar";
import { Toaster } from "sonner";
import { ErrorBoundary } from "../../lib/ErrorBoundary";

export const HomeLayout = () => {
   return (
      <div className="min-h-screen flex flex-col">
         <Navbar />

         <ErrorBoundary>
            <Outlet />
         </ErrorBoundary>

         <Toaster />
      </div>
   );
};
