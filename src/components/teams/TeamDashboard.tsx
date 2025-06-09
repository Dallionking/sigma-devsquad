
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTeams } from "@/contexts/TeamContext";
import { Team, AgentProfile } from "@/types/teams";
import { TrendingUp, TrendingDown, Minus, Users, Target, Clock, CheckCircle } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface TeamDashboardProps {
  team: Team | null;
  onAgentSelect?: (profile: AgentProfile | null) => void;
}

export const TeamDashboard = ({ team, onAgentSelect }: TeamDashboardProps) => {
  const { getTeamMembers, getTeamTasks, getAgentProfileById } = useTeams();
  
  // Early return if no team is selected
  if (!team) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">No Team Selected</h3>
          <p className="text-muted-foreground">Select a team to view its dashboard</p>
        </div>
      </div>
    );
  }
  
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
    <div className="h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Team Header - Compact */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{team.name}</h1>
            <p className="text-muted-foreground text-sm">{team.description}</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
            {team.status}
          </Badge>
        </div>

        {/* Key Metrics - Single Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-xl font-bold">{activeMembers}/{members.length}</p>
              </div>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion</p>
                <p className="text-xl font-bold">{completionRate.toFixed(0)}%</p>
                <Progress value={completionRate} className="mt-1 h-2" />
              </div>
              <Target className="w-6 h-6 text-green-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-xl font-bold">{inProgressTasks}</p>
              </div>
              <Clock className="w-6 h-6 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-bold">{completedTasks}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-emerald-500" />
            </div>
          </Card>
        </div>

        {/* Main Content Grid - 2 columns */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - KPIs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Team KPIs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {team.kpis.slice(0, 3).map((kpi) => (
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
                  <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Target: {kpi.target}{kpi.unit}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Middle Column - Performance Chart */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <XAxis dataKey="week" fontSize={12} />
                    <YAxis fontSize={12} />
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

          {/* Right Column - Objectives */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Team Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {team.objectives.slice(0, 4).map((objective, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
