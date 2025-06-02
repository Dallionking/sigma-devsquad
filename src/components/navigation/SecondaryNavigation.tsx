
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
      "border-b-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-950/40 dark:to-purple-900/40 backdrop-blur-sm shadow-lg",
      className
    )}>
      <div className="px-6 py-4">
        {/* Header with back button and title - Enhanced SECONDARY styling */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            {showBackButton && <BackButton size="default" className="text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100" />}
            {title && (
              <div>
                <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 drop-shadow-md">{title}</h2>
                {description && (
                  <p className="text-base text-purple-600 dark:text-purple-300 mt-2 font-medium">{description}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Secondary navigation items - Enhanced with level-appropriate styling */}
        <nav className="flex items-center gap-3 overflow-x-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="default"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-3 h-12 px-6 font-bold text-base whitespace-nowrap transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105",
                  isActive 
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-purple-500/30 scale-105 ring-2 ring-purple-300 ring-offset-2" 
                    : "text-purple-700 dark:text-purple-300 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-600 border-2 border-purple-300 dark:border-purple-600 hover:border-purple-400"
                )}
              >
                {Icon && <Icon className="w-5 h-5 drop-shadow-sm" />}
                <span className="font-bold tracking-wide">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "ml-2 px-2 py-1 text-sm rounded-full font-semibold",
                    isActive 
                      ? "bg-white/20 text-white"
                      : "bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200"
                  )}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
                )}
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
