
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/types";
import { memo } from "react";
import { cn } from "@/lib/utils";

interface CalendarMonthProps {
  selectedDate: Date;
  tasks: Task[];
  onDateSelect: (date: Date) => void;
}

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "critical": return "bg-red-500";
    case "high": return "bg-orange-500";
    case "medium": return "bg-yellow-500";
    case "low": return "bg-green-500";
    default: return "bg-gray-500";
  }
};

export const CalendarMonth = memo(({ 
  selectedDate, 
  tasks, 
  onDateSelect 
}: CalendarMonthProps) => {
  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={(date) => date && onDateSelect(date)}
      className="rounded-md border w-full"
      components={{
        Day: ({ date, displayMonth, ...buttonProps }) => {
          const dayTasks = getTasksForDate(date);
          return (
            <div className="relative w-full h-full">
              <button 
                {...buttonProps} 
                className={cn(buttonProps.className || "", "w-full h-full")}
              >
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
  );
});

CalendarMonth.displayName = 'CalendarMonth';
