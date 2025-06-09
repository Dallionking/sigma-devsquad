
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Agent, Message } from "@/types";
import { Search, Filter, X } from "lucide-react";

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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const applyFilters = () => {
    let filtered = [...messages];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Agent filter
    if (selectedAgents.length > 0) {
      filtered = filtered.filter(m => 
        selectedAgents.includes(m.from) || selectedAgents.includes(m.to)
      );
    }

    // Message type filter
    if (messageTypeFilter !== "all") {
      filtered = filtered.filter(m => m.type === messageTypeFilter);
    }

    // Time range filter
    const now = new Date();
    const timeRangeMs = {
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000
    }[timeRange];

    if (timeRangeMs) {
      filtered = filtered.filter(m => 
        new Date(m.timestamp).getTime() > now.getTime() - timeRangeMs
      );
    }

    onFilteredMessages(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAgents([]);
    setMessageTypeFilter("all");
    setTimeRange("24h");
    onFilteredMessages(messages);
  };

  const toggleAgentFilter = (agentId: string) => {
    if (selectedAgents.includes(agentId)) {
      setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    } else {
      setSelectedAgents([...selectedAgents, agentId]);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Communication Filters</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvancedFilters ? "Simple" : "Advanced"}
          </Button>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Basic Filters */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Message Type</label>
            <Select value={messageTypeFilter} onValueChange={setMessageTypeFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="broadcast">Broadcast</SelectItem>
                <SelectItem value="request">Request</SelectItem>
                <SelectItem value="response">Response</SelectItem>
                <SelectItem value="task_assignment">Task Assignment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Time Range</label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">Last Hour</SelectItem>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Agents</label>
              <div className="flex flex-wrap gap-2">
                {agents.map(agent => (
                  <Badge
                    key={agent.id}
                    variant={selectedAgents.includes(agent.type) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleAgentFilter(agent.type)}
                  >
                    {agent.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Apply Filters */}
        <Button onClick={applyFilters} className="w-full">
          Apply Filters ({messages.length} messages)
        </Button>
      </div>
    </Card>
  );
};
