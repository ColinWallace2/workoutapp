// src/components/ui/Input.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={cn(
        "neumorphic-inset rounded-xl px-4 py-3 outline-none text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500",
        className
      )}
      {...props}
    />
  );
};
