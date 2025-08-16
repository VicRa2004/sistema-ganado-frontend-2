import {
   Dropdown,
   DropdownTrigger,
   DropdownMenu,
   DropdownItem,
} from "@heroui/react";
import { Sun, Moon, Cable } from "lucide-react";
import { useTheme } from "@heroui/use-theme";

export function Options() {
   const { theme, setTheme } = useTheme();

   const toggleDarkMode = () => {
      setTheme(theme === "dark" ? "light" : "dark");
   };

   return (
      <Dropdown>
         <DropdownTrigger>
            <button className="text-white dark:text-gray-200 p-2 rounded-md hover:bg-primary-800 transition-colors">
               <Cable size={24} />
            </button>
         </DropdownTrigger>
         <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new" color="primary">
               {/* Dark Mode Toggle */}
               <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2"
               >
                  {theme == "dark" ? <Sun size={24} /> : <Moon size={24} />}
                  Cambiar tema
               </button>
            </DropdownItem>
         </DropdownMenu>
      </Dropdown>
   );
}
