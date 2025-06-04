
import { useState } from 'react';
import { MOCK_MEALS } from '@/data/mockData';

interface WeekPlan {
  [day: string]: {
    breakfast?: any;
    lunch?: any;
    dinner?: any;
  };
}

interface WeekPlans {
  [weekKey: string]: WeekPlan;
}

export const useMealPlanner = () => {
  const [weekPlans, setWeekPlans] = useState<WeekPlans>({
    // Default data for current week
    '2024-30': {
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
    }
  });

  const getWeekKey = (weekNumber: number, year: number): string => {
    return `${year}-${weekNumber}`;
  };

  const getWeekPlan = (weekNumber: number, year: number): WeekPlan => {
    const weekKey = getWeekKey(weekNumber, year);
    return weekPlans[weekKey] || {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
      Saturday: {},
      Sunday: {},
    };
  };

  const updateMealSlot = (day: string, mealTime: string, meal: any, weekNumber: number, year: number) => {
    const weekKey = getWeekKey(weekNumber, year);
    
    setWeekPlans(prev => {
      const newPlans = { ...prev };
      if (!newPlans[weekKey]) {
        newPlans[weekKey] = {
          Monday: {},
          Tuesday: {},
          Wednesday: {},
          Thursday: {},
          Friday: {},
          Saturday: {},
          Sunday: {},
        };
      }
      
      if (!newPlans[weekKey][day]) {
        newPlans[weekKey][day] = {};
      }
      
      if (meal === null) {
        // Remove the meal by deleting the property
        delete newPlans[weekKey][day][mealTime as keyof typeof newPlans[typeof weekKey][typeof day]];
      } else {
        // Add or update the meal
        newPlans[weekKey][day] = {
          ...newPlans[weekKey][day],
          [mealTime]: meal,
        };
      }
      
      return newPlans;
    });
  };

  const generateShoppingList = (weekNumber: number, year: number) => {
    const weekPlan = getWeekPlan(weekNumber, year);
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

  // Legacy support for components that still use the old interface
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };
  const currentWeekNumber = getWeekNumber(currentDate);
  const weekPlan = getWeekPlan(currentWeekNumber, currentYear);

  return {
    weekPlan, // Legacy support
    getWeekPlan,
    updateMealSlot,
    generateShoppingList,
  };
};
