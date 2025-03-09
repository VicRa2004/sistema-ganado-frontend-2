import { forwardRef, SelectHTMLAttributes } from "react";
import { useIron } from "../../../hooks/useIron";

interface IronSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string; // Hacer opcional para evitar errores si no se proporciona
}

export const IronSelect = forwardRef<HTMLSelectElement, IronSelectProps>(
  ({ error, ...props }, ref) => {
    const { useGetAllIrons } = useIron();

    const { data } = useGetAllIrons();

    return (
      <div className="flex flex-col gap-2 col-span-full">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Fierro
        </label>
        <select ref={ref} {...props} className="w-full p-2 border rounded">
          <option defaultChecked value="" disabled>
            Seleccione un fierro
          </option>
          {data?.data.map((iron) => (
            <option key={iron.id_iron} value={iron.id_iron}>
              {iron.name}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    );
  }
);

IronSelect.displayName = "IronSelect";
