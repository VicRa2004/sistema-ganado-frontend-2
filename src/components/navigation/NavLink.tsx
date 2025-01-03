import { NavLink as LinkNav } from "react-router-dom";

interface NavLinkProps {
   children?: React.ReactNode;
   to: string;
}

export const NavLink = ({ children, to }: NavLinkProps) => {
   return (
      <li>
         <LinkNav
            to={to}
            className={({ isActive }) => {
               if (isActive) {
                  console.log("hello ");
                  return `block py-2 px-3 text-white bg-primary rounded md:bg-transparent md:text-primary md:p-0 dark:text-white md:dark:text-primary`;
               }

               return `block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`;
            }}
         >
            {children}
         </LinkNav>
      </li>
   );
};
