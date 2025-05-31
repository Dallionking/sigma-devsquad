
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { AdvancedCommunicationVisualization } from "./AdvancedCommunicationVisualization";
import { CommunicationGraphVisualization } from "./CommunicationGraphVisualization";
import { MessageInspectionTools } from "./MessageInspectionTools";
import { PatternAnalysisDashboard } from "./PatternAnalysisDashboard";
import { CommunicationFilters } from "./CommunicationFilters";
import { HistoricalAnalysis } from "./HistoricalAnalysis";
import { OptimizationSuggestions } from "./OptimizationSuggestions";
import { CommunicationToolsHeader } from "./communication/CommunicationToolsHeader";
import { AdvancedOptionsMenu } from "./communication/AdvancedOptionsMenu";
import { MessageSquare, TrendingUp, Filter, Search, BarChart, Lightbulb, Zap, Activity, Network } from "lucide-react";

interface AdvancedCommunicationPanelProps {
  agents: Agent[];
  messages: Message[];
  selectedMessage: Message | null;
  onMessageSelect: (message: Message | null) => void;
}

export const AdvancedCommunicationPanel = ({
  agents,
  messages,
  selectedMessage,
  onMessageSelect
}: AdvancedCommunicationPanelProps) => {
  const [activeTab, setActiveTab] = useState("realtime");
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [messageTypeFilter, setMessageTypeFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("24h");
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);

  // Calculate advanced communication metrics
  const communicationMetrics = {
    activeConnections: messages.filter(m => 
      new Date(m.timestamp).getTime() > Date.now() - 5 * 60 * 1000
    ).length,
    bottlenecks: agents.filter(a => a.status === "waiting").length,
    decisionsPending: messages.filter(m => m.type === "request").length,
    interventionsNeeded: agents.filter(a => a.status === "error").length
  };

  const advancedStats = {
    totalCommunications: messages.length,
    activeAgents: agents.filter(a => a.status === "working").length,
    avgResponseTime: "1.2s",
    throughputRate: `${Math.round(messages.length / 24)}msg/h`,
    systemEfficiency: "92.3%",
    networkHealth: "Excellent"
  };

  const handleIntervention = (type: string, agentId: string, data: any) => {
    console.log(`Advanced intervention: ${type} for agent ${agentId}`, data);
  };

  // Advanced analysis tools and options
  const advancedAnalysisTools = [
    {
      id: "realtime-monitoring",
      label: "Real-time Network Monitoring",
      description: "Monitor live communication flows, network topology, and performance metrics with advanced filtering",
      icon: Activity,
      action: () => setActiveTab("realtime")
    },
    {
      id: "network-topology",
      label: "Dynamic Network Topology",
      description: "Interactive visualization of agent relationships and communication pathways with clustering analysis",
      icon: Network,
      action: () => setActiveTab("graph")
    },
    {
      id: "message-forensics",
      label: "Message Forensics & Deep Analysis",
      description: "Detailed inspection of message content, metadata, routing, and communication patterns",
      icon: Search,
      action: () => setActiveTab("inspection")
    },
    {
      id: "pattern-discovery",
      label: "AI-Powered Pattern Discovery",
      description: "Machine learning-based pattern recognition, anomaly detection, and behavioral analysis",
      icon: BarChart,
      action: () => setActiveTab("patterns")
    },
    {
      id: "historical-analytics",
      label: "Historical Communication Analytics",
      description: "Time-series analysis, trend identification, and performance evolution tracking",
      icon: TrendingUp,
      action: () => setActiveTab("historical")
    },
    {
      id: "optimization-engine",
      label: "Performance Optimization Engine",
      description: "AI-driven recommendations for improving communication efficiency and system performance",
      icon: Lightbulb,
      action: () => setActiveTab("optimization")
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Advanced Communication Analysis & Monitoring
        </h2>
        <p className="text-muted-foreground">
          Professional-grade tools for deep communication analysis, network monitoring, and performance optimization
        </p>
      </div>

      {/* Advanced System Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-xl font-bold">{advancedStats.totalCommunications}</div>
              <div className="text-xs text-muted-foreground">Total Communications</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-green-500" />
            <div>
              <div className="text-xl font-bold">{advancedStats.activeAgents}</div>
              <div className="text-xs text-muted-foreground">Active Agents</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-purple-500" />
            <div>
              <div className="text-xl font-bold">{advancedStats.avgResponseTime}</div>
              <div className="text-xs text-muted-foreground">Response Time</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-yellow-500" />
            <div>
              <div className="text-xl font-bold">{advancedStats.throughputRate}</div>
              <div className="text-xs text-muted-foreground">Throughput</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BarChart className="w-4 h-4 text-orange-500" />
            <div>
              <div className="text-xl font-bold">{advancedStats.systemEfficiency}</div>
              <div className="text-xs text-muted-foreground">Efficiency</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Network className="w-4 h-4 text-cyan-500" />
            <div>
              <div className="text-xl font-bold text-green-600">{advancedStats.networkHealth}</div>
              <div className="text-xs text-muted-foreground">Network Health</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Communication Monitoring Header */}
      <CommunicationToolsHeader
        isRealTimeActive={isRealTimeActive}
        onToggleRealTime={() => setIsRealTimeActive(!isRealTimeActive)}
        metrics={communicationMetrics}
      />

      {/* Advanced Analysis Tools Menu */}
      <AdvancedOptionsMenu
        options={advancedAnalysisTools}
        onOptionSelect={(optionId) => {
          console.log(`Selected advanced analysis tool: ${optionId}`);
        }}
      />

      {/* Advanced Communication Filters */}
      <CommunicationFilters
        agents={agents}
        messages={messages}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedAgents={selectedAgents}
        setSelectedAgents={setSelectedAgents}
        messageTypeFilter={messageTypeFilter}
        setMessageTypeFilter={setMessageTypeFilter}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        onFilteredMessages={setFilteredMessages}
      />

      {/* Advanced Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
          <TabsTrigger value="graph">Network</TabsTrigger>
          <TabsTrigger value="inspection">Analysis</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="historical">Timeline</TabsTrigger>
          <TabsTrigger value="optimization">Optimize</TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-4">
          <AdvancedCommunicationVisualization
            agents={agents}
            messages={filteredMessages}
            onIntervention={handleIntervention}
          />
        </TabsContent>

        <TabsContent value="graph" className="space-y-4">
          <CommunicationGraphVisualization
            agents={agents}
            messages={filteredMessages}
            selectedMessage={selectedMessage}
            onMessageSelect={onMessageSelect}
          />
        </TabsContent>

        <TabsContent value="inspection" className="space-y-4">
          <MessageInspectionTools
            messages={filteredMessages}
            agents={agents}
            selectedMessage={selectedMessage}
            onMessageSelect={onMessageSelect}
          />
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <PatternAnalysisDashboard
            messages={filteredMessages}
            agents={agents}
          />
        </TabsContent>

        <TabsContent value="historical" className="space-y-4">
          <HistoricalAnalysis
            messages={filteredMessages}
            agents={agents}
            timeRange={timeRange}
          />
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <OptimizationSuggestions
            messages={filteredMessages}
            agents={agents}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
