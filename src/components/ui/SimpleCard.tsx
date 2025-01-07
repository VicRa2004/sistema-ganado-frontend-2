import { Link } from "@nextui-org/react";

interface Props {
   title: string;
   link: string;
   text: string;
   imgUrl: string;
}

export const SimpleCard = ({ title, link, text, imgUrl }: Props) => {
   return (
      <section className="border-2 border-primary-500 shadow-lg dark:shadow-md dark:shadow-primary-400">
         <div>
            <img className="w-full h-[200px]" src={imgUrl} alt="" />
         </div>
         <div className="py-6 px-8 flex flex-col gap-2">
            <h2 className="text-primary text-2xl">{title}</h2>
            <p>{text}</p>
            <Link underline="hover" showAnchorIcon href={link}>
               Ir a {title}
            </Link>
         </div>
      </section>
   );
};
