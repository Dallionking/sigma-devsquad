
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

interface ActivityData {
  day: number;
  hour: number;
  activity: number;
  commits: number;
  messages: number;
}

interface ActivityHeatmapProps {
  teamId: string;
  timeRange: string;
}

const generateActivityData = (): ActivityData[] => {
  const data: ActivityData[] = [];
  
  // Generate data for 7 days (0-6) and 24 hours (0-23)
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      // Simulate higher activity during work hours (9-17)
      const isWorkHour = hour >= 9 && hour <= 17;
      const isWeekday = day >= 1 && day <= 5;
      
      let baseActivity = 0;
      if (isWorkHour && isWeekday) {
        baseActivity = Math.random() * 80 + 20; // 20-100
      } else if (isWorkHour) {
        baseActivity = Math.random() * 40 + 10; // 10-50
      } else {
        baseActivity = Math.random() * 20; // 0-20
      }

      data.push({
        day,
        hour,
        activity: Math.floor(baseActivity),
        commits: Math.floor(baseActivity / 20),
        messages: Math.floor(baseActivity / 10)
      });
    }
  }
  
  return data;
};

export const ActivityHeatmap = ({ teamId, timeRange }: ActivityHeatmapProps) => {
  const activityData = generateActivityData();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getActivityColor = (activity: number) => {
    if (activity >= 80) return 'bg-emerald-600';
    if (activity >= 60) return 'bg-emerald-500';
    if (activity >= 40) return 'bg-emerald-400';
    if (activity >= 20) return 'bg-emerald-300';
    if (activity >= 10) return 'bg-emerald-200';
    return 'bg-gray-100';
  };

  const getPeakHours = () => {
    const hourlyActivity = hours.map(hour => {
      const total = activityData
        .filter(d => d.hour === hour)
        .reduce((sum, d) => sum + d.activity, 0);
      return { hour, total };
    });
    
    return hourlyActivity
      .sort((a, b) => b.total - a.total)
      .slice(0, 3)
      .map(h => h.hour);
  };

  const peakHours = getPeakHours();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Team Activity Heatmap
        </CardTitle>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Peak hours: {peakHours.map(h => `${h}:00`).join(', ')}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Activity level:</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-100 rounded"></div>
              <span className="text-xs">Low</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-300 rounded"></div>
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-emerald-600 rounded"></div>
              <span className="text-xs">High</span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto">
            <div className="grid grid-cols-25 gap-1 min-w-max">
              {/* Header row with hours */}
              <div className="text-xs text-muted-foreground"></div>
              {hours.map(hour => (
                <div key={hour} className="text-xs text-muted-foreground text-center w-4">
                  {hour % 4 === 0 ? hour : ''}
                </div>
              ))}
              
              {/* Data rows */}
              {days.map((day, dayIndex) => (
                <React.Fragment key={dayIndex}>
                  <div className="text-xs text-muted-foreground text-right pr-2 w-8">
                    {day}
                  </div>
                  {hours.map(hour => {
                    const data = activityData.find(d => d.day === dayIndex && d.hour === hour);
                    return (
                      <div
                        key={`${dayIndex}-${hour}`}
                        className={`w-4 h-4 rounded-sm ${getActivityColor(data?.activity || 0)} cursor-pointer transition-all hover:scale-110`}
                        title={`${day} ${hour}:00 - Activity: ${data?.activity || 0}%`}
                      />
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Peak Activity Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-semibold">
                {Math.max(...peakHours)}:00 - {Math.max(...peakHours) + 1}:00
              </div>
              <div className="text-sm text-muted-foreground">Peak Activity Hour</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">Mon-Fri</div>
              <div className="text-sm text-muted-foreground">Most Active Days</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold">
                {Math.floor(activityData.reduce((sum, d) => sum + d.activity, 0) / activityData.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Activity</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
