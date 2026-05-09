import React, { useState, useEffect } from 'react';
import { Search, Filter, ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import { CustomButton } from '../components/CustomButton';
import { FoodCard } from '../components/FoodCard';
import { SectionHeader } from '../components/SharedUI';
import { storage } from '../storage/localStorage';
import { checkAllergy } from '../utils/allergyChecker';
import data from '../data/ingredients.json';
import { Product, Allergy } from '../types';
import { cn } from '../lib/utils';

export const SafeFoodsScreen = ({ onBack }: { onBack: () => void }) => {
  const [userAllergies, setUserAllergies] = useState<Allergy[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setUserAllergies(storage.getAllergies());
  }, []);

  const categories = ['All', 'Snacks', 'Drinks', 'Meals', 'Desserts'];

  const safeProducts = data.products.filter(p => {
    const status = checkAllergy(p, userAllergies);
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return status.isSafe && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-32">
      <header className="flex items-center gap-4 mb-6 pt-4">
        <button onClick={onBack} className="p-2 bg-white rounded-xl shadow-sm">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#102A43]">Safe Foods</h1>
      </header>

      <div className="space-y-4 mb-6">
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <Search size={20} className="text-slate-300" />
          <input 
            type="text" 
            placeholder="Search safe alternatives..."
            className="bg-transparent outline-none text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
                activeCategory === cat ? "bg-[#102A43] text-white" : "bg-white text-slate-400 border border-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {safeProducts.length > 0 ? (
          safeProducts.map(product => (
            <FoodCard 
              key={product.id}
              name={product.name}
              brand={product.brand}
              status="safe"
              category={product.category}
              onClick={() => {}}
            />
          ))
        ) : (
          <div className="py-20 text-center">
             <p className="text-slate-400">No safe foods found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
