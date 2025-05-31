
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricsOverview } from "./MetricsOverview";
import { ProductivityCharts } from "./ProductivityCharts";
import { CommunicationAnalytics } from "./CommunicationAnalytics";
import { SystemPerformanceMetrics } from "./SystemPerformanceMetrics";
import { CustomizableLayout } from "./CustomizableLayout";
import { CollapsibleSection, CollapsibleCard } from "@/components/layout/CollapsibleSection";
import { OptimizedStack, OptimizedRow } from "@/components/layout/SpaceOptimizedContainer";
import { Agent } from "@/types";
import { BarChart, TrendingUp, Users, Settings, Layout, Minimize2 } from "lucide-react";
import { useSpaceOptimization } from "@/hooks/useSpaceOptimization";

interface AnalyticsDashboardProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const AnalyticsDashboard = ({ agents, onAgentSelect }: AnalyticsDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const { getCardPadding, getSectionSpacing, isMobile } = useSpaceOptimization();

  return (
    <OptimizedStack gap="sm" className={getSectionSpacing()}>
      {/* Analytics Header - Collapsible */}
      <CollapsibleCard
        title="Analytics Dashboard"
        defaultOpen={!compactMode}
        badge="Live Data"
        icon={<BarChart className="w-5 h-5 text-primary" />}
      >
        <OptimizedRow gap="sm" className="justify-between">
          <p className="text-muted-foreground flex-1">
            Monitor performance, productivity, and system health
          </p>
          <OptimizedRow gap="xs">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setCompactMode(!compactMode)}
              className="flex items-center gap-2"
            >
              <Minimize2 className="w-4 h-4" />
              {compactMode ? "Expand" : "Compact"}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsCustomizing(!isCustomizing)}
              className="flex items-center gap-2"
            >
              <Layout className="w-4 h-4" />
              {isCustomizing ? "Done" : "Customize"}
            </Button>
          </OptimizedRow>
        </OptimizedRow>
      </CollapsibleCard>

      {/* Customizable Layout Toggle - Collapsible */}
      {isCustomizing && (
        <CollapsibleSection
          title="Layout Customization"
          defaultOpen={true}
          variant="compact"
          icon={<Settings className="w-4 h-4" />}
        >
          <CustomizableLayout onLayoutChange={() => setIsCustomizing(false)} />
        </CollapsibleSection>
      )}

      {/* Analytics Tabs - Optimized for space */}
      <Card className={isMobile ? "p-2" : undefined}>
        <CardContent className={getCardPadding()}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-1`}>
              <TabsTrigger value="overview" className="flex items-center gap-1 text-xs sm:text-sm">
                <BarChart className="w-3 h-3 sm:w-4 sm:h-4" />
                {!isMobile && "Overview"}
              </TabsTrigger>
              <TabsTrigger value="productivity" className="flex items-center gap-1 text-xs sm:text-sm">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                {!isMobile && "Productivity"}
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="communication" className="flex items-center gap-1 text-xs sm:text-sm">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    Communication
                  </TabsTrigger>
                  <TabsTrigger value="system" className="flex items-center gap-1 text-xs sm:text-sm">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                    System
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            {/* Mobile additional tabs as collapsible sections */}
            {isMobile && (
              <OptimizedStack gap="xs" className="mt-3">
                <CollapsibleSection
                  title="Communication Analytics"
                  defaultOpen={activeTab === "communication"}
                  variant="minimal"
                  icon={<Users className="w-4 h-4" />}
                >
                  <CommunicationAnalytics agents={agents} />
                </CollapsibleSection>
                <CollapsibleSection
                  title="System Performance"
                  defaultOpen={activeTab === "system"}
                  variant="minimal"
                  icon={<Settings className="w-4 h-4" />}
                >
                  <SystemPerformanceMetrics />
                </CollapsibleSection>
              </OptimizedStack>
            )}

            <div className="mt-4">
              <TabsContent value="overview">
                <MetricsOverview agents={agents} onAgentSelect={onAgentSelect} />
              </TabsContent>

              <TabsContent value="productivity">
                <ProductivityCharts agents={agents} />
              </TabsContent>

              {!isMobile && (
                <>
                  <TabsContent value="communication">
                    <CommunicationAnalytics agents={agents} />
                  </TabsContent>

                  <TabsContent value="system">
                    <SystemPerformanceMetrics />
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </OptimizedStack>
  );
};
