import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   Link,
} from "@nextui-org/react";
import { FormValues, formSchema } from "../lib/schemas/login.schema";
import { Input } from "../components/ui/Input";
import { useLogin } from "../hooks/auth/useLogin";
import { ImgBg } from "../components/ImgBg";

export const Login = () => {
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
      <main className="flex items-center justify-center min-h-full p-6 bg-gray-50 dark:bg-gray-900">
         {/* Background Image */}
         <ImgBg />

         {/* Card Container */}
         <Card className="w-full max-w-lg p-8 shadow-2xl bg-white dark:bg-black rounded-3xl">
            <CardHeader>
               <div>
                  <h1 className="text-4xl font-bold text-primary">
                     Bienvenido
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                     Por favor, inicia sesión para continuar
                  </p>
               </div>
            </CardHeader>

            <CardBody className="pb-6">
               <form
                  noValidate
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <Controller
                     name="email"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="example@email.com"
                           labelText="Correo Electrónico"
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
                           placeholder="Tu contraseña secreta"
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
                     className="text-lg bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg px-5 py-3 transition duration-300"
                  >
                     Iniciar Sesión
                  </Button>
               </form>
            </CardBody>

            <CardFooter className="text-center">
               <p className="text-gray-600 dark:text-gray-400">
                  ¿No tienes cuenta?{" "}
                  <Link
                     href="/register"
                     className="font-semibold text-primary hover:underline"
                  >
                     Regístrate aquí
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </main>
   );
};
