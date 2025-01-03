import { Link } from "react-router-dom";

export function Footer() {
   return (
      <footer className="border-t mt-auto">
         <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
               <div className="mb-4 md:mb-0">
                  <p className="text-sm text-muted-foreground">
                     © 2023 GanadoGest. Todos los derechos reservados.
                  </p>
               </div>
               <nav className="flex space-x-4">
                  <Link
                     to="/about"
                     className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                     Acerca de
                  </Link>
                  <Link
                     to="/privacy"
                     className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                     Privacidad
                  </Link>
                  <Link
                     to="/terms"
                     className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                     Términos
                  </Link>
                  <Link
                     to="/contact"
                     className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                     Contacto
                  </Link>
               </nav>
            </div>
         </div>
      </footer>
   );
}
