import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Spinner } from "@heroui/react";

export const ConfirmEmail = () => {
   const { token } = useParams<{ token: string }>();
   const { confirmEmailUser } = useAuth();

   const confirmEmail = () => {
      if (token) {
         confirmEmailUser(token);
      }
   };

   useEffect(() => {
      confirmEmail();
   });

   return (
      <main className="flex-grow flex flex-col items-center justify-center p-10">
         <h1 className="text-2xl font-bold text-primary mb-4">
            Validando Token...
         </h1>
         <Spinner
            color="primary"
            label="Loading..."
            labelColor="primary"
            size="lg"
         />
      </main>
   );
};
