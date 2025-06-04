
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMealCard } from './MobileMealCard';
import { MealSearchModal } from './MealSearchModal';
import { useMealPlanner } from '@/hooks/useMealPlanner';
import { useToast } from '@/hooks/use-toast';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TIMES = ['Breakfast', 'Lunch', 'Dinner'] as const;

export const MobileWeekView = () => {
  const { weekPlan, updateMealSlot } = useMealPlanner();
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; mealTime: string } | null>(null);
  const { toast } = useToast();

  const handleSlotClick = (day: string, mealTime: string) => {
    const existingMeal = weekPlan[day]?.[mealTime.toLowerCase()];
    if (!existingMeal) {
      setSelectedSlot({ day, mealTime: mealTime.toLowerCase() });
    }
  };

  const handleMealSelect = (meal: any) => {
    if (selectedSlot) {
      updateMealSlot(selectedSlot.day, selectedSlot.mealTime, meal);
      setSelectedSlot(null);
      toast({
        title: "Meal added",
        description: `${meal.name} added to ${selectedSlot.day} ${selectedSlot.mealTime}`,
      });
    }
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Week Navigation */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="text-center">
            <h2 className="font-semibold text-gray-900">KW30</h2>
          </div>
          <Button variant="ghost" size="sm">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Meal Type Headers */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {MEAL_TIMES.map((mealTime) => (
            <div key={mealTime} className="text-sm font-medium text-gray-900">
              {mealTime}
            </div>
          ))}
        </div>
      </div>

      {/* Days and Meals */}
      <div className="p-4 space-y-6">
        {DAYS.map((day, dayIndex) => (
          <div key={day} className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {day} - Jan {6 + dayIndex}
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              {MEAL_TIMES.map((mealTime) => {
                const meal = weekPlan[day]?.[mealTime.toLowerCase()];
                return (
                  <div key={mealTime} className="space-y-2">
                    <MobileMealCard
                      meal={meal}
                      showAddButton={!meal}
                      onClick={() => handleSlotClick(day, mealTime)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
    </div>
  );
};
