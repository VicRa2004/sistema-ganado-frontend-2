import { forwardRef } from "react";
import { useRace } from "../../../hooks/useRace";
import { Select } from "../../ui/Select"; // Importa el componente Select corregido

interface CattleSelectProps {
  label: string;
  error?: string;
}

export const RaceSelect = forwardRef<HTMLSelectElement, CattleSelectProps>(
  ({ error, label, ...rest }, ref) => {
    const { useGetAllRaces } = useRace();
    const { data } = useGetAllRaces();

    return (
      <Select ref={ref} labelText={label} error={error} {...rest}>
        <option value="" disabled>
          Seleccione una opción
        </option>
        <option value="-1">Sin Raza</option>
        {data?.data.map((race) => (
          <option key={race.id_race} value={race.id_race}>
            {race.name}
          </option>
        ))}
      </Select>
    );
  }
);

RaceSelect.displayName = "RaceSelect";
