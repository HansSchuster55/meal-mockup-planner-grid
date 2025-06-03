
import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { WeekView } from '@/components/WeekView';
import { MealLibrary } from '@/components/MealLibrary';

const Index = () => {
  const [activeView, setActiveView] = useState<'week' | 'library'>('week');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'week' ? <WeekView /> : <MealLibrary />}
      </main>
    </div>
  );
};

export default Index;
