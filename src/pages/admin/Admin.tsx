import { Link } from "react-router-dom";

const urls = [
  {
    name: "Ganados",
    description: "Gestión de Razas",
    to: "/races",
  },
  {
    name: "Usuarios",
    description: "Gestión de usuarios",
    to: "/users",
  },
];

export const Admin = () => {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-600">Panel de Administrador</h1>

      <div>
          {urls.map((url) => (
            <div className="border-2 border-gray-400 rounded-md mb-4 p-4 text-lg flex flex-col gap-2" key={url.to}>

              <h2 className="text-xl font-semibold">{url.name}</h2>

              <p>{url.description}</p>

              <Link to={`/admin${url.to}`} className="bg-gray-400 p-2 rounded-md transition-colors text-white hover:bg-gray-600">
                Ir a
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
} 