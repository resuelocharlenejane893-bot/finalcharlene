import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-navy text-white hover:bg-brand-navy/90 shadow-sm',
      secondary: 'bg-brand-cyan text-brand-navy hover:bg-brand-cyan/90 shadow-sm',
      danger: 'bg-brand-danger text-white hover:bg-brand-danger/90 shadow-sm',
      ghost: 'bg-transparent text-brand-navy hover:bg-slate-100',
      outline: 'bg-transparent border-2 border-brand-navy text-brand-navy hover:bg-slate-50',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg font-bold',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-brand-cyan/50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

export const AllergyCard = ({ 
  name, 
  severity, 
  onClick 
}: { 
  name: string; 
  severity: string; 
  onClick?: () => void 
}) => {
  const severityColors = {
    Low: 'bg-green-100 text-green-700',
    Moderate: 'bg-brand-warning/10 text-brand-warning',
    Severe: 'bg-brand-danger/10 text-brand-danger',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg", severityColors[severity as keyof typeof severityColors] || 'bg-slate-100')}>
          {name[0]}
        </div>
        <div>
          <h4 className="font-bold text-brand-navy">{name}</h4>
          <p className="text-xs text-slate-400">Tap to edit severity</p>
        </div>
      </div>
      <span className={cn("text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full", severityColors[severity as keyof typeof severityColors])}>
        {severity}
      </span>
    </div>
  );
};

export const SectionHeader = ({ title, action }: { title: string; action?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-4 px-6 mt-6">
    <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
    {action}
  </div>
);
