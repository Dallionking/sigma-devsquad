
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
      "border-b border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 backdrop-blur-sm shadow-sm",
      compact ? "py-2" : "py-3",
      className
    )}>
      <div className="px-6">
        {/* Header - Enhanced TERTIARY styling */}
        <div className={cn(
          "flex items-center gap-4",
          !compact && "mb-4"
        )}>
          {showBackButton && <BackButton size="sm" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200" />}
          {title && (
            <h3 className={cn(
              "font-bold text-green-700 dark:text-green-300 drop-shadow-sm",
              compact ? "text-base" : "text-lg"
            )}>
              {title}
            </h3>
          )}
        </div>

        {/* Tertiary navigation items - Smaller but still visually distinct */}
        <nav className={cn(
          "flex items-center gap-2 overflow-x-auto",
          title && !compact && "mt-3"
        )}>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = item.isActive ?? (location.pathname === item.path);
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-2 h-9 px-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 shadow-sm hover:shadow-md",
                  isActive 
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-400/30 scale-105" 
                    : "text-green-600 dark:text-green-400 hover:text-white hover:bg-gradient-to-r hover:from-green-400 hover:to-green-500 border border-green-300 dark:border-green-600 hover:border-green-400"
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="font-semibold">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
