import {
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   Link,
} from "@nextui-org/react";
import { FormRegister } from "../components/auth/FormRegister";

export const Register = () => {
   return (
      <main className="flex items-center justify-center min-h-full p-10">
         <div className="bg-[url('https://ruminants.ceva.pro/hubfs/ganaderia-extensiva.jpg')] bg-cover bg-center blur h-screen w-full absolute"></div>

         <Card className="p-10">
            <CardHeader>
               <h1 className="text-3xl font-bold text-primary">Registrase</h1>
            </CardHeader>
            <CardBody>
               <FormRegister />
            </CardBody>
            <CardFooter>
               <p>
                  Ya estas registrado{" "}
                  <Link href="/login" className="text-primary">
                     Iniciar sesión
                  </Link>
               </p>
            </CardFooter>
         </Card>
      </main>
   );
};
