
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  selectedDate: Date;
  viewMode: 'month' | 'week';
  onDateNavigate: (direction: 'prev' | 'next') => void;
  onViewModeChange: (mode: 'month' | 'week') => void;
  onTodayClick: () => void;
}

export const CalendarHeader = ({
  selectedDate,
  viewMode,
  onDateNavigate,
  onViewModeChange,
  onTodayClick
}: CalendarHeaderProps) => {
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

  return (
    <div className="p-4 border-b">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Task Calendar</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('month')}
          >
            Month
          </Button>
          <Button
            variant={viewMode === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('week')}
          >
            Week
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onDateNavigate('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h3 className="text-sm font-medium min-w-48 text-center">
            {formatDateRange()}
          </h3>
          <Button variant="outline" size="sm" onClick={() => onDateNavigate('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <Button variant="outline" size="sm" onClick={onTodayClick}>
          Today
        </Button>
      </div>
    </div>
  );
};
