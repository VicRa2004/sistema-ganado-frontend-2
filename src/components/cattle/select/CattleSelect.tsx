import { forwardRef } from "react";
import { useCattle } from "../../../hooks/useCattle";
import { Select } from "../../ui/Select";

interface CattleSelectProps {
  label: string;
  error?: string;
  gender: string;
}

export const CattleSelect = forwardRef<HTMLSelectElement, CattleSelectProps>(
  ({ error, label, gender, ...rest }, ref) => {
    const { useGetAllCattles } = useCattle();
    const { data, isPending } = useGetAllCattles(1, { gender });
    
    return (
      <>
        {isPending ? (
          <h1>Cargando</h1>
        ) : (
          <Select ref={ref} labelText={label} error={error} {...rest}>
            <option value="-1">Ninguno</option>
            {data?.data.map((cattle) => (
              <option key={cattle.id_cattle} value={cattle.id_cattle}>
                {cattle.lotNumber}-{cattle.description}
              </option>
            ))}
          </Select>
        )}
      </>
    );
  }
);

CattleSelect.displayName = "CattleSelect";
