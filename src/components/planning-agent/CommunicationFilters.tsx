import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Agent, Message } from "@/types";
import { Search, Filter, X, Calendar } from "lucide-react";

interface CommunicationFiltersProps {
  agents: Agent[];
  messages: Message[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedAgents: string[];
  setSelectedAgents: (agents: string[]) => void;
  messageTypeFilter: string;
  setMessageTypeFilter: (type: string) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  onFilteredMessages: (messages: Message[]) => void;
}

export const CommunicationFilters = ({
  agents,
  messages,
  searchTerm,
  setSearchTerm,
  selectedAgents,
  setSelectedAgents,
  messageTypeFilter,
  setMessageTypeFilter,
  timeRange,
  setTimeRange,
  onFilteredMessages
}: CommunicationFiltersProps) => {

  // Apply filters whenever filter criteria change
  useEffect(() => {
    let filtered = [...messages];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agents.find(a => a.type === message.from)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agents.find(a => a.type === message.to)?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply agent filter
    if (selectedAgents.length > 0) {
      filtered = filtered.filter(message =>
        selectedAgents.includes(message.from) || selectedAgents.includes(message.to)
      );
    }

    // Apply message type filter
    if (messageTypeFilter !== "all") {
      filtered = filtered.filter(message => message.type === messageTypeFilter);
    }

    // Apply time range filter
    const now = new Date();
    const timeRangeHours = {
      "1h": 1,
      "6h": 6,
      "24h": 24,
      "7d": 168,
      "30d": 720,
      "all": Infinity
    }[timeRange] || 24;

    if (timeRangeHours !== Infinity) {
      const cutoffTime = new Date(now.getTime() - timeRangeHours * 60 * 60 * 1000);
      filtered = filtered.filter(message => new Date(message.timestamp) >= cutoffTime);
    }

    onFilteredMessages(filtered);
  }, [searchTerm, selectedAgents, messageTypeFilter, timeRange, messages, agents, onFilteredMessages]);

  const handleAgentToggle = (agentType: string) => {
    setSelectedAgents(
      selectedAgents.includes(agentType)
        ? selectedAgents.filter(a => a !== agentType)
        : [...selectedAgents, agentType]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedAgents([]);
    setMessageTypeFilter("all");
    setTimeRange("24h");
  };

  const hasActiveFilters = searchTerm || selectedAgents.length > 0 || messageTypeFilter !== "all" || timeRange !== "24h";

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Advanced Filters
          </h3>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Search Messages</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search content, agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Message Type Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Message Type</label>
            <Select value={messageTypeFilter} onValueChange={setMessageTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="request">Requests</SelectItem>
                <SelectItem value="response">Responses</SelectItem>
                <SelectItem value="notification">Notifications</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Range Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Time Range</label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="6h">Last 6 Hours</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Summary */}
          <div>
            <label className="text-sm font-medium mb-2 block">Active Filters</label>
            <div className="flex flex-wrap gap-1">
              {hasActiveFilters ? (
                <>
                  {searchTerm && (
                    <Badge variant="secondary" className="text-xs">
                      Search: {searchTerm}
                    </Badge>
                  )}
                  {selectedAgents.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedAgents.length} agent{selectedAgents.length !== 1 ? "s" : ""}
                    </Badge>
                  )}
                  {messageTypeFilter !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      {messageTypeFilter}
                    </Badge>
                  )}
                  {timeRange !== "24h" && (
                    <Badge variant="secondary" className="text-xs">
                      {timeRange}
                    </Badge>
                  )}
                </>
              ) : (
                <span className="text-xs text-muted-foreground">No active filters</span>
              )}
            </div>
          </div>
        </div>

        {/* Agent Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">Filter by Agents</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center space-x-2">
                <Checkbox
                  id={agent.id}
                  checked={selectedAgents.includes(agent.type)}
                  onCheckedChange={() => handleAgentToggle(agent.type)}
                />
                <label
                  htmlFor={agent.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {agent.name}
                </label>
                <div className={`w-2 h-2 rounded-full ${
                  agent.status === "working" ? "bg-green-500" :
                  agent.status === "idle" ? "bg-slate-400" :
                  agent.status === "waiting" ? "bg-yellow-500" :
                  "bg-red-500"
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
