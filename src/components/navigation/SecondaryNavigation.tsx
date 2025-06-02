
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { BackButton } from './BackButton';

interface SecondaryNavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
  badge?: string | number;
}

interface SecondaryNavigationProps {
  items: SecondaryNavItem[];
  showBackButton?: boolean;
  className?: string;
  title?: string;
  description?: string;
}

export const SecondaryNavigation = ({ 
  items, 
  showBackButton = true,
  className,
  title,
  description 
}: SecondaryNavigationProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={cn(
      "border-b border-border/30 bg-muted/30 backdrop-blur-sm",
      className
    )}>
      <div className="px-4 py-3">
        {/* Header with back button and title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {showBackButton && <BackButton />}
            {title && (
              <div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">{description}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Secondary navigation items */}
        <nav className="flex items-center gap-2 overflow-x-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-2 h-9 px-4 font-medium whitespace-nowrap transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "ml-1 px-1.5 py-0.5 text-xs rounded-full",
                    isActive 
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
