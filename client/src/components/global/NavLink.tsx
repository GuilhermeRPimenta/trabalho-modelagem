import { NavLink as DefaulNavLink } from "react-router-dom";

const NavLink = ({
  to,
  className,
  variant,
  children,
}: {
  to: string;
  className?: string;
  variant?: "constructive" | "desctructive" | "ghost" | "primary";
  children?: React.ReactNode;
}) => {
  const baseStyle =
    "flex items-center justify-center p-2 rounded-md font-semibold";
  const variantStyles = {
    primary: "bg-primary text-white bg-blue-700 hover:bg-blue-900",
    constructive: "bg-green-500 text-white hover:bg-green-700",
    desctructive: "bg-red-500 text-white hover:bg-red-700",
    ghost: "bg-transparent text-black hover:bg-gray-200",
  };
  return (
    <DefaulNavLink
      to={to}
      className={`${className} ${baseStyle} ${
        variant ? variantStyles[variant] : variantStyles["primary"]
      }`}
    >
      {children}
    </DefaulNavLink>
  );
};

export default NavLink;
