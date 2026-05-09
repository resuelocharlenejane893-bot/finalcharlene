import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Search, 
  Scan, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CustomButton } from '../components/CustomButton';
import { AllergyCard } from '../components/AllergyCard';
import { SectionHeader } from '../components/SharedUI';
import { storage } from '../storage/localStorage';
import { Allergy, UserProfile } from '../types';
import { ScreenName } from '../App';

export const HomeScreen = ({ onNavigate }: { onNavigate: (screen: ScreenName) => void }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [allergies, setAllergies] = useState<Allergy[]>([]);

  useEffect(() => {
    setProfile(storage.getProfile());
    setAllergies(storage.getAllergies());
  }, []);

  const severeAllergies = allergies.filter(a => a.severity === 'Severe');

  return (
    <div className="p-4 space-y-6">
      {/* App Header */}
      <header className="flex items-center justify-between px-2 pt-4">
        <div>
          <h2 className="text-sm font-medium text-slate-500">Welcome back,</h2>
          <h1 className="text-2xl font-bold text-[#102A43]">{profile?.name || 'User'}</h1>
        </div>
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100">
            <Bell size={24} className="text-slate-400" />
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-[#EF4444] border-2 border-slate-50 rounded-full" />
        </div>
      </header>

      {/* Emergency Quick Action */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('emergency')}
        className="bg-[#102A43] p-6 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-brand-navy/20 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md">
            <AlertCircle size={32} className="text-[#80DEEA] animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Emergency SOS</h3>
            <p className="text-[#80DEEA]/70 text-xs">Immediate help guide</p>
          </div>
        </div>
        <ChevronRight size={24} className="text-white/40" />
      </motion.div>

      {/* Daily Status */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-green-50 rounded-2xl flex items-center justify-center mb-3">
             <CheckCircle2 size={20} className="text-[#10B981]" />
          </div>
          <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Status</h4>
          <p className="text-lg font-bold text-[#102A43]">Guard Active</p>
        </div>
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="w-10 h-10 bg-[#80DEEA]/10 rounded-2xl flex items-center justify-center mb-3">
             <ShieldAlert size={20} className="text-[#80DEEA]" />
          </div>
          <h4 className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Risks</h4>
          <p className="text-lg font-bold text-[#102A43]">{severeAllergies.length} Severe</p>
        </div>
      </div>

      {/* Quick Search/Scan */}
      <div className="px-2">
        <div className="bg-white p-3 rounded-full shadow-sm border border-slate-100 flex items-center gap-3">
           <Search size={20} className="text-slate-300 ml-2" />
           <input 
            type="text" 
            placeholder="Search ingredients..." 
            className="flex-grow bg-transparent outline-none text-sm font-medium"
           />
           <button 
            onClick={() => onNavigate('scan')}
            className="bg-[#80DEEA] p-2 rounded-full text-[#102A43]"
           >
             <Scan size={20} />
           </button>
        </div>
      </div>

      {/* Allergy Summary */}
      <div>
        <SectionHeader 
          title="Active Guard" 
          action={
            <button onClick={() => onNavigate('allergies')} className="text-[#80DEEA] text-xs font-bold uppercase tracking-widest">Manage All</button>
          } 
        />
        <div className="space-y-3 px-2">
           {allergies.slice(0, 3).map(a => (
              <AllergyCard key={a.id} name={a.name} severity={a.severity} />
           ))}
           {allergies.length === 0 && (
             <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 text-sm mb-4">You haven't added any allergies yet.</p>
                <CustomButton size="sm" variant="outline" onClick={() => onNavigate('allergies')}>
                  <Plus size={16} className="mr-2" /> Add Now
                </CustomButton>
             </div>
           )}
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="px-2 pb-8">
        <SectionHeader title="Recent Scans" />
        <div className="bg-white rounded-3xl border border-slate-100 p-2">
          <div className="flex items-center justify-between p-4 border-b border-slate-50">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <h5 className="text-sm font-bold">Oatmeal Cookies</h5>
                   <p className="text-[10px] text-slate-400">2 hours ago • Safe</p>
                </div>
             </div>
             <ChevronRight size={16} className="text-slate-200" />
          </div>
          <div className="flex items-center justify-between p-4">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#EF4444]/10 rounded-xl flex items-center justify-center text-[#EF4444]">
                   <AlertCircle size={20} />
                </div>
                <div>
                   <h5 className="text-sm font-bold">Peanut Butter</h5>
                   <p className="text-[10px] text-slate-400">Yesterday • High Risk</p>
                </div>
             </div>
             <ChevronRight size={16} className="text-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
