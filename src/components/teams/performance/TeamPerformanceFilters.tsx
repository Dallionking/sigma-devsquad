
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimeRange, ComparisonType } from './TeamPerformanceDashboard';
import { CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

interface TeamPerformanceFiltersProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  comparisonType: ComparisonType;
  onComparisonTypeChange: (type: ComparisonType) => void;
  customDateRange: { start: Date; end: Date } | null;
  onCustomDateRangeChange: (range: { start: Date; end: Date } | null) => void;
}

export const TeamPerformanceFilters = ({
  timeRange,
  onTimeRangeChange,
  comparisonType,
  onComparisonTypeChange,
  customDateRange,
  onCustomDateRangeChange
}: TeamPerformanceFiltersProps) => {
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>();

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setSelectedRange(range);
    
    if (range?.from && range?.to) {
      onCustomDateRangeChange({ start: range.from, end: range.to });
      setDatePickerOpen(false);
    } else if (!range?.from && !range?.to) {
      onCustomDateRangeChange(null);
    }
  };

  // Update selectedRange when customDateRange changes
  React.useEffect(() => {
    if (customDateRange) {
      setSelectedRange({
        from: customDateRange.start,
        to: customDateRange.end
      });
    } else {
      setSelectedRange(undefined);
    }
  }, [customDateRange]);

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          {/* Time Range Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
            <span className="text-sm text-muted-foreground flex-shrink-0">Time:</span>
            <div className="flex gap-1 overflow-x-auto">
              {(['today', 'week', 'month', 'custom'] as TimeRange[]).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    onTimeRangeChange(range);
                    if (range !== 'custom') {
                      onCustomDateRangeChange(null);
                    }
                  }}
                  className="capitalize text-xs flex-shrink-0"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Date Range Picker */}
          {timeRange === 'custom' && (
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 min-w-0 max-w-48">
                  <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">
                    {customDateRange 
                      ? `${format(customDateRange.start, 'MMM dd')} - ${format(customDateRange.end, 'MMM dd')}`
                      : 'Select dates'
                    }
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={selectedRange}
                  onSelect={handleDateRangeSelect}
                  numberOfMonths={1}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          )}

          {/* Comparison Type Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
            <span className="text-sm text-muted-foreground flex-shrink-0">Compare:</span>
            <Select value={comparisonType} onValueChange={(value: ComparisonType) => onComparisonTypeChange(value)}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No comparison</SelectItem>
                <SelectItem value="previous-period">vs Previous</SelectItem>
                <SelectItem value="target">vs Target</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
