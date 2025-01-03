import { z } from "zod";

export const formSchema = z.object({
   email: z
      .string({
         required_error: "El correo es requerido",
      })
      .email({
         message: "Por favor, ingrese un correo válido.",
      }),
   password: z
      .string({
         required_error: "La contraseña es requerida",
      })
      .min(8, {
         message: "La contraseña debe tener al menos 8 caracteres.",
      }),
});

export type FormValues = z.infer<typeof formSchema>;
