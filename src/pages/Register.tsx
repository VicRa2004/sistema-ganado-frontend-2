import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
} from "@heroui/react";
import { useRegister } from "../hooks/auth/useRegister";
import { Input } from "../components/ui/Input";
import { FormValues, formSchema } from "../lib/schemas/register.schema";
import { ImgBg } from "../components/ImgBg";
import { Link } from "react-router-dom";

export const Register = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm<FormValues>({
      defaultValues: {
         email: "",
         fullname: "",
         username: "",
         password: "",
      },
      resolver: zodResolver(formSchema),
   });

   const { registerUser, loading } = useRegister();

   const onSubmit = async (formData: FormValues) => {
      await registerUser(formData);
   };

   return (
      <main className="flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 ">
         {/* Background Image */}
         <ImgBg />

         {/* Card Container */}
         <Card className="relative z-10 w-full max-w-lg p-8 shadow-2xl bg-white dark:bg-black rounded-3xl">
            <CardHeader>
               <div>
                  <h1 className="text-4xl font-bold text-primary">
                     Crear una Cuenta
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                     Completa los datos para registrarte.
                  </p>
               </div>
            </CardHeader>

            <CardBody>
               <form
                  noValidate
                  className="flex flex-col gap-6"
                  onSubmit={handleSubmit(onSubmit)}
               >
                  <div className="flex flex-col md:flex-row gap-6">
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
                           placeholder="Contraseña secreta"
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
                     className="text-lg bg-primary hover:bg-primary-dark text-white font-medium rounded-lg px-5 py-3 transition duration-300"
                  >
                     Registrarse
                  </Button>
               </form>
            </CardBody>

            <CardFooter className="text-center">
               <p className="text-gray-600 dark:text-gray-400">
                  ¿Ya tienes cuenta?{" "}
                  <Link
                     to="/login"
                     className="font-semibold text-primary hover:underline"
                  >
                     Inicia sesión aquí
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </main>
   );
};
