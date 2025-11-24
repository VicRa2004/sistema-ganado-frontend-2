interface InputLabelProps {
  text: string;
  name: string | undefined;
  className?: string;
}

export const InputLabel = ({ text, name, className }: InputLabelProps) => {
  return (
    <label
      htmlFor={name}
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
    >
      {text}
    </label>
  );
};
