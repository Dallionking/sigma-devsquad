
import { useState, useCallback } from 'react';
import { KanbanBoardConfig, KanbanCard, KanbanColumn } from './types';

const initialConfig: KanbanBoardConfig = {
  id: 'main-board',
  title: 'Project Workflow',
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      color: '#ef4444',
      limit: 10,
      isCollapsed: false,
      cards: [
        {
          id: 'card-1',
          title: 'Set up project repository',
          description: 'Initialize Git repository and set up basic project structure',
          status: 'todo',
          priority: 'high',
          tags: ['setup', 'git'],
          assignee: 'John Doe',
          estimatedHours: 4,
          completedHours: 0,
          attachments: 2,
          comments: 3,
          dueDate: new Date('2024-12-15')
        },
        {
          id: 'card-2',
          title: 'Design user interface mockups',
          description: 'Create wireframes and high-fidelity mockups for the main features',
          status: 'todo',
          priority: 'medium',
          tags: ['design', 'ui'],
          assignee: 'Jane Smith',
          estimatedHours: 8,
          completedHours: 0,
          attachments: 0,
          comments: 1,
          dueDate: new Date('2024-12-20')
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: '#3b82f6',
      limit: 5,
      isCollapsed: false,
      cards: [
        {
          id: 'card-3',
          title: 'Implement authentication system',
          description: 'Build login, registration, and password reset functionality',
          status: 'in-progress',
          priority: 'high',
          tags: ['backend', 'auth'],
          assignee: 'Mike Johnson',
          estimatedHours: 12,
          completedHours: 6,
          attachments: 1,
          comments: 5,
          dueDate: new Date('2024-12-18')
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      color: '#f59e0b',
      limit: 3,
      isCollapsed: false,
      cards: [
        {
          id: 'card-4',
          title: 'Code review for API endpoints',
          description: 'Review and test all REST API endpoints for the user management system',
          status: 'review',
          priority: 'medium',
          tags: ['review', 'api'],
          assignee: 'Sarah Wilson',
          estimatedHours: 3,
          completedHours: 1,
          attachments: 0,
          comments: 2,
          dueDate: new Date('2024-12-16')
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: '#10b981',
      limit: null,
      isCollapsed: false,
      cards: [
        {
          id: 'card-5',
          title: 'Project planning and requirements',
          description: 'Complete initial project planning, requirements gathering, and timeline estimation',
          status: 'done',
          priority: 'high',
          tags: ['planning', 'requirements'],
          assignee: 'David Brown',
          estimatedHours: 6,
          completedHours: 6,
          attachments: 3,
          comments: 8,
          dueDate: new Date('2024-12-10')
        },
        {
          id: 'card-6',
          title: 'Database schema design',
          description: 'Design and implement the complete database schema for the application',
          status: 'done',
          priority: 'high',
          tags: ['database', 'schema'],
          assignee: 'Emily Davis',
          estimatedHours: 8,
          completedHours: 8,
          attachments: 1,
          comments: 4,
          dueDate: new Date('2024-12-12')
        }
      ]
    }
  ],
  swimlanes: [
    {
      id: 'frontend',
      title: 'Frontend',
      color: '#3b82f6',
      isVisible: true
    },
    {
      id: 'backend',
      title: 'Backend',
      color: '#10b981',
      isVisible: true
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure',
      color: '#f59e0b',
      isVisible: true
    }
  ],
  groupBy: 'none',
  showMetrics: true,
  autoAssignment: false,
  workflowRules: []
};

export const useKanbanBoard = () => {
  const [config, setConfig] = useState<KanbanBoardConfig>(initialConfig);

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

  const moveCard = useCallback((cardId: string, targetColumnId: string) => {
    setConfig(prev => {
      const sourceColumn = prev.columns.find(col =>
        col.cards.some(card => card.id === cardId)
      );

      if (!sourceColumn || sourceColumn.id === targetColumnId) return prev;

      const card = sourceColumn.cards.find(c => c.id === cardId);
      if (!card) return prev;

      return {
        ...prev,
        columns: prev.columns.map(col => {
          if (col.id === sourceColumn.id) {
            return {
              ...col,
              cards: col.cards.filter(c => c.id !== cardId)
            };
          }
          if (col.id === targetColumnId) {
            return {
              ...col,
              cards: [...col.cards, { ...card, status: col.id }]
            };
          }
          return col;
        })
      };
    });
  }, []);

  const deleteCard = useCallback((cardId: string) => {
    setConfig(prev => ({
      ...prev,
      columns: prev.columns.map(col => ({
        ...col,
        cards: col.cards.filter(card => card.id !== cardId)
      }))
    }));
  }, []);

  const addColumn = useCallback((column: Omit<KanbanColumn, 'id'>) => {
    const newColumn: KanbanColumn = {
      ...column,
      id: `column-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setConfig(prev => ({
      ...prev,
      columns: [...prev.columns, newColumn]
    }));

    return newColumn;
  }, []);

  return {
    config,
    updateConfig,
    addCard,
    updateCard,
    moveCard,
    deleteCard,
    addColumn
  };
};
