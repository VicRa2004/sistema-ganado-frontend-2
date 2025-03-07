import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <main className="flex-grow h-full flex flex-col items-center justify-start">
      <Outlet />
    </main>
  );
};
