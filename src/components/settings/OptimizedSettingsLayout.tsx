
import { ReactNode, Suspense } from "react";
import { Header } from "@/components/dashboard/Header";
import { SettingsHeader } from "./SettingsHeader";
import { AdvancedSearchBar } from "./AdvancedSearchBar";
import { MobileSettingsHeader } from "./MobileSettingsHeader";
import { TouchGestureProvider } from "./TouchGestureProvider";
import { AccessibilityEnhancedSettings } from "./AccessibilityEnhancedSettings";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { Agent } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface OptimizedSettingsLayoutProps {
  children: ReactNode;
  searchQuery: string;
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const LayoutSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-8 w-64" />
    <div className="space-y-4">
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

export const OptimizedSettingsLayout = ({
  children,
  searchQuery,
  onSearch,
  onFilterChange,
  activeTab,
  onTabChange,
}: OptimizedSettingsLayoutProps) => {
  const isMobile = useIsMobile();
  const { mobileOptimizations, preloadResource } = usePerformanceOptimization();

  // Mock agents data - in a real app this would come from context/props
  const mockAgents: Agent[] = [
    { 
      id: "1", 
      type: "planning", 
      name: "Planning Agent", 
      status: "working", 
      currentTask: "Active", 
      progress: 75, 
      lastActive: "2024-05-30T10:30:00Z",
      capabilities: ["requirement-analysis", "project-planning"],
      specialization: "Project Planning",
      background: "Expert in project planning and requirements analysis",
      description: "Analyzes requirements and creates project roadmaps"
    },
    { 
      id: "2", 
      type: "frontend", 
      name: "Frontend Agent", 
      status: "idle", 
      currentTask: "Idle", 
      progress: 0, 
      lastActive: "2024-05-30T10:25:00Z",
      capabilities: ["react-development", "ui-design"],
      specialization: "Frontend Development",
      background: "Expert in React and modern frontend technologies",
      description: "Builds user interfaces and client-side functionality"
    }
  ];

  const handleTabSwipe = (direction: 'left' | 'right') => {
    if (!onTabChange || !activeTab) return;

    const tabs = ["general", "api-keys", "appearance", "performance", "security", "notifications", "backup"];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (direction === 'left' && currentIndex < tabs.length - 1) {
      onTabChange(tabs[currentIndex + 1]);
    } else if (direction === 'right' && currentIndex > 0) {
      onTabChange(tabs[currentIndex - 1]);
    }
  };

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-background via-background to-muted/20",
      mobileOptimizations.enableTouch && "touch-manipulation"
    )}>
      <Suspense fallback={<LayoutSkeleton />}>
        {/* Skip navigation link */}
        <a 
          href="#main-content" 
          className="sr-only-focusable"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        {/* Desktop header */}
        {!isMobile && (
          <Header 
            viewMode="workflow" 
            onViewModeChange={() => {}}
            agents={mockAgents}
          />
        )}

        {/* Mobile header */}
        {isMobile && (
          <MobileSettingsHeader
            title="Settings"
            onSearch={() => {
              // Focus search input or show search modal
              const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
              searchInput?.focus();
            }}
          />
        )}
        
        <div className="bg-background text-foreground">
          <div className={cn(
            "container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            isMobile ? "py-4" : "py-6 sm:py-8 lg:py-12"
          )}>
            <TouchGestureProvider
              onSwipeLeft={() => handleTabSwipe('left')}
              onSwipeRight={() => handleTabSwipe('right')}
            >
              <AccessibilityEnhancedSettings
                title="Settings Configuration"
                description="Customize your application preferences and behavior"
              >
                <main 
                  id="main-content" 
                  className="space-y-6 sm:space-y-8"
                  role="main"
                  aria-label="Settings Configuration"
                >
                  {/* Desktop settings header */}
                  {!isMobile && (
                    <div className="fade-in">
                      <SettingsHeader />
                    </div>
                  )}

                  {/* Search bar */}
                  <div className="fade-in" style={{ animationDelay: "100ms" }}>
                    <AdvancedSearchBar 
                      onSearch={onSearch}
                      onFilterChange={onFilterChange}
                      placeholder="Search settings... (Press Escape to clear)"
                      categories={["General", "Security", "API", "Performance", "Appearance", "Notifications", "Backup"]}
                      className="max-w-2xl"
                    />
                  </div>

                  {/* Settings content */}
                  <div className="fade-in" style={{ animationDelay: "200ms" }}>
                    {children}
                  </div>
                </main>
              </AccessibilityEnhancedSettings>
            </TouchGestureProvider>
          </div>
        </div>
      </Suspense>
    </div>
  );
};
