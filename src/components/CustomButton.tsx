import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#102A43] text-white hover:bg-[#102A43]/90 shadow-[0_10px_20px_-5px_rgba(16,42,67,0.3)]',
      secondary: 'bg-[#80DEEA] text-[#102A43] hover:bg-[#80DEEA]/90 shadow-[0_10px_20px_-5px_rgba(128,222,234,0.3)]',
      danger: 'bg-[#EF4444] text-white hover:bg-[#EF4444]/90 shadow-[0_10px_20px_-5px_rgba(239,68,68,0.3)]',
      ghost: 'bg-transparent text-[#102A43] hover:bg-slate-100',
      outline: 'bg-transparent border-2 border-slate-200 text-[#102A43] hover:border-[#80DEEA] hover:bg-[#80DEEA]/5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-4 text-base font-semibold',
      lg: 'px-8 py-5 text-lg font-bold tracking-tight',
      icon: 'p-3',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          'inline-flex items-center justify-center rounded-[2rem] transition-all disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-4 focus:ring-[#80DEEA]/30',
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);
