import { CattleForm } from "../../../components/cattle/CattleForm";

export const CattleCreate = () => {
  return (
    <div className="w-full p-20 gap-4 flex flex-col">
      <h1 className="text-3xl font-bold text-primary text-center">
        Crear un registro de Ganado
      </h1>
      <CattleForm action="create" />
    </div>
  );
};
