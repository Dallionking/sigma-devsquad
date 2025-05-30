
import { Header } from "@/components/dashboard/Header";
import { PlanningCanvasLayout } from "@/components/planning-agent/PlanningCanvasLayout";
import { TouchGestureProvider } from "@/components/settings/TouchGestureProvider";
import { AccessibilityEnhancedSettings } from "@/components/settings/AccessibilityEnhancedSettings";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { mockAgents } from "@/data/mockData";
import { cn } from "@/lib/utils";

const PlanningAgent = () => {
  const isMobile = useIsMobile();
  const { mobileOptimizations } = usePerformanceOptimization();

  return (
    <div className={cn(
      "min-h-screen bg-gradient-to-br from-background via-background to-muted/20",
      mobileOptimizations.enableTouch && "touch-manipulation"
    )}>
      <a 
        href="#main-content" 
        className="sr-only-focusable"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <Header 
        viewMode="workflow" 
        onViewModeChange={() => {}}
        agents={mockAgents}
      />

      <TouchGestureProvider>
        <AccessibilityEnhancedSettings
          title="Planning Agent"
          description="AI-powered project planning and task orchestration"
        >
          <main 
            id="main-content"
            className={cn(
              "h-[calc(100vh-4rem)]",
              isMobile && "mobile-safe-area"
            )}
            role="main"
          >
            <PlanningCanvasLayout />
          </main>
        </AccessibilityEnhancedSettings>
      </TouchGestureProvider>
    </div>
  );
};

export default PlanningAgent;
