
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  PanelLeft, 
  PanelLeftClose
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCollapsibleSidebar } from '@/hooks/useCollapsibleSidebar.tsx';
import { useResponsiveNavigation } from '@/hooks/useResponsiveNavigation';
import { TouchOptimizedNavItem } from './TouchOptimizedNavItem';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { useUnifiedNavigation } from '@/contexts/UnifiedNavigationContext';

interface EnhancedUnifiedSidebarProps {
  className?: string;
}

export const EnhancedUnifiedSidebar = ({ className }: EnhancedUnifiedSidebarProps) => {
  const { navigationItems, currentPath, navigate, isNavigating } = useUnifiedNavigation();
  const { showHamburger, isMobile } = useResponsiveNavigation();
  
  const { isCollapsed, toggleSidebar } = useCollapsibleSidebar({
    defaultCollapsed: false,
    keyboardShortcut: 'b',
    storageKey: 'enhanced-unified-sidebar-collapsed',
    autoCollapseOnMobile: true
  });

  // Group navigation items by category
  const mainItems = navigationItems.filter(item => item.category === 'main');
  const configItems = navigationItems.filter(item => item.category === 'configuration');
  const accountItems = navigationItems.filter(item => item.category === 'account');

  const sidebarContent = (
    <div className={cn(
      "bg-sidebar-background border-r border-sidebar-border transition-all duration-300 ease-in-out h-full flex flex-col shadow-sm",
      !showHamburger && (isCollapsed ? "w-16" : "w-80"),
      showHamburger && "w-full border-r-0"
    )}>
      {/* Header with toggle */}
      <div className={cn(
        "flex-shrink-0 p-3 border-b border-sidebar-border bg-sidebar-background/95 backdrop-blur-sm",
        showHamburger && "border-b-0 p-4"
      )}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground animate-in fade-in-50 duration-200">
                Navigation
              </h2>
              <p className="text-xs text-muted-foreground">
                AI Development Workspace
              </p>
            </div>
          )}
          
          {!showHamburger && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={toggleSidebar}
                  className="touch-target min-h-[44px] min-w-[44px] p-1.5 flex-shrink-0 hover:bg-sidebar-accent rounded-md transition-colors"
                >
                  {isCollapsed ? (
                    <PanelLeft className="w-4 h-4" />
                  ) : (
                    <PanelLeftClose className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-medium">
                <p className="text-sm">
                  {isCollapsed ? "Expand" : "Collapse"} sidebar (Ctrl+B)
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-area-enhanced">
        {/* Main Navigation */}
        <div className={cn("p-3 space-y-1", showHamburger && "px-4")}>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
              Main
            </h3>
          )}
          {mainItems.map((item) => (
            <TouchOptimizedNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              isActive={currentPath === item.path}
              isCollapsed={isCollapsed && !showHamburger}
              onClick={() => navigate(item.path)}
              variant="primary"
            />
          ))}
        </div>

        {/* Configuration Section */}
        <div className={cn("p-3 border-t border-sidebar-border/50", showHamburger && "px-4")}>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
              Configuration
            </h3>
          )}
          <div className="space-y-1">
            {configItems.map((item) => (
              <TouchOptimizedNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={currentPath === item.path}
                isCollapsed={isCollapsed && !showHamburger}
                onClick={() => navigate(item.path)}
                variant="secondary"
              />
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className={cn("p-3 border-t border-sidebar-border/50", showHamburger && "px-4")}>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
              Account
            </h3>
          )}
          <div className="space-y-1">
            {accountItems.map((item) => (
              <TouchOptimizedNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={currentPath === item.path}
                isCollapsed={isCollapsed && !showHamburger}
                onClick={() => navigate(item.path)}
                variant="secondary"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      {!isCollapsed && !showHamburger && (
        <div className="flex-shrink-0 border-t border-sidebar-border p-3 animate-in fade-in-50 duration-200">
          <div className="text-xs text-muted-foreground text-center">
            <kbd className="px-1.5 py-0.5 bg-muted rounded border text-xs">Ctrl+B</kbd> to toggle
          </div>
        </div>
      )}
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
