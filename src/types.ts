export interface UserProfile {
  name: string;
  age: string;
  emergencyContact: string;
  setupComplete: boolean;
  avatar?: string;
}

export interface Allergy {
  id: string;
  name: string;
  severity: 'Low' | 'Moderate' | 'Severe';
  symptoms: string[];
}

export interface IngredientInfo {
  name: string;
  allergens: string[];
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  category: string;
  ingredients: string[];
  image?: string;
}

export interface Reminder {
  id: string;
  title: string;
  time: string;
  category: 'Medicine' | 'Water' | 'Food' | 'Checkup';
  enabled: boolean;
}
