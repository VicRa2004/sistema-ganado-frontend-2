import { Button, Link } from "@nextui-org/react";

export function Error404() {
   return (
      <div className="flex-grow flex flex-col items-center justify-center h-full">
         {/* Title */}
         <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
         <h2 className="text-xl text-gray-700 mb-6">
            ¡Ups! La página que buscas no existe.
         </h2>

         {/* Button to Redirect */}
         <Button as={Link} href="/" color="primary" variant="shadow">
            Regresar al inicio
         </Button>
      </div>
   );
}
