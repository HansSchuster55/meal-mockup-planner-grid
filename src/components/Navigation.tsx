
import React from 'react';
import { Calendar, List, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  activeView: 'week' | 'library';
  onViewChange: (view: 'week' | 'library') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">MealPlanner</span>
            </div>
            
            <div className="flex space-x-4">
              <Button
                variant={activeView === 'week' ? 'default' : 'ghost'}
                onClick={() => onViewChange('week')}
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                Week View
              </Button>
              <Button
                variant={activeView === 'library' ? 'default' : 'ghost'}
                onClick={() => onViewChange('library')}
                className="flex items-center gap-2"
              >
                <List className="h-4 w-4" />
                Meal Library
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Demo User
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
