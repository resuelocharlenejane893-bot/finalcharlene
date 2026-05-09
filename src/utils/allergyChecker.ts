import { Allergy, Product } from '../types';

export interface AllergyStatus {
  isSafe: boolean;
  triggers: string[];
  severity: 'Low' | 'Moderate' | 'Severe' | 'None';
}

export function checkAllergy(product: Product, userAllergies: Allergy[]): AllergyStatus {
  const triggers: string[] = [];
  let maxSeverity: AllergyStatus['severity'] = 'None';

  const productIngredients = product.ingredients.map(i => i.toLowerCase());

  for (const allergy of userAllergies) {
    const allergenName = allergy.name.toLowerCase();
    
    // Simple check: does the ingredient list contain the allergen name?
    // In a real app, this would use a more complex mapping of "Milk" to "Whey", "Casein", etc.
    const isTriggered = productIngredients.some(ingredient => 
      ingredient.includes(allergenName) || allergenName.includes(ingredient)
    );

    if (isTriggered) {
      triggers.push(allergy.name);
      
      // Update severity
      if (maxSeverity === 'None') maxSeverity = allergy.severity;
      else if (maxSeverity === 'Low' && allergy.severity !== 'Low') maxSeverity = allergy.severity;
      else if (maxSeverity === 'Moderate' && allergy.severity === 'Severe') maxSeverity = allergy.severity;
    }
  }

  return {
    isSafe: triggers.length === 0,
    triggers,
    severity: maxSeverity
  };
}
