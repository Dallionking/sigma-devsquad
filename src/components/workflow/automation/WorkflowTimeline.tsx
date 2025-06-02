
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Timeline, 
  Calendar, 
  TrendingUp, 
  Activity,
  BarChart3,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { WorkflowHistoryEntry } from '@/types/workflow-history';

interface WorkflowTimelineProps {
  history: WorkflowHistoryEntry[];
  workflowId?: string;
}

export const WorkflowTimeline: React.FC<WorkflowTimelineProps> = ({
  history,
  workflowId
}) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [groupBy, setGroupBy] = useState('day');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const timelineData = useMemo(() => {
    const now = new Date();
    const rangeMs = {
      '1d': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000
    }[timeRange] || 7 * 24 * 60 * 60 * 1000;

    const startDate = new Date(now.getTime() - rangeMs);
    
    const filteredHistory = history.filter(entry => 
      new Date(entry.timestamp) >= startDate
    );

    // Group by time period
    const grouped = filteredHistory.reduce((acc, entry) => {
      const date = new Date(entry.timestamp);
      let key: string;
      
      if (groupBy === 'hour') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:00`;
      } else if (groupBy === 'day') {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      } else {
        // week
        const weekStart = new Date(date.getTime() - (date.getDay() * 24 * 60 * 60 * 1000));
        key = `Week of ${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(entry);
      return acc;
    }, {} as Record<string, WorkflowHistoryEntry[]>);

    return Object.entries(grouped)
      .map(([date, entries]) => ({
        date,
        entries,
        total: entries.length,
        byType: entries.reduce((acc, entry) => {
          acc[entry.changeType] = (acc[entry.changeType] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [history, timeRange, groupBy]);

  const maxActivity = Math.max(...timelineData.map(d => d.total), 1);

  const getActivityColor = (count: number) => {
    const intensity = count / maxActivity;
    if (intensity === 0) return 'bg-gray-100';
    if (intensity <= 0.25) return 'bg-blue-200';
    if (intensity <= 0.5) return 'bg-blue-400';
    if (intensity <= 0.75) return 'bg-blue-600';
    return 'bg-blue-800';
  };

  const changeTypeColors = {
    created: 'bg-green-500',
    updated: 'bg-blue-500',
    deleted: 'bg-red-500',
    enabled: 'bg-green-400',
    disabled: 'bg-orange-500',
    executed: 'bg-purple-500'
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Timeline className="w-5 h-5" />
              Timeline Visualization
            </CardTitle>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last Day</SelectItem>
                  <SelectItem value="7d">Last Week</SelectItem>
                  <SelectItem value="30d">Last Month</SelectItem>
                  <SelectItem value="90d">Last 3 Months</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={groupBy} onValueChange={setGroupBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hour">By Hour</SelectItem>
                  <SelectItem value="day">By Day</SelectItem>
                  <SelectItem value="week">By Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Activity Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Activity Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 md:grid-cols-14 lg:grid-cols-21 gap-1">
              {timelineData.map((data, index) => (
                <div
                  key={index}
                  className={`
                    w-4 h-4 rounded cursor-pointer transition-all hover:scale-110
                    ${getActivityColor(data.total)}
                    ${selectedDate === data.date ? 'ring-2 ring-blue-500' : ''}
                  `}
                  title={`${data.date}: ${data.total} activities`}
                  onClick={() => setSelectedDate(selectedDate === data.date ? null : data.date)}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-100 rounded"></div>
                <div className="w-3 h-3 bg-blue-200 rounded"></div>
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <div className="w-3 h-3 bg-blue-800 rounded"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineData.map((data, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{data.date}</h4>
                  <Badge variant="secondary">{data.total} activities</Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-2">
                  {Object.entries(data.byType).map(([type, count]) => (
                    <div key={type} className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded ${changeTypeColors[type as keyof typeof changeTypeColors] || 'bg-gray-500'}`} />
                      <span className="text-sm">{type}: {count}</span>
                    </div>
                  ))}
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(data.total / maxActivity) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {selectedDate} - Detailed View
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const selectedData = timelineData.find(d => d.date === selectedDate);
              if (!selectedData) return <p>No data found for selected date.</p>;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedData.byType).map(([type, count]) => (
                      <div key={type} className="text-center p-3 border rounded">
                        <div className="text-2xl font-bold">{count}</div>
                        <div className="text-sm text-muted-foreground capitalize">{type}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Activities</h4>
                    {selectedData.entries.map((entry) => (
                      <div key={entry.id} className="flex items-center gap-3 p-2 border rounded">
                        <div className={`w-2 h-2 rounded-full ${changeTypeColors[entry.changeType as keyof typeof changeTypeColors] || 'bg-gray-500'}`} />
                        <div className="flex-1">
                          <span className="font-medium capitalize">{entry.changeType}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            by {entry.changedBy} at {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <Badge variant="outline">v{entry.version}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
