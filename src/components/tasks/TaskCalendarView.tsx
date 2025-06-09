
import { useState } from "react";
import { Task } from "@/types";
import { CalendarHeader } from "./calendar/CalendarHeader";
import { CalendarMonth } from "./calendar/CalendarMonth";
import { CalendarTaskList } from "./calendar/CalendarTaskList";
import { TaskErrorBoundary } from "./shared/ErrorBoundary";

interface TaskCalendarViewProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  onCreateTask: (date: Date) => void;
}

export const TaskCalendarView = ({ tasks, onTaskSelect, onCreateTask }: TaskCalendarViewProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
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

  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <TaskErrorBoundary>
      <div className="h-full flex flex-col">
        <CalendarHeader
          selectedDate={selectedDate}
          viewMode={viewMode}
          onDateNavigate={navigateDate}
          onViewModeChange={setViewMode}
          onTodayClick={handleTodayClick}
        />

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <CalendarMonth
              selectedDate={selectedDate}
              tasks={tasks}
              onDateSelect={setSelectedDate}
            />
            
            <CalendarTaskList
              date={selectedDate}
              tasks={selectedDateTasks}
              onTaskSelect={onTaskSelect}
              onCreateTask={onCreateTask}
            />
          </div>
        </div>
      </div>
    </TaskErrorBoundary>
  );
};
