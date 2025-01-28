import { AxiosError } from "axios";

type TypeError = "SESION" | "VALIDATE" | "DATAFORM";

interface ErrorType {
  message: string;
  type?: TypeError;
}

export const handleError = (error: unknown): ErrorType => {
  console.log(error);

  if (error instanceof AxiosError) {
    if (error.response) {
      const err = error as AxiosError<{
        error: {
          messages: string[];
          type: string;
        };
      }>;

      if (
        err.response?.data.error.messages[0] == "Incorrect password o email"
      ) {
        return {
          message: "La contraseña o el correo son incorrectos",
          type: "DATAFORM",
        };
      }

      if (err.response?.data.error.type == "SESION") {
        return {
          message: "La sesion expiro o ya no es valida",
          type: "SESION",
        };
      }

      // Si la respuesta es un error de correo
      if (err.response?.data.error.type == "VALIDATE") {
        return {
          message: "El correo no esta validado",
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
