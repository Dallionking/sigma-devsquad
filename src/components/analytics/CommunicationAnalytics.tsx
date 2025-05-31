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
  Radar
} from "recharts";
import { MessageSquare, Users, Zap, Network, TrendingUp } from "lucide-react";

interface CommunicationAnalyticsProps {
  agents: Agent[];
}

export const CommunicationAnalytics = ({ agents }: CommunicationAnalyticsProps) => {
  // Mock communication data
  const communicationVolume = [
    { hour: '00', messages: 12, responses: 10 },
    { hour: '04', messages: 8, responses: 7 },
    { hour: '08', messages: 45, responses: 42 },
    { hour: '12', messages: 38, responses: 35 },
    { hour: '16', messages: 52, responses: 48 },
    { hour: '20', messages: 28, responses: 25 }
  ];

  const communicationEfficiency = [
    { metric: 'Response Time', score: 85 },
    { metric: 'Message Clarity', score: 92 },
    { metric: 'Collaboration', score: 78 },
    { metric: 'Knowledge Sharing', score: 88 },
    { metric: 'Problem Resolution', score: 83 },
    { metric: 'Coordination', score: 90 }
  ];

  const agentInteractions = agents.map(agent => ({
    name: agent.name,
    type: agent.type,
    interactions: Math.floor(Math.random() * 50) + 10,
    responseRate: Math.floor(Math.random() * 30) + 70,
    avgResponseTime: (Math.random() * 3 + 0.5).toFixed(1)
  })).sort((a, b) => b.interactions - a.interactions);

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Communication Overview</TabsTrigger>
        <TabsTrigger value="team-flow">Enhanced Team Flow</TabsTrigger>
        <TabsTrigger value="patterns">Communication Patterns</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Communication Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Network className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Volume Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Communication Volume Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={communicationVolume}>
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="messages" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                    name="Messages Sent"
                  />
                  <Area 
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
      </TabsContent>

      <TabsContent value="team-flow" className="space-y-6">
        <TeamCommunicationFlow agents={agents} />
      </TabsContent>

      <TabsContent value="patterns" className="space-y-6">
        {/* Communication Efficiency Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                Communication Efficiency
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

          {/* Top Communicators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Most Active Communicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentInteractions.slice(0, 6).map((agent, index) => (
                  <div key={agent.name} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-6 h-6 p-0 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{agent.interactions}</div>
                      <div className="text-xs text-muted-foreground">interactions</div>
                      <div className="text-xs text-green-600">{agent.responseRate}% response</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};
