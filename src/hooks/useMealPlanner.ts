
import { useState } from 'react';
import { MOCK_MEALS } from '@/data/mockData';

interface WeekPlan {
  [day: string]: {
    breakfast?: any;
    lunch?: any;
    dinner?: any;
  };
}

export const useMealPlanner = () => {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>({
    Monday: {
      breakfast: MOCK_MEALS[0],
      lunch: MOCK_MEALS[5],
    },
    Tuesday: {
      dinner: MOCK_MEALS[8],
    },
    Wednesday: {
      breakfast: MOCK_MEALS[2],
      lunch: MOCK_MEALS[7],
      dinner: MOCK_MEALS[11],
    },
    Thursday: {},
    Friday: {
      lunch: MOCK_MEALS[4],
    },
    Saturday: {
      breakfast: MOCK_MEALS[1],
      dinner: MOCK_MEALS[9],
    },
    Sunday: {
      breakfast: MOCK_MEALS[3],
      lunch: MOCK_MEALS[6],
      dinner: MOCK_MEALS[10],
    },
  });

  const updateMealSlot = (day: string, mealTime: string, meal: any) => {
    setWeekPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealTime]: meal,
      },
    }));
  };

  const generateShoppingList = () => {
    const ingredients: { [category: string]: string[] } = {};
    
    Object.values(weekPlan).forEach(dayPlan => {
      Object.values(dayPlan).forEach(meal => {
        if (meal?.ingredients) {
          meal.ingredients.forEach((ingredient: any) => {
            const category = ingredient.category || 'Other';
            if (!ingredients[category]) {
              ingredients[category] = [];
            }
            if (!ingredients[category].includes(ingredient.name)) {
              ingredients[category].push(ingredient.name);
            }
          });
        }
      });
    });

    return Object.entries(ingredients).map(([category, items]) => ({
      category,
      items: items.sort(),
    }));
  };

  return {
    weekPlan,
    updateMealSlot,
    generateShoppingList,
  };
};
