
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search } from 'lucide-react';
import { MealCard } from './MealCard';
import { AddMealModal } from './AddMealModal';
import { useMealLibrary } from '@/hooks/useMealLibrary';

export const MealLibrary = () => {
  const { meals, searchMeals, tags } = useMealLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAddMeal, setShowAddMeal] = useState(false);

  const filteredMeals = searchMeals(searchTerm, selectedTags);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Meal Library</h1>
        <Button 
          onClick={() => setShowAddMeal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Meal
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search meals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer hover:bg-emerald-100"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No meals found matching your criteria</p>
          <Button 
            onClick={() => setShowAddMeal(true)}
            variant="outline" 
            className="mt-4"
          >
            Add your first meal
          </Button>
        </div>
      )}

      <AddMealModal
        isOpen={showAddMeal}
        onClose={() => setShowAddMeal(false)}
      />
    </div>
  );
};
