
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTeams } from "@/contexts/TeamContext";
import { Team, AgentProfile } from "@/types/teams";
import { TrendingUp, TrendingDown, Minus, Users, Target, Clock, CheckCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface TeamDashboardProps {
  team: Team;
}

export const TeamDashboard = ({ team }: TeamDashboardProps) => {
  const { getTeamMembers, getTeamTasks, getAgentProfileById } = useTeams();
  
  const members = getTeamMembers(team.id);
  const tasks = getTeamTasks(team.id);
  const teamLead = team.leaderId ? getAgentProfileById(team.leaderId) : null;
  
  // Calculate team metrics
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
  const blockedTasks = tasks.filter(t => t.status === "blocked").length;
  const completionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  
  const activeMembers = members.filter(m => m.availability === "available").length;
  const avgPerformance = members.length > 0 
    ? members.reduce((sum, m) => sum + m.performanceRating, 0) / members.length 
    : 0;

  // Mock performance data for chart
  const performanceData = [
    { week: 'W1', performance: 85 },
    { week: 'W2', performance: 88 },
    { week: 'W3', performance: 92 },
    { week: 'W4', performance: 89 },
    { week: 'W5', performance: 95 },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down": return <TrendingDown className="w-4 h-4 text-red-500" />;
      case "stable": return <Minus className="w-4 h-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Team Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{team.name}</CardTitle>
              <p className="text-muted-foreground mt-1">{team.description}</p>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-950 dark:to-indigo-950 dark:text-blue-300"
            >
              {team.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-bold">{activeMembers}/{members.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Task Completion</p>
                <p className="text-2xl font-bold">{completionRate.toFixed(0)}%</p>
                <Progress value={completionRate} className="mt-2" />
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTasks}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedTasks}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team KPIs */}
        <Card>
          <CardHeader>
            <CardTitle>Team KPIs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {team.kpis.map((kpi) => (
              <div key={kpi.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{kpi.name}</span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(kpi.trend)}
                    <span className="text-sm font-bold">
                      {kpi.value}{kpi.unit}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={(kpi.value / kpi.target) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground">
                  Target: {kpi.target}{kpi.unit}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Team Objectives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {team.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <p className="text-sm">{objective}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
