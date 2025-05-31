
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
import { MessageSquare, TrendingUp, Filter, Search, BarChart, Lightbulb, Zap } from "lucide-react";

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

  // Calculate communication statistics
  const communicationMetrics = {
    activeConnections: messages.filter(m => 
      new Date(m.timestamp).getTime() > Date.now() - 5 * 60 * 1000
    ).length,
    bottlenecks: agents.filter(a => a.status === "waiting").length,
    decisionsPending: messages.filter(m => m.type === "request").length,
    interventionsNeeded: agents.filter(a => a.status === "error").length
  };

  const communicationStats = {
    totalMessages: messages.length,
    activeAgents: agents.filter(a => a.status === "working").length,
    responseTime: "1.2s",
    throughput: `${Math.round(messages.length / 24)}msg/h`
  };

  const handleIntervention = (type: string, agentId: string, data: any) => {
    console.log(`Intervention: ${type} for agent ${agentId}`, data);
  };

  // Advanced options for the consolidated menu
  const advancedOptions = [
    {
      id: "realtime-flow",
      label: "Real-time Flow Analysis",
      description: "Monitor live agent communication patterns and message flow with real-time updates",
      icon: Zap,
      action: () => setActiveTab("realtime")
    },
    {
      id: "communication-graph",
      label: "Network Graph View",
      description: "Visualize agent relationships and communication pathways as an interactive network",
      icon: MessageSquare,
      action: () => setActiveTab("graph")
    },
    {
      id: "message-inspection",
      label: "Deep Message Analysis",
      description: "Inspect individual messages with detailed metadata and content analysis",
      icon: Search,
      action: () => setActiveTab("inspection")
    },
    {
      id: "pattern-analysis",
      label: "Pattern Recognition",
      description: "Identify communication patterns, trends, and behavioral insights across agents",
      icon: BarChart,
      action: () => setActiveTab("patterns")
    },
    {
      id: "historical-trends",
      label: "Historical Timeline",
      description: "Analyze communication evolution and performance trends over time",
      icon: TrendingUp,
      action: () => setActiveTab("historical")
    },
    {
      id: "optimization-suite",
      label: "Performance Optimization",
      description: "Get AI-powered suggestions for improving communication efficiency and workflow",
      icon: Lightbulb,
      action: () => setActiveTab("optimization")
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Advanced Agent Communication Panel
        </h2>
        <p className="text-muted-foreground">
          Comprehensive analysis and visualization of agent interactions with AI-powered insights
        </p>
      </div>

      {/* Communication Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{communicationStats.totalMessages}</div>
              <div className="text-sm text-muted-foreground">Total Messages</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <div>
              <div className="text-2xl font-bold">{communicationStats.activeAgents}</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BarChart className="w-4 h-4 text-purple-500" />
            <div>
              <div className="text-2xl font-bold">{communicationStats.responseTime}</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <div>
              <div className="text-2xl font-bold">{communicationStats.throughput}</div>
              <div className="text-sm text-muted-foreground">Throughput</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Communication Tools Header */}
      <CommunicationToolsHeader
        isRealTimeActive={isRealTimeActive}
        onToggleRealTime={() => setIsRealTimeActive(!isRealTimeActive)}
        metrics={communicationMetrics}
      />

      {/* Consolidated Advanced Options */}
      <AdvancedOptionsMenu
        options={advancedOptions}
        onOptionSelect={(optionId) => {
          console.log(`Selected advanced option: ${optionId}`);
        }}
      />

      {/* Advanced Filters */}
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

      {/* Main Analysis Tabs */}
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
