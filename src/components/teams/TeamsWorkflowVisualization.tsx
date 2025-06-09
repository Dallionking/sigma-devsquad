
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTeams } from "@/contexts/TeamContext";
import { Team, AgentProfile } from "@/types/teams";
import { ResponsiveContainer, Sankey } from "recharts";
import { MessageSquare, ArrowRight, Clock, CheckCircle } from "lucide-react";

interface TeamsWorkflowVisualizationProps {
  onTeamSelect: (team: Team) => void;
  onAgentSelect: (agent: AgentProfile) => void;
}

export const TeamsWorkflowVisualization = ({
  onTeamSelect,
  onAgentSelect
}: TeamsWorkflowVisualizationProps) => {
  const { teams, agentProfiles, getTeamTasks, getTeamCommunications } = useTeams();

  // Calculate team statistics
  const teamStats = teams.map(team => {
    const tasks = getTeamTasks(team.id);
    const communications = getTeamCommunications(team.id);
    const members = agentProfiles.filter(agent => agent.teamId === team.id);
    
    return {
      ...team,
      taskCount: tasks.length,
      completedTasks: tasks.filter(t => t.status === "completed").length,
      activeTasks: tasks.filter(t => t.status === "in-progress").length,
      messageCount: communications.length,
      activeMembers: members.filter(m => m.availability === "available").length,
      totalMembers: members.length
    };
  });

  // Prepare data for workflow visualization
  const workflowData = {
    nodes: [
      // Planning Agent as CEO
      { id: 'planning', name: 'Planning Agent (CEO)', category: 'planning' },
      
      // Teams
      ...teams.map(team => ({
        id: team.id,
        name: team.name,
        category: 'team'
      })),
      
      // Key deliverables
      { id: 'ui-components', name: 'UI Components', category: 'deliverable' },
      { id: 'api-services', name: 'API Services', category: 'deliverable' },
      { id: 'infrastructure', name: 'Infrastructure', category: 'deliverable' },
      { id: 'testing', name: 'Quality Assurance', category: 'deliverable' }
    ],
    links: [
      // Planning Agent to Teams
      { source: 'planning', target: 'team_frontend', value: 8 },
      { source: 'planning', target: 'team_backend', value: 6 },
      { source: 'planning', target: 'team_devops', value: 4 },
      
      // Teams to Deliverables
      { source: 'team_frontend', target: 'ui-components', value: 10 },
      { source: 'team_backend', target: 'api-services', value: 8 },
      { source: 'team_devops', target: 'infrastructure', value: 6 },
      
      // Cross-team collaboration
      { source: 'team_frontend', target: 'team_backend', value: 3 },
      { source: 'team_backend', target: 'team_devops', value: 2 }
    ]
  };

  const getTeamColorClass = (teamType: string) => {
    const colorMap = {
      frontend: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
      backend: "border-l-green-500 bg-green-50 dark:bg-green-950/20",
      devops: "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
      qa: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20",
      data: "border-l-indigo-500 bg-indigo-50 dark:bg-indigo-950/20",
      design: "border-l-pink-500 bg-pink-50 dark:bg-pink-950/20",
      product: "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20"
    };
    return colorMap[teamType as keyof typeof colorMap] || "border-l-gray-500 bg-gray-50";
  };

  return (
    <div className="space-y-6">
      {/* Planning Agent CEO Overview */}
      <Card className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            Planning Agent - Workforce CEO
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{teams.length}</div>
              <div className="text-sm text-muted-foreground">Active Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {agentProfiles.filter(a => a.availability === "available").length}
              </div>
              <div className="text-sm text-muted-foreground">Available Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {teamStats.reduce((sum, team) => sum + team.activeTasks, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Active Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {teamStats.reduce((sum, team) => sum + team.messageCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Communications</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamStats.map((team) => (
          <Card 
            key={team.id}
            className={`border-l-4 cursor-pointer hover:shadow-lg transition-all duration-200 ${getTeamColorClass(team.type)}`}
            onClick={() => onTeamSelect(team)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">
                    {team.type === 'frontend' && '🎨'}
                    {team.type === 'backend' && '⚙️'}
                    {team.type === 'devops' && '🚀'}
                    {team.type === 'qa' && '🧪'}
                    {team.type === 'data' && '📊'}
                    {team.type === 'design' && '✨'}
                    {team.type === 'product' && '📋'}
                  </span>
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                </div>
                <Badge variant="secondary">{team.status}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Team Metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-white/50 dark:bg-black/20 rounded">
                  <div className="text-lg font-semibold">{team.activeMembers}/{team.totalMembers}</div>
                  <div className="text-xs text-muted-foreground">Members</div>
                </div>
                <div className="text-center p-2 bg-white/50 dark:bg-black/20 rounded">
                  <div className="text-lg font-semibold">{team.activeTasks}</div>
                  <div className="text-xs text-muted-foreground">Active Tasks</div>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Task Completion</span>
                  <span>{team.taskCount > 0 ? Math.round((team.completedTasks / team.taskCount) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                    style={{ 
                      width: `${team.taskCount > 0 ? (team.completedTasks / team.taskCount) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>

              {/* Communication Activity */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{team.messageCount} messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>{team.activeTasks}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{team.completedTasks}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Communication Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Team Communication Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-lg font-semibold">Planning Agent</span>
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
                <div className="flex gap-2">
                  {teams.map((team) => (
                    <div key={team.id} className={`p-3 rounded-lg text-sm ${getTeamColorClass(team.type)}`}>
                      {team.name}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">
                Real-time communication flows and task delegation patterns
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
