
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EnhancedAgentOverview } from '@/components/dashboard/EnhancedAgentOverview';
import { PerformanceSettings } from '@/components/agent-config/PerformanceSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Bot, ArrowLeft, Zap } from 'lucide-react';
import { AgentType } from '@/types';

const AgentConfiguration = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const [selectedAgentType, setSelectedAgentType] = useState<AgentType>('planning');
  
  console.log('AgentConfiguration page is rendering with section:', section);
  
  const handleAgentSelect = (agent: any) => {
    console.log('Agent selected:', agent);
    if (agent?.type) {
      setSelectedAgentType(agent.type);
    }
  };

  const handleConfigChange = () => {
    console.log('Configuration changed');
  };

  const handleBackToOverview = () => {
    navigate('/agent-configuration');
  };

  // If we're in the performance section, show the performance settings
  if (section === 'performance') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button 
              onClick={handleBackToOverview}
              variant="ghost" 
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Zap className="w-8 h-8" />
              Performance Settings
            </h1>
            <p className="text-muted-foreground mt-2">
              Configure performance parameters and optimization settings for your agents
            </p>
          </div>

          <PerformanceSettings 
            agentType={selectedAgentType}
            onConfigChange={handleConfigChange}
          />
        </div>
      </div>
    );
  }

  // Default overview page
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

            <Card>
              <CardHeader>
                <CardTitle>Configuration Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/agent-configuration/performance')}
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Performance Settings
                  </Button>
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
