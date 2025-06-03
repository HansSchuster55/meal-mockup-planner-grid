
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Shuffle } from 'lucide-react';
import { MealCard } from './MealCard';
import { useMealLibrary } from '@/hooks/useMealLibrary';

interface MealSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (meal: any) => void;
  slot: { day: string; mealTime: string };
}

export const MealSearchModal: React.FC<MealSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectMeal,
  slot,
}) => {
  const { meals, searchMeals, tags } = useMealLibrary();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredMeals = searchMeals(searchTerm, selectedTags);

  const handleSurpriseMe = () => {
    const randomMeal = meals[Math.floor(Math.random() * meals.length)];
    onSelectMeal(randomMeal);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Choose meal for {slot.day} {slot.mealTime}</span>
            <Button
              onClick={handleSurpriseMe}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Shuffle className="h-4 w-4" />
              Surprise me
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tags */}
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

          {/* Meals Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.id}
                meal={meal}
                onClick={() => onSelectMeal(meal)}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
