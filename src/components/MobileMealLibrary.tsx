
import React, { useState } from 'react';
import { MobileMealCard } from './MobileMealCard';
import { AddMealModal } from './AddMealModal';
import { useMealLibrary } from '@/hooks/useMealLibrary';

interface MobileMealLibraryProps {
  searchTerm: string;
  onAddMeal: () => void;
}

export const MobileMealLibrary: React.FC<MobileMealLibraryProps> = ({ 
  searchTerm,
  onAddMeal 
}) => {
  const { meals, searchMeals } = useMealLibrary();
  const [showAddMeal, setShowAddMeal] = useState(false);

  const filteredMeals = searchMeals(searchTerm, []);

  const handleAddMeal = () => {
    setShowAddMeal(true);
    onAddMeal();
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredMeals.map((meal) => (
            <MobileMealCard key={meal.id} meal={meal} />
          ))}
        </div>

        {filteredMeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No meals found</p>
          </div>
        )}
      </div>

      <AddMealModal
        isOpen={showAddMeal}
        onClose={() => setShowAddMeal(false)}
      />
    </div>
  );
};
