
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
import { Agent } from "@/types";
import { BarChart, TrendingUp, Users, Settings, Layout } from "lucide-react";

interface AnalyticsDashboardProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const AnalyticsDashboard = ({ agents, onAgentSelect }: AnalyticsDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isCustomizing, setIsCustomizing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-2xl">Analytics Dashboard</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Monitor performance, productivity, and system health
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                <TrendingUp className="w-3 h-3 mr-1" />
                Live Data
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsCustomizing(!isCustomizing)}
                className="flex items-center gap-2"
              >
                <Layout className="w-4 h-4" />
                {isCustomizing ? "Done" : "Customize"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
        </CardContent>
      </Card>

      {/* Customizable Layout Toggle */}
      {isCustomizing && (
        <CustomizableLayout onLayoutChange={() => setIsCustomizing(false)} />
      )}

      {/* Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Productivity
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Communication
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <MetricsOverview agents={agents} onAgentSelect={onAgentSelect} />
        </TabsContent>

        <TabsContent value="productivity" className="mt-6">
          <ProductivityCharts agents={agents} />
        </TabsContent>

        <TabsContent value="communication" className="mt-6">
          <CommunicationAnalytics agents={agents} />
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <SystemPerformanceMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
