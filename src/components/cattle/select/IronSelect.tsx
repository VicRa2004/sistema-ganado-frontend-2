import { forwardRef } from "react";
import { useIron } from "../../../hooks/useIron";
import { Select } from "../../ui/Select"; // Importa el componente Select corregido

interface IronSelectProps {
  label?: string; // Hacer opcional para flexibilidad
  error?: string;
}

export const IronSelect = forwardRef<HTMLSelectElement, IronSelectProps>(
  ({ label, error, ...rest }, ref) => {
    const { useGetAllIrons } = useIron();
    const { data } = useGetAllIrons();

    return (
      <Select ref={ref} labelText={label} error={error} {...rest}>
        <option value="" disabled>
          Seleccione un fierro
        </option>
        {data?.data.map((iron) => (
          <option key={iron.id_iron} value={iron.id_iron}>
            {iron.name}
          </option>
        ))}
      </Select>
    );
  }
);

IronSelect.displayName = "IronSelect";
