
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "@/types";
import { TeamCommunicationFlow } from "./TeamCommunicationFlow";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  BarChart,
  Bar
} from "recharts";
import { MessageSquare, Users, Zap, Network, TrendingUp, Activity, Clock } from "lucide-react";

interface CommunicationAnalyticsProps {
  agents: Agent[];
}

export const CommunicationAnalytics = ({ agents }: CommunicationAnalyticsProps) => {
  // Mock communication data for analytics
  const communicationVolume = [
    { hour: '00', messages: 12, responses: 10, efficiency: 83 },
    { hour: '04', messages: 8, responses: 7, efficiency: 88 },
    { hour: '08', messages: 45, responses: 42, efficiency: 93 },
    { hour: '12', messages: 38, responses: 35, efficiency: 92 },
    { hour: '16', messages: 52, responses: 48, efficiency: 92 },
    { hour: '20', messages: 28, responses: 25, efficiency: 89 }
  ];

  const communicationEfficiency = [
    { metric: 'Response Time', score: 85 },
    { metric: 'Message Clarity', score: 92 },
    { metric: 'Collaboration', score: 78 },
    { metric: 'Knowledge Sharing', score: 88 },
    { metric: 'Problem Resolution', score: 83 },
    { metric: 'Coordination', score: 90 }
  ];

  const agentPerformanceData = agents.map(agent => ({
    name: agent.name,
    type: agent.type,
    interactions: Math.floor(Math.random() * 50) + 10,
    responseRate: Math.floor(Math.random() * 30) + 70,
    avgResponseTime: (Math.random() * 3 + 0.5).toFixed(1),
    efficiency: Math.floor(Math.random() * 20) + 80
  })).sort((a, b) => b.interactions - a.interactions);

  const communicationTrends = [
    { day: 'Mon', internal: 120, external: 45, efficiency: 89 },
    { day: 'Tue', internal: 135, external: 52, efficiency: 91 },
    { day: 'Wed', internal: 148, external: 38, efficiency: 93 },
    { day: 'Thu', internal: 162, external: 67, efficiency: 88 },
    { day: 'Fri', internal: 178, external: 73, efficiency: 92 },
    { day: 'Sat', internal: 95, external: 28, efficiency: 94 },
    { day: 'Sun', internal: 87, external: 22, efficiency: 96 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Communication Analytics Dashboard
        </h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of agent communication patterns, efficiency metrics, and performance insights
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="team-flow">Team Communication Flow</TabsTrigger>
          <TabsTrigger value="patterns">Pattern Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Enhanced Communication Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Messages</p>
                    <p className="text-2xl font-bold">1,247</p>
                    <Badge variant="secondary" className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                      +12% from yesterday
                    </Badge>
                  </div>
                  <MessageSquare className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-bold">94.2%</p>
                    <Badge variant="secondary" className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                      +2.1% improvement
                    </Badge>
                  </div>
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold">1.8s</p>
                    <Badge variant="secondary" className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                      -0.3s faster
                    </Badge>
                  </div>
                  <Clock className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Communication Efficiency</p>
                    <p className="text-2xl font-bold">91.5%</p>
                    <Badge variant="secondary" className="mt-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300">
                      +1.8% this week
                    </Badge>
                  </div>
                  <Activity className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Communication Volume and Efficiency Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Communication Volume & Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={communicationVolume}>
                      <XAxis dataKey="hour" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="messages" 
                        stackId="1"
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.6}
                        name="Messages Sent"
                      />
                      <Area 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="responses" 
                        stackId="2"
                        stroke="#10B981" 
                        fill="#10B981" 
                        fillOpacity={0.4}
                        name="Responses"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Communication Efficiency Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={communicationEfficiency}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name="Efficiency Score"
                        dataKey="score"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Agents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Agent Communication Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformanceData.slice(0, 8).map((agent, index) => (
                  <div key={agent.name} className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg border">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="w-8 h-8 p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <div className="font-bold">{agent.interactions}</div>
                        <div className="text-xs text-muted-foreground">interactions</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-600">{agent.responseRate}%</div>
                        <div className="text-xs text-muted-foreground">response rate</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-600">{agent.avgResponseTime}s</div>
                        <div className="text-xs text-muted-foreground">avg response</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-600">{agent.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">efficiency</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team-flow" className="space-y-6">
          <TeamCommunicationFlow agents={agents} />
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Weekly Communication Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={communicationTrends}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="internal" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        name="Internal Communications"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="external" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        name="External Communications"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Communication Type Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={communicationTrends}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="internal" fill="#3B82F6" name="Internal" />
                      <Bar dataKey="external" fill="#10B981" name="External" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Efficiency Trends Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={communicationTrends}>
                    <XAxis dataKey="day" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="#F59E0B" 
                      strokeWidth={4}
                      name="Communication Efficiency %"
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
