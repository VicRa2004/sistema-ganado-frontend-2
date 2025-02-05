import { TextareaHTMLAttributes, forwardRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  name?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLInputElement, Props>(
  ({ labelText, name, error, className, ...props }) => {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {labelText && (
          <label
            htmlFor={name}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {labelText}
          </label>
        )}
        <textarea
          name={name}
          id={name}
          className={`w-full px-4 py-2 text-base text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary resize-none focus:outline-none transition  duration-200`}
          {...props}
        ></textarea>
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
