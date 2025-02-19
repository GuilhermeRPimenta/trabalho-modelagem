import React from "react";

const Button = ({
  children,
  variant,
  className,
  type,
  onClick,
}: {
  children?: React.ReactNode;
  variant?: "constructive" | "desctructive" | "ghost" | "primary";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
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
    <button
      type={type ?? undefined}
      onClick={onClick}
      className={`${className} ${baseStyle} ${
        variant ? variantStyles[variant] : variantStyles["primary"]
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
