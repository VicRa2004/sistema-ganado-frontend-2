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
import { FormValues, formSchema } from "../../lib/schemas/login.schema";
import { Input } from "../ui/Input";
import { useLogin } from "../../hooks/auth/useLogin";

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
      <main className="relative flex items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
         {/* Background Image */}
         <div className="absolute inset-0">
            <div
               className="h-full w-full bg-cover bg-center"
               style={{
                  backgroundImage:
                     "url('https://ruminants.ceva.pro/hubfs/ganaderia-extensiva.jpg')",
               }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
         </div>

         {/* Card Container */}
         <Card className="relative z-10 w-full max-w-lg p-6 shadow-lg bg-white dark:bg-gray-800 rounded-xl">
            <CardHeader className="pb-4 text-center">
               <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                  Iniciar Sesión
               </h1>
            </CardHeader>

            <CardBody className="pb-4">
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
                           labelText="Email"
                           type="email"
                           error={errors.email?.message}
                           className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md px-4 py-2"
                        />
                     )}
                  />

                  <Controller
                     name="password"
                     control={control}
                     render={({ field }) => (
                        <Input
                           {...field}
                           placeholder="secret-password-123"
                           labelText="Contraseña"
                           type="password"
                           error={errors.password?.message}
                           className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-md px-4 py-2"
                        />
                     )}
                  />

                  <Button
                     isLoading={loading}
                     type="submit"
                     color="primary"
                     className="text-lg bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2"
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
                     className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
                  >
                     Regístrate aquí
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </main>
   );
};
