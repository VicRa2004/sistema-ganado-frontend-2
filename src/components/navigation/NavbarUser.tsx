import React from "react";
import {
   Navbar,
   NavbarBrand,
   NavbarContent,
   NavbarItem,
   NavbarMenuToggle,
   NavbarMenu,
   NavbarMenuItem,
   Link,
   Button,
} from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "@nextui-org/use-theme";
import { ProfileOptions } from "./ProfileOptions";

export const NavbarUser = () => {
   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
   const { theme, setTheme } = useTheme();

   const links = [
      { href: "/app", label: "Inicio" },
      { href: "/help", label: "Guias y Ayuda" },
      { href: "/about", label: "Sobre nosotros" },
   ];

   return (
      <Navbar
         className="fixed top-0 px-5 py-2"
         isBordered
         onMenuOpenChange={setIsMenuOpen}
      >
         {/* Logo and Menu Toggle */}
         <NavbarContent>
            <NavbarMenuToggle
               aria-label={isMenuOpen ? "Close menu" : "Open menu"}
               className="sm:hidden"
            />
            <NavbarBrand className="text-primary text-2xl font-bold">
               Ganadero.Pro
            </NavbarBrand>
         </NavbarContent>

         {/* Main Links for Desktop */}
         <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {links.map((link, index) => (
               <NavbarItem key={index}>
                  <Link isBlock showAnchorIcon href={link.href}>
                     {link.label}
                  </Link>
               </NavbarItem>
            ))}

            <NavbarItem>
               <Button
                  variant="light"
                  color="primary"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
               >
                  {theme === "dark" ? (
                     <SunIcon className="h-5 w-5" />
                  ) : (
                     <MoonIcon className="h-5 w-5" />
                  )}
               </Button>
            </NavbarItem>
         </NavbarContent>

         {/* Right-Aligned Content */}
         <NavbarContent justify="end">
            <NavbarItem>
               <ProfileOptions />
            </NavbarItem>
         </NavbarContent>

         {/* Mobile Menu */}
         <NavbarMenu>
            {links.map((link, index) => (
               <NavbarMenuItem key={index}>
                  <Link href={link.href}>{link.label}</Link>
               </NavbarMenuItem>
            ))}
            <NavbarMenuItem>
               <Button
                  variant="light"
                  color="primary"
                  onClick={() => {
                     setTheme(theme === "dark" ? "light" : "dark");
                     setIsMenuOpen(false);
                  }}
               >
                  {theme === "dark" ? (
                     <SunIcon className="h-5 w-5" />
                  ) : (
                     <MoonIcon className="h-5 w-5" />
                  )}
                  <span className="sr-only">Cambiar tema</span>
               </Button>
            </NavbarMenuItem>
         </NavbarMenu>
      </Navbar>
   );
};
