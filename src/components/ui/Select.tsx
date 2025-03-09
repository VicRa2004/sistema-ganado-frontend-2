import { SelectHTMLAttributes, forwardRef } from "react";

interface PropsSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, PropsSelect>(
  ({ error, labelText, name, children, ...props }, ref) => {
    return (
      <div className="col-span-full">
        {labelText && (
          <label
            htmlFor={name}
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {labelText}
          </label>
        )}
        <select
          {...props}
          ref={ref}
          id={name}
          name={name}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:outline-none transition duration-200"
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
