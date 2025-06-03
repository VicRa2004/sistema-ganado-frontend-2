import { forwardRef } from "react";
import { useGround } from "../../../hooks/useGround";
import { Select } from "../../ui/Select"; // Importa el componente Select corregido

interface GroundSelectProps {
  label: string;
  error?: string;
}

export const GroundSelect = forwardRef<HTMLSelectElement, GroundSelectProps>(
  ({ error, label, ...rest }, ref) => {
    const { useGetAllGround } = useGround();
    const { data, isPending } = useGetAllGround();

    return (
      <>
        {isPending ? (
          <h1>Cargando</h1>
        ) : (
          <Select ref={ref} labelText={label} error={error} {...rest}>
            <option value="-1">Sin Terreno</option>
            {data?.data.map((ground) => (
              <option key={ground.id_ground} value={ground.id_ground}>
                {ground.name}
              </option>
            ))}
          </Select>
        )}
      </>
    );
  }
);

GroundSelect.displayName = "GroundSelect";
