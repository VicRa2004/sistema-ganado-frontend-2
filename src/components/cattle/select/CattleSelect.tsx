import { SelectHTMLAttributes, forwardRef } from "react";
import { useCattle } from "../../../hooks/useCattle";

interface CattleSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string; // Hacer opcional para evitar errores si no se proporciona
}

export const CattleSelect = forwardRef<HTMLSelectElement, CattleSelectProps>(
  ({ error, label, ...rest }, ref) => {
    const { useGetAllCattles } = useCattle();
    const { data } = useGetAllCattles();

    return (
      <div className="flex flex-col gap-2 col-span-full">
        <label
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={rest.id || ""}
        >
          {label}
        </label>
        <select {...rest} ref={ref} className="w-full p-2 border rounded">
          <option value="" disabled>
            Seleccione una opción
          </option>
          <option value="">Sin padre</option>
          {data?.data.map((cattle) => (
            <option key={cattle.id_cattle} value={cattle.id_cattle}>
              {cattle.description}
            </option>
          ))}
        </select>

        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

CattleSelect.displayName = "CattleSelect";
