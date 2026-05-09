import React from 'react';
import { cn } from '../lib/utils';
import { ShieldCheck, ShieldAlert, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FoodCardProps {
  key?: React.Key;
  name: string;
  brand: string;
  status: 'safe' | 'warning';
  category?: string;
  onClick?: () => void;
}

export const FoodCard = ({ name, brand, status, category, onClick }: FoodCardProps) => {
  const isSafe = status === 'safe';

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          "w-16 h-16 rounded-[2rem] flex items-center justify-center",
          isSafe ? "bg-green-50 text-green-500" : "bg-red-50 text-red-500"
        )}>
          {isSafe ? <ShieldCheck size={32} /> : <ShieldAlert size={32} />}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
             <span className={cn("text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full", isSafe ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
               {isSafe ? 'SAFE' : 'RISK'}
             </span>
             {category && <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{category}</span>}
          </div>
          <h4 className="font-bold text-[#102A43] leading-none mb-1">{name}</h4>
          <p className="text-[11px] text-slate-400 font-medium">{brand}</p>
        </div>
      </div>
      <ChevronRight size={20} className="text-slate-200 group-hover:text-[#80DEEA] transition-colors" />
    </motion.div>
  );
};
