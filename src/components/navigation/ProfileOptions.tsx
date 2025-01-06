import {
   Dropdown,
   DropdownTrigger,
   DropdownMenu,
   DropdownItem,
   Button,
} from "@nextui-org/react";

import { useAuth } from "../../hooks/useAuth";

export function ProfileOptions() {
   const { logoutUser } = useAuth();

   return (
      <Dropdown>
         <DropdownTrigger>
            <Button color="primary" variant="faded">
               Opciones
            </Button>
         </DropdownTrigger>
         <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="copy">Ver Perfil</DropdownItem>
            <DropdownItem key="new">Configuracion</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
               <button onClick={() => logoutUser()}>Cerrar sesión</button>
            </DropdownItem>
         </DropdownMenu>
      </Dropdown>
   );
}
