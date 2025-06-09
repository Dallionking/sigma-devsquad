
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  badge?: string | number;
}

export const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  isCollapsed,
  onClick,
  variant = 'secondary',
  badge
}: SidebarItemProps) => {
  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        base: "h-10 font-semibold text-base",
        active: "bg-primary text-primary-foreground shadow-md",
        inactive: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      };
    }
    
    return {
      base: "h-9 font-medium text-sm",
      active: "bg-sidebar-accent text-sidebar-accent-foreground",
      inactive: "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    };
  };

  const styles = getVariantStyles();

  const buttonContent = (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "w-full justify-start gap-3 transition-all duration-200",
        styles.base,
        isActive ? styles.active : styles.inactive,
        isCollapsed && "justify-center p-2 w-10 h-10"
      )}
    >
      <Icon className={cn(
        "flex-shrink-0",
        variant === 'primary' ? "w-5 h-5" : "w-4 h-4"
      )} />
      {!isCollapsed && (
        <span className="truncate">{label}</span>
      )}
      {!isCollapsed && badge && (
        <span className={cn(
          "ml-auto px-2 py-1 text-xs rounded-full font-medium",
          isActive 
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}>
          {badge}
        </span>
      )}
    </Button>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {buttonContent}
        </TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          <p>{label}</p>
          {badge && (
            <p className="text-xs text-muted-foreground">{badge} items</p>
          )}
        </TooltipContent>
      </Tooltip>
    );
  }

  return buttonContent;
};
