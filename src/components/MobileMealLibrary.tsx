
import React, { useState } from 'react';
import { MobileMealCard } from './MobileMealCard';
import { AddMealSheet } from './AddMealSheet';
import { useMealLibrary } from '@/hooks/useMealLibrary';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface MobileMealLibraryProps {
  searchTerm: string;
  onAddMeal: () => void;
}

export const MobileMealLibrary: React.FC<MobileMealLibraryProps> = ({ 
  searchTerm,
  onAddMeal 
}) => {
  const { meals, searchMeals, tags } = useMealLibrary();
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredMeals = searchMeals(searchTerm, selectedCategory === 'All' ? [] : [selectedCategory]);

  const handleAddMeal = () => {
    setShowAddMeal(true);
    onAddMeal();
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setSelectedTags([]);
    } else {
      setSelectedTags([category]);
    }
  };

  const categories = ['All', ...tags];

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Category and Add Meal Controls */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-blue-500 border-blue-500">
                {selectedCategory} Menu <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg z-50">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            onClick={handleAddMeal}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span className="text-lg">+</span>
            Add Meal
          </Button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredMeals.map((meal) => (
            <MobileMealCard key={meal.id} meal={meal} hideLabels={true} />
          ))}
        </div>

        {filteredMeals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No meals found</p>
          </div>
        )}
      </div>

      <AddMealSheet
        isOpen={showAddMeal}
        onClose={() => setShowAddMeal(false)}
      />
    </div>
  );
};
