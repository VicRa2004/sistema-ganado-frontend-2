import { Input } from "../../components/ui/Input";
import { Button } from "@nextui-org/react";

export const GroundCreateForm = () => {
  return (
    <div className="border-2 p-6 rounded-lg flex flex-col items-center">
      <h2 className="text-xl text-primary font-semibold mb-2">
        Crear un terreno
      </h2>
      <form className="grid grid-cols-2 gap-4">
        <Input
          className="col-span-full"
          labelText="Nombre"
          placeholder="Rancho San Martin"
        />
        <Input
          labelText="Largo del terreno"
          placeholder="10.20"
          type="number"
        />
        <Input
          labelText="Ancho del terreno"
          placeholder="20.34"
          type="number"
        />
        <Input
          className="col-span-full"
          labelText="Direcccion"
          placeholder="Carretera principal"
        />
        <Input
          className="col-span-full"
          labelText="Notas"
          placeholder="Terreno indundado la mitad del año"
        />
        <Input className="col-span-full" labelText="Imagen" type="file" />

        <Button
          className="col-span-full"
          color="primary"
          variant="shadow"
          type="submit"
        >
          Crear terreno
        </Button>
      </form>
    </div>
  );
};
