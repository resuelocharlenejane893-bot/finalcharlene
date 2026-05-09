import { UserProfile, Allergy, Reminder } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'allergyguard_profile',
  ALLERGIES: 'allergyguard_allergies',
  REMINDERS: 'allergyguard_reminders',
};

export const storage = {
  getProfile: (): UserProfile | null => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : null;
  },
  saveProfile: (profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  },
  
  getAllergies: (): Allergy[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ALLERGIES);
    return data ? JSON.parse(data) : [];
  },
  saveAllergies: (allergies: Allergy[]) => {
    localStorage.setItem(STORAGE_KEYS.ALLERGIES, JSON.stringify(allergies));
  },
  
  getReminders: (): Reminder[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REMINDERS);
    return data ? JSON.parse(data) : [
      { id: '1', title: 'Morning Antihistamine', time: '08:00', category: 'Medicine', enabled: true },
      { id: '2', title: 'Water Intake', time: '12:00', category: 'Water', enabled: true },
    ];
  },
  saveReminders: (reminders: Reminder[]) => {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
  },

  resetData: () => {
    localStorage.clear();
  }
};
