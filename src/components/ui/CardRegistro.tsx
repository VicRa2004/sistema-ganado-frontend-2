import { Button } from "@nextui-org/react";

interface CardRegistroProps {
  children?: React.ReactNode;
  data: unknown;
  title: string;
  image: string;
  handleUpdate: (data: any) => void;
  handleDelete: (data: any) => void;
  ExtraButton?: React.ReactNode;
}

export const CardRegistro = ({
  children,
  data,
  title,
  image,
  handleUpdate,
  handleDelete,
  ExtraButton
}: CardRegistroProps) => {
  return (
    <div className="p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 transition-colors">
      {/* Imagen superior */}
      <div className="w-full h-48 mb-4 rounded-xl overflow-hidden">
        <img
          src={image}
          alt="Registro"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Título destacado */}
      <h2 className="text-2xl font-bold text-primary dark:text-primary-400 mb-3 tracking-tight">
        {title}
      </h2>

      {/* Contenido inyectado */}
      <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
        {children}
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3 mt-6">
        {
          ExtraButton ? ExtraButton : null
        }
        <Button
          onPress={() => handleUpdate(data)}
          className="bg-primary text-white hover:bg-primary-700"
          radius="lg"
        >
          Editar
        </Button>
        <Button
          onPress={() => handleDelete(data)}
          className="bg-red-500 text-white hover:bg-red-600"
          radius="lg"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};
