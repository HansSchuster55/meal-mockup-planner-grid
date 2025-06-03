
import { useState, useMemo } from 'react';
import { MOCK_MEALS, MEAL_TAGS } from '@/data/mockData';

export const useMealLibrary = () => {
  const [meals] = useState(MOCK_MEALS);
  const [tags] = useState(MEAL_TAGS);

  const searchMeals = useMemo(() => {
    return (searchTerm: string, selectedTags: string[]) => {
      return meals.filter(meal => {
        const matchesSearch = !searchTerm || 
          meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesTags = selectedTags.length === 0 || 
          selectedTags.some(tag => meal.tags.includes(tag));
        
        return matchesSearch && matchesTags;
      });
    };
  }, [meals]);

  return {
    meals,
    tags,
    searchMeals,
  };
};
