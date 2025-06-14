
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Brain, Zap, Target } from 'lucide-react';
import { FirstAgentFormData } from './types';
import { AGENT_TEMPLATES } from './constants';

interface AgentPreviewProps {
  agentData: FirstAgentFormData;
}

export const AgentPreview = ({ agentData }: AgentPreviewProps) => {
  const template = agentData.templateId 
    ? AGENT_TEMPLATES.find(t => t.id === agentData.templateId)
    : null;

  const displayName = agentData.name || (template?.name) || 'Unnamed Agent';
  const displayDescription = agentData.description || template?.description || 'No description provided';
  const displayCapabilities = agentData.capabilities.length > 0 ? agentData.capabilities : (template?.capabilities || []);

  const getAgentLevel = () => {
    const capabilityCount = displayCapabilities.length;
    if (capabilityCount <= 3) return 'Beginner';
    if (capabilityCount <= 6) return 'Intermediate';
    return 'Advanced';
  };

  const getAgentType = () => {
    if (template) return template.type;
    return 'Custom';
  };

  return (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <span>Agent Preview</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary text-lg font-bold">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-xl font-semibold">{displayName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {getAgentType()}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {getAgentLevel()}
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">{displayDescription}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-primary" />
              <h4 className="font-medium text-sm">Role & Specialization</h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {agentData.role && (
                <Badge variant="secondary" className="text-xs">
                  {agentData.role}
                </Badge>
              )}
              {agentData.specialization && (
                <Badge variant="outline" className="text-xs">
                  {agentData.specialization}
                </Badge>
              )}
              {!agentData.role && !agentData.specialization && (
                <span className="text-xs text-muted-foreground">No role configured</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-primary" />
              <h4 className="font-medium text-sm">Capabilities ({displayCapabilities.length})</h4>
            </div>
            <div className="flex flex-wrap gap-1">
              {displayCapabilities.slice(0, 4).map((capability) => (
                <Badge key={capability} variant="outline" className="text-xs">
                  {capability}
                </Badge>
              ))}
              {displayCapabilities.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{displayCapabilities.length - 4} more
                </Badge>
              )}
              {displayCapabilities.length === 0 && (
                <span className="text-xs text-muted-foreground">No capabilities configured</span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-accent/30 p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <h4 className="font-medium text-sm">Agent Readiness</h4>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Name & Description</span>
              <span className={agentData.name && agentData.description ? 'text-green-600' : 'text-yellow-600'}>
                {agentData.name && agentData.description ? '✓' : '⚠'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Role Configuration</span>
              <span className={agentData.role ? 'text-green-600' : 'text-yellow-600'}>
                {agentData.role ? '✓' : '⚠'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Capabilities</span>
              <span className={displayCapabilities.length > 0 ? 'text-green-600' : 'text-yellow-600'}>
                {displayCapabilities.length > 0 ? '✓' : '⚠'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
