
import React from 'react';
import { Clock, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MobileMealCardProps {
  meal?: {
    id: string;
    name: string;
    imageUrl: string;
    prepTime: number;
    calories?: number;
    tags: string[];
  };
  onClick?: () => void;
  showAddButton?: boolean;
}

export const MobileMealCard: React.FC<MobileMealCardProps> = ({ 
  meal, 
  onClick,
  showAddButton = false 
}) => {
  if (!meal && showAddButton) {
    return (
      <div 
        className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-center min-h-[100px] cursor-pointer hover:bg-gray-50"
        onClick={onClick}
      >
        <Plus className="h-8 w-8 text-gray-400" />
      </div>
    );
  }

  if (!meal) return null;

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <img
        src={meal.imageUrl}
        alt={meal.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">
          {meal.name}
        </h3>
        
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{meal.prepTime} min</span>
          </div>
          {meal.calories && (
            <span>{meal.calories} cal</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {meal.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
