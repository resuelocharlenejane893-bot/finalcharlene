import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomButton } from '../components/CustomButton';
import { AllergyCard } from '../components/AllergyCard';
import { SectionHeader } from '../components/SharedUI';
import { storage } from '../storage/localStorage';
import { Allergy } from '../types';
import data from '../data/ingredients.json';
import { cn } from '../lib/utils';

export const AllergyProfileScreen = ({ isMainFlow = false, onDone }: { isMainFlow?: boolean, onDone?: () => void }) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newAllergy, setNewAllergy] = useState<Partial<Allergy>>({
    name: '',
    severity: 'Moderate',
    symptoms: []
  });

  useEffect(() => {
    setAllergies(storage.getAllergies());
  }, []);

  const handleAdd = () => {
    if (!newAllergy.name) return;
    const item: Allergy = {
      id: Date.now().toString(),
      name: newAllergy.name as string,
      severity: newAllergy.severity as any,
      symptoms: []
    };
    const updated = [...allergies, item];
    setAllergies(updated);
    storage.saveAllergies(updated);
    setShowModal(false);
    setNewAllergy({ name: '', severity: 'Moderate', symptoms: [] });
  };

  const handleRemove = (id: string) => {
    const updated = allergies.filter(a => a.id !== id);
    setAllergies(updated);
    storage.saveAllergies(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-4 pb-32">
      <SectionHeader 
        title="Allergy Profile" 
        action={
          <CustomButton variant="outline" size="icon" onClick={() => setShowModal(true)} className="rounded-2xl">
            <Plus size={20} />
          </CustomButton>
        } 
      />

      <div className="flex-grow space-y-3 px-2">
        <AnimatePresence>
          {allergies.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <ShieldCheck size={40} />
              </div>
              <p className="text-slate-400 font-medium">No allergies listed yet.</p>
            </motion.div>
          ) : (
            allergies.map((allergy) => (
              <motion.div
                key={allergy.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="relative group">
                   <AllergyCard name={allergy.name} severity={allergy.severity} />
                   <button 
                    onClick={() => handleRemove(allergy.id)}
                    className="absolute -right-2 -top-2 bg-white shadow-md p-2 rounded-full text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                     <X size={14} />
                   </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {!isMainFlow && onDone && (
        <div className="mt-8 pb-6">
          <CustomButton 
            className="w-full py-6 text-lg"
            onClick={onDone}
          >
            Start Guarding
          </CustomButton>
        </div>
      )}

      {/* Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#102A43]/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center p-4"
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white w-full max-w-sm rounded-[40px] p-8 pb-10"
            >
              <h3 className="text-2xl font-bold mb-6 text-[#102A43]">Add Allergy</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Quick Select</label>
                  <div className="flex flex-wrap gap-2">
                    {data.commonAllergens.slice(0, 8).map(a => (
                      <button 
                        key={a}
                        onClick={() => setNewAllergy({ ...newAllergy, name: a })}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
                          newAllergy.name === a ? "bg-[#80DEEA] border-[#80DEEA] text-[#102A43]" : "bg-white border-slate-200 text-slate-500"
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Allergy Name</label>
                  <input 
                    type="text"
                    placeholder="or type here..."
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#80DEEA]"
                    value={newAllergy.name}
                    onChange={(e) => setNewAllergy({ ...newAllergy, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Severity</label>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {(['Low', 'Moderate', 'Severe'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setNewAllergy({ ...newAllergy, severity: s })}
                        className={cn(
                          "py-3 rounded-2xl text-xs font-bold border transition-all",
                          newAllergy.severity === s 
                            ? "bg-[#102A43] border-[#102A43] text-white" 
                            : "bg-white border-slate-200 text-slate-400"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <CustomButton variant="ghost" className="flex-1 rounded-2xl" onClick={() => setShowModal(false)}>Cancel</CustomButton>
                <CustomButton className="flex-1 rounded-2xl" onClick={handleAdd}>Save</CustomButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
