
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TouchOptimizedNavItem } from './TouchOptimizedNavItem';
import { RecentlyVisitedSection } from './RecentlyVisitedSection';
import { FavoritesSection } from './FavoritesSection';
import { RoleBasedNavigationPresets } from './RoleBasedNavigationPresets';
import { NavItem } from './types';

interface SidebarContentProps {
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
  isCollapsed: boolean;
  showHamburger: boolean;
}

export const SidebarContent = ({ 
  primaryItems, 
  secondaryItems, 
  isCollapsed, 
  showHamburger 
}: SidebarContentProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Group secondary items by category
  const groupedSecondaryItems = secondaryItems.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <div className="flex-1 overflow-y-auto scroll-area-enhanced">
      {/* Primary Navigation */}
      <div className={cn("p-3 space-y-1", showHamburger && "px-4")}>
        {!isCollapsed && (
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
            Main
          </h3>
        )}
        {primaryItems.map((item) => (
          <TouchOptimizedNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={location.pathname === item.path}
            isCollapsed={isCollapsed && !showHamburger}
            onClick={() => handleNavigation(item.path)}
            variant="primary"
          />
        ))}
      </div>

      {/* Favorites Section */}
      <FavoritesSection isCollapsed={isCollapsed && !showHamburger} />

      {/* Recently Visited Section */}
      <RecentlyVisitedSection isCollapsed={isCollapsed && !showHamburger} />

      {/* Secondary Navigation - Grouped by Category */}
      {Object.entries(groupedSecondaryItems).map(([category, items]) => (
        <div key={category} className={cn("p-3 border-t border-sidebar-border/50", showHamburger && "px-4")}>
          {!isCollapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
              {category}
            </h3>
          )}
          <div className="space-y-1">
            {items.map((item) => (
              <TouchOptimizedNavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.path}
                isCollapsed={isCollapsed && !showHamburger}
                onClick={() => handleNavigation(item.path)}
                variant="secondary"
              />
            ))}
          </div>
        </div>
      ))}

      {/* Role-based Navigation Presets */}
      <RoleBasedNavigationPresets />
    </div>
  );
};
