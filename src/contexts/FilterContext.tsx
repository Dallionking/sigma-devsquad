
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Agent, Task, Message, ViewMode } from '@/types';

export interface FilterState {
  searchQuery: string;
  selectedAgents: string[];
  messageTypes: string[];
  taskStatuses: string[];
  priority: string[];
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  activeFiltersCount: number;
}

interface FilterContextType {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  resetAllFilters: () => void;
  getFilteredAgents: (agents: Agent[]) => Agent[];
  getFilteredTasks: (tasks: Task[]) => Task[];
  getFilteredMessages: (messages: Message[]) => Message[];
  isFilterActive: boolean;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  selectedAgents: [],
  messageTypes: [],
  taskStatuses: [],
  priority: [],
  dateRange: { from: null, to: null },
  activeFiltersCount: 0
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const calculateActiveFiltersCount = useCallback((filterState: FilterState) => {
    let count = 0;
    if (filterState.searchQuery) count++;
    if (filterState.selectedAgents.length > 0) count++;
    if (filterState.messageTypes.length > 0) count++;
    if (filterState.taskStatuses.length > 0) count++;
    if (filterState.priority.length > 0) count++;
    if (filterState.dateRange.from || filterState.dateRange.to) count++;
    return count;
  }, []);

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      newFilters.activeFiltersCount = calculateActiveFiltersCount(newFilters);
      return newFilters;
    });
  }, [calculateActiveFiltersCount]);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const resetAllFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const getFilteredAgents = useCallback((agents: Agent[]) => {
    return agents.filter(agent => {
      if (filters.searchQuery && !agent.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.selectedAgents.length > 0 && !filters.selectedAgents.includes(agent.id)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const getFilteredTasks = useCallback((tasks: Task[]) => {
    return tasks.filter(task => {
      if (filters.searchQuery && !task.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.selectedAgents.length > 0 && !filters.selectedAgents.includes(task.assignedAgent)) {
        return false;
      }
      if (filters.taskStatuses.length > 0 && !filters.taskStatuses.includes(task.status)) {
        return false;
      }
      if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const getFilteredMessages = useCallback((messages: Message[]) => {
    return messages.filter(message => {
      if (filters.searchQuery && !message.content.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.selectedAgents.length > 0 && 
          !filters.selectedAgents.includes(message.from) && 
          !filters.selectedAgents.includes(message.to)) {
        return false;
      }
      if (filters.messageTypes.length > 0 && !filters.messageTypes.includes(message.type)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const isFilterActive = filters.activeFiltersCount > 0;

  return (
    <FilterContext.Provider value={{
      filters,
      updateFilter,
      resetFilters,
      resetAllFilters,
      getFilteredAgents,
      getFilteredTasks,
      getFilteredMessages,
      isFilterActive
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
