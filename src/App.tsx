/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';

// Layout
import { Layout } from './components/Layout';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { SetupScreen } from './screens/SetupScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AllergyProfileScreen } from './screens/AllergyProfileScreen';
import { ScannerScreen } from './screens/ScannerScreen';
import { SafeFoodsScreen } from './screens/SafeFoodsScreen';
import { EmergencyScreen } from './screens/EmergencyScreen';
import { ReminderScreen } from './screens/ReminderScreen';
import { SettingsScreen } from './screens/SettingsScreen';

// Utility
import { storage } from './storage/localStorage';

export type ScreenName = 
  | 'splash' 
  | 'setup' 
  | 'allergy-setup' 
  | 'home' 
  | 'allergies' 
  | 'scan' 
  | 'safe-foods' 
  | 'emergency' 
  | 'alerts' 
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('splash');
  const [profile, setProfile] = useState(storage.getProfile());

  // Check profile on mount
  useEffect(() => {
    const p = storage.getProfile();
    if (p?.setupComplete && currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('home'), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const navigate = (screen: ScreenName) => {
    setCurrentScreen(screen);
    // Sync profile state
    setProfile(storage.getProfile());
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash': return <SplashScreen onGetStarted={() => navigate('setup')} onAutoRedirect={() => navigate('home')} />;
      case 'setup': return <SetupScreen onComplete={() => navigate('allergy-setup')} onSkip={() => navigate('home')} />;
      case 'allergy-setup': return <AllergyProfileScreen isMainFlow={false} onDone={() => navigate('home')} />;
      
      // Protected with Layout
      case 'home': return <Layout onNavigate={navigate} currentScreen={currentScreen}><HomeScreen onNavigate={navigate} /></Layout>;
      case 'allergies': return <Layout onNavigate={navigate} currentScreen={currentScreen}><AllergyProfileScreen isMainFlow={true} onDone={() => navigate('home')} /></Layout>;
      case 'scan': return <Layout onNavigate={navigate} currentScreen={currentScreen}><ScannerScreen onBack={() => navigate('home')} /></Layout>;
      case 'safe-foods': return <Layout onNavigate={navigate} currentScreen={currentScreen}><SafeFoodsScreen onBack={() => navigate('home')} /></Layout>;
      case 'emergency': return <Layout onNavigate={navigate} currentScreen={currentScreen}><EmergencyScreen onBack={() => navigate('home')} /></Layout>;
      case 'alerts': return <Layout onNavigate={navigate} currentScreen={currentScreen}><ReminderScreen /></Layout>;
      case 'settings': return <Layout onNavigate={navigate} currentScreen={currentScreen}><SettingsScreen onGoToSetup={() => navigate('setup')} onReset={() => navigate('splash')} /></Layout>;
      
      default: return <SplashScreen onGetStarted={() => navigate('setup')} onAutoRedirect={() => navigate('home')} />;
    }
  };

  return (
    <div className="bg-[#102A43] min-h-screen flex items-center justify-center p-0 sm:p-4 font-sans antialiased">
      <div className="w-full max-w-md h-[100dvh] sm:h-[844px] bg-[#F8FAFC] relative sm:rounded-[4rem] overflow-hidden sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] sm:border-[12px] border-[#0A1A2A]">
         {/* Haptic Area for Desktop */}
         <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-48 h-10 bg-[#0A1A2A] rounded-b-[2rem] z-[100]" />
         
         <div className="h-full overflow-y-auto scrollbar-none">
            <AnimatePresence mode="wait">
              <div key={currentScreen} className="h-full">
                {renderScreen()}
              </div>
            </AnimatePresence>
         </div>
      </div>
    </div>
  );
}
