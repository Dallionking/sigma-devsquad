
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent } from "@/types";
import { Activity, Clock } from "lucide-react";

interface ActivityFeedProps {
  agents: Agent[];
}

export const ActivityFeed = ({ agents }: ActivityFeedProps) => {
  // Generate mock activity data based on agents
  const activities = agents.slice(0, 5).map((agent, index) => ({
    id: index,
    agent: agent.name,
    action: agent.currentTask,
    timestamp: agent.lastActive,
    type: agent.status
  }));

  const getActivityIcon = (type: string) => {
    return <Activity className="w-4 h-4" />;
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
            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg border">
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
