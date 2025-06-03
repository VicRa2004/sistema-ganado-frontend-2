import { useParams, Link } from "react-router-dom";
import { useCattle } from "../../../hooks/useCattle";
import { Button } from "@heroui/react";

const DEFAULT_IMAGE = "img/default-image-3.png";

const Cattle = () => {
  const { useGetCattle } = useCattle();
  const { id } = useParams<{ id: string }>();
  const newId = id ? parseInt(id) : null;

  if (!newId || isNaN(newId)) {
    return <div className="p-6 text-center text-red-500 text-lg font-medium">ID no válido</div>;
  }

  const { data: cattle, isPending } = useGetCattle(newId);

  if (isPending) {
    return <div className="p-6 text-center text-green-600 text-lg font-medium">Cargando...</div>;
  }

  if (!cattle) {
    return <div className="p-6 text-center text-gray-500 text-lg font-medium">No se encontró el ganado.</div>;
  }

  const URL = `/app/cattles/${cattle.father}`

  console.log(URL);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 rounded-3xl shadow-lg bg-white dark:bg-neutral-900 transition-all duration-300">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={cattle.image || DEFAULT_IMAGE}
          alt="Imagen del ganado"
          className="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow-md border border-green-600"
        />

        <div className="flex-1 space-y-3">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
            #{cattle.lotNumber}
          </h2>

          <div className="flex gap-2 flex-wrap">
            <Badge color={cattle.status === 1 ? "green" : "red"}>
              {cattle.status === 1 ? "Activo" : "Inactivo"}
            </Badge>
            <Badge color={cattle.gender === "female" ? "pink" : "blue"}>
              {cattle.gender === "female" ? "Hembra" : "Macho"}
            </Badge>
          </div>

          <Detail label="Descripción" value={cattle.description} />
          <Detail label="Registro" value={cattle.registrationNumber} />
          <Detail label="Color" value={cattle.color} />
          <Detail label="Nacimiento" value={new Date(cattle.birthdate).toLocaleDateString()} />
          {cattle.observations && <Detail label="Observaciones" value={cattle.observations} />}
          {cattle.reason_for_withdrawal && (
            <Detail label="Motivo de baja" value={cattle.reason_for_withdrawal} />
          )}
          {
            cattle.father && (
              <Button to={URL} as={Link} color="primary" variant="shadow">Ver padre {cattle.father}</Button>
            )
          }
        </div>
      </div>

      {/* Datos relacionados */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hierro */}
        <Card title="Fierro">
          <img
            src={cattle.iron.image || DEFAULT_IMAGE}
            alt="Hierro"
            className="h-32 w-full object-contain mb-2 rounded border border-gray-300 bg-white dark:bg-neutral-700"
          />
          <p className="text-center font-medium text-sm text-gray-800 dark:text-gray-300">
            {cattle.iron.name}
          </p>
        </Card>

        {/* Raza */}
        <Card title="Raza">
          <img
            src={cattle.race.image || DEFAULT_IMAGE}
            alt="Raza"
            className="h-32 w-full object-cover mb-2 rounded border border-gray-300 bg-white dark:bg-neutral-700"
          />
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{cattle.race.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{cattle.race.description}</p>
        </Card>

        {/* Terreno */}
        <Card title="Terreno">
          <img
            src={cattle.ground.image || DEFAULT_IMAGE}
            alt="Terreno"
            className="h-32 w-full object-cover mb-2 rounded border border-gray-300 bg-white dark:bg-neutral-700"
          />
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
            {cattle.ground.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{cattle.ground.address}</p>
          <Link
            to={`/app/grounds/${cattle.id_ground}`}
            className="mt-3 block text-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all text-sm font-medium"
          >
            Ver terreno
          </Link>
        </Card>
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <p className="text-sm text-gray-700 dark:text-gray-300">
    <span className="font-semibold">{label}:</span> {value || "No disponible"}
  </p>
);

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-50 dark:bg-neutral-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-neutral-700 transition-all">
    <h3 className="text-md font-bold mb-3 text-green-700 dark:text-green-400">{title}</h3>
    {children}
  </div>
);

const Badge = ({ color, children }: { color: string; children: React.ReactNode }) => {
  const base =
    "px-3 py-1 text-xs rounded-full font-semibold shadow-sm border inline-block";
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200",
    red: "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200",
    blue: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200",
    pink: "bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-900 dark:text-pink-200",
  };
  return <span className={`${base} ${colorMap[color] || ""}`}>{children}</span>;
};

export default Cattle;
