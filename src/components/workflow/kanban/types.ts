
export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  dueDate?: Date;
  estimatedHours?: number;
  completedHours?: number;
  attachments?: number;
  comments?: number;
  status: string;
  swimlane?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  limit?: number;
  color?: string;
  isCollapsed?: boolean;
}

export interface KanbanSwimlane {
  id: string;
  title: string;
  color?: string;
  isVisible: boolean;
}

export interface KanbanBoardConfig {
  columns: KanbanColumn[];
  swimlanes: KanbanSwimlane[];
  groupBy: 'assignee' | 'priority' | 'tags' | 'none';
  showLimits: boolean;
  showMetrics: boolean;
}
