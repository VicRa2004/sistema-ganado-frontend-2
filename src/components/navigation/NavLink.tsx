import { NavLink as LinkNav } from "react-router-dom";

interface NavLinkProps {
   children?: React.ReactNode;
   to?: string;
}

export const NavLink = ({ children, to = "#" }: NavLinkProps) => {
   return (
      <LinkNav
         to={to}
         className="text-lg font-medium text-white hover:text-primary-500 transition-colors"
      >
         {children}
      </LinkNav>
   );
};
