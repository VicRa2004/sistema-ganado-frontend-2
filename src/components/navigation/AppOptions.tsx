import {
   Dropdown,
   DropdownTrigger,
   DropdownMenu,
   DropdownItem,
} from "@heroui/react";
import { ClipboardList } from "lucide-react";

export function AppOptions() {
   return (
      <Dropdown>
         <DropdownTrigger>
            <button className="text-white dark:text-gray-200 p-2 rounded-md hover:bg-primary-800 transition-colors">
               <ClipboardList size={24} />
            </button>
         </DropdownTrigger>
         <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="terrenos">
               <button className="flex items-center gap-2">Ver Terrenos</button>
            </DropdownItem>

            <DropdownItem key="fierros">
               <button className="flex items-center gap-2">Ver Fierros</button>
            </DropdownItem>
            <DropdownItem key="ganados">
               <button className="flex items-center gap-2">Ver Ganados</button>
            </DropdownItem>
            <DropdownItem key="crias">
               <button className="flex items-center gap-2">
                  Ver registro de crias
               </button>
            </DropdownItem>
         </DropdownMenu>
      </Dropdown>
   );
}
