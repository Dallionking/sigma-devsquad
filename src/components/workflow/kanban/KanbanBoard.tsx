
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Plus, 
  Filter, 
  BarChart3,
  Users,
  Layers,
  Target
} from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { KanbanBoardConfig, KanbanCard, KanbanColumn as KanbanColumnType } from './types';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  config: KanbanBoardConfig;
  onConfigChange?: (config: KanbanBoardConfig) => void;
  onCardClick?: (card: KanbanCard) => void;
  onAddCard?: (columnId: string) => void;
  onAddColumn?: () => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  config,
  onConfigChange,
  onCardClick,
  onAddCard,
  onAddColumn
}) => {
  const [selectedSwimlane, setSelectedSwimlane] = useState<string>('all');

  const handleCardMove = (cardId: string, targetColumnId: string) => {
    const sourceColumn = config.columns.find(col => 
      col.cards.some(card => card.id === cardId)
    );
    
    if (!sourceColumn || sourceColumn.id === targetColumnId) return;

    const card = sourceColumn.cards.find(c => c.id === cardId);
    if (!card) return;

    const newColumns = config.columns.map(col => {
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
    });

    onConfigChange?.({
      ...config,
      columns: newColumns
    });
  };

  const handleToggleCollapse = (columnId: string) => {
    const newColumns = config.columns.map(col =>
      col.id === columnId ? { ...col, isCollapsed: !col.isCollapsed } : col
    );
    
    onConfigChange?.({
      ...config,
      columns: newColumns
    });
  };

  const handleGroupByChange = (groupBy: 'assignee' | 'priority' | 'tags' | 'none') => {
    onConfigChange?.({
      ...config,
      groupBy
    });
  };

  const getFilteredColumns = () => {
    if (selectedSwimlane === 'all') return config.columns;
    
    return config.columns.map(column => ({
      ...column,
      cards: column.cards.filter(card => {
        switch (config.groupBy) {
          case 'assignee':
            return card.assignee === selectedSwimlane;
          case 'priority':
            return card.priority === selectedSwimlane;
          default:
            return card.swimlane === selectedSwimlane;
        }
      })
    }));
  };

  const getSwimlaneOptions = () => {
    const options = [{ value: 'all', label: 'All Items' }];
    
    switch (config.groupBy) {
      case 'assignee':
        const assignees = [...new Set(
          config.columns.flatMap(col => 
            col.cards.map(card => card.assignee).filter(Boolean)
          )
        )];
        options.push(...assignees.map(assignee => ({
          value: assignee!,
          label: assignee!
        })));
        break;
      case 'priority':
        options.push(
          { value: 'high', label: 'High Priority' },
          { value: 'medium', label: 'Medium Priority' },
          { value: 'low', label: 'Low Priority' }
        );
        break;
      case 'tags':
        const tags = [...new Set(
          config.columns.flatMap(col => 
            col.cards.flatMap(card => card.tags)
          )
        )];
        options.push(...tags.map(tag => ({
          value: tag,
          label: `#${tag}`
        })));
        break;
      default:
        config.swimlanes.forEach(swimlane => {
          if (swimlane.isVisible) {
            options.push({
              value: swimlane.id,
              label: swimlane.title
            });
          }
        });
    }
    
    return options;
  };

  const getBoardMetrics = () => {
    const allCards = config.columns.flatMap(col => col.cards);
    const totalCards = allCards.length;
    const completedCards = config.columns
      .find(col => col.title.toLowerCase().includes('done') || col.title.toLowerCase().includes('complete'))
      ?.cards.length || 0;
    
    const avgCardsPerColumn = totalCards / config.columns.length;
    const bottleneckColumns = config.columns.filter(col => 
      col.limit && col.cards.length > col.limit
    );

    return {
      totalCards,
      completedCards,
      avgCardsPerColumn,
      bottleneckColumns: bottleneckColumns.length,
      completionRate: totalCards > 0 ? (completedCards / totalCards) * 100 : 0
    };
  };

  const metrics = getBoardMetrics();
  const filteredColumns = getFilteredColumns();

  return (
    <div className="space-y-6">
      {/* Board Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Workflow Kanban Board
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
              <Button variant="outline" size="sm" onClick={onAddColumn}>
                <Plus className="w-4 h-4 mr-2" />
                Add Column
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <Select value={config.groupBy} onValueChange={handleGroupByChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Group by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="assignee">Assignee</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="tags">Tags</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.groupBy !== 'none' && (
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={selectedSwimlane} onValueChange={setSelectedSwimlane}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by swimlane" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSwimlaneOptions().map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Metrics Display */}
            {config.showMetrics && (
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold">{metrics.totalCards}</div>
                  <div className="text-xs text-muted-foreground">Total Cards</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{metrics.completionRate.toFixed(1)}%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
                {metrics.bottleneckColumns > 0 && (
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{metrics.bottleneckColumns}</div>
                    <div className="text-xs text-muted-foreground">Bottlenecks</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Kanban Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {filteredColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onCardMove={handleCardMove}
            onCardClick={onCardClick}
            onAddCard={onAddCard}
            onToggleCollapse={handleToggleCollapse}
          />
        ))}
      </div>
    </div>
  );
};
