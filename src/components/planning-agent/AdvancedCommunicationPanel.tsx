
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/pages/Index";
import { CommunicationGraphVisualization } from "./CommunicationGraphVisualization";
import { MessageInspectionTools } from "./MessageInspectionTools";
import { PatternAnalysisDashboard } from "./PatternAnalysisDashboard";
import { CommunicationFilters } from "./CommunicationFilters";
import { HistoricalAnalysis } from "./HistoricalAnalysis";
import { OptimizationSuggestions } from "./OptimizationSuggestions";
import { MessageSquare, TrendingUp, Filter, Search, BarChart, Lightbulb } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState("graph");
  const [filteredMessages, setFilteredMessages] = useState(messages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [messageTypeFilter, setMessageTypeFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("24h");

  // Calculate communication statistics
  const communicationStats = {
    totalMessages: messages.length,
    activeAgents: agents.filter(a => a.status === "working").length,
    responseTime: "1.2s", // Mock average response time
    throughput: `${Math.round(messages.length / 24)}msg/h` // Mock throughput
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Advanced Agent Communication Panel
        </h2>
        <p className="text-muted-foreground">
          Comprehensive analysis and visualization of agent interactions
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
          <TabsTrigger value="graph">
            <MessageSquare className="w-4 h-4 mr-2" />
            Graph
          </TabsTrigger>
          <TabsTrigger value="inspection">
            <Search className="w-4 h-4 mr-2" />
            Inspection
          </TabsTrigger>
          <TabsTrigger value="patterns">
            <BarChart className="w-4 h-4 mr-2" />
            Patterns
          </TabsTrigger>
          <TabsTrigger value="historical">
            <TrendingUp className="w-4 h-4 mr-2" />
            Historical
          </TabsTrigger>
          <TabsTrigger value="optimization">
            <Lightbulb className="w-4 h-4 mr-2" />
            Optimize
          </TabsTrigger>
          <TabsTrigger value="filters">
            <Filter className="w-4 h-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

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

        <TabsContent value="filters" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Advanced Filter Configuration</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Selected Agents</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedAgents.map(agentId => {
                      const agent = agents.find(a => a.id === agentId);
                      return (
                        <Badge key={agentId} variant="secondary">
                          {agent?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Message Types</label>
                  <Badge variant="outline" className="mt-2">
                    {messageTypeFilter === "all" ? "All Types" : messageTypeFilter}
                  </Badge>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Time Range</label>
                <Badge variant="outline" className="ml-2">{timeRange}</Badge>
              </div>
              
              <div>
                <label className="text-sm font-medium">Search Query</label>
                <div className="text-sm text-muted-foreground mt-1">
                  {searchTerm || "No search term applied"}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
