
import React, { useState } from 'react';
import { MobileHeader } from '@/components/MobileHeader';
import { MobileNavigation } from '@/components/MobileNavigation';
import { MobileWeekView } from '@/components/MobileWeekView';
import { MobileMealLibrary } from '@/components/MobileMealLibrary';

const Index = () => {
  const [activeView, setActiveView] = useState<'week' | 'library'>('week');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMeal, setShowAddMeal] = useState(false);

  const handleAddMeal = () => {
    setShowAddMeal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader
        activeView={activeView}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddMeal={handleAddMeal}
      />
      
      <main className="relative">
        {activeView === 'week' ? (
          <MobileWeekView />
        ) : (
          <MobileMealLibrary 
            searchTerm={searchTerm}
            onAddMeal={handleAddMeal}
          />
        )}
      </main>

      <MobileNavigation 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />
    </div>
  );
};

export default Index;
