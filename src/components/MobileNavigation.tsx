
import React from 'react';
import { Calendar, List, Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  activeView: 'week' | 'library';
  onViewChange: (view: 'week' | 'library') => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  activeView, 
  onViewChange 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center">
        <Button
          variant="ghost"
          onClick={() => onViewChange('week')}
          className={`flex flex-col items-center gap-1 p-2 ${
            activeView === 'week' ? 'text-black' : 'text-gray-500'
          }`}
        >
          <Star className={`h-6 w-6 ${activeView === 'week' ? 'fill-current' : ''}`} />
          <span className="text-xs">Week View</span>
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => onViewChange('library')}
          className={`flex flex-col items-center gap-1 p-2 ${
            activeView === 'library' ? 'text-black' : 'text-gray-500'
          }`}
        >
          <Star className={`h-6 w-6 ${activeView === 'library' ? 'fill-current' : ''}`} />
          <span className="text-xs">Meal Library</span>
        </Button>
      </div>
    </div>
  );
};
