import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scan, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  X, 
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { CustomButton } from '../components/CustomButton';
import { SectionHeader } from '../components/SharedUI';
import { storage } from '../storage/localStorage';
import { checkAllergy, AllergyStatus } from '../utils/allergyChecker';
import data from '../data/ingredients.json';
import { Product } from '../types';
import { cn } from '../lib/utils';

export const ScannerScreen = ({ onBack }: { onBack: () => void }) => {
  const [barcode, setBarcode] = useState('');
  const [result, setResult] = useState<{ product: Product, status: AllergyStatus } | null>(null);
  const [searching, setSearching] = useState(false);

  const handleScan = (code: string) => {
    setSearching(true);
    // Simulate lookup delay
    setTimeout(() => {
      const product = data.products.find(p => p.barcode === code);
      if (product) {
        const userAllergies = storage.getAllergies();
        const status = checkAllergy(product, userAllergies);
        setResult({ product, status });
      } else {
        alert("Product not found in local database.");
      }
      setSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-4 pb-32">
      <header className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">Food Scanner</h1>
      </header>

      {/* Camera Simulator */}
      <div className="relative w-full aspect-square bg-slate-200 rounded-[3rem] overflow-hidden flex items-center justify-center border-8 border-white shadow-inner mb-6">
         <div className="absolute inset-0 bg-brand-navy/10 flex flex-col items-center justify-center">
            <Scan size={80} className="text-white/50 mb-4" />
            <p className="text-xs font-bold text-brand-navy/30 uppercase tracking-[0.2em]">Align Barcode</p>
         </div>
         {/* Scanning Animation */}
         <motion.div 
          animate={{ top: ['10%', '90%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute left-[10%] right-[10%] h-0.5 bg-brand-cyan shadow-[0_0_15px_#80DEEA] z-10"
         />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">Manual Input</p>
        <div className="bg-white p-2 rounded-full shadow-sm flex items-center border border-slate-100">
          <input 
            type="text" 
            placeholder="Enter Barcode ID..."
            className="flex-grow px-6 bg-transparent outline-none text-sm"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          <CustomButton 
            size="icon" 
            className="rounded-full w-12 h-12"
            onClick={() => handleScan(barcode)}
            disabled={searching}
          >
            <Search size={20} />
          </CustomButton>
        </div>

        <div className="px-4">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">Simulate quick scan</h4>
          <div className="flex flex-wrap gap-2">
             {data.products.slice(0, 3).map(p => (
               <button 
                key={p.barcode}
                onClick={() => handleScan(p.barcode)}
                className="px-3 py-1.5 bg-slate-100 rounded-full text-[10px] font-bold text-brand-navy hover:bg-brand-cyan transition-colors"
               >
                 {p.name}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* Result Modal */}
      <AnimatePresence>
        {result && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-navy/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className={cn(
                 "bg-white w-full max-w-sm rounded-[3rem] p-8 relative overflow-hidden",
                 result.status.isSafe ? "border-t-[12px] border-brand-safe" : "border-t-[12px] border-brand-danger"
               )}
            >
               <button 
                onClick={() => setResult(null)}
                className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full text-slate-400"
               >
                 <X size={16} />
               </button>

               <div className="flex flex-col items-center text-center mb-6">
                  <div className={cn(
                    "w-20 h-20 rounded-3xl flex items-center justify-center mb-4",
                    result.status.isSafe ? "bg-green-50 text-brand-safe" : "bg-red-50 text-brand-danger"
                  )}>
                    {result.status.isSafe ? <ShieldCheck size={48} /> : <ShieldAlert size={48} />}
                  </div>
                  <h3 className="text-2xl font-black text-brand-navy mb-1">{result.product.name}</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{result.product.brand}</p>
               </div>

               <div className="space-y-4 mb-8">
                  <div className={cn(
                    "p-4 rounded-2xl flex items-center justify-between",
                    result.status.isSafe ? "bg-green-50 text-green-700" : "bg-red-50 text-brand-danger"
                  )}>
                    <span className="font-bold">{result.status.isSafe ? 'VERIFIED SAFE' : 'CONTAINS ALLERGENS'}</span>
                    <span className="text-xs opacity-70">{result.status.severity !== 'None' ? result.status.severity : ''}</span>
                  </div>

                  {!result.status.isSafe && (
                    <div className="space-y-2">
                       <p className="text-[10px] font-bold text-slate-400 uppercase">Triggers detected:</p>
                       <div className="flex flex-wrap gap-2">
                          {result.status.triggers.map(t => (
                            <span key={t} className="px-3 py-1 bg-brand-danger/10 text-brand-danger text-[10px] font-bold rounded-full">
                              {t}
                            </span>
                          ))}
                       </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Full Ingredients:</p>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic">
                      {result.product.ingredients.join(', ')}
                    </p>
                  </div>
               </div>

               <CustomButton 
                variant={result.status.isSafe ? 'primary' : 'danger'} 
                className="w-full"
                onClick={() => setResult(null)}
               >
                 Close Report
               </CustomButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
