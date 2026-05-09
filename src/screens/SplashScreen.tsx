import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Shield } from 'lucide-react';
import { CustomButton } from '../components/CustomButton';
import { storage } from '../storage/localStorage';

export const SplashScreen = ({ onGetStarted, onAutoRedirect }: { onGetStarted: () => void, onAutoRedirect: () => void }) => {
  useEffect(() => {
    // Check if setup is already complete
    const profile = storage.getProfile();
    if (profile?.setupComplete) {
      setTimeout(() => onAutoRedirect(), 2500);
    }
  }, [onAutoRedirect]);

  const handleGetStarted = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#80DEEA', '#102A43', '#EF4444']
    });
    onGetStarted();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-navy p-8 text-center text-white">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-brand-cyan rounded-3xl flex items-center justify-center shadow-lg shadow-brand-cyan/20">
          <Shield size={48} className="text-brand-navy" strokeWidth={2.5} />
        </div>
      </motion.div>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold mb-2 tracking-tight"
      >
        AllergyGuard
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-brand-cyan/80 font-medium mb-12"
      >
        Stay Safe. Eat Smart.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-xs"
      >
        {!storage.getProfile()?.setupComplete && (
          <CustomButton 
            variant="secondary" 
            className="w-full py-4 text-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </CustomButton>
        )}
        
        {storage.getProfile()?.setupComplete && (
           <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-brand-cyan rounded-full animate-bounce [animation-delay:-0.3s]" />
           </div>
        )}
      </motion.div>

      <footer className="absolute bottom-12 text-white/40 text-xs font-medium uppercase tracking-widest">
        Local Data Privacy Protected
      </footer>
    </div>
  );
};
