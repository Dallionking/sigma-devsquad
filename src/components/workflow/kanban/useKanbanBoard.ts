
import { useState, useCallback } from 'react';
import { KanbanBoardConfig, KanbanCard, KanbanColumn } from './types';

const defaultConfig: KanbanBoardConfig = {
  columns: [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [],
      color: '#6b7280'
    },
    {
      id: 'todo',
      title: 'To Do',
      cards: [],
      limit: 5,
      color: '#3b82f6'
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [],
      limit: 3,
      color: '#f59e0b'
    },
    {
      id: 'review',
      title: 'Review',
      cards: [],
      limit: 2,
      color: '#8b5cf6'
    },
    {
      id: 'done',
      title: 'Done',
      cards: [],
      color: '#10b981'
    }
  ],
  swimlanes: [
    { id: 'frontend', title: 'Frontend', color: '#3b82f6', isVisible: true },
    { id: 'backend', title: 'Backend', color: '#10b981', isVisible: true },
    { id: 'design', title: 'Design', color: '#f59e0b', isVisible: true }
  ],
  groupBy: 'none',
  showLimits: true,
  showMetrics: true
};

// Mock data for demonstration
const mockCards: KanbanCard[] = [
  {
    id: 'card-1',
    title: 'Implement user authentication',
    description: 'Add login and registration functionality with JWT tokens',
    assignee: 'John Doe',
    priority: 'high',
    tags: ['auth', 'security', 'backend'],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    estimatedHours: 16,
    completedHours: 8,
    attachments: 2,
    comments: 5,
    status: 'in-progress',
    swimlane: 'backend'
  },
  {
    id: 'card-2',
    title: 'Design dashboard layout',
    description: 'Create wireframes and mockups for the main dashboard',
    assignee: 'Jane Smith',
    priority: 'medium',
    tags: ['ui', 'design', 'dashboard'],
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    estimatedHours: 12,
    completedHours: 12,
    attachments: 8,
    comments: 3,
    status: 'done',
    swimlane: 'design'
  },
  {
    id: 'card-3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure automated testing and deployment',
    assignee: 'Mike Johnson',
    priority: 'high',
    tags: ['devops', 'automation', 'deployment'],
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    estimatedHours: 8,
    completedHours: 2,
    attachments: 1,
    comments: 2,
    status: 'todo',
    swimlane: 'backend'
  },
  {
    id: 'card-4',
    title: 'Implement responsive navigation',
    description: 'Create mobile-friendly navigation component',
    assignee: 'Sarah Wilson',
    priority: 'medium',
    tags: ['frontend', 'responsive', 'navigation'],
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    estimatedHours: 6,
    completedHours: 0,
    attachments: 0,
    comments: 1,
    status: 'backlog',
    swimlane: 'frontend'
  },
  {
    id: 'card-5',
    title: 'API performance optimization',
    description: 'Optimize database queries and add caching',
    assignee: 'John Doe',
    priority: 'low',
    tags: ['backend', 'performance', 'optimization'],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    estimatedHours: 20,
    completedHours: 5,
    attachments: 0,
    comments: 0,
    status: 'review',
    swimlane: 'backend'
  }
];

export const useKanbanBoard = () => {
  const [config, setConfig] = useState<KanbanBoardConfig>(() => {
    // Distribute mock cards across columns
    const configWithCards = { ...defaultConfig };
    mockCards.forEach(card => {
      const column = configWithCards.columns.find(col => col.id === card.status);
      if (column) {
        column.cards.push(card);
      }
    });
    return configWithCards;
  });

  const updateConfig = useCallback((newConfig: KanbanBoardConfig) => {
    setConfig(newConfig);
  }, []);

  const addCard = useCallback((columnId: string, card: Omit<KanbanCard, 'id'>) => {
    const newCard: KanbanCard = {
      ...card,
      id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setConfig(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    }));

    return newCard;
  }, []);

  const removeCard = useCallback((cardId: string) => {
    setConfig(prev => ({
      ...prev,
      columns: prev.columns.map(col => ({
        ...col,
        cards: col.cards.filter(card => card.id !== cardId)
      }))
    }));
  }, []);

  const updateCard = useCallback((cardId: string, updates: Partial<KanbanCard>) => {
    setConfig(prev => ({
      ...prev,
      columns: prev.columns.map(col => ({
        ...col,
        cards: col.cards.map(card =>
          card.id === cardId ? { ...card, ...updates } : card
        )
      }))
    }));
  }, []);

  const addColumn = useCallback((column: Omit<KanbanColumn, 'cards'>) => {
    const newColumn: KanbanColumn = {
      ...column,
      cards: []
    };

    setConfig(prev => ({
      ...prev,
      columns: [...prev.columns, newColumn]
    }));
  }, []);

  const removeColumn = useCallback((columnId: string) => {
    setConfig(prev => ({
      ...prev,
      columns: prev.columns.filter(col => col.id !== columnId)
    }));
  }, []);

  return {
    config,
    updateConfig,
    addCard,
    removeCard,
    updateCard,
    addColumn,
    removeColumn
  };
};
