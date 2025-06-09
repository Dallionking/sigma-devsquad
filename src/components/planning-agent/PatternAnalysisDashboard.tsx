
import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { TrendingUp, MessageCircle, Users, Clock, BarChart } from "lucide-react";

interface PatternAnalysisDashboardProps {
  messages: Message[];
  agents: Agent[];
}

export const PatternAnalysisDashboard = ({
  messages,
  agents
}: PatternAnalysisDashboardProps) => {
  
  const analysisData = useMemo(() => {
    // Communication frequency analysis
    const communicationFreq = agents.map(agent => {
      const agentMessages = messages.filter(m => m.from === agent.type || m.to === agent.type);
      return {
        agent: agent.name,
        count: agentMessages.length,
        type: agent.type
      };
    }).sort((a, b) => b.count - a.count);

    // Message type distribution
    const messageTypes = messages.reduce((acc, msg) => {
      acc[msg.type] = (acc[msg.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Communication patterns by hour
    const hourlyPattern = messages.reduce((acc, msg) => {
      const hour = new Date(msg.timestamp).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    // Agent collaboration matrix
    const collaborationMatrix = agents.map(fromAgent => ({
      agent: fromAgent.name,
      collaborations: agents.map(toAgent => ({
        with: toAgent.name,
        count: messages.filter(m => 
          (m.from === fromAgent.type && m.to === toAgent.type) ||
          (m.from === toAgent.type && m.to === fromAgent.type)
        ).length
      })).filter(c => c.count > 0)
    }));

    // Response time patterns (mock data)
    const responseTimePatterns = agents.map(agent => ({
      agent: agent.name,
      avgResponseTime: Math.random() * 5000 + 1000, // 1-6 seconds
      trend: Math.random() > 0.5 ? "improving" : "stable"
    }));

    return {
      communicationFreq,
      messageTypes,
      hourlyPattern,
      collaborationMatrix,
      responseTimePatterns
    };
  }, [messages, agents]);

  const getPeakHour = () => {
    const { hourlyPattern } = analysisData;
    const peakHour = Object.entries(hourlyPattern)
      .sort(([,a], [,b]) => b - a)[0];
    return peakHour ? `${peakHour[0]}:00` : "N/A";
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-6">Communication Pattern Analysis</h3>
        
        {/* Summary Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <MessageCircle className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{messages.length}</div>
            <div className="text-sm text-muted-foreground">Total Messages</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Users className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{agents.length}</div>
            <div className="text-sm text-muted-foreground">Active Agents</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <Clock className="w-6 h-6 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{getPeakHour()}</div>
            <div className="text-sm text-muted-foreground">Peak Hour</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <BarChart className="w-6 h-6 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{Object.keys(analysisData.messageTypes).length}</div>
            <div className="text-sm text-muted-foreground">Message Types</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Communication Frequency */}
          <div>
            <h4 className="font-medium mb-3">Communication Frequency</h4>
            <div className="space-y-2">
              {analysisData.communicationFreq.slice(0, 5).map((item, index) => (
                <div key={item.agent} className="flex items-center justify-between p-3 bg-muted/20 rounded">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-green-400 to-green-600' :
                      index === 1 ? 'from-blue-400 to-blue-600' :
                      index === 2 ? 'from-purple-400 to-purple-600' :
                      'from-gray-400 to-gray-600'
                    }`} />
                    <span className="font-medium">{item.agent}</span>
                  </div>
                  <Badge variant="secondary">{item.count} msgs</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Message Type Distribution */}
          <div>
            <h4 className="font-medium mb-3">Message Types</h4>
            <div className="space-y-2">
              {Object.entries(analysisData.messageTypes).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between p-3 bg-muted/20 rounded">
                  <span className="capitalize">{type.replace('_', ' ')}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Communication Pattern */}
          <div>
            <h4 className="font-medium mb-3">Hourly Activity Pattern</h4>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 24 }, (_, hour) => {
                const count = analysisData.hourlyPattern[hour] || 0;
                const maxCount = Math.max(...Object.values(analysisData.hourlyPattern));
                const intensity = maxCount > 0 ? count / maxCount : 0;
                
                return (
                  <div
                    key={hour}
                    className="text-center"
                    title={`${hour}:00 - ${count} messages`}
                  >
                    <div
                      className={`h-8 rounded text-xs flex items-center justify-center text-white font-medium ${
                        intensity > 0.7 ? 'bg-green-600' :
                        intensity > 0.4 ? 'bg-green-400' :
                        intensity > 0.1 ? 'bg-green-200 text-black' :
                        'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {hour}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Response Time Trends */}
          <div>
            <h4 className="font-medium mb-3">Response Time Analysis</h4>
            <div className="space-y-2">
              {analysisData.responseTimePatterns.map(pattern => (
                <div key={pattern.agent} className="flex items-center justify-between p-3 bg-muted/20 rounded">
                  <div>
                    <span className="font-medium">{pattern.agent}</span>
                    <div className="text-sm text-muted-foreground">
                      {(pattern.avgResponseTime / 1000).toFixed(1)}s avg
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${
                      pattern.trend === "improving" ? "text-green-500" : "text-gray-500"
                    }`} />
                    <Badge variant={pattern.trend === "improving" ? "default" : "secondary"}>
                      {pattern.trend}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Collaboration Matrix */}
      <Card className="p-6">
        <h4 className="font-medium mb-4">Agent Collaboration Matrix</h4>
        <div className="space-y-3">
          {analysisData.collaborationMatrix
            .filter(matrix => matrix.collaborations.length > 0)
            .map(matrix => (
              <div key={matrix.agent} className="p-3 bg-muted/20 rounded">
                <div className="font-medium mb-2">{matrix.agent} collaborates with:</div>
                <div className="flex flex-wrap gap-2">
                  {matrix.collaborations.map(collab => (
                    <Badge key={collab.with} variant="outline">
                      {collab.with} ({collab.count})
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};
