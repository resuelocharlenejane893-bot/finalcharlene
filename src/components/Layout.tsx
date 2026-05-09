import React from 'react';
import { Home, Scan, AlertCircle, Bell, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { ScreenName } from '../App';

interface BottomNavProps {
  onNavigate: (screen: ScreenName) => void;
  currentScreen: ScreenName;
}

export const BottomNav = ({ onNavigate, currentScreen }: BottomNavProps) => {
  const navItems = [
    { icon: Home, label: 'Home', path: 'home' as ScreenName },
    { icon: Scan, label: 'Scan', path: 'scan' as ScreenName },
    { icon: AlertCircle, label: 'SOS', path: 'emergency' as ScreenName },
    { icon: Bell, label: 'Alerts', path: 'alerts' as ScreenName },
    { icon: Settings, label: 'More', path: 'settings' as ScreenName },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 pb-10 pt-2 flex justify-between items-center z-50 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className={cn(
                "flex flex-col items-center gap-1 p-2 transition-all active:scale-95",
                currentScreen === item.path ? "text-[#80DEEA]" : "text-slate-300"
            )}
        >
            <item.icon size={26} strokeWidth={currentScreen === item.path ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-widest">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export const Layout = ({ children, onNavigate, currentScreen }: { children: React.ReactNode, onNavigate: (screen: ScreenName) => void, currentScreen: ScreenName }) => {
  return (
    <div className="min-h-screen pb-32">
      <main className="relative overflow-x-hidden">
        {children}
      </main>
      <BottomNav onNavigate={onNavigate} currentScreen={currentScreen} />
    </div>
  );
};
