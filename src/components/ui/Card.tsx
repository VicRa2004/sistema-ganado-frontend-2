interface CardProps {
  title: string;
  image?: string;
  className?: string;
  children: React.ReactNode;
}

export const Card = ({ title, image, className, children }: CardProps) => {
  if (!image) {
    image = "img/default-image-2.png";
  }

  return (
    <div
      className={`p-6 border dark:border-none rounded-2xl shadow-lg dark:bg-neutral-950 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-neutral-900 dark:to-neutral-950 ${className}`}
    >
      <img
        src={image}
        alt="Terreno"
        className="h-64 w-full object-cover rounded-lg mb-4"
      />

      <h2 className="text-xl font-extrabold text-gray-800 dark:text-white">
        {title}
      </h2>

      {children}
    </div>
  );
};
