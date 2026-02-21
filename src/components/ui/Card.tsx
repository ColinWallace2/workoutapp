// src/components/ui/Card.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(
      "neumorphic rounded-3xl p-6",
      className
    )}>
      {children}
    </div>
  );
};

export const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn(
      "bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 shadow-xl",
      className
    )}>
      {children}
    </div>
  );
};
