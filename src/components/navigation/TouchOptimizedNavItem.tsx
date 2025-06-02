
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useTouchInteractions } from '@/hooks/useTouchInteractions';
import { useIsMobile } from '@/hooks/use-mobile';

interface TouchOptimizedNavItemProps {
  icon: React.ComponentType<any>;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
  badge?: number;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const TouchOptimizedNavItem = ({
  icon: Icon,
  label,
  isActive = false,
  isCollapsed = false,
  onClick,
  badge,
  variant = 'primary',
  className
}: TouchOptimizedNavItemProps) => {
  const isMobile = useIsMobile();
  
  const { touchHandlers, triggerHapticFeedback } = useTouchInteractions({
    onLongPress: () => {
      // Future: Could show context menu or additional options
      triggerHapticFeedback('heavy');
    }
  });

  const handleClick = () => {
    triggerHapticFeedback('light');
    onClick?.();
  };

  const buttonContent = (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={handleClick}
      className={cn(
        // Touch-friendly sizing - minimum 44px tap target
        "touch-target min-h-[44px] transition-all duration-200 ease-out",
        "touch-feedback tap-highlight-primary mobile-focus",
        
        // Responsive sizing based on screen and collapsed state
        isCollapsed 
          ? "min-w-[44px] w-12 h-12 p-0 justify-center" 
          : "min-w-[44px] w-full h-11 px-3 py-2 justify-start gap-3",
          
        // Mobile-specific optimizations
        isMobile && "active:scale-95 hover:scale-[1.02]",
        
        // Variant styling
        variant === 'primary' 
          ? "font-medium" 
          : "font-normal text-muted-foreground",
          
        // Active state styling
        isActive && [
          "bg-primary text-primary-foreground shadow-sm",
          "hover:bg-primary/90"
        ],
        
        // Inactive state styling
        !isActive && [
          "hover:bg-accent/80 hover:text-accent-foreground",
          "active:bg-accent"
        ],
        
        className
      )}
      {...touchHandlers}
    >
      <Icon className={cn(
        "flex-shrink-0 transition-transform duration-200",
        isCollapsed ? "w-5 h-5" : "w-4 h-4",
        isMobile && "active:scale-110"
      )} />
      
      {!isCollapsed && (
        <>
          <span className="flex-1 text-left truncate text-sm font-medium">
            {label}
          </span>
          
          {badge !== undefined && badge > 0 && (
            <Badge 
              variant="secondary" 
              className={cn(
                "badge-responsive text-xs min-w-[20px] h-5",
                "bg-primary/10 text-primary hover:bg-primary/20"
              )}
            >
              {badge > 99 ? '99+' : badge}
            </Badge>
          )}
        </>
      )}
    </Button>
  );

  if (isCollapsed) {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {buttonContent}
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          <div className="text-sm">
            {label}
            {badge !== undefined && badge > 0 && (
              <span className="ml-2 text-xs opacity-75">({badge})</span>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return buttonContent;
};
