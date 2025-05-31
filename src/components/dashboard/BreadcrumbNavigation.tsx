
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Home, MessageSquare, CheckSquare, Mail, GitBranch } from 'lucide-react';
import { ViewMode } from '@/types';
import { useFilters } from '@/contexts/FilterContext';
import { cn } from '@/lib/utils';

interface BreadcrumbNavigationProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  selectedItemCount?: number;
  className?: string;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  viewMode,
  onViewModeChange,
  selectedItemCount = 0,
  className
}) => {
  const { filters, isFilterActive } = useFilters();

  const getViewModeConfig = (mode: ViewMode) => {
    switch (mode) {
      case 'workflow':
        return {
          icon: GitBranch,
          label: 'Workflow',
          description: 'Agent collaboration',
          color: 'text-blue-600'
        };
      case 'communication':
        return {
          icon: MessageSquare,
          label: 'Communication',
          description: 'Team chat & updates',
          color: 'text-green-600'
        };
      case 'tasks':
        return {
          icon: CheckSquare,
          label: 'Tasks',
          description: 'Active assignments',
          color: 'text-purple-600'
        };
      case 'messages':
        return {
          icon: Mail,
          label: 'Messages',
          description: 'Direct communications',
          color: 'text-orange-600'
        };
      default:
        return {
          icon: Home,
          label: 'Dashboard',
          description: 'Overview',
          color: 'text-gray-600'
        };
    }
  };

  const currentConfig = getViewModeConfig(viewMode);
  const CurrentIcon = currentConfig.icon;

  const breadcrumbItems = [
    {
      label: 'Dashboard',
      icon: Home,
      onClick: () => onViewModeChange('workflow'),
      isActive: false
    },
    {
      label: currentConfig.label,
      icon: currentConfig.icon,
      onClick: null,
      isActive: true
    }
  ];

  return (
    <div className={cn("bg-background/80 backdrop-blur-sm border-b border-border/30 px-4 py-3", className)}>
      <div className="flex items-center justify-between">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => {
            const ItemIcon = item.icon;
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <React.Fragment key={index}>
                {item.onClick ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={item.onClick}
                    className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  >
                    <ItemIcon className="w-4 h-4 mr-1" />
                    {item.label}
                  </Button>
                ) : (
                  <div className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-md",
                    currentConfig.color,
                    "bg-current/10"
                  )}>
                    <ItemIcon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                )}
                
                {!isLast && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Context Information */}
        <div className="flex items-center gap-3">
          {/* Filter Status */}
          {isFilterActive && (
            <Badge variant="outline" className="text-xs">
              {filters.activeFiltersCount} filter{filters.activeFiltersCount !== 1 ? 's' : ''} active
            </Badge>
          )}
          
          {/* Selection Count */}
          {selectedItemCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selectedItemCount} selected
            </Badge>
          )}
          
          {/* View Description */}
          <span className="text-sm text-muted-foreground hidden sm:block">
            {currentConfig.description}
          </span>
        </div>
      </div>
    </div>
  );
};
