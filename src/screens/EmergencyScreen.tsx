import React from 'react';
import { 
  AlertCircle, 
  Phone, 
  MapPin, 
  ChevronRight, 
  ShieldAlert,
  ArrowLeft,
  LifeBuoy
} from 'lucide-react';
import { CustomButton } from '../components/CustomButton';
import { SectionHeader } from '../components/SharedUI';
import { storage } from '../storage/localStorage';
import { motion } from 'motion/react';

export const EmergencyScreen = ({ onBack }: { onBack: () => void }) => {
  const profile = storage.getProfile();

  const steps = [
    { title: "Use Epinephrine", desc: "If you have an EpiPen/Auvi-Q, use it immediately.", icon: ShieldAlert, color: "text-[#EF4444] bg-[#EF4444]/10" },
    { title: "Call Emergency", desc: "Dial 911 or your local emergency number.", icon: Phone, color: "text-blue-600 bg-blue-50" },
    { title: "Stay Low", desc: "Lie down with legs raised if you feel faint.", icon: LifeBuoy, color: "text-[#102A43] bg-slate-100" },
  ];

  const handleCallEmergency = () => {
    window.location.href = `tel:${profile?.emergencyContact || '911'}`;
  };

  return (
    <div className="min-h-screen bg-[#102A43] p-6 pt-12 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-12">
        <button onClick={onBack} className="p-3 bg-white/10 rounded-2xl backdrop-blur-md text-white">
          <ArrowLeft size={20} />
        </button>
        <span className="text-white/40 font-bold uppercase tracking-[0.3em] text-[10px]">Security Protocol</span>
        <div className="w-11" />
      </div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-12 text-center"
      >
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-[#EF4444] rounded-full animate-ping opacity-25" />
           <button 
             onClick={handleCallEmergency}
             className="relative w-40 h-40 bg-[#EF4444] rounded-full shadow-2xl shadow-[#EF4444]/40 flex items-center justify-center border-8 border-white/20 active:scale-90 transition-transform"
           >
             <AlertCircle size={80} className="text-white" />
           </button>
        </div>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tighter">SOS HELP</h1>
        <p className="text-white/60 text-sm">Tap to call emergency contact</p>
      </motion.div>

      <div className="w-full bg-white rounded-[3rem] p-8 flex-grow space-y-6 shadow-2xl">
         <h3 className="text-xl font-bold text-[#102A43] mb-4">Emergency Protocol</h3>
         
         <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                 <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${step.color}`}>
                   <step.icon size={24} />
                 </div>
                 <div>
                    <h4 className="font-bold text-[#102A43] leading-none mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                 </div>
              </div>
            ))}
         </div>

         <div className="pt-6 border-t border-slate-100">
           <div className="flex items-center justify-between mb-4">
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Contact</p>
                 <p className="font-bold text-brand-navy">{profile?.emergencyContact || 'Not Set'}</p>
              </div>
              <CustomButton size="sm" onClick={handleCallEmergency}>Call Now</CustomButton>
           </div>
         </div>
      </div>
    </div>
  );
};
