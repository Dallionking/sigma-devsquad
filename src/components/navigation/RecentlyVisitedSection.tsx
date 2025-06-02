
import React from 'react';
import { Clock } from 'lucide-react';
import { TouchOptimizedNavItem } from './TouchOptimizedNavItem';
import { cn } from '@/lib/utils';

interface RecentlyVisitedSectionProps {
  isCollapsed: boolean;
}

export const RecentlyVisitedSection = ({ isCollapsed }: RecentlyVisitedSectionProps) => {
  // Mock recent items - in a real app, this would come from local storage or state
  const recentItems = [
    { id: 'recent-1', label: 'Agent Config', path: '/agent-configuration', icon: Clock },
    { id: 'recent-2', label: 'Projects', path: '/projects', icon: Clock },
  ];

  if (recentItems.length === 0) {
    return null;
  }

  return (
    <div className={cn("p-3 border-t border-sidebar-border/50")}>
      {!isCollapsed && (
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 animate-in fade-in-50 duration-200">
          Recently Visited
        </h3>
      )}
      <div className="space-y-1">
        {recentItems.map((item) => (
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
