import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
import { GroundType } from "../../types";

interface GroundCardProps {
   ground: GroundType;
}

export const GroundCard = ({ ground }: GroundCardProps) => {
   return (
      <Card className="p-2">
         <CardBody className="gap-2">
            <h2 className="text-lg font-semibold text-primary">
               {ground.name}
            </h2>
            <p>Notas: {ground.notes}</p>
            <Image src={ground.image} width={300} height={200} />
         </CardBody>
         <CardFooter>
            <Link
               isBlock
               showAnchorIcon
               href={`/app/grounds/${ground.id_ground}`}
            >
               Detalles
            </Link>
         </CardFooter>
      </Card>
   );
};
