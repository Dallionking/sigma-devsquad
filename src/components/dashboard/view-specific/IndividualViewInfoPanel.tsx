
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Zap, Activity, Plus, HelpCircle, Settings } from 'lucide-react';

export const IndividualViewInfoPanel = () => {
  return (
    <div className="space-y-4">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/30 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
            <Bot className="w-5 h-5" />
            Agent Management Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-700 dark:text-purple-200 mb-3">
            Configure, monitor, and optimize individual AI agents. Each agent specializes 
            in specific tasks and can work independently or as part of a team.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="text-purple-700 border-purple-300 hover:bg-purple-100">
              <Plus className="w-4 h-4 mr-1" />
              Create Agent
            </Button>
            <Button size="sm" variant="ghost" className="text-purple-600">
              <Settings className="w-4 h-4 mr-1" />
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">8</p>
                <p className="text-xs text-muted-foreground">Active Agents</p>
              </div>
              <Bot className="w-5 h-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-xs text-muted-foreground">Efficiency</p>
              </div>
              <Zap className="w-5 h-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Types */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Agent Specializations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-blue-500" />
              <span className="text-xs">Frontend Development</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500" />
              <span className="text-xs">Backend Services</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-orange-500" />
              <span className="text-xs">QA & Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-red-500" />
              <span className="text-xs">DevOps & Deployment</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
