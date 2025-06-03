
import React from 'react';
import { Clock, X, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MealCardProps {
  meal: {
    id: string;
    name: string;
    imageUrl: string;
    prepTime: number;
    tags: string[];
    calories?: number;
  };
  compact?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({ 
  meal, 
  compact = false, 
  onClick, 
  onDelete, 
  onEdit,
  showActions = false 
}) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.();
  };

  return (
    <div 
      className={`cursor-pointer transition-transform hover:scale-105 relative group ${compact ? '' : 'bg-white rounded-lg shadow-md overflow-hidden'}`}
      onClick={onClick}
    >
      {/* Action buttons for compact mode */}
      {compact && showActions && (
        <div className="absolute top-1 right-1 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button
              size="sm"
              variant="secondary"
              className="h-6 w-6 p-0"
              onClick={handleEdit}
            >
              <Edit className="h-3 w-3" />
            </Button>
          )}
          {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              className="h-6 w-6 p-0"
              onClick={handleDelete}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}

      <div className={compact ? 'space-y-2' : 'space-y-3'}>
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className={`w-full object-cover rounded ${compact ? 'h-16' : 'h-48'}`}
        />
        <div className={compact ? 'space-y-1' : 'p-4 space-y-3'}>
          <h3 className={`font-semibold text-gray-900 ${compact ? 'text-sm' : 'text-lg'} line-clamp-2`}>
            {meal.name}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className={compact ? "h-3 w-3" : "h-4 w-4"} />
            <span className={compact ? "text-xs" : "text-sm"}>{meal.prepTime} min</span>
            {meal.calories && (
              <>
                <span className="text-gray-400">•</span>
                <span className={compact ? "text-xs" : "text-sm"}>{meal.calories} cal</span>
              </>
            )}
          </div>

          {!compact && (
            <div className="flex flex-wrap gap-1">
              {meal.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
