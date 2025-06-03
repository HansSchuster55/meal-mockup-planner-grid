
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart, Calendar } from 'lucide-react';
import { MealCard } from './MealCard';
import { MealSearchModal } from './MealSearchModal';
import { ShoppingListModal } from './ShoppingListModal';
import { EditMealModal } from './EditMealModal';
import { useMealPlanner } from '@/hooks/useMealPlanner';
import { useToast } from '@/hooks/use-toast';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_TIMES = ['breakfast', 'lunch', 'dinner'] as const;

export const WeekView = () => {
  const { weekPlan, updateMealSlot, generateShoppingList } = useMealPlanner();
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; mealTime: string } | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [editingMeal, setEditingMeal] = useState<{ meal: any; day: string; mealTime: string } | null>(null);
  const { toast } = useToast();

  const handleSlotClick = (day: string, mealTime: string) => {
    const existingMeal = weekPlan[day]?.[mealTime];
    if (!existingMeal) {
      setSelectedSlot({ day, mealTime });
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

  const handleDeleteMeal = (day: string, mealTime: string) => {
    updateMealSlot(day, mealTime, null);
    toast({
      title: "Meal removed",
      description: `Meal removed from ${day} ${mealTime}`,
    });
  };

  const handleEditMeal = (meal: any, day: string, mealTime: string) => {
    setEditingMeal({ meal, day, mealTime });
  };

  const handleSaveEditedMeal = (updatedMeal: any) => {
    if (editingMeal) {
      updateMealSlot(editingMeal.day, editingMeal.mealTime, updatedMeal);
      setEditingMeal(null);
      toast({
        title: "Meal updated",
        description: `${updatedMeal.name} has been updated`,
      });
    }
  };

  const handleGenerateShoppingList = () => {
    setShowShoppingList(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-emerald-600" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">This Week's Menu</h1>
            <p className="text-gray-600">January 6 - 12, 2025</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
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

      {/* Mobile View */}
      <div className="block lg:hidden space-y-6">
        {DAYS.map((day) => (
          <Card key={day} className="p-4">
            <h3 className="font-semibold text-lg mb-3 text-center">
              {day}
              <span className="block text-sm text-gray-500 font-normal">
                Jan {6 + DAYS.indexOf(day)}
              </span>
            </h3>
            <div className="space-y-3">
              {MEAL_TIMES.map((mealTime) => {
                const meal = weekPlan[day]?.[mealTime];
                return (
                  <div key={mealTime} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700 capitalize">{mealTime}</span>
                    </div>
                    {meal ? (
                      <MealCard 
                        meal={meal} 
                        compact 
                        showActions
                        onDelete={() => handleDeleteMeal(day, mealTime)}
                        onEdit={() => handleEditMeal(meal, day, mealTime)}
                      />
                    ) : (
                      <div 
                        className="h-24 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-emerald-300"
                        onClick={() => handleSlotClick(day, mealTime)}
                      >
                        <Plus className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid grid-cols-8 gap-4">
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
                    <MealCard 
                      meal={meal} 
                      compact 
                      showActions
                      onDelete={() => handleDeleteMeal(day, mealTime)}
                      onEdit={() => handleEditMeal(meal, day, mealTime)}
                    />
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

      {editingMeal && (
        <EditMealModal
          isOpen={!!editingMeal}
          onClose={() => setEditingMeal(null)}
          meal={editingMeal.meal}
          onSave={handleSaveEditedMeal}
        />
      )}
    </div>
  );
};
