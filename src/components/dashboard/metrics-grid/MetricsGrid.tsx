
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agent, Task } from "@/types";
import { Activity, Users, CheckCircle, AlertTriangle } from "lucide-react";

interface MetricsGridProps {
  agents: Agent[];
  tasks?: Task[];
}

export const MetricsGrid = ({ agents, tasks = [] }: MetricsGridProps) => {
  const activeAgents = agents.filter(agent => agent.status === "working").length;
  const idleAgents = agents.filter(agent => agent.status === "idle").length;
  const errorAgents = agents.filter(agent => agent.status === "error").length;
  const avgProgress = agents.length > 0 
    ? agents.reduce((sum, agent) => sum + agent.progress, 0) / agents.length 
    : 0;

  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const totalTasks = tasks.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Agents</p>
              <p className="text-2xl font-bold">{agents.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeAgents}</p>
            </div>
            <Activity className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Progress</p>
              <p className="text-2xl font-bold">{avgProgress.toFixed(0)}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Issues</p>
              <p className="text-2xl font-bold text-red-600">{errorAgents}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
