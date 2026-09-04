import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  className,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`font-bold border px-4 py-2 rounded cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
