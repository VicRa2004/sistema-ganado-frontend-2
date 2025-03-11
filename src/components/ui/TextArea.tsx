import { TextareaHTMLAttributes, forwardRef } from "react";
import { InputLabel } from "./InputLabel";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ labelText, name, error, className, ...props }, ref) => {
    return (
      <div className={`flex flex-col gap-2 col-span-full ${className}`}>
        {labelText && <InputLabel name={name} text={labelText} />}

        <textarea
          ref={ref}
          id={name}
          name={name}
          className={`w-full px-4 py-2 text-base text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary resize-none focus:outline-none transition duration-200
    disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-800 dark:disabled:text-gray-500`}
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

TextArea.displayName = "TextArea";
