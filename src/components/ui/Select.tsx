import { SelectHTMLAttributes, forwardRef } from "react";
import { InputLabel } from "./InputLabel";

interface PropsSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, PropsSelect>(
  ({ error, labelText, name, children, ...props }, ref) => {
    return (
      <div className="col-span-full">
        {labelText && <InputLabel name={name} text={labelText} />}
        <select
          {...props}
          ref={ref}
          id={name}
          name={name}
          className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none transition duration-200
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-800 dark:disabled:text-gray-500`}
        >
          {children}
        </select>

        {error && (
          <span className="text-sm text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
