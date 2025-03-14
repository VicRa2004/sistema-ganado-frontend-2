import { useCattle } from "../../../hooks/useCattle";
import { useParams } from "react-router-dom";
import { useGround } from "../../../hooks/useGround";
import { Card } from "../../../components/ui/Card";

export const GroundCattle = () => {
  const params = useParams<{ id: string }>();
  const { useGetAllCattlesGround } = useCattle();
  const { useGetOneGround } = useGround();

  if (!params.id) {
    throw new Error("Fallo");
  }

  const id = parseInt(params.id);

  const { data: cattles, isPending } = useGetAllCattlesGround({ id });
  const { data: ground } = useGetOneGround(id);

  console.log(cattles);
  console.log(ground);

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-8">
      <h1 className="text-center text-3xl text-primary font-semibold">
        Detalles del Terreno
      </h1>

      {ground ? (
        <Card
          image={ground?.image}
          className=""
          title={ground?.name ?? "Cargando"}
        >
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-lg font-semibold">Notas del Terreno</h3>
              <p className="text-sm">
                {ground.notes || "No hay notas para este terreno"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Medidas</h3>
              <ul className="text-sm">
                <li>
                  <span className="font-semibold">Alto: </span>
                  {ground.length}
                </li>
                <li>
                  <span className="font-semibold">Ancho: </span>
                  {ground.width}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Dirección</h3>
              <p className="text-sm">
                {ground.address || "No hay dirección para este terreno"}
              </p>
            </div>
          </div>
        </Card>
      ) : (
        "Cargando"
      )}

      <h2 className="text-2xl text-primary font-semibold">
        Ganados dentro del terreno
      </h2>

      {isPending && (
        <div className="animate-pulse bg-gray-300 w-full h-80 rounded-lg"></div>
      )}

      {cattles?.data.length === 0 && (
        <div className="text-center text-lg font-semibold">
          No hay ganados en este terreno
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cattles?.data?.map((cattle) => (
          <Card
            key={cattle.id_cattle}
            title={cattle.description}
            image={cattle.image}
            className=""
          >
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-lg font-semibold">Observaciones</h3>
                <p className="text-sm">{cattle.observations}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Genero</h3>
                <p className="text-sm">{cattle.gender}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold">Estatus</h3>
                <p className="text-sm">{cattle.status}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
