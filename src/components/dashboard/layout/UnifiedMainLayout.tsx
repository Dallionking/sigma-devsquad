
import React from 'react';
import { UnifiedSidebar } from '@/components/navigation/UnifiedSidebar';
import { cn } from '@/lib/utils';

interface UnifiedMainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const UnifiedMainLayout = ({ children, className }: UnifiedMainLayoutProps) => {
  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Unified Sidebar */}
      <UnifiedSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main id="main-content" className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
