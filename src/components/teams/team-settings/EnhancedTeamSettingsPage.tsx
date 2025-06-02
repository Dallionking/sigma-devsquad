
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTeams } from '@/contexts/TeamContext';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  Shield, 
  Bell, 
  Plug, 
  Archive, 
  BarChart3,
  ArrowLeft,
  Users,
  Eye
} from 'lucide-react';
import { TeamPerformanceDashboard } from '../performance/TeamPerformanceDashboard';

interface EnhancedTeamSettingsPageProps {
  teamId: string;
}

export const EnhancedTeamSettingsPage = ({ teamId }: EnhancedTeamSettingsPageProps) => {
  const { getTeamById } = useTeams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  
  const team = getTeamById(teamId);

  if (!team) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2">Team Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The team you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const settingsTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Plug },
    { id: 'archive', label: 'Archive', icon: Archive }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <Settings className="w-6 h-6 flex-shrink-0" />
                <span className="truncate">Team Settings</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <h2 className="text-lg text-muted-foreground truncate">{team.name}</h2>
                <Badge variant="secondary" className="capitalize">
                  {team.type}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {team.composition}
                </Badge>
                <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                  {team.status}
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {team.visibility || 'Public'}
              </Badge>
              <Badge variant="outline">
                {team.memberIds.length} members
              </Badge>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-6 h-auto">
            {settingsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id} 
                  className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-2 text-xs lg:text-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline lg:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  General team configuration and basic information settings will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-0">
            <TeamPerformanceDashboard team={team} />
          </TabsContent>

          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Team member management and role assignment will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Permissions & Access Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Team permissions and access control settings will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Team notification settings and preferences will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Team integration settings and external service connections will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archive">
            <Card>
              <CardHeader>
                <CardTitle>Archive & Deletion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Team archiving and deletion options will be implemented here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
