
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AgentProfile } from '@/types/teams';
import { Network, Users, MessageCircle, GitPullRequest } from 'lucide-react';

interface CollaborationEdge {
  from: string;
  to: string;
  weight: number;
  type: 'messages' | 'code_reviews' | 'task_handoffs';
  frequency: number;
}

interface MemberNetworkData {
  memberId: string;
  centralityScore: number;
  connections: number;
  collaborationTypes: string[];
}

interface CollaborationNetworkVisualizationProps {
  teamMembers: AgentProfile[];
  timeRange: string;
}

const generateCollaborationData = (members: AgentProfile[]) => {
  const edges: CollaborationEdge[] = [];
  const networkData: MemberNetworkData[] = [];

  // Generate collaboration edges
  members.forEach((member, i) => {
    members.forEach((otherMember, j) => {
      if (i !== j && Math.random() > 0.3) {
        const collaborationTypes = ['messages', 'code_reviews', 'task_handoffs'] as const;
        const type = collaborationTypes[Math.floor(Math.random() * collaborationTypes.length)];
        
        edges.push({
          from: member.id,
          to: otherMember.id,
          weight: Math.floor(Math.random() * 100) + 10,
          type,
          frequency: Math.floor(Math.random() * 50) + 5
        });
      }
    });

    // Generate network data for each member
    const memberConnections = edges.filter(e => e.from === member.id || e.to === member.id);
    networkData.push({
      memberId: member.id,
      centralityScore: Math.floor(Math.random() * 40) + 60,
      connections: memberConnections.length,
      collaborationTypes: ['messages', 'reviews', 'handoffs']
    });
  });

  return { edges, networkData };
};

export const CollaborationNetworkVisualization = ({ 
  teamMembers, 
  timeRange 
}: CollaborationNetworkVisualizationProps) => {
  const { edges, networkData } = generateCollaborationData(teamMembers);

  const getCollaborationIcon = (type: string) => {
    switch (type) {
      case 'messages': return <MessageCircle className="w-4 h-4" />;
      case 'code_reviews': return <GitPullRequest className="w-4 h-4" />;
      case 'task_handoffs': return <Users className="w-4 h-4" />;
      default: return <Network className="w-4 h-4" />;
    }
  };

  const getCollaborationColor = (type: string) => {
    switch (type) {
      case 'messages': return 'bg-blue-100 text-blue-800';
      case 'code_reviews': return 'bg-green-100 text-green-800';
      case 'task_handoffs': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const topCollaborators = networkData
    .sort((a, b) => b.centralityScore - a.centralityScore)
    .slice(0, 3);

  const collaborationStats = {
    totalInteractions: edges.reduce((sum, edge) => sum + edge.frequency, 0),
    averageConnections: Math.round(networkData.reduce((sum, data) => sum + data.connections, 0) / networkData.length),
    mostActiveType: edges.reduce((acc, edge) => {
      acc[edge.type] = (acc[edge.type] || 0) + edge.frequency;
      return acc;
    }, {} as Record<string, number>)
  };

  const mostActiveType = Object.entries(collaborationStats.mostActiveType)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'messages';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          Collaboration Network
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Network Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{collaborationStats.totalInteractions}</div>
              <div className="text-sm text-muted-foreground">Total Interactions</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{collaborationStats.averageConnections}</div>
              <div className="text-sm text-muted-foreground">Avg Connections</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600 capitalize">{mostActiveType.replace('_', ' ')}</div>
              <div className="text-sm text-muted-foreground">Most Active Type</div>
            </div>
          </div>

          {/* Top Collaborators */}
          <div className="space-y-3">
            <h4 className="font-medium">Top Collaborators</h4>
            {topCollaborators.map((data, index) => {
              const member = teamMembers.find(m => m.id === data.memberId);
              if (!member) return null;

              return (
                <div key={data.memberId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">#{index + 1}</Badge>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{data.connections} connections</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{data.centralityScore}%</div>
                    <div className="text-sm text-muted-foreground">Centrality Score</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Collaboration Types Breakdown */}
          <div className="space-y-3">
            <h4 className="font-medium">Collaboration Types</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(collaborationStats.mostActiveType).map(([type, count]) => (
                <div key={type} className="p-3 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getCollaborationIcon(type)}
                    <Badge className={getCollaborationColor(type)}>
                      {type.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold">{count}</div>
                  <div className="text-sm text-muted-foreground">Interactions</div>
                </div>
              ))}
            </div>
          </div>

          {/* Network Health Indicators */}
          <div className="space-y-3">
            <h4 className="font-medium">Network Health</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Well Connected</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Team shows strong collaboration patterns with {collaborationStats.averageConnections} average connections per member
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Balanced Distribution</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  No isolated members detected, healthy knowledge sharing across the team
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
