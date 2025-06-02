
import React from 'react';
import { Star } from 'lucide-react';
import { TouchOptimizedNavItem } from './TouchOptimizedNavItem';
import { cn } from '@/lib/utils';

interface FavoritesSectionProps {
  isCollapsed: boolean;
}

export const FavoritesSection = ({ isCollapsed }: FavoritesSectionProps) => {
  // Mock favorites - in a real app, this would come from user preferences
  const favoriteItems = [
    { id: 'fav-1', label: 'Planning Agent', path: '/planning-agent', icon: Star },
  ];

  if (favoriteItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("p-3 border-t border-sidebar-border/50")}>
      {!isCollapsed && (
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
          Favorites
        </h3>
      )}
      <div className="space-y-1">
        {favoriteItems.map((item) => (
          <TouchOptimizedNavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={false}
            isCollapsed={isCollapsed}
            onClick={() => {}}
            variant="secondary"
          />
        ))}
      </div>
    </div>
  );
};
