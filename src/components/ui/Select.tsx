import { InputHTMLAttributes } from "react";

interface SelectOptions {
  value: number | string;
  text: string;
}

interface PropsSelect extends InputHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  name?: string;
  error?: string;
  options: SelectOptions[];
}

export const Select = ({
  error,
  labelText,
  name,
  options,
  ...props
}: PropsSelect) => {
  return (
    <div className="col-span-full">
      <label id={name} className="block mb-1">
        {labelText}
      </label>
      <select
        {...props}
        id={name}
        name={name}
        className="w-full p-2 border rounded"
      >
        {options.map((op) => (
          <option value={op.value}>{op.text}</option>
        ))}
      </select>
      {error && (
        <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
};
