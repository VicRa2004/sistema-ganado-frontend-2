import { useParams, Link } from "react-router-dom";
import { useCattle } from "../../../hooks/useCattle";
import { Button } from "@heroui/react";

const DEFAULT_IMAGE = "img/default-image-3.png";

const Cattle = () => {
  const { useGetCattle } = useCattle();
  const { id } = useParams<{ id: string }>();
  const newId = id ? parseInt(id) : null;

  if (!newId || isNaN(newId)) {
    return (
      <div className="p-6 text-center text-red-500 text-lg font-medium">
        ID no válido
      </div>
    );
  }

  const { data: cattle, isPending } = useGetCattle(newId);

  if (isPending) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!cattle) {
    return (
      <div className="p-6 text-center text-gray-500 text-lg font-medium">
        No se encontró el ganado.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-6 p-6 rounded-3xl bg-white dark:bg-neutral-900 shadow-xl transition-all duration-300">
      {/* Encabezado con imagen y datos básicos */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Imagen principal */}
        <div className="w-full lg:w-2/5">
          <img
            src={cattle.image || DEFAULT_IMAGE}
            alt="Imagen del ganado"
            className="w-full h-96 object-cover rounded-2xl shadow-lg border-4 border-green-500/20 hover:border-green-500/40 transition-all duration-300"
          />
        </div>

        {/* Información principal */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                #{cattle.lotNumber}
              </h1>
              <div className="flex gap-3 mt-2">
                <Badge color={cattle.status === 1 ? "green" : "red"}>
                  {cattle.status === 1 ? "Activo" : "Inactivo"}
                </Badge>
                <Badge color={cattle.gender === "female" ? "pink" : "blue"}>
                  {cattle.gender === "female" ? "Hembra" : "Macho"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailCard label="Registro" value={cattle.registrationNumber} icon="📋" />
            <DetailCard label="Color" value={cattle.color} icon="🎨" />
            <DetailCard 
              label="Nacimiento" 
              value={new Date(cattle.birthdate).toLocaleDateString()} 
              icon="📅" 
            />
            <DetailCard label="Descripción" value={cattle.description} icon="📝" />
          </div>

          {/* Sección de padres */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Información de Padres
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cattle.Father ? (
                <ParentCard 
                  parent={cattle.Father} 
                  relation="Padre" 
                  gender="male" 
                />
              ) : (
                <EmptyParentCard relation="Padre" />
              )}
              
              {cattle.Mother ? (
                <ParentCard 
                  parent={cattle.Mother} 
                  relation="Madre" 
                  gender="female" 
                />
              ) : (
                <EmptyParentCard relation="Madre" />
              )}
            </div>
          </div>

          {/* Observaciones y motivo de baja */}
          {(cattle.observations || cattle.reason_for_withdrawal) && (
            <div className="mt-6 space-y-3">
              {cattle.observations && (
                <DetailCard 
                  label="Observaciones" 
                  value={cattle.observations} 
                  icon="🔍" 
                  fullWidth 
                />
              )}
              {cattle.reason_for_withdrawal && (
                <DetailCard 
                  label="Motivo de baja" 
                  value={cattle.reason_for_withdrawal} 
                  icon="⚠️" 
                  fullWidth 
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sección de datos relacionados */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-neutral-700">
          Datos Relacionados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RelatedCard 
            title="Fierro" 
            image={cattle.iron.image} 
            name={cattle.iron.name} 
            description={null}
          />
          
          <RelatedCard 
            title="Raza" 
            image={cattle.race.image} 
            name={cattle.race.name} 
            description={cattle.race.description}
          />
          
          <RelatedCard 
            title="Terreno" 
            image={cattle.ground.image} 
            name={cattle.ground.name} 
            description={cattle.ground.address}
            link={`/app/grounds/${cattle.id_ground}`}
          />
        </div>
      </div>
    </div>
  );
};

// Componente para mostrar información detallada en tarjetas
const DetailCard = ({ label, value, icon, fullWidth = false }: { 
  label: string; 
  value: string; 
  icon?: string;
  fullWidth?: boolean;
}) => (
  <div className={`bg-gray-50 dark:bg-neutral-800 p-4 rounded-xl shadow-sm ${fullWidth ? 'col-span-2' : ''}`}>
    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
      {icon && <span>{icon}</span>}
      <span className="font-medium text-sm">{label}</span>
    </div>
    <p className="text-gray-800 dark:text-gray-200 font-semibold">
      {value || "No disponible"}
    </p>
  </div>
);

// Componente para mostrar información de los padres
const ParentCard = ({ parent, relation, gender }: { 
  parent: any; 
  relation: string; 
  gender: string;
}) => (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-700 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-700">
    <div className="flex items-center gap-3">
      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-neutral-600">
        <img 
          src={parent.image || DEFAULT_IMAGE} 
          alt={relation}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h4 className="font-bold text-gray-800 dark:text-white">
          {relation}: #{parent.lotNumber}
        </h4>
        <div className="flex gap-2 mt-1">
          <Badge color={gender === "female" ? "pink" : "blue"}>
            {gender === "female" ? "Hembra" : "Macho"}
          </Badge>
          <Badge color="green">
            {parent.registrationNumber}
          </Badge>
        </div>
      </div>
    </div>
    <Button 
      to={`/app/cattles/${parent.id}`} 
      as={Link} 
      color="primary" 
      variant="shadow"
      className="mt-3 w-full"
    >
      Ver detalles
    </Button>
  </div>
);

// Componente para cuando no hay información del padre/madre
const EmptyParentCard = ({ relation }: { relation: string }) => (
  <div className="bg-gray-50/50 dark:bg-neutral-800/50 p-4 rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 text-center">
    <p className="text-gray-500 dark:text-gray-400">
      No hay información del {relation.toLowerCase()}
    </p>
  </div>
);

// Componente para datos relacionados (fierro, raza, terreno)
const RelatedCard = ({ title, image, name, description, link }: { 
  title: string; 
  image: string;
  name: string;
  description: string | null;
  link?: string;
}) => (
  <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-300">
    <div className="h-48 bg-gray-100 dark:bg-neutral-700 flex items-center justify-center p-4">
      <img
        src={image || DEFAULT_IMAGE}
        alt={title}
        className="h-full w-full object-contain"
      />
    </div>
    <div className="p-5">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
        {title}: {name}
      </h3>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>
      )}
      {link && (
        <Link
          to={link}
          className="block text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          Ver {title.toLowerCase()}
        </Link>
      )}
    </div>
  </div>
);

// Componente de badge
const Badge = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  const base = "px-2.5 py-0.5 text-xs rounded-full font-semibold inline-flex items-center";
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  };
  return <span className={`${base} ${colorMap[color] || ""}`}>{children}</span>;
};

export default Cattle;