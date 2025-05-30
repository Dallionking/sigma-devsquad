
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileText, Users, Calendar, Target, RefreshCcw } from "lucide-react";

interface ContextPanelProps {
  selectedProject: string;
}

export const ContextPanel = ({ selectedProject }: ContextPanelProps) => {
  const projectInfo = {
    name: "AI Development Workforce",
    description: "A comprehensive platform for managing AI agents in software development workflows",
    status: "In Progress",
    progress: 65,
    startDate: "2024-05-01",
    targetDate: "2024-07-15",
    team: ["Planning Agent", "Frontend Agent", "Backend Agent", "QA Agent"],
    objectives: [
      "Create intuitive agent management interface",
      "Implement real-time workflow visualization",
      "Integrate multiple development tools",
      "Ensure scalable architecture"
    ]
  };

  const recentActivity = [
    {
      id: 1,
      action: "Updated requirements document",
      timestamp: "10 minutes ago",
      agent: "Planning Agent"
    },
    {
      id: 2,
      action: "Created new feature breakdown",
      timestamp: "25 minutes ago",
      agent: "Planning Agent"
    },
    {
      id: 3,
      action: "Analyzed user feedback",
      timestamp: "1 hour ago",
      agent: "Research Agent"
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Project Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Project Context
          </CardTitle>
          <CardDescription>Current project information and status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">{projectInfo.name}</h3>
            <p className="text-sm text-muted-foreground">{projectInfo.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <Badge variant="secondary">{projectInfo.status}</Badge>
          </div>
          <Progress value={projectInfo.progress} className="h-2" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Start Date</span>
              <p className="font-medium">{projectInfo.startDate}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Target Date</span>
              <p className="font-medium">{projectInfo.targetDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Active Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {projectInfo.team.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                <span className="text-sm font-medium">{agent}</span>
                <Badge variant="outline" className="text-xs">Active</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Objectives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Key Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {projectInfo.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Recent Activity
            </div>
            <Button variant="ghost" size="sm">
              <RefreshCcw className="w-3 h-3" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-l-2 border-primary/20 pl-3 pb-3">
                <p className="text-sm font-medium">{activity.action}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{activity.agent}</span>
                  <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
