import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <main className="flex-grow h-full flex flex-col items-center justify-start">
      <h1>Panel de administración</h1>
      <Outlet />
    </main>
  );
};
