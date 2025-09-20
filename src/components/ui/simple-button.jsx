import React from "react";

// Simple button component without TypeScript
const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  disabled = false,
  type = "button",
  onClick,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-primary",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  const variantStyles = variants[variant] || variants.default;
  const sizeStyles = sizes[size] || sizes.default;
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };