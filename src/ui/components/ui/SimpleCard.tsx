import { Link } from "@heroui/react";

interface Props {
  title: string;
  link: string;
  text: string;
  imgUrl: string;
}

export const SimpleCard = ({ title, link, text, imgUrl }: Props) => {
  return (
    <section className="border border-primary-500 shadow-xl dark:shadow-md dark:shadow-primary-400 rounded-xl overflow-hidden bg-white dark:bg-neutral-900">
      <img className="w-full h-[200px] object-cover" src={imgUrl} alt={title} />

      <div className="p-6 flex flex-col gap-3">
        <h2 className="text-primary-600 dark:text-primary-400 text-2xl font-bold">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{text}</p>
        <Link
          underline="hover"
          showAnchorIcon
          href={link}
          className="text-primary-500 font-semibold"
        >
          Ir a {title}
        </Link>
      </div>
    </section>
  );
};
