
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFilters } from '@/contexts/FilterContext';
import { useAgents } from '@/contexts/AgentContext';
import { Search, Filter, X, RotateCcw } from 'lucide-react';
import { ViewMode } from '@/types';
import { cn } from '@/lib/utils';

interface FilterManagerProps {
  viewMode: ViewMode;
  className?: string;
}

export const FilterManager: React.FC<FilterManagerProps> = ({ viewMode, className }) => {
  const { filters, updateFilter, resetAllFilters, isFilterActive } = useFilters();
  const { agents } = useAgents();

  const handleAgentToggle = (agentId: string) => {
    const newSelectedAgents = filters.selectedAgents.includes(agentId)
      ? filters.selectedAgents.filter(id => id !== agentId)
      : [...filters.selectedAgents, agentId];
    updateFilter('selectedAgents', newSelectedAgents);
  };

  const getFilterOptionsForViewMode = () => {
    switch (viewMode) {
      case 'tasks':
        return {
          showTaskStatus: true,
          showPriority: true,
          showMessageTypes: false
        };
      case 'messages':
      case 'communication':
        return {
          showTaskStatus: false,
          showPriority: false,
          showMessageTypes: true
        };
      default:
        return {
          showTaskStatus: true,
          showPriority: true,
          showMessageTypes: true
        };
    }
  };

  const filterOptions = getFilterOptionsForViewMode();

  return (
    <div className={cn("bg-card/50 border-b border-border/30 p-4 space-y-4", className)}>
      {/* Header with filter indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-medium">Filters</h3>
          {isFilterActive && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {filters.activeFiltersCount} active
            </Badge>
          )}
        </div>
        {isFilterActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetAllFilters}
            className="h-8 px-2"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search across all tabs..."
          value={filters.searchQuery}
          onChange={(e) => updateFilter('searchQuery', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Agent Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Agents</label>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
            {agents.map(agent => (
              <Badge
                key={agent.id}
                variant={filters.selectedAgents.includes(agent.id) ? "default" : "outline"}
                className="cursor-pointer text-xs"
                onClick={() => handleAgentToggle(agent.id)}
              >
                {agent.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Task Status Filter */}
        {filterOptions.showTaskStatus && (
          <div>
            <label className="text-sm font-medium mb-2 block">Task Status</label>
            <Select
              value={filters.taskStatuses[0] || "all"}
              onValueChange={(value) => updateFilter('taskStatuses', value === "all" ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Priority Filter */}
        {filterOptions.showPriority && (
          <div>
            <label className="text-sm font-medium mb-2 block">Priority</label>
            <Select
              value={filters.priority[0] || "all"}
              onValueChange={(value) => updateFilter('priority', value === "all" ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Message Type Filter */}
        {filterOptions.showMessageTypes && (
          <div>
            <label className="text-sm font-medium mb-2 block">Message Type</label>
            <Select
              value={filters.messageTypes[0] || "all"}
              onValueChange={(value) => updateFilter('messageTypes', value === "all" ? [] : [value])}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
                <SelectItem value="broadcast">Broadcast</SelectItem>
                <SelectItem value="task_assignment">Task Assignment</SelectItem>
                <SelectItem value="request">Request</SelectItem>
                <SelectItem value="response">Response</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};
