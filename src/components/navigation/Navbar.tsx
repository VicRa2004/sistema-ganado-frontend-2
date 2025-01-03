import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "./NavLink";

export function Navbar() {
   const [darkMode, setDarkMode] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);

   const toggleDarkMode = () => {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle("dark", !darkMode);
   };

   return (
      <nav className="bg-primary shadow-md sticky top-0 z-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
               {/* Logo */}
               <div className="text-2xl font-extrabold text-white tracking-wide">
                  <Link to="/">Brand</Link>
               </div>

               {/* Desktop Menu */}
               <div className="hidden md:flex space-x-6">
                  <NavLink to="/">Inicio</NavLink>
                  <NavLink to="/about">Sobre nosotros</NavLink>
                  <NavLink to="/help">Ayuda</NavLink>
                  <NavLink to="/login">Iniciar Sesion</NavLink>
               </div>

               {/* Dark Mode Toggle */}
               <button
                  onClick={toggleDarkMode}
                  className="text-gray-800 dark:text-gray-200 p-2 rounded-md hover:bg-primary-800 transition-colors"
               >
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
               </button>

               {/* Mobile Menu Button */}
               <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden text-primary-50 dark:text-gray-200 p-2 rounded-md hover:bg-primary-800 transition-colors"
               >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
               </button>
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
            <Link
               to="/"
               className="block px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
               onClick={() => setMenuOpen(false)}
            >
               Home
            </Link>
            <Link
               to="/about"
               className="block px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
               onClick={() => setMenuOpen(false)}
            >
               About
            </Link>
            <Link
               to="/help"
               className="block px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
               onClick={() => setMenuOpen(false)}
            >
               Help
            </Link>
            <Link
               to="/login"
               className="block px-4 py-3 text-lg font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
               onClick={() => setMenuOpen(false)}
            >
               Login
            </Link>
         </motion.div>
      </nav>
   );
}
