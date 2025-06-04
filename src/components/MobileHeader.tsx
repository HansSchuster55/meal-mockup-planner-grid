
import React from 'react';
import { Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MobileHeaderProps {
  activeView: 'week' | 'library';
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onAddMeal?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  activeView,
  searchTerm = '',
  onSearchChange,
  onAddMeal
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 mr-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search for Meal (for Meal Library only)"
            value={searchTerm}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-10 bg-gray-50 border-none rounded-full"
          />
        </div>
        <Button variant="ghost" size="sm" className="p-2">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold">
            H
          </div>
        </Button>
      </div>
    </div>
  );
};
