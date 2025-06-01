
import React from 'react';
import { EnhancedAgentOverview } from '@/components/dashboard/EnhancedAgentOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Bot } from 'lucide-react';

const AgentConfiguration = () => {
  console.log('AgentConfiguration page is rendering');
  
  const handleAgentSelect = (agent: any) => {
    console.log('Agent selected:', agent);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Settings className="w-8 h-8" />
            Agent Configuration
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and configure your AI agents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <EnhancedAgentOverview onAgentSelect={handleAgentSelect} />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Common agent management tasks
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <p className="font-medium">Create Agent</p>
                      <p className="text-xs text-muted-foreground">Add new agent</p>
                    </div>
                    <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                      <p className="font-medium">Import Config</p>
                      <p className="text-xs text-muted-foreground">Load from file</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Agents</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Configurations</span>
                    <span className="text-sm font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Status</span>
                    <span className="text-sm font-medium text-green-600">Healthy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfiguration;
