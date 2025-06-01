
import React from 'react';
import { EnhancedBreadcrumb } from "@/components/navigation/EnhancedBreadcrumb";
import { DashboardHeader } from "./DashboardHeader";
import { ViewModeTabs } from "./ViewModeTabs";
import { ViewMode } from "@/types";

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
}

export const EnhancedMainLayout = ({ 
  children, 
  viewMode,
  onViewModeChange,
  notificationCounts = { workflow: 0, communication: 0, tasks: 0, messages: 0 },
  showBreadcrumbs = true,
  showHeader = true,
  showViewTabs = false
}: EnhancedMainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      {showBreadcrumbs && <EnhancedBreadcrumb />}
      
      {/* Dashboard Header */}
      {showHeader && (
        <div className="px-6 py-6">
          <DashboardHeader />
        </div>
      )}
      
      {/* View Mode Tabs (optional) */}
      {showViewTabs && viewMode && onViewModeChange && (
        <ViewModeTabs
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          notificationCounts={notificationCounts}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
