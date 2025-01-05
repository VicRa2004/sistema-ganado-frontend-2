import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Button } from "@nextui-org/react";
export const SendEmail = () => {
   const { email } = useParams<{ email: string }>();
   console.log(email);
   const { sendEmailUser } = useAuth();

   const sendEmail = async () => {
      if (email) {
         sendEmailUser(email);
      }
   };

   useEffect(() => {
      sendEmail();
   }, []);

   return (
      <main className="flex-grow flex flex-col items-center justify-center p-10">
         <h1 className="text-4xl font-bold mb-4">¡Verificación en proceso!</h1>
         <h2 className="text-2xl mb-4">Confirma tu dirección de correo</h2>
         <p className="text-muted-foreground mb-8 text-center max-w-md">
            Te hemos enviado un correo para verificar tu cuenta. Por favor,
            revisa tu bandeja de entrada y haz clic en el enlace de
            verificación.
         </p>
         <div className="flex flex-col sm:flex-row gap-4">
            <Button color="primary" onPress={() => sendEmail()}>
               Reenviar verificación
            </Button>
            <Button color="primary" variant="bordered">
               <Link to="/login">Ir al login</Link>
            </Button>
         </div>
      </main>
   );
};
