
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTouchInteractions } from '@/hooks/useTouchInteractions';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileHamburgerMenuProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileHamburgerMenu = ({ children, className }: MobileHamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const { touchHandlers, triggerHapticFeedback } = useTouchInteractions({
    onSwipeLeft: () => {
      if (isOpen) {
        setIsOpen(false);
        triggerHapticFeedback('light');
      }
    },
    onSwipeRight: () => {
      if (!isOpen) {
        setIsOpen(true);
        triggerHapticFeedback('light');
      }
    },
    threshold: 50
  });

  // Close menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!isMobile) {
    return <>{children}</>;
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
    triggerHapticFeedback('medium');
  };

  return (
    <div className={cn("mobile-navigation", className)} {...touchHandlers}>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggle}
            className={cn(
              "touch-target min-h-[44px] min-w-[44px] p-3",
              "hover:bg-accent/80 active:bg-accent",
              "transition-all duration-200 ease-out",
              "touch-feedback tap-highlight-primary"
            )}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        
        <SheetContent 
          side="left" 
          className={cn(
            "w-[280px] sm-mobile:w-[320px] p-0",
            "bg-background/95 backdrop-blur-md",
            "border-r-2 border-border/50"
          )}
        >
          <SheetHeader className="p-4 border-b border-border/50">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">
                Navigation
              </SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="touch-target min-h-[44px] min-w-[44px] p-2"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
