
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
        // Base styles
        "w-full justify-start transition-all duration-200 ease-in-out group relative",
        // Collapsed styles
        isCollapsed && "h-10 w-10 p-0",
        // Active state styles
        isActive && [
          "bg-primary text-primary-foreground shadow-sm",
          "hover:bg-primary/90"
        ],
        // Inactive state styles
        !isActive && [
          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "focus-visible:bg-sidebar-accent focus-visible:text-sidebar-accent-foreground"
        ],
        // Disabled styles
        disabled && "opacity-50 cursor-not-allowed",
        // Focus styles for accessibility
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className
      )}
      asChild={href ? true : false}
    >
      {href ? (
        <a href={href} className="flex items-center gap-3 w-full">
          <Icon className={cn(
            "w-4 h-4 flex-shrink-0 transition-transform duration-200",
            "group-hover:scale-110"
          )} />
          {!isCollapsed && (
            <>
              <TruncatedText 
                lines={1} 
                variant="label"
                className="flex-1 text-left font-medium"
                expandOnHover={true}
              >
                {label}
              </TruncatedText>
              {badge && (
                <Badge 
                  variant={isActive ? "secondary" : "outline"} 
                  className={cn(
                    "text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center",
                    isActive && "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                  )}
                >
                  <DynamicText variant="xs" className="font-medium">
                    {badge}
                  </DynamicText>
                </Badge>
              )}
            </>
          )}
        </a>
      ) : (
        <>
          <Icon className={cn(
            "w-4 h-4 flex-shrink-0 transition-transform duration-200",
            "group-hover:scale-110"
          )} />
          {!isCollapsed && (
            <>
              <TruncatedText 
                lines={1} 
                variant="label"
                className="flex-1 text-left font-medium"
                expandOnHover={true}
              >
                {label}
              </TruncatedText>
              {badge && (
                <Badge 
                  variant={isActive ? "secondary" : "outline"} 
                  className={cn(
                    "text-xs px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center",
                    isActive && "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                  )}
                >
                  <DynamicText variant="xs" className="font-medium">
                    {badge}
                  </DynamicText>
                </Badge>
              )}
            </>
          )}
        </>
      )}
    </Button>
  );

  // Wrap with tooltip when collapsed
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="relative">
              {buttonContent}
              {badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  <DynamicText variant="xs" className="font-medium">
                    {badge}
                  </DynamicText>
                </Badge>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="font-medium">
            <DynamicText variant="sm" className="font-medium">
              {label}
            </DynamicText>
            {badge && (
              <DynamicText variant="xs" className="opacity-70">
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
