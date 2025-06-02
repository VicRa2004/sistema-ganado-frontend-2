import { Link } from "react-router-dom";

const modules = [
  {
    title: "Gestión de Terrenos",
    description: "Administra parcelas, ubicaciones y superficies del rancho.",
    path: "/app/grounds",
    image: "https://www.icasas.mx/noticias/wp-content/uploads/2018/01/Vender-terreno.jpeg",
  },
  {
    title: "Control de Fierros",
    description: "Consulta y registra los fierros ganaderos oficiales.",
    path: "/app/irons",
    image: "https://eleese.com.mx/wp-content/uploads/2020/08/abren-registro-de-fierro-ganadero.jpg",
  },
  {
    title: "Administración de Ganado",
    description: "Gestiona razas, edades y estado de salud del ganado.",
    path: "/app/cattles",
    image: "https://multimin.com.mx/wp-content/uploads/2022/08/MM_Foto_0019_cows-on-green-field-and-blue-sky-1080x627.jpg",
  },
  {
    title: "Registro de Crías",
    description: "Lleva seguimiento del nacimiento y evolución de las crías.",
    path: "/app/registro-crias",
    image: "https://foodispower.org/wp-content/uploads/2023/02/Cows-Raised-for-Milk-1024x526.jpg",
  },
];

export const AppMain = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-14">
        Panel de Control Ganadero
      </h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link
            key={mod.title}
            to={mod.path}
            className="group block rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={mod.image}
                alt={mod.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent" />
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold text-green-800 group-hover:text-green-900 transition">
                {mod.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{mod.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
