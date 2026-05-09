import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Phone, ShieldAlert, ChevronRight } from 'lucide-react';
import { CustomButton } from '../components/CustomButton';
import { storage } from '../storage/localStorage';
import { UserProfile } from '../types';

export const SetupScreen = ({ onComplete, onSkip }: { onComplete: () => void, onSkip: () => void }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: '',
    emergencyContact: '',
    setupComplete: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.emergencyContact) return;
    
    storage.saveProfile({ ...formData, setupComplete: true });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-6">
      <header className="mb-10 mt-8">
        <h1 className="text-3xl font-bold text-[#102A43] mb-2">Create Profile</h1>
        <p className="text-slate-500">We need a few details to keep you safe.</p>
      </header>

      <motion.form 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6 flex-grow"
        onSubmit={handleSave}
      >
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <User size={14} /> Full Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. John Doe"
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-[#80DEEA] outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            Age
          </label>
          <input
            type="number"
            placeholder="e.g. 24"
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-[#80DEEA] outline-none transition-all"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Phone size={14} /> Emergency Contact
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +1 234 567 890"
            className="w-full bg-white border border-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-[#80DEEA] outline-none transition-all"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
          />
        </div>

        <div className="bg-[#80DEEA]/10 p-4 rounded-3xl flex gap-4 items-start border border-[#80DEEA]/20">
          <ShieldAlert className="text-[#80DEEA] mt-1 flex-shrink-0" size={20} />
          <p className="text-sm text-[#102A43]/70 leading-relaxed">
            Your data is stored <span className="font-bold">locally</span> on this device and is never shared with external servers.
          </p>
        </div>
      </motion.form>

      <div className="mt-8 pb-8">
        <CustomButton 
          type="submit"
          className="w-full flex items-center justify-between"
          disabled={!formData.name || !formData.emergencyContact}
          onClick={handleSave}
        >
          <span>Continue</span>
          <ChevronRight size={20} />
        </CustomButton>
        <button 
          onClick={onSkip}
          className="w-full text-center mt-4 text-sm font-bold text-slate-400"
        >
          Skip to Dashboard
        </button>
      </div>
    </div>
  );
};
