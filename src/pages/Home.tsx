import { Card, CardHeader, CardBody, Button, Link } from "@nextui-org/react";
import {
   MilkIcon as Cow,
   PiggyBank,
   ClipboardList,
   ShieldCheck,
} from "lucide-react";

export function Home() {
   const features = [
      {
         title: "Gestión Eficiente",
         description: "Registra y monitorea tu ganado con facilidad.",
         icon: Cow,
      },
      {
         title: "Control Financiero",
         description: "Mantén un registro detallado de ingresos y gastos.",
         icon: PiggyBank,
      },
      {
         title: "Informes Detallados",
         description:
            "Genera reportes completos para tomar mejores decisiones.",
         icon: ClipboardList,
      },
      {
         title: "Seguridad de Datos",
         description:
            "Tu información está protegida con las últimas tecnologías.",
         icon: ShieldCheck,
      },
   ];

   return (
      <div className="mt-16 px-6 py-12">
         {/* Header */}
         <h1 className="text-4xl font-bold text-center mb-8">
            Sistema de Gestión de Ganado
         </h1>
         <p className="text-lg text-center text-gray-600 mb-12">
            Bienvenido a tu plataforma integral para la gestión eficiente de tu
            ganado.
         </p>

         {/* Features */}
         <div className="flex flex-wrap justify-center gap-6">
            {features.map((feature, index) => (
               <Card
                  key={index}
                  isHoverable
                  style={{ width: "100%", maxWidth: "300px" }}
               >
                  <CardHeader className="flex flex-col items-center">
                     <feature.icon className="w-10 h-10 text-primary mb-3" />
                     <h3 className="text-xl font-semibold text-center">
                        {feature.title}
                     </h3>
                  </CardHeader>
                  <CardBody>
                     <p className="text-sm text-center text-gray-500">
                        {feature.description}
                     </p>
                  </CardBody>
               </Card>
            ))}
         </div>

         {/* Call to Action */}
         <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">
               ¿Necesitas ayuda para comenzar?
            </h2>
            <Button as={Link} href="/help" variant="solid" color="primary">
               Ver Guía de Inicio Rápido
            </Button>
         </div>
      </div>
   );
}
