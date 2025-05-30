
import { Header } from "@/components/dashboard/Header";
import { EnhancedAgentCreationFlow } from "@/components/agent-creation/EnhancedAgentCreationFlow";
import { TouchGestureProvider } from "@/components/settings/TouchGestureProvider";
import { AccessibilityEnhancedSettings } from "@/components/settings/AccessibilityEnhancedSettings";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { MobileSettingsHeader } from "@/components/settings/MobileSettingsHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { mockAgents } from "@/data/mockData";
import { cn } from "@/lib/utils";

const AgentCreation = () => {
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

      {!isMobile && (
        <Header 
          viewMode="workflow" 
          onViewModeChange={() => {}}
          agents={mockAgents}
        />
      )}

      {isMobile && (
        <MobileSettingsHeader
          title="Create Agent"
          showBackButton={true}
          onBack={() => window.history.back()}
        />
      )}

      <TouchGestureProvider>
        <AccessibilityEnhancedSettings
          title="Agent Creation"
          description="Create and configure new AI agents for your workflow"
        >
          <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
            <main 
              id="main-content"
              className={cn(
                "space-y-6",
                isMobile && "mobile-safe-area"
              )}
              role="main"
            >
              <EnhancedAgentCreationFlow />
            </main>
          </ResponsiveContainer>
        </AccessibilityEnhancedSettings>
      </TouchGestureProvider>
    </div>
  );
};

export default AgentCreation;
