
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BackButton } from './BackButton';

interface TertiaryNavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  isActive?: boolean;
}

interface TertiaryNavigationProps {
  items: TertiaryNavItem[];
  showBackButton?: boolean;
  className?: string;
  title?: string;
  compact?: boolean;
}

export const TertiaryNavigation = ({ 
  items, 
  showBackButton = true,
  className,
  title,
  compact = false
}: TertiaryNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={cn(
      "border-b border-border/20 bg-background/60 backdrop-blur-sm",
      compact ? "py-2" : "py-3",
      className
    )}>
      <div className="px-4">
        {/* Header */}
        <div className={cn(
          "flex items-center gap-4",
          !compact && "mb-3"
        )}>
          {showBackButton && <BackButton size="sm" />}
          {title && (
            <h3 className={cn(
              "font-medium text-foreground",
              compact ? "text-sm" : "text-base"
            )}>
              {title}
            </h3>
          )}
        </div>

        {/* Tertiary navigation items */}
        <nav className={cn(
          "flex items-center gap-1 overflow-x-auto",
          title && !compact && "mt-2"
        )}>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.isActive ?? (location.pathname === item.path);
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-1.5 h-8 px-3 text-sm font-normal whitespace-nowrap transition-all duration-200",
                  isActive 
                    ? "bg-secondary text-secondary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                )}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
