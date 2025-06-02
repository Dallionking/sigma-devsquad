
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Filter, 
  Search, 
  X, 
  Save,
  Star,
  Calendar,
  User,
  Flag,
  Tag
} from "lucide-react";
import { Task, Agent } from "@/types";

interface TaskFiltersProps {
  tasks: Task[];
  agents: Agent[];
  onFilterChange: (filteredTasks: Task[]) => void;
}

interface FilterState {
  search: string;
  status: string[];
  priority: string[];
  assignedAgent: string[];
  category: string[];
  dateRange: {
    start: string;
    end: string;
  };
  overdue: boolean;
  unassigned: boolean;
}

interface SavedFilter {
  id: string;
  name: string;
  filters: FilterState;
  isStarred: boolean;
}

export const TaskFilters = ({ tasks, agents, onFilterChange }: TaskFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    search: "",
    status: [],
    priority: [],
    assignedAgent: [],
    category: [],
    dateRange: { start: "", end: "" },
    overdue: false,
    unassigned: false
  });
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([
    {
      id: "high-priority",
      name: "High Priority Tasks",
      filters: {
        search: "",
        status: [],
        priority: ["high", "critical"],
        assignedAgent: [],
        category: [],
        dateRange: { start: "", end: "" },
        overdue: false,
        unassigned: false
      },
      isStarred: true
    },
    {
      id: "my-tasks",
      name: "My Open Tasks",
      filters: {
        search: "",
        status: ["pending", "in-progress"],
        priority: [],
        assignedAgent: [],
        category: [],
        dateRange: { start: "", end: "" },
        overdue: false,
        unassigned: false
      },
      isStarred: false
    }
  ]);

  const getUniqueCategories = () => {
    const categories = tasks
      .map(task => task.category)
      .filter(Boolean)
      .filter((category, index, arr) => arr.indexOf(category) === index);
    return categories as string[];
  };

  const applyFilters = (filters: FilterState) => {
    let filtered = [...tasks];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description?.toLowerCase().includes(searchLower) ||
        task.assignedAgent?.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(task => filters.status.includes(task.status));
    }

    // Priority filter
    if (filters.priority.length > 0) {
      filtered = filtered.filter(task => filters.priority.includes(task.priority));
    }

    // Assigned agent filter
    if (filters.assignedAgent.length > 0) {
      filtered = filtered.filter(task => 
        task.assignedAgent && filters.assignedAgent.includes(task.assignedAgent)
      );
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter(task => 
        task.category && filters.category.includes(task.category)
      );
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const taskDate = new Date(task.dueDate);
        const start = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const end = filters.dateRange.end ? new Date(filters.dateRange.end) : null;
        
        if (start && taskDate < start) return false;
        if (end && taskDate > end) return false;
        return true;
      });
    }

    // Overdue filter
    if (filters.overdue) {
      const now = new Date();
      filtered = filtered.filter(task => 
        task.dueDate && new Date(task.dueDate) < now && task.status !== 'completed'
      );
    }

    // Unassigned filter
    if (filters.unassigned) {
      filtered = filtered.filter(task => !task.assignedAgent);
    }

    onFilterChange(filtered);
  };

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    applyFilters(newFilters);
  };

  const toggleArrayFilter = (key: 'status' | 'priority' | 'assignedAgent' | 'category', value: string) => {
    const currentArray = activeFilters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    updateFilter(key, newArray);
  };

  const clearAllFilters = () => {
    const emptyFilters: FilterState = {
      search: "",
      status: [],
      priority: [],
      assignedAgent: [],
      category: [],
      dateRange: { start: "", end: "" },
      overdue: false,
      unassigned: false
    };
    setActiveFilters(emptyFilters);
    applyFilters(emptyFilters);
  };

  const applySavedFilter = (savedFilter: SavedFilter) => {
    setActiveFilters(savedFilter.filters);
    applyFilters(savedFilter.filters);
  };

  const saveCurrentFilter = () => {
    const name = prompt("Enter filter name:");
    if (name) {
      const newFilter: SavedFilter = {
        id: Date.now().toString(),
        name,
        filters: activeFilters,
        isStarred: false
      };
      setSavedFilters(prev => [...prev, newFilter]);
    }
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.search) count++;
    count += activeFilters.status.length;
    count += activeFilters.priority.length;
    count += activeFilters.assignedAgent.length;
    count += activeFilters.category.length;
    if (activeFilters.dateRange.start || activeFilters.dateRange.end) count++;
    if (activeFilters.overdue) count++;
    if (activeFilters.unassigned) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="space-y-3">
      {/* Quick Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={activeFilters.search}
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
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Saved Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {savedFilters.filter(f => f.isStarred).map((filter) => (
          <Button
            key={filter.id}
            variant="outline"
            size="sm"
            onClick={() => applySavedFilter(filter)}
            className="text-xs h-7"
          >
            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
            {filter.name}
          </Button>
        ))}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Advanced Filters</CardTitle>
              <Button variant="outline" size="sm" onClick={saveCurrentFilter}>
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
                {['pending', 'in-progress', 'completed', 'blocked'].map((status) => (
                  <Button
                    key={status}
                    variant={activeFilters.status.includes(status) ? 'default' : 'outline'}
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
                {['low', 'medium', 'high', 'critical'].map((priority) => (
                  <Button
                    key={priority}
                    variant={activeFilters.priority.includes(priority) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleArrayFilter('priority', priority)}
                    className="text-xs h-7"
                  >
                    <Flag className="w-3 h-3 mr-1" />
                    {priority}
                  </Button>
                ))}
              </div>
            </div>

            {/* Agent Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Assigned Agent</label>
              <div className="flex flex-wrap gap-2">
                {agents.map((agent) => (
                  <Button
                    key={agent.id}
                    variant={activeFilters.assignedAgent.includes(agent.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleArrayFilter('assignedAgent', agent.id)}
                    className="text-xs h-7"
                  >
                    <User className="w-3 h-3 mr-1" />
                    {agent.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {getUniqueCategories().map((category) => (
                  <Button
                    key={category}
                    variant={activeFilters.category.includes(category) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleArrayFilter('category', category)}
                    className="text-xs h-7"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {category}
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
                  value={activeFilters.dateRange.start}
                  onChange={(e) => updateFilter('dateRange', { ...activeFilters.dateRange, start: e.target.value })}
                />
                <Input
                  type="date"
                  value={activeFilters.dateRange.end}
                  onChange={(e) => updateFilter('dateRange', { ...activeFilters.dateRange, end: e.target.value })}
                />
              </div>
            </div>

            {/* Special Filters */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="overdue"
                  checked={activeFilters.overdue}
                  onCheckedChange={(checked) => updateFilter('overdue', checked)}
                />
                <label htmlFor="overdue" className="text-sm">Show overdue tasks only</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unassigned"
                  checked={activeFilters.unassigned}
                  onCheckedChange={(checked) => updateFilter('unassigned', checked)}
                />
                <label htmlFor="unassigned" className="text-sm">Show unassigned tasks only</label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
