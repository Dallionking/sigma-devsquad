
import { useState, useMemo, useCallback } from 'react';
import { Task, Agent } from '@/types';

interface FilterState {
  search: string;
  status: Task['status'][];
  priority: Task['priority'][];
  assignedAgent: string[];
  category: string[];
  dateRange: {
    start: string;
    end: string;
  };
  overdue: boolean;
  unassigned: boolean;
}

const defaultFilters: FilterState = {
  search: "",
  status: [],
  priority: [],
  assignedAgent: [],
  category: [],
  dateRange: { start: "", end: "" },
  overdue: false,
  unassigned: false
};

export const useTaskFilters = (tasks: Task[], agents: Agent[]) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const filteredTasks = useMemo(() => {
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

    return filtered;
  }, [tasks, filters]);

  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K, 
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (filters.search) count++;
    count += filters.status.length;
    count += filters.priority.length;
    count += filters.assignedAgent.length;
    count += filters.category.length;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    if (filters.overdue) count++;
    if (filters.unassigned) count++;
    return count;
  }, [filters]);

  return {
    filters,
    filteredTasks,
    updateFilter,
    clearFilters,
    activeFilterCount: getActiveFilterCount()
  };
};
