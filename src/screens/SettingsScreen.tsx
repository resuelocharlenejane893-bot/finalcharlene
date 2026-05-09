import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Moon, 
  Globe, 
  Trash2, 
  ChevronRight, 
  Share2, 
  LogOut,
  AtSign,
  FileText
} from 'lucide-react';
import { CustomButton } from '../components/CustomButton';
import { SectionHeader } from '../components/SharedUI';
import { storage } from '../storage/localStorage';
import { UserProfile } from '../types';

export const SettingsScreen = ({ onGoToSetup, onReset }: { onGoToSetup: () => void, onReset: () => void }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setProfile(storage.getProfile());
  }, []);

  const handleResetAction = () => {
    if (confirm("This will permanently delete all your local data. Are you sure?")) {
      storage.resetData();
      onReset();
    }
  };

  const sections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Edit Profile", desc: "Name, Age, Contact", action: onGoToSetup },
        { icon: Shield, label: "Privacy Policy", desc: "Loval-only data usage", action: () => {} },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Moon, label: "Dark Mode", desc: "System default", extra: <span className="text-[10px] font-bold text-slate-300">AUTO</span> },
        { icon: Globe, label: "Language", desc: "English (US)", action: () => {} },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: FileText, label: "Export Report", desc: "Generate PDF (Coming soon)", action: () => {} },
        { icon: Share2, label: "Share App", desc: "Invite others", action: () => {} },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-32">
      <SectionHeader title="Settings" />

      {/* Profile Card */}
      <div className="bg-[#102A43] p-6 rounded-[2.5rem] mb-8 text-white flex items-center gap-6 shadow-xl shadow-brand-navy/10 mx-2">
         <div className="w-16 h-16 bg-[#80DEEA] rounded-[2rem] flex items-center justify-center text-[#102A43] text-2xl font-black">
           {profile?.name?.[0] || 'A'}
         </div>
         <div>
            <h3 className="text-xl font-bold">{profile?.name || 'Allergy User'}</h3>
            <p className="text-[#80DEEA]/60 text-xs font-medium">{profile?.emergencyContact}</p>
         </div>
      </div>

      <div className="space-y-8 pb-12">
         {sections.map((section) => (
           <div key={section.title}>
             <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">{section.title}</h4>
             <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                {section.items.map((item, idx) => (
                  <button 
                    key={item.label}
                    onClick={item.action}
                    className={`w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors ${idx !== section.items.length - 1 ? 'border-b border-slate-50' : ''}`}
                  >
                     <div className="flex items-center gap-4 text-left">
                        <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
                          <item.icon size={20} />
                        </div>
                        <div>
                           <p className="text-sm font-bold text-[#102A43] leading-none mb-1">{item.label}</p>
                           <p className="text-[10px] text-slate-400">{item.desc}</p>
                        </div>
                     </div>
                     {item.extra || <ChevronRight size={18} className="text-slate-200" />}
                  </button>
                ))}
             </div>
           </div>
         ))}

         <div className="px-2 pt-4">
            <button 
              onClick={handleResetAction}
              className="w-full flex items-center justify-center gap-2 p-5 bg-red-50 text-[#EF4444] rounded-[2.5rem] font-bold text-sm"
            >
              <Trash2 size={18} />
              Reset All Local Data
            </button>
         </div>

         <p className="text-center text-[10px] text-slate-300 font-bold tracking-widest uppercase">
            AllergyGuard v1.0.0
         </p>
      </div>
    </div>
  );
};
