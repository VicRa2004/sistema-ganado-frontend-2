import { InputLabel } from "./InputLabel";

interface Props {
  labelText?: string;
  name?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const CustomInput = ({
  labelText,
  error,
  name,
  children,
  className,
}: Props) => {
  return (
    <div className={`flex flex-col gap-2 col-span-full ${className}`}>
      {labelText && <InputLabel name={name} text={labelText} />}

      {children}

      {error && (
        <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
};
