import { useState } from "react";
import { useCattle } from "../../../hooks/useCattle";
import { useParams, Link } from "react-router-dom";
import { useGround } from "../../../hooks/useGround";
import { Button } from "@heroui/react";

export const GroundCattle = () => {
  const params = useParams<{ id: string }>();
  const { useGetAllCattlesGround } = useCattle();
  const { useGetOneGround } = useGround();
  const [showCattles, setShowCattles] = useState(true);

  if (!params.id) throw new Error("Fallo");

  const id = parseInt(params.id);
  const { data: cattles, isPending } = useGetAllCattlesGround({ id });
  const { data: ground } = useGetOneGround(id);

  return (
    <div className="flex flex-col gap-6 justify-center items-center p-8 w-full">
      <h1 className="text-center text-3xl text-primary font-semibold">
        Detalles del Terreno
      </h1>

      {ground ? (
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden border">
          <div className="flex flex-col md:flex-row">
            {ground.image && (
              <img
                src={ground.image}
                alt={ground.name}
                className="h-64 w-full md:w-1/2 object-cover"
              />
            )}
            <div className="p-6 flex-1">
              <h2 className="text-2xl font-bold mb-4 text-primary">
                {ground.name}
              </h2>
              <div className="text-sm space-y-2">
                <div>
                  <h3 className="font-semibold">Notas:</h3>
                  <p>{ground.notes || "No hay notas"}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Medidas:</h3>
                  <p>Alto: {ground.length} | Ancho: {ground.width}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Dirección:</h3>
                  <p>{ground.address || "No hay dirección"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">Cargando terreno...</div>
      )}

      <div className="flex flex-col gap-4 items-center w-full max-w-6xl mt-6">
        <Button onClick={() => setShowCattles(!showCattles)} className="bg-primary text-white">
          {showCattles ? "Ocultar Ganados" : "Ver Ganados"}
        </Button>

        {showCattles && (
          <>
            <h2 className="text-2xl text-primary font-semibold">
              Ganados dentro del terreno
            </h2>

            {isPending ? (
              <div className="animate-pulse bg-gray-300 w-full h-40 rounded-lg" />
            ) : cattles?.data.length === 0 ? (
              <div className="text-center text-lg font-semibold">
                No hay ganados en este terreno
              </div>
            ) : (
              <div className="overflow-x-auto w-full shadow-lg rounded-lg border">
                <table className="min-w-full text-sm bg-white">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Descripción</th>
                      <th className="py-3 px-4 text-left">Observaciones</th>
                      <th className="py-3 px-4 text-left">Género</th>
                      <th className="py-3 px-4 text-left">Estatus</th>
                      <th className="py-3 px-4 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cattles?.data.map((cattle) => (
                      <tr
                        key={cattle.id_cattle}
                        className="border-b hover:bg-gray-100 transition-colors"
                      >
                        <td className="py-2 px-4">{cattle.description}</td>
                        <td className="py-2 px-4">{cattle.observations}</td>
                        <td className="py-2 px-4">{cattle.gender}</td>
                        <td className="py-2 px-4">{cattle.status}</td>
                        <td className="py-2 px-4 text-center">
                          <Link
                            to={`/app/cattles/${cattle.id_cattle}`}
                            className="text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary-600 transition"
                          >
                            Ver ganado
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
