
import React from 'react';
import { Clock, Utensils, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MobileMealCardProps {
  meal?: {
    id: string;
    name: string;
    prepTime?: number;
    calories?: number;
    image?: string;
    imageUrl?: string;
    tags?: string[];
  };
  showAddButton?: boolean;
  onClick?: () => void;
  hideLabels?: boolean;
}

export const MobileMealCard: React.FC<MobileMealCardProps> = ({
  meal,
  showAddButton = false,
  onClick,
  hideLabels = false
}) => {
  if (!meal && showAddButton) {
    return (
      <Card 
        className="h-32 cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 hover:border-emerald-400"
        onClick={onClick}
      >
        <CardContent className="p-4 h-full flex flex-col items-center justify-center">
          <Plus className="h-8 w-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Add Meal</span>
        </CardContent>
      </Card>
    );
  }

  if (!meal) {
    return (
      <Card className="h-32 bg-gray-100">
        <CardContent className="p-4 h-full flex items-center justify-center">
          <span className="text-gray-400 text-sm">Empty</span>
        </CardContent>
      </Card>
    );
  }

  const imageUrl = meal.image || meal.imageUrl;

  return (
    <Card className="h-32 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="p-0 h-full">
        {imageUrl && (
          <div className="h-16 w-full overflow-hidden rounded-t-lg">
            <img 
              src={imageUrl} 
              alt={meal.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-3 flex-1">
          <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">
            {meal.name}
          </h3>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            {meal.prepTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{meal.prepTime}min</span>
              </div>
            )}
            {meal.calories && (
              <div className="flex items-center gap-1">
                <Utensils className="h-3 w-3" />
                <span>{meal.calories}kcal</span>
              </div>
            )}
          </div>
          
          {!hideLabels && meal.tags && meal.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {meal.tags.slice(0, 2).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-1 py-0"
                >
                  {tag}
                </Badge>
              ))}
              {meal.tags.length > 2 && (
                <Badge variant="outline" className="text-xs px-1 py-0">
                  +{meal.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
