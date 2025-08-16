import { Link } from "react-router-dom";
import {
  ArrowRight,
  Dog as Cow,
  LandPlot,
  ShieldCheck,
  Milk,
} from "lucide-react";

const modules = [
  {
    title: "Gestión de Terrenos",
    description: "Administra parcelas, ubicaciones y superficies del rancho.",
    path: "/app/grounds",
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000",
    icon: <LandPlot className="w-6 h-6" />,
    stats: "",
  },
  {
    title: "Control de Fierros",
    description: "Consulta y registra los fierros ganaderos oficiales.",
    path: "/app/irons",
    image:
      "https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1000",
    icon: <ShieldCheck className="w-6 h-6" />,
    stats: "",
  },
  {
    title: "Administración de Ganado",
    description: "Gestiona razas, edades y estado de salud del ganado.",
    path: "/app/cattles",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=1000",
    icon: <Cow className="w-6 h-6" />,
    stats: "",
  },
  {
    title: "Registro de Crías",
    description: "Lleva seguimiento del nacimiento y evolución de las crías.",
    path: "/app/registro-crias",
    image:
      "https://foodispower.org/wp-content/uploads/2021/12/EdgarsMission_Valentine-and-Clarabelle.jpg",
    icon: <Milk className="w-6 h-6" />,
    stats: "",
  },
];

export const AppMain = () => {
  return (
    <div className="flex-grow px-4 py-8 sm:px-6 lg:px-8">
      {/* Encabezado */}
      <div className="text-center mb-12 relative overflow-hidden rounded-xl bg-green-700 dark:bg-green-800 py-12 px-6 shadow-lg">
        <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg')] opacity-20 dark:opacity-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold text-white relative z-10 mb-3">
          Panel de Control Ganadero
        </h1>
        <p className="text-lg text-green-100 dark:text-green-200 max-w-2xl mx-auto relative z-10">
          Gestión integral de tu producción pecuaria en un solo lugar
        </p>
      </div>

      {/* Tarjetas de módulos */}
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod) => (
          <Link
            key={mod.title}
            to={mod.path}
            className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-400"
          >
            {/* Imagen con overlay */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={mod.image}
                alt={mod.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-800/30 to-transparent" />
            </div>

            {/* Icono flotante */}
            <div className="absolute top-3 right-5 bg-white dark:bg-gray-700 p-3 rounded-full shadow-md border border-gray-100 dark:border-gray-600">
              <div className="text-green-600 dark:text-green-400">
                {mod.icon}
              </div>
            </div>

            {/* Contenido */}
            <div className="p-5 flex-1 flex flex-col">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                  {mod.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {mod.description}
                </p>
              </div>

              {/* Footer con estadísticas y CTA */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="">
                  {mod.stats}
                </span>
                <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400 group-hover:text-green-800 dark:group-hover:text-green-300 transition-colors">
                  Acceder <ArrowRight className="ml-1 w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
