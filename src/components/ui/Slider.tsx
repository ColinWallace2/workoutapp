// src/components/ui/Slider.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Slider = ({ label, className, ...props }: SliderProps) => {
  return (
    <div className={cn("w-full space-y-2", className)}>
      {label && <label className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</label>}
      <input
        type="range"
        className="w-full h-3 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 shadow-[inset_2px_2px_5px_var(--shadow-dark),inset_-2px_-2px_5px_var(--shadow-light)]"
        {...props}
      />
    </div>
  );
};
