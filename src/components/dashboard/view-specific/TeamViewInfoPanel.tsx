
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, Calendar, MessageSquare } from 'lucide-react';

export const TeamViewInfoPanel = () => {
  return (
    <div className="space-y-6">
      {/* Team Overview */}
      <Card data-tour="team-overview">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Team Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Active Teams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Frontend Team</span>
              <Badge variant="secondary">5 members</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backend Team</span>
              <Badge variant="secondary">4 members</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">DevOps Team</span>
              <Badge variant="secondary">3 members</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Collaboration */}
      <Card data-tour="team-collaboration">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5" />
            <span>Active Collaboration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Online Members</span>
            <Badge variant="default">8 of 12</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Active Projects</span>
            <Badge variant="secondary">4</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Live Sessions</span>
            <Badge variant="outline">2</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Team Projects */}
      <Card data-tour="team-projects">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Team Projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">E-commerce Platform</span>
              <Badge variant="default">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Mobile App Redesign</span>
              <Badge variant="secondary">Planning</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Migration</span>
              <Badge variant="outline">Review</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Communication Hub */}
      <Card data-tour="team-communication">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Communication Hub</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Active Channels</span>
            <Badge variant="secondary">6</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Unread Messages</span>
            <Badge variant="destructive">12</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Recent Discussions</span>
            <Badge variant="outline">8</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
