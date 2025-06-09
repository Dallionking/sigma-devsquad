
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Calendar, 
  Clock, 
  Paperclip, 
  MessageSquare, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { KanbanCard as KanbanCardType } from './types';
import { cn } from '@/lib/utils';

interface KanbanCardProps {
  card: KanbanCardType;
  isDragging?: boolean;
  onCardClick?: (card: KanbanCardType) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ 
  card, 
  isDragging = false,
  onCardClick 
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20';
      case 'low': return 'border-l-green-500 bg-green-50 dark:bg-green-950/20';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-3 h-3 text-red-500" />;
      case 'medium': return <Clock className="w-3 h-3 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();
  const progress = card.estimatedHours ? (card.completedHours || 0) / card.estimatedHours * 100 : 0;

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 mb-3",
        getPriorityColor(card.priority),
        isDragging && "opacity-50 transform rotate-2",
        isOverdue && "ring-2 ring-red-200"
      )}
      onClick={() => onCardClick?.(card)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <h4 className="font-medium text-sm line-clamp-2">{card.title}</h4>
          <div className="flex items-center gap-1 ml-2">
            {getPriorityIcon(card.priority)}
          </div>
        </div>
        {card.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {card.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        {/* Tags */}
        {card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                {tag}
              </Badge>
            ))}
            {card.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                +{card.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Progress Bar */}
        {card.estimatedHours && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {card.assignee && (
              <Avatar className="w-5 h-5">
                <AvatarFallback className="text-xs">
                  {card.assignee.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {card.dueDate && (
              <div className={cn(
                "flex items-center gap-1 text-xs",
                isOverdue ? "text-red-500" : "text-muted-foreground"
              )}>
                <Calendar className="w-3 h-3" />
                <span>{new Date(card.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            {card.attachments && card.attachments > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <Paperclip className="w-3 h-3" />
                <span>{card.attachments}</span>
              </div>
            )}
            {card.comments && card.comments > 0 && (
              <div className="flex items-center gap-1 text-xs">
                <MessageSquare className="w-3 h-3" />
                <span>{card.comments}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
