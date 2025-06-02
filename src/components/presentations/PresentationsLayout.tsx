
import React from 'react';
import { UnifiedSidebar } from '@/components/navigation/UnifiedSidebar';
import { PresentationsHeader } from './PresentationsHeader';
import { PresentationsGrid } from './PresentationsGrid';

export const PresentationsLayout = () => {
  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <UnifiedSidebar className="flex-shrink-0" />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <PresentationsHeader />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <PresentationsGrid />
          </div>
        </main>
      </div>
    </div>
  );
};
