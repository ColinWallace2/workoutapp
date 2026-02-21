// src/components/ui/Toggle.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Toggle = ({ checked, onChange, className }: ToggleProps) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={cn(
        "w-14 h-8 rounded-full p-1 transition-colors duration-200 neumorphic-inset",
        checked ? "bg-green-400" : "bg-gray-300 dark:bg-gray-700",
        className
      )}
    >
      <motion.div
        animate={{ x: checked ? 24 : 0 }}
        className="w-6 h-6 bg-white dark:bg-gray-200 rounded-full shadow-md"
      />
    </button>
  );
};
