
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Target, TrendingUp, Plus, HelpCircle } from 'lucide-react';

export const TeamViewInfoPanel = () => {
  return (
    <div className="space-y-4">
      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/30 border-blue-200 dark:border-blue-800">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Users className="w-5 h-5" />
            Team Collaboration Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 dark:text-blue-200 mb-3">
            Manage your AI teams, track collaborative progress, and optimize team workflows. 
            Teams enable multiple agents to work together on complex projects.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="text-blue-700 border-blue-300 hover:bg-blue-100">
              <Plus className="w-4 h-4 mr-1" />
              Create Team
            </Button>
            <Button size="sm" variant="ghost" className="text-blue-600">
              <HelpCircle className="w-4 h-4 mr-1" />
              Team Guide
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
                <p className="text-2xl font-bold text-blue-600">4</p>
                <p className="text-xs text-muted-foreground">Active Teams</p>
              </div>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-green-600">12</p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
              <Target className="w-5 h-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Why Use Teams?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-blue-500" />
              <span className="text-xs">Collaborative problem solving</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-green-500" />
              <span className="text-xs">Shared knowledge base</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full bg-purple-500" />
              <span className="text-xs">Coordinated workflows</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
