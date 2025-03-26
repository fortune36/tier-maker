// src/components/ui/button.jsx
import React from "react";
import clsx from "clsx";

export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "default",
  ...props
}) => {
  const baseStyle = "rounded px-4 py-2 text-sm font-semibold focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    outline: "border border-gray-400 text-black hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
