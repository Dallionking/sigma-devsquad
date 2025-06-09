
import React from 'react';
import { EnhancedBreadcrumb } from "@/components/navigation/EnhancedBreadcrumb";
import { DashboardHeader } from "./DashboardHeader";
import { ViewModeTabs } from "./ViewModeTabs";
import { ViewMode } from "@/types";
import { ResponsiveNavigationWrapper } from "@/components/navigation/ResponsiveNavigationWrapper";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useNavigationShortcuts } from "@/hooks/useNavigationShortcuts";

interface EnhancedMainLayoutProps {
  children: React.ReactNode;
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
  notificationCounts?: {
    workflow: number;
    communication: number;
    tasks: number;
    messages: number;
  };
  showBreadcrumbs?: boolean;
  showHeader?: boolean;
  showViewTabs?: boolean;
  enableNavigationHistory?: boolean;
  enableKeyboardShortcuts?: boolean;
}

export const EnhancedMainLayout = ({ 
  children, 
  viewMode,
  onViewModeChange,
  notificationCounts = { workflow: 0, communication: 0, tasks: 0, messages: 0 },
  showBreadcrumbs = true,
  showHeader = true,
  showViewTabs = false,
  enableNavigationHistory = true,
  enableKeyboardShortcuts = true
}: EnhancedMainLayoutProps) => {
  
  // Initialize standardized navigation patterns
  useNavigationHistory({
    enableKeyboardShortcuts: enableNavigationHistory && enableKeyboardShortcuts
  });
  
  useNavigationShortcuts({
    enabled: enableKeyboardShortcuts
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Standardized Breadcrumb Navigation */}
      {showBreadcrumbs && (
        <ResponsiveNavigationWrapper
          collapsible={false}
          className="w-full"
        >
          <EnhancedBreadcrumb />
        </ResponsiveNavigationWrapper>
      )}
      
      {/* Dashboard Header with unified patterns */}
      {showHeader && (
        <div className="px-6 py-6">
          <DashboardHeader />
        </div>
      )}
      
      {/* View Mode Tabs with standardized responsive behavior */}
      {showViewTabs && viewMode && onViewModeChange && (
        <ResponsiveNavigationWrapper
          collapsible={false}
          className="w-full"
        >
          <ViewModeTabs
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
            notificationCounts={notificationCounts}
          />
        </ResponsiveNavigationWrapper>
      )}
      
      {/* Main Content with standardized layout patterns */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
