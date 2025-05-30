
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProvidersTab } from "@/components/llm-integration/ProvidersTab";
import { ModelsTab } from "@/components/llm-integration/ModelsTab";
import { TestingTab } from "@/components/llm-integration/TestingTab";
import { UsageTab } from "@/components/llm-integration/UsageTab";
import { TouchGestureProvider } from "@/components/settings/TouchGestureProvider";
import { AccessibilityEnhancedSettings } from "@/components/settings/AccessibilityEnhancedSettings";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { MobileSettingsHeader } from "@/components/settings/MobileSettingsHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { mockAgents } from "@/data/mockData";
import { Brain, Database, TestTube, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const LLMIntegration = () => {
  const [activeTab, setActiveTab] = useState("providers");
  const isMobile = useIsMobile();
  const { mobileOptimizations } = usePerformanceOptimization();

  const handleTabSwipe = (direction: 'left' | 'right') => {
    const tabs = ["providers", "models", "testing", "usage"];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (direction === 'left' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    } else if (direction === 'right' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

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
          title="LLM Integration"
          showBackButton={true}
          onBack={() => window.history.back()}
        />
      )}

      <TouchGestureProvider
        onSwipeLeft={() => handleTabSwipe('left')}
        onSwipeRight={() => handleTabSwipe('right')}
      >
        <AccessibilityEnhancedSettings
          title="LLM Integration"
          description="Configure and manage your Large Language Model integrations"
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
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className={cn(
                  "grid w-full gap-1 bg-muted/50 p-1 rounded-xl h-auto min-h-[44px]",
                  isMobile ? "grid-cols-2" : "grid-cols-4"
                )}>
                  <TabsTrigger 
                    value="providers" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <Brain className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Providers</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="models" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <Database className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Models</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="testing" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <TestTube className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Testing</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="usage" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Usage</span>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="providers" className="space-y-6">
                    <ProvidersTab />
                  </TabsContent>
                  <TabsContent value="models" className="space-y-6">
                    <ModelsTab />
                  </TabsContent>
                  <TabsContent value="testing" className="space-y-6">
                    <TestingTab />
                  </TabsContent>
                  <TabsContent value="usage" className="space-y-6">
                    <UsageTab />
                  </TabsContent>
                </div>
              </Tabs>
            </main>
          </ResponsiveContainer>
        </AccessibilityEnhancedSettings>
      </TouchGestureProvider>
    </div>
  );
};

export default LLMIntegration;
