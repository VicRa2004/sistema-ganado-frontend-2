import {
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   Link,
} from "@nextui-org/react";
import { FormLogin } from "../components/auth/FormLogin";

export const Login = () => {
   return (
      <main className="flex items-center justify-center min-h-full p-16">
         <div className="bg-[url('https://ruminants.ceva.pro/hubfs/ganaderia-extensiva.jpg')] bg-cover bg-center blur h-screen w-full absolute"></div>
         <Card className="p-10">
            <CardHeader>
               <h1 className="text-3xl font-bold text-primary">Login</h1>
            </CardHeader>
            <CardBody>
               <FormLogin />
            </CardBody>
            <CardFooter>
               <p>
                  No tienes cuenta{" "}
                  <Link href="/register" className="text-primary font-semibold">
                     Registrarse
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </main>
   );
};
