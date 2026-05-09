import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Clock, 
  ToggleLeft, 
  ToggleRight, 
  Pill, 
  Droplets, 
  Utensils, 
  HeartPulse
} from 'lucide-react';
import { CustomButton } from '../components/CustomButton';
import { SectionHeader } from '../components/SharedUI';
import { storage } from '../storage/localStorage';
import { Reminder } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const ReminderScreen = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    setReminders(storage.getReminders());
  }, []);

  const toggleReminder = (id: string) => {
    const updated = reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r);
    setReminders(updated);
    storage.saveReminders(updated);
  };

  const deleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    storage.saveReminders(updated);
  };

  const getIcon = (category: Reminder['category']) => {
    switch (category) {
      case 'Medicine': return <Pill size={20} />;
      case 'Water': return <Droplets size={20} />;
      case 'Food': return <Utensils size={20} />;
      default: return <HeartPulse size={20} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <SectionHeader 
        title="Reminders" 
        action={
          <CustomButton variant="outline" size="icon">
            <Plus size={20} />
          </CustomButton>
        } 
      />

      <div className="space-y-4 px-2">
         {reminders.map((reminder) => (
            <motion.div 
               key={reminder.id}
               className={cn(
                 "bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between transition-opacity",
                 !reminder.enabled && "opacity-60"
               )}
            >
               <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    reminder.enabled ? "bg-brand-cyan/20 text-brand-navy" : "bg-slate-100 text-slate-400"
                  )}>
                    {getIcon(reminder.category)}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm leading-none mb-1">{reminder.title}</h4>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <Clock size={10} />
                       {reminder.time}
                    </div>
                  </div>
               </div>
               
               <button onClick={() => toggleReminder(reminder.id)}>
                 {reminder.enabled ? (
                    <ToggleRight size={32} className="text-brand-cyan" />
                 ) : (
                    <ToggleLeft size={32} className="text-slate-200" />
                 )}
               </button>
            </motion.div>
         ))}

         <div className="p-6 bg-brand-navy/5 rounded-[2.5rem] mt-8 border border-brand-cyan/10">
            <p className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest mb-2 flex items-center gap-2">
              <Bell size={12} /> Pro Tip
            </p>
            <p className="text-xs text-brand-navy/70 leading-relaxed">
              Always keep your antihistamines and EpiPen with you. Set a reminder here to check their expiration dates every few months.
            </p>
         </div>
      </div>
    </div>
  );
};
