import { Link, Outlet } from "react-router-dom";

const urls = [
  {
    name: "Principal",
    to: "/",
  },
  {
    name: "Razas",
    to: "/races",
  },
  {
    name: "Usuarios",
    to: "/users",
  },
];

export const AdminLayout = () => {
  return (
    <main className="flex-grow h-full flex flex-col items-center justify-start">
      <header className="bg-slate-600 p-4 w-full text-white text-xl font-light">
        <nav>
          <ul className="flex gap-10 items-center justify-center">
            {urls.map((url) => (
              <li key={url.to}>
                <Link to={`/admin${url.to}`} className="hover:underline">
                  {url.name}
                </Link>
              </li>
            ))} 
          </ul>
        </nav>
      </header>
      <Outlet />
    </main>
  );
};
