
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent, Message } from "@/types";
import { PlayCircle, PauseCircle, StopCircle, AlertTriangle, Clock, Filter } from "lucide-react";
import { RealTimeCommunicationGraph } from "./RealTimeCommunicationGraph";
import { DecisionPointsVisualizer } from "./DecisionPointsVisualizer";
import { BottleneckHeatMap } from "./BottleneckHeatMap";
import { InterventionControls } from "./InterventionControls";
import { HistoricalTimelineView } from "./HistoricalTimelineView";

interface AdvancedCommunicationVisualizationProps {
  agents: Agent[];
  messages: Message[];
  onIntervention: (type: string, agentId: string, data: any) => void;
}

export const AdvancedCommunicationVisualization = ({
  agents,
  messages,
  onIntervention
}: AdvancedCommunicationVisualizationProps) => {
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState("1h");
  const [filterSettings, setFilterSettings] = useState({
    messageTypes: ["all"],
    agentTypes: ["all"],
    severityLevels: ["all"]
  });
  
  // Calculate real-time metrics
  const realtimeMetrics = {
    activeConnections: messages.filter(m => 
      new Date(m.timestamp).getTime() > Date.now() - 5 * 60 * 1000
    ).length,
    bottlenecks: agents.filter(a => a.status === "waiting").length,
    decisionsPending: messages.filter(m => m.type === "request").length,
    interventionsNeeded: agents.filter(a => a.status === "error").length
  };

  return (
    <div className="space-y-6">
      {/* Control Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Advanced Communication Visualization</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={isRealTimeActive ? "default" : "outline"}
                size="sm"
                onClick={() => setIsRealTimeActive(!isRealTimeActive)}
              >
                {isRealTimeActive ? <PauseCircle className="w-4 h-4 mr-1" /> : <PlayCircle className="w-4 h-4 mr-1" />}
                {isRealTimeActive ? "Pause" : "Resume"} Real-time
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Real-time Status Indicators */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium">{realtimeMetrics.activeConnections}</span>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3 text-yellow-500" />
                <span className="text-sm font-medium">{realtimeMetrics.bottlenecks}</span>
                <span className="text-xs text-muted-foreground">Bottlenecks</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-blue-500" />
                <span className="text-sm font-medium">{realtimeMetrics.decisionsPending}</span>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              
              {realtimeMetrics.interventionsNeeded > 0 && (
                <Badge variant="destructive" className="animate-pulse">
                  {realtimeMetrics.interventionsNeeded} Interventions Needed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Main Visualization Tabs */}
      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="realtime">Real-time Flow</TabsTrigger>
          <TabsTrigger value="decisions">Decision Points</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottleneck Analysis</TabsTrigger>
          <TabsTrigger value="interventions">Intervention Center</TabsTrigger>
          <TabsTrigger value="historical">Historical Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <RealTimeCommunicationGraph
            agents={agents}
            messages={messages}
            isActive={isRealTimeActive}
            filterSettings={filterSettings}
          />
        </TabsContent>

        <TabsContent value="decisions" className="space-y-4">
          <DecisionPointsVisualizer
            agents={agents}
            messages={messages}
            onIntervention={onIntervention}
          />
        </TabsContent>

        <TabsContent value="bottlenecks" className="space-y-4">
          <BottleneckHeatMap
            agents={agents}
            messages={messages}
            timeRange={selectedTimeRange}
          />
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <InterventionControls
            agents={agents}
            messages={messages}
            onIntervention={onIntervention}
          />
        </TabsContent>

        <TabsContent value="historical" className="space-y-4">
          <HistoricalTimelineView
            agents={agents}
            messages={messages}
            timeRange={selectedTimeRange}
            onTimeRangeChange={setSelectedTimeRange}
            filterSettings={filterSettings}
            onFilterChange={setFilterSettings}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
