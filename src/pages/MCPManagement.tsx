
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MCPInstallationWizard } from "@/components/mcp/MCPInstallationWizard";
import { TouchGestureProvider } from "@/components/settings/TouchGestureProvider";
import { AccessibilityEnhancedSettings } from "@/components/settings/AccessibilityEnhancedSettings";
import { ResponsiveContainer } from "@/components/layout/ResponsiveContainer";
import { MobileSettingsHeader } from "@/components/settings/MobileSettingsHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { mockAgents } from "@/data/mockData";
import { Package, Settings, Download, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const MCPManagement = () => {
  const [activeTab, setActiveTab] = useState("servers");
  const isMobile = useIsMobile();
  const { mobileOptimizations } = usePerformanceOptimization();

  const handleTabSwipe = (direction: 'left' | 'right') => {
    const tabs = ["servers", "protocols", "installation", "monitoring"];
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
          title="MCP Management"
          showBackButton={true}
          onBack={() => window.history.back()}
        />
      )}

      <TouchGestureProvider
        onSwipeLeft={() => handleTabSwipe('left')}
        onSwipeRight={() => handleTabSwipe('right')}
      >
        <AccessibilityEnhancedSettings
          title="MCP Management"
          description="Manage Model Context Protocol servers and integrations"
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
                    value="servers" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Servers</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="protocols" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Protocols</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="installation" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Install</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="monitoring" 
                    className="min-h-[40px] touch-target flex items-center gap-2"
                  >
                    <Activity className="w-4 h-4" />
                    <span className={cn(isMobile && "text-xs")}>Monitor</span>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="servers" className="space-y-6">
                    <div className="text-center py-12">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">MCP Servers</h3>
                      <p className="text-muted-foreground">Manage your MCP server instances</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="protocols" className="space-y-6">
                    <div className="text-center py-12">
                      <Settings className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Protocol Configuration</h3>
                      <p className="text-muted-foreground">Configure MCP protocol settings</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="installation" className="space-y-6">
                    <MCPInstallationWizard />
                  </TabsContent>
                  <TabsContent value="monitoring" className="space-y-6">
                    <div className="text-center py-12">
                      <Activity className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Server Monitoring</h3>
                      <p className="text-muted-foreground">Monitor MCP server performance</p>
                    </div>
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

export default MCPManagement;
