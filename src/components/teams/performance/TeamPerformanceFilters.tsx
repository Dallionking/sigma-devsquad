
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { TimeRange, ComparisonType } from './TeamPerformanceDashboard';
import { CalendarIcon, Filter } from 'lucide-react';
import { format } from 'date-fns';

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
  const [selectedRange, setSelectedRange] = React.useState<{ from?: Date; to?: Date }>({});

  const handleDateRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (range?.from && range?.to) {
      onCustomDateRangeChange({ start: range.from, end: range.to });
      setSelectedRange(range);
      setDatePickerOpen(false);
    } else {
      setSelectedRange(range || {});
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Time Range:</span>
            <div className="flex gap-1">
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
                  className="capitalize"
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
                <Button variant="outline" size="sm" className="gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  {customDateRange 
                    ? `${format(customDateRange.start, 'MMM dd')} - ${format(customDateRange.end, 'MMM dd')}`
                    : 'Select dates'
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={selectedRange}
                  onSelect={handleDateRangeSelect}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )}

          {/* Comparison Type Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Compare:</span>
            <Select value={comparisonType} onValueChange={(value: ComparisonType) => onComparisonTypeChange(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No comparison</SelectItem>
                <SelectItem value="previous-period">vs Previous period</SelectItem>
                <SelectItem value="target">vs Target</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
