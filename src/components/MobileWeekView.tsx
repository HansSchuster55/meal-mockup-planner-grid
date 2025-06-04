
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMealCard } from './MobileMealCard';
import { MealSearchModal } from './MealSearchModal';
import { useMealPlanner } from '@/hooks/useMealPlanner';
import { useToast } from '@/hooks/use-toast';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TIMES = ['Breakfast', 'Lunch', 'Dinner'] as const;

// Helper function to get week number
const getWeekNumber = (date: Date): number => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
};

// Helper function to get dates for a specific week
const getWeekDates = (weekNumber: number, year: number): Date[] => {
  const simple = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(ISOweekStart);
    date.setDate(ISOweekStart.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export const MobileWeekView = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentWeekNumber = getWeekNumber(currentDate);
  
  const [weekNumber, setWeekNumber] = useState(currentWeekNumber);
  const [year, setYear] = useState(currentYear);
  
  const { getWeekPlan, updateMealSlot } = useMealPlanner();
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; mealTime: string } | null>(null);
  const { toast } = useToast();

  const weekDates = getWeekDates(weekNumber, year);
  const weekPlan = getWeekPlan(weekNumber, year);

  const handlePreviousWeek = () => {
    if (weekNumber > 1) {
      setWeekNumber(weekNumber - 1);
    } else {
      setYear(year - 1);
      setWeekNumber(52); // Approximate, should be calculated properly
    }
  };

  const handleNextWeek = () => {
    if (weekNumber < 52) {
      setWeekNumber(weekNumber + 1);
    } else {
      setYear(year + 1);
      setWeekNumber(1);
    }
  };

  const handleCurrentWeek = () => {
    setWeekNumber(currentWeekNumber);
    setYear(currentYear);
  };

  const handleSlotClick = (day: string, mealTime: string) => {
    const existingMeal = weekPlan[day]?.[mealTime.toLowerCase()];
    if (!existingMeal) {
      setSelectedSlot({ day, mealTime: mealTime.toLowerCase() });
    }
  };

  const handleMealSelect = (meal: any) => {
    if (selectedSlot) {
      updateMealSlot(selectedSlot.day, selectedSlot.mealTime, meal, weekNumber, year);
      setSelectedSlot(null);
      toast({
        title: "Meal added",
        description: `${meal.name} added to ${selectedSlot.day} ${selectedSlot.mealTime}`,
      });
    }
  };

  const isCurrentWeek = weekNumber === currentWeekNumber && year === currentYear;

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Week Navigation */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <h2 className="font-semibold text-gray-900">KW{weekNumber}</h2>
            </div>
            {!isCurrentWeek && (
              <Button variant="outline" size="sm" onClick={handleCurrentWeek}>
                <Calendar className="h-4 w-4 mr-1" />
                Current
              </Button>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={handleNextWeek}>
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
        {DAYS.map((day, dayIndex) => {
          const dayDate = weekDates[dayIndex];
          return (
            <div key={day} className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">
                {day} - {dayDate.toLocaleDateString('de-DE', { month: 'short', day: 'numeric' })}
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
                        hideLabels={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
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
