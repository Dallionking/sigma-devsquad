
import React from 'react';
import { UnifiedNavigationProvider } from '@/contexts/UnifiedNavigationContext';
import { UnifiedSidebar } from '@/components/navigation/UnifiedSidebar';
import { UnifiedBreadcrumb } from '@/components/navigation/UnifiedBreadcrumb';
import { navigationConfig } from '@/config/navigationConfig';
import { cn } from '@/lib/utils';

interface UnifiedLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBreadcrumbs?: boolean;
}

export const UnifiedLayout = ({ 
  children, 
  className,
  showBreadcrumbs = true 
}: UnifiedLayoutProps) => {
  return (
    <UnifiedNavigationProvider navigationItems={navigationConfig}>
      <div className={cn("flex h-screen bg-background", className)}>
        {/* Unified Sidebar - Only navigation element needed */}
        <UnifiedSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Unified Breadcrumb Navigation */}
          {showBreadcrumbs && <UnifiedBreadcrumb />}
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </UnifiedNavigationProvider>
  );
};
