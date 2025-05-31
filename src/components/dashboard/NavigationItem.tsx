
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { DynamicText, TruncatedText } from '@/components/ui/dynamic-text';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  badge?: number | string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  className?: string;
}

export const NavigationItem = ({
  icon: Icon,
  label,
  isActive = false,
  isCollapsed = false,
  badge,
  onClick,
  disabled = false,
  href,
  className
}: NavigationItemProps) => {
  const buttonContent = (
    <Button
      variant={isActive ? "default" : "ghost"}
      size={isCollapsed ? "icon" : "default"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base styles with improved responsive behavior
        "w-full transition-all duration-300 ease-in-out group relative overflow-hidden",
        "hover:scale-[1.02] active:scale-[0.98]",
        // Collapsed styles - fixed dimensions to prevent squishing
        isCollapsed ? [
          "h-12 w-12 p-0 flex items-center justify-center flex-shrink-0",
          "min-w-[3rem] min-h-[3rem]"
        ] : [
          "h-11 px-3 py-2 justify-start min-w-0"
        ],
        // Active state styles with better contrast
        isActive && [
          "bg-primary text-primary-foreground shadow-md",
          "hover:bg-primary/90 hover:shadow-lg"
        ],
        // Inactive state styles with smooth transitions
        !isActive && [
          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground",
          "hover:shadow-sm"
        ],
        // Disabled styles
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        // Focus styles for accessibility
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        className
      )}
      asChild={href ? true : false}
    >
      {href ? (
        <a href={href} className="flex items-center gap-3 w-full min-w-0 overflow-hidden">
          <Icon className={cn(
            "flex-shrink-0 transition-all duration-300",
            isCollapsed ? "w-5 h-5" : "w-4 h-4",
            "group-hover:scale-110 group-active:scale-95"
          )} />
          {!isCollapsed && (
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <TruncatedText 
                lines={1} 
                className="flex-1 text-left font-medium min-w-0 overflow-hidden"
                variant="sm"
                showTooltip={false}
              >
                {label}
              </TruncatedText>
              {badge && (
                <Badge 
                  variant={isActive ? "secondary" : "outline"} 
                  className={cn(
                    "text-xs px-2 py-1 min-w-[1.5rem] h-6 flex items-center justify-center flex-shrink-0",
                    "transition-all duration-200",
                    isActive && "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                  )}
                >
                  <DynamicText variant="xs" className="font-medium">
                    {badge}
                  </DynamicText>
                </Badge>
              )}
            </div>
          )}
        </a>
      ) : (
        <div className="flex items-center gap-3 w-full min-w-0 overflow-hidden">
          <Icon className={cn(
            "flex-shrink-0 transition-all duration-300",
            isCollapsed ? "w-5 h-5" : "w-4 h-4",
            "group-hover:scale-110 group-active:scale-95"
          )} />
          {!isCollapsed && (
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <TruncatedText 
                lines={1} 
                className="flex-1 text-left font-medium min-w-0 overflow-hidden"
                variant="sm"
                showTooltip={false}
              >
                {label}
              </TruncatedText>
              {badge && (
                <Badge 
                  variant={isActive ? "secondary" : "outline"} 
                  className={cn(
                    "text-xs px-2 py-1 min-w-[1.5rem] h-6 flex items-center justify-center flex-shrink-0",
                    "transition-all duration-200",
                    isActive && "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                  )}
                >
                  <DynamicText variant="xs" className="font-medium">
                    {badge}
                  </DynamicText>
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
    </Button>
  );

  // Wrap with tooltip when collapsed
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <div className="relative">
              {buttonContent}
              {badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-pulse z-10"
                >
                  <DynamicText variant="xs" className="font-bold">
                    {badge}
                  </DynamicText>
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium z-50">
            <DynamicText variant="sm" className="font-medium">
              {label}
            </DynamicText>
            {badge && (
              <DynamicText variant="xs" className="opacity-70 mt-1">
                {badge} items
              </DynamicText>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
};
