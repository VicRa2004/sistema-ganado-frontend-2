import { useGround } from "../../hooks/useGround";
import { useEffect } from "react";
import { useError } from "../../hooks/useError";
import {
   Table,
   TableBody,
   TableHeader,
   TableColumn,
   TableCell,
   TableRow,
   Button,
   Image,
} from "@nextui-org/react";

const columns = [
   {
      key: "id",
      label: "Id",
   },
   {
      key: "name",
      label: "Nombre",
   },
   {
      key: "notes",
      label: "Notas",
   },
   {
      key: "length",
      label: "Largo",
   },
   {
      key: "width",
      label: "Ancho",
   },
   {
      key: "address",
      label: "Dirección",
   },
   {
      key: "image",
      label: "Foto",
   },
   {
      key: "actions",
      label: "Acciones",
   },
];

export const Grounds = () => {
   const { handleError } = useError();
   const { getAllGrounds } = useGround();
   const { isPending, error, data } = getAllGrounds;

   useEffect(() => {
      if (error) {
         handleError(error);
      }
   }, [error]);

   return (
      <div className="flex-grow h-full w-full flex flex-col py-4 px-16  justify-start items-center gap-4">
         <h1 className="text-2xl font-bold text-primary">Terrenos</h1>

         <Table aria-label="Example table with dynamic content">
            <TableHeader>
               {columns.map((column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
               ))}
            </TableHeader>
            <TableBody emptyContent="No hay ningun terreno para mostrar">
               {data?.data
                  ? data?.data.map((ground, index) => {
                       return (
                          <TableRow key={index}>
                             <TableCell>{ground.id_user}</TableCell>
                             <TableCell>{ground.name}</TableCell>
                             <TableCell>{ground.notes}</TableCell>
                             <TableCell>{ground.length}</TableCell>
                             <TableCell>{ground.width}</TableCell>
                             <TableCell>{ground.address}</TableCell>
                             <TableCell>
                                <Image
                                   className="object-cover"
                                   height={70}
                                   width={100}
                                   src={
                                      ground.image ||
                                      "https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
                                   }
                                ></Image>
                             </TableCell>
                             <TableCell className="flex gap-2" colSpan={2}>
                                <Button variant="shadow" color="primary">
                                   Editar
                                </Button>
                                <Button variant="shadow" color="danger">
                                   Eliminar
                                </Button>
                             </TableCell>
                          </TableRow>
                       );
                    })
                  : []}
            </TableBody>
         </Table>
      </div>
   );
};

/**
 * {isPending ? (
            <SkeletonGrid />
         ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
               {data?.data &&
                  data?.data.length !== 0 &&
                  data.data.map((ground, index) => (
                     <GroundCard key={index} ground={ground} />
                  ))}

               {data?.data && data?.data.length === 0 && (
                  <h1 className="text-2xl col-span-3 font-semibold">
                     No hay datos
                  </h1>
               )}
            </div>
         )}
 * 
 */
