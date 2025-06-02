
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  MoreHorizontal, 
  ChevronDown, 
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { KanbanColumn as KanbanColumnType, KanbanCard as KanbanCardType } from './types';
import { KanbanCard } from './KanbanCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  column: KanbanColumnType;
  onCardMove?: (cardId: string, targetColumnId: string) => void;
  onCardClick?: (card: KanbanCardType) => void;
  onAddCard?: (columnId: string) => void;
  onToggleCollapse?: (columnId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  onCardMove,
  onCardClick,
  onAddCard,
  onToggleCollapse
}) => {
  const isOverLimit = column.limit && column.cards.length > column.limit;
  const limitPercentage = column.limit ? (column.cards.length / column.limit) * 100 : 0;

  const getLimitColor = () => {
    if (!column.limit) return '';
    if (limitPercentage >= 100) return 'border-red-500 bg-red-50 dark:bg-red-950/20';
    if (limitPercentage >= 80) return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
    return 'border-green-500 bg-green-50 dark:bg-green-950/20';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId && onCardMove) {
      onCardMove(cardId, column.id);
    }
  };

  const handleCardDragStart = (e: React.DragEvent, cardId: string) => {
    e.dataTransfer.setData('text/plain', cardId);
  };

  return (
    <div className="flex-shrink-0 w-80">
      <Card 
        className={cn(
          "h-full transition-all duration-200",
          column.limit && getLimitColor()
        )}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onToggleCollapse?.(column.id)}
              >
                {column.isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
              <CardTitle className="text-base flex items-center gap-2">
                {column.color && (
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: column.color }}
                  />
                )}
                {column.title}
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {column.cards.length}
                {column.limit && `/${column.limit}`}
              </Badge>
              {isOverLimit && (
                <AlertTriangle className="w-4 h-4 text-red-500" />
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onAddCard?.(column.id)}
              >
                <Plus className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Limit Progress Bar */}
          {column.limit && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Capacity</span>
                <span className={cn(
                  "font-medium",
                  isOverLimit && "text-red-500"
                )}>
                  {Math.round(limitPercentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    limitPercentage >= 100 ? "bg-red-500" :
                    limitPercentage >= 80 ? "bg-yellow-500" : "bg-green-500"
                  )}
                  style={{ width: `${Math.min(limitPercentage, 100)}%` }}
                />
              </div>
            </div>
          )}
        </CardHeader>

        {!column.isCollapsed && (
          <CardContent 
            className="space-y-0 max-h-[600px] overflow-y-auto"
            style={{ minHeight: '200px' }}
          >
            {column.cards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleCardDragStart(e, card.id)}
              >
                <KanbanCard 
                  card={card} 
                  onCardClick={onCardClick}
                />
              </div>
            ))}
            
            {column.cards.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                  <Plus className="w-6 h-6" />
                </div>
                <p className="text-sm">No cards in this column</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => onAddCard?.(column.id)}
                >
                  Add first card
                </Button>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};
