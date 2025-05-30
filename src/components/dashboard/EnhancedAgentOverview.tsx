
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, AgentType, AgentStatus } from "@/types";
import { Bot, Search, Filter, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedAgentOverviewProps {
  agents: Agent[];
  onAgentSelect: (agent: Agent | null) => void;
}

export const EnhancedAgentOverview = ({ agents, onAgentSelect }: EnhancedAgentOverviewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AgentStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<AgentType | "all">("all");

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.currentTask.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
    const matchesType = typeFilter === "all" || agent.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusCounts = {
    working: agents.filter(a => a.status === "working").length,
    idle: agents.filter(a => a.status === "idle").length,
    waiting: agents.filter(a => a.status === "waiting").length,
    error: agents.filter(a => a.status === "error").length
  };

  const statusColors = {
    working: "bg-green-500",
    idle: "bg-muted-foreground",
    waiting: "bg-yellow-500",
    error: "bg-red-500"
  };

  const statusLabels = {
    working: "Working",
    idle: "Idle", 
    waiting: "Waiting",
    error: "Error"
  };

  const handleAddAgent = () => {
    // TODO: Implement add agent functionality
    console.log("Add new agent");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>Agent Overview</span>
          </CardTitle>
          <Button onClick={handleAddAgent} className="flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Add Agent</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Summary */}
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="text-center p-2 border rounded">
              <div className={cn("w-3 h-3 rounded-full mx-auto mb-1", statusColors[status as AgentStatus])} />
              <div className="text-xl font-bold">{count}</div>
              <div className="text-xs text-muted-foreground capitalize">{status}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as AgentStatus | "all")}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="working">Working</SelectItem>
              <SelectItem value="idle">Idle</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as AgentType | "all")}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="frontend">Frontend</SelectItem>
              <SelectItem value="backend">Backend</SelectItem>
              <SelectItem value="qa">QA</SelectItem>
              <SelectItem value="documentation">Documentation</SelectItem>
              <SelectItem value="devops">DevOps</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Agent List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredAgents.map((agent) => (
            <div
              key={agent.id}
              className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
              onClick={() => onAgentSelect(agent)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={cn("w-2 h-2 rounded-full", statusColors[agent.status])} />
                  <span className="font-medium text-sm">{agent.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {agent.type}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2 line-clamp-1">
                {agent.currentTask}
              </div>
              {agent.status === "working" && (
                <div className="flex items-center space-x-2">
                  <Progress value={agent.progress} className="flex-1 h-1" />
                  <span className="text-xs text-muted-foreground">{agent.progress}%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Filter className="w-8 h-8 mx-auto mb-2" />
            <p>No agents match your filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
