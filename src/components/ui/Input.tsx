import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  name?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ labelText, name, error, className, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 col-span-full ${className}`}>
        {labelText && (
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {labelText}
          </label>
        )}
        <input
          ref={ref}
          name={name}
          id={name}
          className={`w-full px-4 py-2 text-base text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition duration-200`}
          {...props}
        />
        {error && (
          <span className="text-sm text-red-600 dark:text-red-400">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
