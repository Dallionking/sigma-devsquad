
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock
} from "lucide-react";
import { Task } from "@/types";
import { cn } from "@/lib/utils";

interface TaskCalendarViewProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onCreateTask: (date: Date) => void;
}

export const TaskCalendarView = ({ tasks, onTaskSelect, onCreateTask }: TaskCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const formatDateRange = () => {
    if (viewMode === 'month') {
      return selectedDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    } else {
      const weekStart = new Date(selectedDate);
      weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return `${weekStart.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })} - ${weekEnd.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'month') {
      newDate.setMonth(selectedDate.getMonth() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  const renderMonthView = () => (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        className="rounded-md border w-full"
        components={{
          Day: ({ date, displayMonth, ...buttonProps }) => {
            const dayTasks = getTasksForDate(date);
            return (
              <div className="relative w-full h-full">
                <button {...buttonProps} className={cn(buttonProps.className, "w-full h-full")}>
                  {date.getDate()}
                  {dayTasks.length > 0 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {dayTasks.slice(0, 3).map((task, index) => (
                        <div
                          key={task.id}
                          className={cn(
                            "w-1 h-1 rounded-full",
                            getPriorityColor(task.priority)
                          )}
                        />
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-xs font-bold">+</div>
                      )}
                    </div>
                  )}
                </button>
              </div>
            );
          }
        }}
      />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CalendarIcon className="w-4 h-4" />
            Tasks for {selectedDate.toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {getTasksForDate(selectedDate).map((task) => (
              <div
                key={task.id}
                onClick={() => onTaskSelect(task)}
                className="p-2 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", getPriorityColor(task.priority))} />
                    <span className="font-medium text-sm">{task.title}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {task.status}
                  </Badge>
                </div>
                {task.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>
            ))}
            
            {getTasksForDate(selectedDate).length === 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-2">No tasks for this date</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onCreateTask(selectedDate)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add Task
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Task Calendar</h2>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-sm font-medium min-w-48 text-center">
              {formatDateRange()}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={() => setSelectedDate(new Date())}>
            Today
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {renderMonthView()}
      </div>
    </div>
  );
};
