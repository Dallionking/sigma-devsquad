
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Brain, Zap, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { FirstAgentFormData } from './types';
import { AGENT_TEMPLATES } from './constants';

interface AgentPreviewProps {
  agentData: FirstAgentFormData;
}

export const AgentPreview = ({ agentData }: AgentPreviewProps) => {
  const template = agentData.templateId 
    ? AGENT_TEMPLATES.find(t => t.id === agentData.templateId)
    : null;

  const displayName = agentData.name || template?.name || 'Unnamed Agent';
  const displayDescription = agentData.description || template?.description || 'No description provided';
  const displayCapabilities = agentData.capabilities.length > 0 ? agentData.capabilities : (template?.capabilities || []);
  const displaySpecialization = agentData.specialization || template?.specialization || 'General';

  const getAgentLevel = () => {
    const capabilityCount = displayCapabilities.length;
    if (capabilityCount <= 3) return 'Beginner';
    if (capabilityCount <= 6) return 'Intermediate';
    return 'Advanced';
  };

  const getAgentType = () => {
    if (template) return 'Template';
    return 'Custom';
  };

  const getReadinessStatus = () => {
    const hasName = displayName && displayName !== 'Unnamed Agent';
    const hasDescription = displayDescription && displayDescription !== 'No description provided';
    const hasCapabilities = displayCapabilities.length > 0;
    
    const completedItems = [hasName, hasDescription, hasCapabilities].filter(Boolean).length;
    const totalItems = 3;
    
    return {
      completed: completedItems,
      total: totalItems,
      percentage: Math.round((completedItems / totalItems) * 100),
      isReady: completedItems >= 2 // At least name and capabilities required
    };
  };

  const readiness = getReadinessStatus();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Bot className="w-5 h-5" />
        Agent Preview
      </h3>
      
      <Card className="border-2 border-dashed border-primary/20">
        <CardHeader>
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
                  <Badge 
                    variant={readiness.isReady ? "default" : "destructive"} 
                    className="text-xs"
                  >
                    {readiness.isReady ? "Ready" : "Incomplete"}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{displayDescription}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-sm">Specialization</h4>
              </div>
              <div>
                <Badge variant="outline" className="text-xs">
                  {displaySpecialization}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-sm">Capabilities ({displayCapabilities.length})</h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {displayCapabilities.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">No capabilities configured</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-accent/30 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-sm">Configuration Status</h4>
              </div>
              <div className="text-sm font-medium">
                {readiness.completed}/{readiness.total} Complete
              </div>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span>Agent Name</span>
                {displayName && displayName !== 'Unnamed Agent' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span>Description</span>
                {displayDescription && displayDescription !== 'No description provided' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <span>Capabilities</span>
                {displayCapabilities.length > 0 ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                )}
              </div>
            </div>
            
            <div className="mt-3 bg-background rounded p-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Readiness</span>
                <span>{readiness.percentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    readiness.isReady ? 'bg-green-600' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${readiness.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
