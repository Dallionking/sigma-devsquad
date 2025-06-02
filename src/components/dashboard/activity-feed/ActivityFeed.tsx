
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Message } from "@/types";
import { Activity, Clock } from "lucide-react";

interface ActivityFeedProps {
  agents?: Agent[];
  messages?: Message[];
  onMessageSelect?: (message: Message | null) => void;
}

export const ActivityFeed = ({ agents = [], messages = [], onMessageSelect }: ActivityFeedProps) => {
  // Generate mock activity data based on agents if messages not provided
  const activities = messages.length > 0 
    ? messages.slice(0, 5).map((message, index) => ({
        id: message.id,
        agent: message.from,
        action: message.content,
        timestamp: message.timestamp,
        type: message.type,
        message: message
      }))
    : agents.slice(0, 5).map((agent, index) => ({
        id: agent.id,
        agent: agent.name,
        action: agent.currentTask,
        timestamp: agent.lastActive,
        type: agent.status,
        message: null
      }));

  const getActivityIcon = (type: string) => {
    return <Activity className="w-4 h-4" />;
  };

  const handleActivityClick = (activity: any) => {
    if (activity.message && onMessageSelect) {
      onMessageSelect(activity.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`flex items-center space-x-3 p-3 rounded-lg border ${
                activity.message ? 'cursor-pointer hover:bg-muted/50' : ''
              }`}
              onClick={() => handleActivityClick(activity)}
            >
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{activity.agent}</span>
                  <Badge variant="outline" className="text-xs">{activity.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
