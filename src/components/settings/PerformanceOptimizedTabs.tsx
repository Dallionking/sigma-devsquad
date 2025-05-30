
import { memo, useMemo, Suspense, lazy } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Lazy load setting components for better performance
const LazyGeneralSettings = lazy(() => import("./GeneralSettings").then(m => ({ default: m.GeneralSettings })));
const LazyAPIKeySettings = lazy(() => import("./APIKeySettings").then(m => ({ default: m.APIKeySettings })));
const LazyAppearanceSettings = lazy(() => import("./AppearanceSettings").then(m => ({ default: m.AppearanceSettings })));
const LazyPerformanceSettings = lazy(() => import("./PerformanceSettings").then(m => ({ default: m.PerformanceSettings })));
const LazySecuritySettings = lazy(() => import("./SecuritySettings").then(m => ({ default: m.SecuritySettings })));
const LazyNotificationSettings = lazy(() => import("./NotificationSettings").then(m => ({ default: m.NotificationSettings })));
const LazyBackupSettings = lazy(() => import("./BackupSettings").then(m => ({ default: m.BackupSettings })));

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<any>;
}

interface PerformanceOptimizedTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  searchQuery: string;
  tabs: Tab[];
  settingsProps: any;
}

const TabLoadingSkeleton = memo(() => (
  <div className="space-y-6">
    <Skeleton className="h-8 w-64" />
    <div className="space-y-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  </div>
));

const MemoizedTabContent = memo(({ 
  tabId, 
  component: Component, 
  isActive, 
  ...props 
}: { 
  tabId: string; 
  component: React.ComponentType<any>; 
  isActive: boolean; 
} & any) => {
  const { mobileOptimizations } = usePerformanceOptimization();

  // Only render content for active tab on mobile to save memory
  if (mobileOptimizations.enableTouch && !isActive) {
    return null;
  }

  return (
    <Suspense fallback={<TabLoadingSkeleton />}>
      <Component {...props} />
    </Suspense>
  );
});

export const PerformanceOptimizedTabs = memo(({
  activeTab,
  onTabChange,
  searchQuery,
  tabs,
  settingsProps
}: PerformanceOptimizedTabsProps) => {
  const isMobile = useIsMobile();
  const { debounce, mobileOptimizations } = usePerformanceOptimization();

  // Debounce tab changes to prevent rapid switching performance issues
  const debouncedTabChange = useMemo(
    () => debounce((tab: string) => onTabChange(tab), 150),
    [onTabChange, debounce]
  );

  const visibleTabs = useMemo(() => {
    if (!searchQuery) return tabs;
    
    return tabs.filter(tab => 
      tab.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tabs, searchQuery]);

  return (
    <div className={cn(
      "w-full",
      mobileOptimizations.enableTouch && "touch-manipulation"
    )}>
      <Tabs 
        value={activeTab} 
        onValueChange={debouncedTabChange}
        className="w-full"
      >
        <TabsList className={cn(
          "grid w-full gap-1 bg-muted/50 p-1 rounded-xl h-auto min-h-[44px]",
          isMobile ? "grid-cols-3" : "grid-cols-7",
          "overflow-x-auto scrollbar-thin"
        )}>
          {visibleTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className={cn(
                  "min-h-[40px] px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg",
                  "transition-all duration-200 whitespace-nowrap",
                  "data-[state=active]:bg-background data-[state=active]:shadow-md",
                  "flex items-center justify-center gap-1 sm:gap-2",
                  "focus-visible-enhanced touch-target"
                )}
                aria-label={`${tab.label} settings`}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span className={cn(
                  "truncate",
                  isMobile ? "hidden xs:inline" : "inline"
                )}>
                  {tab.label}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <div className="mt-6 min-h-[400px]">
          {visibleTabs.map((tab) => (
            <TabsContent 
              key={tab.id}
              value={tab.id}
              className={cn(
                "focus:outline-none",
                "animate-in fade-in-0 duration-200"
              )}
              tabIndex={-1}
            >
              <MemoizedTabContent
                tabId={tab.id}
                component={tab.component}
                isActive={activeTab === tab.id}
                searchQuery={searchQuery}
                {...settingsProps}
              />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
});

PerformanceOptimizedTabs.displayName = "PerformanceOptimizedTabs";
