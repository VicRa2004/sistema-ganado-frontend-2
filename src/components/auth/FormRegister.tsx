import { Input } from "../ui/Input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useRegister } from "../../hooks/auth/useRegister";
import { FormValues, formSchema } from "../../lib/schemas/register.schema";

export const FormRegister = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormValues>({
      defaultValues: {
         email: "",
      },
      resolver: zodResolver(formSchema),
   });

   const { registerUser, loading } = useRegister();

   const onSubmit = async ({
      email,
      password,
      fullname,
      username,
   }: FormValues) => {
      await registerUser({ email, password, fullname, username });
   };

   return (
      <form
         noValidate
         className="flex flex-col gap-4"
         onSubmit={handleSubmit(onSubmit)}
      >
         <div className="md:flex gap-4">
            <Controller
               name="fullname"
               control={control}
               render={({ field }) => (
                  <Input
                     {...field}
                     placeholder="Marcos Cardenaz Magaña"
                     labelText="Nombre completo"
                     type="text"
                     error={errors.fullname?.message}
                  />
               )}
            />

            <Controller
               name="username"
               control={control}
               render={({ field }) => (
                  <Input
                     {...field}
                     placeholder="MarcosMagaña1"
                     labelText="Nombre de usuario"
                     type="text"
                     error={errors.username?.message}
                  />
               )}
            />
         </div>

         <Controller
            name="email"
            control={control}
            render={({ field }) => (
               <Input
                  {...field}
                  placeholder="example@email.com"
                  labelText="Email"
                  type="email"
                  error={errors.email?.message}
               />
            )}
         />

         <Controller
            name="password"
            control={control}
            render={({ field }) => (
               <Input
                  {...field}
                  placeholder="secret-passowrd-123"
                  labelText="Contraseña"
                  type="password"
                  error={errors.password?.message}
               />
            )}
         />

         <Button
            isLoading={loading}
            type="submit"
            color="primary"
            className="text-lg"
         >
            Registrarse
         </Button>
      </form>
   );
};
