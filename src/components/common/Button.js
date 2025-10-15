import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0D0E1C]';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90 disabled:opacity-50',
    secondary: 'bg-[#2a2c44] text-white hover:bg-[#33354d] disabled:opacity-50',
    outline: 'border-2 border-purple-500 text-purple-400 hover:bg-purple-500/10 disabled:opacity-50',
    ghost: 'text-gray-400 hover:text-white hover:bg-[#2a2c44] disabled:opacity-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50',
    success: 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="ml-2" />}
    </button>
  );
};

export default Button;
