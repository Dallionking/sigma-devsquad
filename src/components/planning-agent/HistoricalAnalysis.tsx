
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { Calendar, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface HistoricalAnalysisProps {
  messages: Message[];
  agents: Agent[];
  timeRange: string;
}

export const HistoricalAnalysis = ({
  messages,
  agents,
  timeRange
}: HistoricalAnalysisProps) => {
  
  const historicalData = useMemo(() => {
    const now = new Date();
    const timeRangeMs = {
      "1h": 60 * 60 * 1000,
      "24h": 24 * 60 * 60 * 1000,
      "7d": 7 * 24 * 60 * 60 * 1000,
      "30d": 30 * 24 * 60 * 60 * 1000
    }[timeRange] || 24 * 60 * 60 * 1000;

    const filteredMessages = messages.filter(m => 
      new Date(m.timestamp).getTime() > now.getTime() - timeRangeMs
    );

    // Group messages by time periods
    const periods = [];
    const periodLength = timeRangeMs / 10; // 10 periods
    
    for (let i = 0; i < 10; i++) {
      const periodStart = now.getTime() - timeRangeMs + (i * periodLength);
      const periodEnd = periodStart + periodLength;
      
      const periodMessages = filteredMessages.filter(m => {
        const msgTime = new Date(m.timestamp).getTime();
        return msgTime >= periodStart && msgTime < periodEnd;
      });
      
      periods.push({
        period: i,
        start: new Date(periodStart),
        end: new Date(periodEnd),
        messageCount: periodMessages.length,
        agents: [...new Set(periodMessages.map(m => m.from))].length
      });
    }

    // Calculate trends
    const recent = periods.slice(-3).reduce((sum, p) => sum + p.messageCount, 0) / 3;
    const previous = periods.slice(0, 3).reduce((sum, p) => sum + p.messageCount, 0) / 3;
    const trend = recent > previous ? "up" : recent < previous ? "down" : "stable";

    return {
      periods,
      trend,
      trendPercentage: previous > 0 ? ((recent - previous) / previous * 100) : 0,
      totalMessages: filteredMessages.length,
      peakPeriod: periods.reduce((max, p) => p.messageCount > max.messageCount ? p : max, periods[0])
    };
  }, [messages, timeRange]);

  const formatPeriodLabel = (start: Date, end: Date) => {
    if (timeRange === "1h") {
      return start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (timeRange === "24h") {
      return start.toLocaleTimeString([], { hour: '2-digit' });
    } else {
      return start.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getTrendIcon = () => {
    switch (historicalData.trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Historical Communication Analysis</h3>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {timeRange === "1h" ? "Last Hour" :
               timeRange === "24h" ? "Last 24 Hours" :
               timeRange === "7d" ? "Last 7 Days" :
               "Last 30 Days"}
            </span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold">{historicalData.totalMessages}</div>
            <div className="text-sm text-muted-foreground">Total Messages</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-center space-x-1">
              {getTrendIcon()}
              <span className="text-2xl font-bold">
                {Math.abs(historicalData.trendPercentage).toFixed(0)}%
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Trend</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold">{historicalData.peakPeriod?.messageCount || 0}</div>
            <div className="text-sm text-muted-foreground">Peak Period</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold">
              {(historicalData.totalMessages / historicalData.periods.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg/Period</div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div>
          <h4 className="font-medium mb-4">Communication Timeline</h4>
          <div className="space-y-3">
            {historicalData.periods.map((period, index) => {
              const maxMessages = Math.max(...historicalData.periods.map(p => p.messageCount));
              const width = maxMessages > 0 ? (period.messageCount / maxMessages) * 100 : 0;
              
              return (
                <div key={period.period} className="flex items-center space-x-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {formatPeriodLabel(period.start, period.end)}
                  </div>
                  
                  <div className="flex-1 bg-muted/20 rounded-full h-6 relative">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${width}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {period.messageCount}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-20 text-right">
                    <Badge variant="secondary" className="text-xs">
                      {period.agents} agents
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Insights */}
        <div className="mt-6 p-4 bg-muted/10 rounded-lg">
          <h5 className="font-medium mb-2">Key Insights</h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              {getTrendIcon()}
              <span>
                Communication volume is trending {historicalData.trend} by{" "}
                {Math.abs(historicalData.trendPercentage).toFixed(0)}%
              </span>
            </div>
            
            {historicalData.peakPeriod && (
              <div>
                Peak activity occurred at{" "}
                {formatPeriodLabel(historicalData.peakPeriod.start, historicalData.peakPeriod.end)}{" "}
                with {historicalData.peakPeriod.messageCount} messages
              </div>
            )}
            
            <div>
              Average of{" "}
              {(historicalData.totalMessages / historicalData.periods.length).toFixed(1)}{" "}
              messages per time period
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
