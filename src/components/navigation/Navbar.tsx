import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "./NavLink";
import { useAuth } from "../../hooks/useAuth";
import { ProfileOptions } from "./ProfileOptions";
import { Button } from "@nextui-org/react";
import { AppOptions } from "./AppOptions";

const links = [
   {
      name: "App",
      route: "/app",
   },
   {
      name: "Sobre Nosotros",
      route: "/about",
   },
   {
      name: "Ayuda",
      route: "/help",
   },
   {
      name: "Noticias",
      route: "/news",
   },
];

export function Navbar() {
   const [menuOpen, setMenuOpen] = useState(false);
   const { isLogged } = useAuth();

   return (
      <nav className="bg-primary shadow-md sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               {/* Logo */}
               <div className="text-2xl font-extrabold text-white tracking-wide">
                  <Link to="/">G.P</Link>
               </div>

               {/* Desktop Menu */}
               <div className="hidden md:flex space-x-6">
                  {links.map((link, index) => {
                     return (
                        <NavLink key={index} to={link.route}>
                           {link.name}
                        </NavLink>
                     );
                  })}
               </div>

               <div className="flex gap-2">
                  {isLogged ? (
                     <>
                        <AppOptions />
                        <ProfileOptions />
                     </>
                  ) : (
                     <Button variant="faded">
                        <Link to="/login">Login</Link>
                     </Button>
                  )}

                  {/* Mobile Menu Button */}
                  <button
                     onClick={() => setMenuOpen(!menuOpen)}
                     className="md:hidden text-primary-50 dark:text-gray-200 p-2 rounded-md hover:bg-primary-800 transition-colors"
                  >
                     {menuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
               </div>
            </div>
         </div>

         {/* Mobile Menu */}
         <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
               height: menuOpen ? "auto" : 0,
               opacity: menuOpen ? 1 : 0,
            }}
            className="md:hidden overflow-hidden bg-primary shadow-md"
         >
            {links.map((link) => {
               return (
                  <Link
                     key={link.route}
                     to={link.route}
                     className="block px-4 py-3 text-lg font-medium text-white hover:text-gray-300 hover:bg-primary-900 transition-colors"
                     onClick={() => setMenuOpen(false)}
                  >
                     {link.name}
                  </Link>
               );
            })}
         </motion.div>
      </nav>
   );
}
