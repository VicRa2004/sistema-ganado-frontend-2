import {
   Card,
   CardFooter,
   CardBody,
   Link,
   Divider,
   Image,
} from "@nextui-org/react";

const options = [
   {
      title: "Terrenos",
      description: "Gestión de terrenos de tu rancho",
      path: "app/grounds",
      srcImage:
         "https://www.icasas.mx/noticias/wp-content/uploads/2018/01/Vender-terreno.jpeg",
   },
   {
      title: "Fierros",
      description: "Control de fierros registrados",
      path: "/app/fierros",
      srcImage:
         "https://eleese.com.mx/wp-content/uploads/2020/08/abren-registro-de-fierro-ganadero.jpg",
   },
   {
      title: "Ganado",
      description: "Administración del ganado",
      path: "/app/ganado",
      srcImage:
         "https://multimin.com.mx/wp-content/uploads/2022/08/MM_Foto_0019_cows-on-green-field-and-blue-sky-1080x627.jpg",
   },
   {
      title: "Registro de crías",
      description: "Seguimiento del nacimiento de crías",
      path: "/app/registro-crias",
      srcImage:
         "https://foodispower.org/wp-content/uploads/2023/02/Cows-Raised-for-Milk-1024x526.jpg",
   },
];

export const AppMain = () => {
   return (
      <div className="min-h-screen p-10">
         <h1 className="text-3xl mb-10 font-bold text-center text-primary">
            Panel de Control Ganadero
         </h1>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {options.map((option) => (
               <Card key={option.title}>
                  <CardBody className="flex flex-col gap-3">
                     <h2 className="text-xl font-semibold text-primary">
                        {option.title}
                     </h2>
                     <p>{option.description}</p>
                     <Image height={200} src={option.srcImage} />
                  </CardBody>
                  <Divider />
                  <CardFooter>
                     <Link
                        isBlock
                        showAnchorIcon
                        href={option.path}
                        color="primary"
                     >
                        Ir a {option.title}
                     </Link>
                  </CardFooter>
               </Card>
            ))}
         </div>
      </div>
   );
};
