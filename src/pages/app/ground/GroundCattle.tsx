import { useCattle } from "../../../hooks/useCattle";
import { useParams, Link } from "react-router-dom";
import { useGround } from "../../../hooks/useGround";
import { Button } from "@heroui/react";

export const GroundCattle = () => {
  const params = useParams<{ id: string }>();
  const { useGetAllCattlesGround } = useCattle();
  const { useGetOneGround } = useGround();

  if (!params.id) throw new Error("Fallo");

  const id = parseInt(params.id);
  const { data: cattles, isPending } = useGetAllCattlesGround({ id });
  const { data: ground } = useGetOneGround(id);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          {ground?.name || 'Detalles del Terreno'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Información detallada del terreno y ganado asociado
        </p>
      </div>

      {/* Tarjeta del terreno */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-neutral-700 mb-10 transition-all hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          {ground?.image && (
            <div className="md:w-1/3 h-64 relative">
              <img
                src={ground.image}
                alt={ground.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          )}
          <div className="p-6 flex-1">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {ground?.name || 'Terreno'}
              </h2>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-200">
                {cattles?.data.length || 0} ganados
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Dirección</h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {ground?.address || 'No especificada'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Dimensiones</h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {ground?.length ? `${ground.length}m × ${ground.width}m` : 'No especificadas'}
                </p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Notas</h3>
                <p className="text-gray-800 dark:text-gray-200">
                  {ground?.notes || 'No hay notas adicionales'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de ganados */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Ganados en este terreno
        </h2>

        {isPending ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : cattles?.data.length === 0 ? (
          <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-8 text-center border border-dashed border-gray-300 dark:border-neutral-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No hay ganados registrados en este terreno
            </p>
            <Button 
              as={Link} 
              to="/app/cattles/create" 
              color="primary" 
              className="mt-4"
            >
              Agregar nuevo ganado
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
            <div className="grid grid-cols-12 bg-gray-100 dark:bg-neutral-700 p-4 font-semibold text-gray-700 dark:text-gray-300">
              <div className="col-span-4 md:col-span-3">Descripción</div>
              <div className="col-span-4 md:col-span-3">Observaciones</div>
              <div className="col-span-2">Género</div>
              <div className="col-span-2">Estado</div>
              <div className="col-span-2 text-right">Acciones</div>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-neutral-700">
              {cattles?.data.map((cattle) => (
                <div 
                  key={cattle.id_cattle} 
                  className="grid grid-cols-12 p-4 items-center hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="col-span-4 md:col-span-3 font-medium text-gray-800 dark:text-gray-200">
                    {cattle.description || 'Sin descripción'}
                  </div>
                  <div className="col-span-4 md:col-span-3 text-gray-600 dark:text-gray-400 text-sm">
                    {cattle.observations || '-'}
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cattle.gender === 'female' 
                        ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {cattle.gender === 'female' ? 'Hembra' : 'Macho'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cattle.status === 1 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {cattle.status === 1 ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <div className="col-span-2 text-right">
                    <Link
                      to={`/app/cattles/${cattle.id_cattle}`}
                      className="text-sm bg-primary hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg transition-colors inline-block"
                    >
                      Ver más
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};