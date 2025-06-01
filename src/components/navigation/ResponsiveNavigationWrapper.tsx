
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useCollapsibleSidebar } from '@/hooks/useCollapsibleSidebar';
import { cn } from '@/lib/utils';

interface ResponsiveNavigationWrapperProps {
  children: React.ReactNode;
  mobileContent?: React.ReactNode;
  desktopContent?: React.ReactNode;
  triggerLabel?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  showToggle?: boolean;
  className?: string;
}

export const ResponsiveNavigationWrapper = ({
  children,
  mobileContent,
  desktopContent,
  triggerLabel = "Open navigation",
  collapsible = true,
  defaultCollapsed = false,
  showToggle = true,
  className
}: ResponsiveNavigationWrapperProps) => {
  const isMobile = useIsMobile();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  
  const { 
    isCollapsed, 
    toggleSidebar, 
    collapseSidebar, 
    expandSidebar 
  } = useCollapsibleSidebar({
    defaultCollapsed,
    keyboardShortcut: 'b',
    storageKey: 'responsive-nav-collapsed'
  });

  // Auto-collapse on mobile
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      collapseSidebar();
    }
  }, [isMobile, isCollapsed, collapseSidebar]);

  // Close mobile nav when route changes
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  if (isMobile) {
    return (
      <div className={cn("flex items-center", className)}>
        <Drawer open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <DrawerTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="touch-target p-2"
              aria-label={triggerLabel}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[85vh]">
            <div className="flex flex-col h-full overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Navigation</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setMobileNavOpen(false)}
                  className="touch-target p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {mobileContent || children}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    );
  }

  // Desktop navigation
  return (
    <div className={cn("flex items-center", className)}>
      {collapsible && showToggle && (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="h-8 w-8 p-0 mr-2 hover:bg-primary/10 transition-colors"
                aria-label={isCollapsed ? "Expand navigation (Ctrl+B)" : "Collapse navigation (Ctrl+B)"}
              >
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-medium">
              <p className="text-sm">
                {isCollapsed ? "Expand" : "Collapse"} navigation (Ctrl+B)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <div className={cn(
        "transition-all duration-300 ease-in-out",
        collapsible && isCollapsed && "opacity-50 scale-95"
      )}>
        {desktopContent || children}
      </div>
    </div>
  );
};
