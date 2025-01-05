import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
   if (error instanceof AxiosError) {
      if (error.response) {
         const err = error as AxiosError<{
            error: {
               messages: string[];
               type: string;
            };
         }>;

         if (err.response?.data.error.type == "VALIDATE") {
            return {
               message: "La respuesta salio mal",
               type: "VALIDATE",
            };
         }

         if (err.response?.data.error)
            return {
               message: "La respuesta salio mal",
            };
      }

      if (error.request) {
         return {
            message: "No se pudo conectar con el servidor",
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
