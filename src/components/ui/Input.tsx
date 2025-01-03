import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   labelText?: string;
   name?: string;
   error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
   ({ labelText, name, error, className, ...props }, ref) => {
      return (
         <div className="flex flex-col gap-1">
            <label
               className="text-lg font-semibold text-primary"
               htmlFor={name}
            >
               {labelText}
            </label>
            <input
               ref={ref}
               name={name}
               className={
                  `outline-none text-lg border-2 border-primary p-3 rounded-lg ` +
                  className
               }
               {...props}
            />
            {error && <span className="text-danger">{error}</span>}
         </div>
      );
   }
);
