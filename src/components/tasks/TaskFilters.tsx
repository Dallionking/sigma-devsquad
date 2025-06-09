import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, Search, X, Save } from "lucide-react";
import { Task, Agent } from "@/types";
import { useTaskFilters } from "@/hooks/useTaskFilters";
import { FilterPresets } from "./filters/FilterPresets";
import { TaskErrorBoundary } from "./shared/ErrorBoundary";

interface TaskFiltersProps {
  tasks: Task[];
  agents: Agent[];
  onFilterChange: (filteredTasks: Task[]) => void;
}

export const TaskFilters = ({ tasks, agents, onFilterChange }: TaskFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { filters, filteredTasks, updateFilter, clearFilters, activeFilterCount } = useTaskFilters(tasks, agents);

  // Mock saved presets
  const savedPresets = [
    { id: "high-priority", name: "High Priority", isStarred: true, filterCount: 2 },
    { id: "my-tasks", name: "My Tasks", isStarred: true, filterCount: 1 }
  ];

  React.useEffect(() => {
    onFilterChange(filteredTasks);
  }, [filteredTasks, onFilterChange]);

  const toggleArrayFilter = (key: 'status' | 'priority' | 'assignedAgent' | 'category', value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilter(key, newArray);
  };

  const getUniqueCategories = (): string[] => {
    const categories = tasks
      .map(task => task.category)
      .filter(Boolean)
      .filter((category, index, arr) => arr.indexOf(category) === index);
    return categories as string[];
  };

  return (
    <TaskErrorBoundary>
      <div className="space-y-3">
        {/* Quick Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
          </Button>

          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Saved Filters */}
        <FilterPresets 
          presets={savedPresets} 
          onPresetClick={(id) => console.log('Apply preset:', id)}
        />

        {/* Expanded Filters */}
        {isExpanded && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Advanced Filters</CardTitle>
                <Button variant="outline" size="sm">
                  <Save className="w-3 h-3 mr-1" />
                  Save
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'in-progress', 'completed', 'blocked'] as const).map((status) => (
                    <Button
                      key={status}
                      variant={filters.status.includes(status) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleArrayFilter('status', status)}
                      className="text-xs h-7"
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <div className="flex flex-wrap gap-2">
                  {(['low', 'medium', 'high', 'critical'] as const).map((priority) => (
                    <Button
                      key={priority}
                      variant={filters.priority.includes(priority) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleArrayFilter('priority', priority)}
                      className="text-xs h-7"
                    >
                      {priority}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Due Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, start: e.target.value })}
                  />
                  <Input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => updateFilter('dateRange', { ...filters.dateRange, end: e.target.value })}
                  />
                </div>
              </div>

              {/* Special Filters */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="overdue"
                    checked={filters.overdue}
                    onCheckedChange={(checked) => updateFilter('overdue', !!checked)}
                  />
                  <label htmlFor="overdue" className="text-sm">Show overdue tasks only</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="unassigned"
                    checked={filters.unassigned}
                    onCheckedChange={(checked) => updateFilter('unassigned', !!checked)}
                  />
                  <label htmlFor="unassigned" className="text-sm">Show unassigned tasks only</label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TaskErrorBoundary>
  );
};
