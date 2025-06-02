
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useResponsiveNavigation } from '@/hooks/useResponsiveNavigation';
import { cn } from '@/lib/utils';
import { useCollapsibleSidebar } from '@/hooks/useCollapsibleSidebar';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { useContextualNavigation } from './ContextualNavigationProvider';
import { SidebarHeader } from './SidebarHeader';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { navigationItems } from './navigationData';

interface EnhancedUnifiedSidebarProps {
  className?: string;
}

export const EnhancedUnifiedSidebar = ({ className }: EnhancedUnifiedSidebarProps) => {
  const { currentPreset, getFilteredNavigationItems } = useContextualNavigation();
  const { showHamburger, isMobile } = useResponsiveNavigation();
  
  const { isCollapsed, toggleSidebar } = useCollapsibleSidebar({
    defaultCollapsed: false,
    keyboardShortcut: 'b',
    storageKey: 'enhanced-unified-sidebar-collapsed',
    autoCollapseOnMobile: true
  });

  // Get filtered items based on current preset
  const filteredItems = getFilteredNavigationItems();
  const primaryItems = filteredItems.length > 0 ? filteredItems : navigationItems.filter(item => item.level === 'primary');
  const secondaryItems = navigationItems.filter(item => item.level === 'secondary');

  const sidebarContent = (
    <div className={cn(
      "bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out h-full flex flex-col shadow-sm",
      !showHamburger && (isCollapsed ? "w-16" : "w-80"),
      showHamburger && "w-full border-r-0"
    )}>
      {/* Header with toggle */}
      <SidebarHeader
        isCollapsed={isCollapsed}
        showHamburger={showHamburger}
        currentPreset={currentPreset}
        onToggleSidebar={toggleSidebar}
      />

      {/* Scrollable content */}
      <SidebarContent
        primaryItems={primaryItems}
        secondaryItems={secondaryItems}
        isCollapsed={isCollapsed}
        showHamburger={showHamburger}
      />

      {/* Footer */}
      <SidebarFooter
        isCollapsed={isCollapsed}
        showHamburger={showHamburger}
      />
    </div>
  );

  // Render mobile hamburger menu or desktop sidebar
  if (showHamburger) {
    return (
      <MobileHamburgerMenu className={className}>
        {sidebarContent}
      </MobileHamburgerMenu>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className={className}>
        {sidebarContent}
      </div>
    </TooltipProvider>
  );
};
