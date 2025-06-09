
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Link, 
  Github, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Zap,
  Settings,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface TeamIntegration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  configured: boolean;
  config?: Record<string, any>;
}

interface TeamIntegrationSettingsProps {
  integrations: TeamIntegration[];
  onIntegrationToggle: (integrationId: string, enabled: boolean) => void;
  onIntegrationConfigure: (integrationId: string, config: Record<string, any>) => void;
}

export const TeamIntegrationSettings = ({ 
  integrations, 
  onIntegrationToggle,
  onIntegrationConfigure 
}: TeamIntegrationSettingsProps) => {
  const [configuringIntegration, setConfiguringIntegration] = useState<string | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleConfigure = (integration: TeamIntegration) => {
    setConfiguringIntegration(integration.id);
    setConfigValues(integration.config || {});
  };

  const handleSaveConfig = (integrationId: string) => {
    onIntegrationConfigure(integrationId, configValues);
    setConfiguringIntegration(null);
    setConfigValues({});
    toast({
      title: "Integration Configured",
      description: "Settings have been saved successfully.",
    });
  };

  const handleTestConnection = async (integration: TeamIntegration) => {
    // Simulate testing connection
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${integration.name}...`,
    });
    
    // Simulate async test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: `Successfully connected to ${integration.name}!`,
      });
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link className="w-5 h-5" />
          External Integrations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertDescription>
            Connect your team with external tools to streamline workflows and enhance productivity.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            const isConfiguring = configuringIntegration === integration.id;
            
            return (
              <div key={integration.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{integration.name}</h4>
                        {integration.configured ? (
                          <Badge variant="default" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Configured
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            <XCircle className="w-3 h-3 mr-1" />
                            Not Configured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={integration.enabled}
                      onCheckedChange={(enabled) => onIntegrationToggle(integration.id, enabled)}
                      disabled={!integration.configured}
                    />
                  </div>
                </div>

                {!integration.configured && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfigure(integration)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                )}

                {integration.configured && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfigure(integration)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Reconfigure
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTestConnection(integration)}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Test Connection
                    </Button>
                  </div>
                )}

                {/* Configuration Form */}
                {isConfiguring && (
                  <div className="border-t pt-4 space-y-3">
                    <h5 className="font-medium">Configure {integration.name}</h5>
                    
                    {integration.id === 'github' && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="github-token">GitHub Personal Access Token</Label>
                          <Input
                            id="github-token"
                            type="password"
                            placeholder="ghp_xxxxxxxxxxxxxxxxxx"
                            value={configValues.token || ''}
                            onChange={(e) => setConfigValues({...configValues, token: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="github-repo">Repository (optional)</Label>
                          <Input
                            id="github-repo"
                            placeholder="owner/repository"
                            value={configValues.repository || ''}
                            onChange={(e) => setConfigValues({...configValues, repository: e.target.value})}
                          />
                        </div>
                      </div>
                    )}

                    {integration.id === 'slack' && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                          <Input
                            id="slack-webhook"
                            placeholder="https://hooks.slack.com/services/..."
                            value={configValues.webhookUrl || ''}
                            onChange={(e) => setConfigValues({...configValues, webhookUrl: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="slack-channel">Default Channel</Label>
                          <Input
                            id="slack-channel"
                            placeholder="#general"
                            value={configValues.channel || ''}
                            onChange={(e) => setConfigValues({...configValues, channel: e.target.value})}
                          />
                        </div>
                      </div>
                    )}

                    {integration.id === 'discord' && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="discord-webhook">Discord Webhook URL</Label>
                          <Input
                            id="discord-webhook"
                            placeholder="https://discord.com/api/webhooks/..."
                            value={configValues.webhookUrl || ''}
                            onChange={(e) => setConfigValues({...configValues, webhookUrl: e.target.value})}
                          />
                        </div>
                      </div>
                    )}

                    {integration.id === 'calendar' && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="calendar-api">Calendar API Key</Label>
                          <Input
                            id="calendar-api"
                            type="password"
                            placeholder="Enter your calendar API key"
                            value={configValues.apiKey || ''}
                            onChange={(e) => setConfigValues({...configValues, apiKey: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="calendar-id">Calendar ID</Label>
                          <Input
                            id="calendar-id"
                            placeholder="primary"
                            value={configValues.calendarId || ''}
                            onChange={(e) => setConfigValues({...configValues, calendarId: e.target.value})}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => handleSaveConfig(integration.id)}
                      >
                        Save Configuration
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setConfiguringIntegration(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="font-medium">Available Integrations</h4>
          <p className="text-sm text-muted-foreground">
            More integrations coming soon. Have a specific tool you'd like to see integrated?{' '}
            <Button variant="link" className="p-0 h-auto">
              <ExternalLink className="w-3 h-3 mr-1" />
              Request an integration
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
