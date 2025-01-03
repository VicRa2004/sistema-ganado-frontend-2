import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
   if (error instanceof AxiosError) {
      if (error.request) {
         return {
            message: "No se pudo conectar con el servidor",
         };
      }

      if (error.response) {
         const err = error as AxiosError<{
            error: {
               messages: string[];
            };
         }>;

         console.log(err.response?.data.error.messages[0]);

         return {
            message: "La respuesta salio mal",
         };
      }
   }

   if (error instanceof Error) {
      console.log(error);
      return {
         message: "A ocurrido un error inesperado",
      };
   }

   return {
      message: "A ocurrido un error inesperado",
   };
};
