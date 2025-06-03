
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart, Calendar } from 'lucide-react';
import { MealCard } from './MealCard';
import { MealSearchModal } from './MealSearchModal';
import { ShoppingListModal } from './ShoppingListModal';
import { useMealPlanner } from '@/hooks/useMealPlanner';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TIMES = ['breakfast', 'lunch', 'dinner'] as const;

export const WeekView = () => {
  const { weekPlan, updateMealSlot, generateShoppingList } = useMealPlanner();
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; mealTime: string } | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);

  const handleSlotClick = (day: string, mealTime: string) => {
    setSelectedSlot({ day, mealTime });
  };

  const handleMealSelect = (meal: any) => {
    if (selectedSlot) {
      updateMealSlot(selectedSlot.day, selectedSlot.mealTime, meal);
      setSelectedSlot(null);
    }
  };

  const handleGenerateShoppingList = () => {
    setShowShoppingList(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-emerald-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">This Week's Menu</h1>
            <p className="text-gray-600">January 6 - 12, 2025</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Duplicate Last Week
          </Button>
          <Button 
            onClick={handleGenerateShoppingList}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Shopping List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-4">
        {/* Header row */}
        <div className="col-span-1"></div>
        {DAYS.map((day) => (
          <div key={day} className="text-center">
            <h3 className="font-semibold text-gray-900 mb-1">{day}</h3>
            <p className="text-sm text-gray-500">Jan {6 + DAYS.indexOf(day)}</p>
          </div>
        ))}

        {/* Meal time rows */}
        {MEAL_TIMES.map((mealTime) => (
          <React.Fragment key={mealTime}>
            <div className="flex items-center justify-end pr-4">
              <span className="font-medium text-gray-700 capitalize">{mealTime}</span>
            </div>
            {DAYS.map((day) => {
              const meal = weekPlan[day]?.[mealTime];
              return (
                <Card
                  key={`${day}-${mealTime}`}
                  className="min-h-[120px] p-3 cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-gray-200 hover:border-emerald-300"
                  onClick={() => handleSlotClick(day, mealTime)}
                >
                  {meal ? (
                    <MealCard meal={meal} compact />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <Plus className="h-8 w-8" />
                    </div>
                  )}
                </Card>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {selectedSlot && (
        <MealSearchModal
          isOpen={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          onSelectMeal={handleMealSelect}
          slot={selectedSlot}
        />
      )}

      <ShoppingListModal
        isOpen={showShoppingList}
        onClose={() => setShowShoppingList(false)}
        shoppingList={generateShoppingList()}
      />
    </div>
  );
};
