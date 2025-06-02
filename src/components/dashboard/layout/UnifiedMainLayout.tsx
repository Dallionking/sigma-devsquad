
import React from 'react';
import { UnifiedSidebar } from '@/components/navigation/UnifiedSidebar';
import { ContextualSecondaryNav } from '@/components/navigation/ContextualSecondaryNav';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface UnifiedMainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const UnifiedMainLayout = ({ children, className }: UnifiedMainLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine if we should show contextual secondary navigation
  const showSecondaryNav = ['/dashboard', '/planning-agent', '/projects', '/agent-configuration'].some(
    path => currentPath.startsWith(path)
  );

  return (
    <div className={cn("flex h-screen bg-background", className)}>
      {/* Unified Sidebar */}
      <UnifiedSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Contextual Secondary Navigation */}
        {showSecondaryNav && (
          <ContextualSecondaryNav primaryPath={currentPath} />
        )}
        
        <main id="main-content" className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
