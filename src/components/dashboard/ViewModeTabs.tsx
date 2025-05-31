
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  MessageSquare, 
  CheckSquare, 
  Mail,
  Activity,
  Filter
} from "lucide-react";
import { ViewMode } from "@/types";
import { useFilters } from "@/contexts/FilterContext";
import { FilterManager } from "./FilterManager";
import { BreadcrumbNavigation } from "./BreadcrumbNavigation";
import { cn } from "@/lib/utils";

interface ViewModeTabsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  notificationCounts: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
  showFilters?: boolean;
}

export const ViewModeTabs = ({ 
  viewMode, 
  onViewModeChange, 
  notificationCounts,
  showFilters = true
}: ViewModeTabsProps) => {
  const { isFilterActive, filters } = useFilters();
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);

  const tabs = [
    {
      key: 'workflow' as ViewMode,
      label: 'Workflow',
      icon: GitBranch,
      count: notificationCounts.workflow,
      description: 'Agent collaboration flow',
      colors: {
        bg: 'bg-[#3B82F6]/10',
        activeBg: 'bg-gradient-to-r from-[#3B82F6] to-[#3B82F6]/80',
        text: 'text-[#3B82F6]',
        activeText: 'text-white',
        border: 'border-[#3B82F6]/30',
        activeBorder: 'border-[#3B82F6]'
      }
    },
    {
      key: 'communication' as ViewMode,
      label: 'Communication',
      icon: MessageSquare,
      count: notificationCounts.communication,
      description: 'Team chat & updates',
      colors: {
        bg: 'bg-[#10B981]/10',
        activeBg: 'bg-gradient-to-r from-[#10B981] to-[#10B981]/80',
        text: 'text-[#10B981]',
        activeText: 'text-white',
        border: 'border-[#10B981]/30',
        activeBorder: 'border-[#10B981]'
      }
    },
    {
      key: 'tasks' as ViewMode,
      label: 'Tasks',
      icon: CheckSquare,
      count: notificationCounts.tasks,
      description: 'Active assignments',
      colors: {
        bg: 'bg-[#8B5CF6]/10',
        activeBg: 'bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/80',
        text: 'text-[#8B5CF6]',
        activeText: 'text-white',
        border: 'border-[#8B5CF6]/30',
        activeBorder: 'border-[#8B5CF6]'
      }
    },
    {
      key: 'messages' as ViewMode,
      label: 'Messages',
      icon: Mail,
      count: notificationCounts.messages,
      description: 'Direct communications',
      colors: {
        bg: 'bg-orange-500/10',
        activeBg: 'bg-gradient-to-r from-orange-500 to-orange-500/80',
        text: 'text-orange-600',
        activeText: 'text-white',
        border: 'border-orange-500/30',
        activeBorder: 'border-orange-500'
      }
    }
  ];

  return (
    <div className="border-b border-border/30 bg-card/50 dark:bg-card/50">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-gradient-to-br from-[#3B82F6] via-[#8B5CF6] to-[#3B82F6] rounded-md flex items-center justify-center">
              <Activity className="w-3 h-3 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
                Vibe DevSquad Dashboard
              </h2>
              <p className="text-xs text-muted-foreground">AI Collaboration Hub</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Filter Toggle */}
            {showFilters && (
              <Button
                variant={showFilterPanel ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={cn(
                  "h-8 relative",
                  isFilterActive && "ring-2 ring-primary/50"
                )}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {isFilterActive && (
                  <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs bg-primary text-primary-foreground rounded-full">
                    {filters.activeFiltersCount}
                  </Badge>
                )}
              </Button>
            )}
            
            {/* View Mode Tabs */}
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm rounded-xl p-1.5 border border-border/30">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = viewMode === tab.key;
                
                return (
                  <Button
                    key={tab.key}
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewModeChange(tab.key)}
                    className={cn(
                      "relative h-8 px-3 py-1.5 rounded-lg transition-all duration-300 border-1.5",
                      "hover:shadow-md hover:scale-105 transform",
                      isActive 
                        ? `${tab.colors.activeBg} ${tab.colors.activeText} ${tab.colors.activeBorder} shadow-md` 
                        : `${tab.colors.bg} ${tab.colors.text} ${tab.colors.border} hover:${tab.colors.activeBg}/20`
                    )}
                    title={tab.description}
                  >
                    <Icon className="w-3.5 h-3.5 mr-1.5" />
                    <span className="font-medium text-xs">{tab.label}</span>
                    
                    {tab.count > 0 && (
                      <Badge 
                        variant="secondary" 
                        className={cn(
                          "ml-1.5 h-4 w-4 p-0 text-xs flex items-center justify-center rounded-full",
                          isActive 
                            ? "bg-white/20 text-white border-white/30" 
                            : "bg-primary/80 text-primary-foreground"
                        )}
                      >
                        {tab.count}
                      </Badge>
                    )}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <BreadcrumbNavigation
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />

      {/* Filter Panel */}
      {showFilterPanel && showFilters && (
        <FilterManager 
          viewMode={viewMode}
          className="animate-in slide-in-from-top duration-200"
        />
      )}
    </div>
  );
};
