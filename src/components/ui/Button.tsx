// src/components/ui/Button.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'neumorphic' | 'glass';
}

export const Button = ({ className, variant = 'neumorphic', ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50";

  const variants = {
    primary: "bg-blue-500 text-white shadow-lg hover:bg-blue-600",
    secondary: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300",
    neumorphic: "neumorphic text-gray-700 dark:text-gray-300 hover:shadow-none active:shadow-inner",
    glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
};
