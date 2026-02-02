import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyle = "px-6 py-3 font-medium transition-all duration-300 text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-strange-black text-white hover:bg-strange-accent border border-transparent",
    secondary: "bg-gray-100 text-strange-black hover:bg-gray-200 border border-transparent",
    outline: "bg-transparent text-strange-black border border-strange-black hover:bg-strange-black hover:text-white"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};