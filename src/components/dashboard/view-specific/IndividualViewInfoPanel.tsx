
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Workflow, Calendar, MessageSquare } from 'lucide-react';

export const IndividualViewInfoPanel = () => {
  return (
    <div className="space-y-6">
      {/* AI Agents Overview */}
      <Card data-tour="individual-agents">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>Your AI Agents</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-muted-foreground">Completed Tasks</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Frontend Agent</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Backend Agent</span>
              <Badge variant="default">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">DevOps Agent</span>
              <Badge variant="secondary">Idle</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Management */}
      <Card data-tour="individual-workflow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Workflow className="w-5 h-5" />
            <span>Workflow Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Active Workflows</span>
            <Badge variant="default">3</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Pending Tasks</span>
            <Badge variant="secondary">8</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Completed Today</span>
            <Badge variant="outline">5</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Personal Tasks */}
      <Card data-tour="individual-tasks">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Personal Tasks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Integration</span>
              <Badge variant="default">In Progress</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">UI Component Library</span>
              <Badge variant="secondary">Planning</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Optimization</span>
              <Badge variant="outline">Review</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Agent Communication */}
      <Card data-tour="individual-communication">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>Agent Communication</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Active Conversations</span>
            <Badge variant="secondary">3</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Pending Responses</span>
            <Badge variant="destructive">2</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Recent Updates</span>
            <Badge variant="outline">5</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
