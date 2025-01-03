import { Input } from "../ui/Input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useLogin } from "../../hooks/auth/useLogin";
import { FormValues, formSchema } from "../../lib/schemas/login.schema";

export const FormLogin = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormValues>({
      defaultValues: {
         email: "",
         password: "",
      },
      resolver: zodResolver(formSchema),
   });

   const { loginUser, loading } = useLogin();

   const onSubmit = async ({ email, password }: FormValues) => {
      console.log("helllo sll");
      await loginUser({ email, password });
   };

   return (
      <form
         noValidate
         className="flex flex-col gap-4"
         onSubmit={handleSubmit(onSubmit)}
      >
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
            Iniciar Sesión
         </Button>
      </form>
   );
};
