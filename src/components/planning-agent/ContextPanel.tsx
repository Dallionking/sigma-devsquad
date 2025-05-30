
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
    <div className="h-full overflow-y-auto p-responsive space-y-responsive">
      {/* Enhanced Project Overview */}
      <Card className="card-enhanced hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 heading-secondary text-lg">
            <Target className="w-5 h-5" />
            Project Context
          </CardTitle>
          <CardDescription className="text-muted-enhanced">
            Current project information and status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground text-responsive-base">{projectInfo.name}</h3>
            <p className="text-muted-enhanced">{projectInfo.description}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-responsive-sm font-medium">Progress</span>
            <Badge variant="secondary" className="status-success">{projectInfo.status}</Badge>
          </div>
          <Progress value={projectInfo.progress} className="h-2" />

          <div className="grid grid-cols-2 gap-3 text-responsive-sm">
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

      {/* Enhanced Team Members */}
      <Card className="card-enhanced hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 heading-secondary text-lg">
            <Users className="w-5 h-5" />
            Active Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {projectInfo.team.map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200">
                <span className="text-responsive-sm font-medium">{agent}</span>
                <Badge variant="outline" className="status-success text-xs">Active</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Project Objectives */}
      <Card className="card-enhanced hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 heading-secondary text-lg">
            <FileText className="w-5 h-5" />
            Key Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {projectInfo.objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-3 text-responsive-sm">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Enhanced Recent Activity */}
      <Card className="card-enhanced hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 heading-secondary text-lg">
              <Calendar className="w-5 h-5" />
              Recent Activity
            </div>
            <Button variant="ghost" size="sm" className="hover-scale">
              <RefreshCcw className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="border-l-2 border-primary/20 pl-4 pb-3 hover:border-primary/40 transition-colors duration-200">
                <p className="text-responsive-sm font-medium">{activity.action}</p>
                <div className="flex items-center justify-between mt-2">
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
