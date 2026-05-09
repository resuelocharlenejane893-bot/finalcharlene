import React from 'react';
import { cn } from '../lib/utils';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface AllergyCardProps {
  key?: React.Key;
  name: string;
  severity: 'Low' | 'Moderate' | 'Severe';
  onClick?: () => void;
  index?: number;
}

export const AllergyCard = ({ name, severity, onClick, index = 0 }: AllergyCardProps) => {
  const styles = {
    Low: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
    Moderate: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
    Severe: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
  };

  const currentStyle = styles[severity];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "p-5 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all cursor-pointer",
        "hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-200"
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn("w-14 h-14 rounded-3xl flex items-center justify-center text-xl font-bold", currentStyle.bg, currentStyle.text)}>
          {name[0].toUpperCase()}
        </div>
        <div>
          <h4 className="font-bold text-[#102A43] text-lg mb-0.5">{name}</h4>
          <div className="flex items-center gap-1.5">
            <span className={cn("inline-block w-2 h-2 rounded-full", severity === 'Severe' ? 'bg-red-500 animate-pulse' : severity === 'Moderate' ? 'bg-amber-400' : 'bg-green-400')} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{severity} Level</span>
          </div>
        </div>
      </div>
      <div className={cn("p-2 rounded-xl bg-slate-50 text-slate-300 group-hover:text-[#80DEEA] transition-colors")}>
        <Shield size={20} />
      </div>
    </motion.div>
  );
};
