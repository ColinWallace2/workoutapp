// src/components/ui/ProgressBar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  color?: string;
}

export const ProgressBar = ({ value, max = 100, className, color = "bg-blue-400" }: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full h-4 neumorphic-inset rounded-full overflow-hidden", className)}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("h-full rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]", color)}
      />
    </div>
  );
};
