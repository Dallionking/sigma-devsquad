
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Settings, 
  ExternalLink,
  Send,
  Bell,
  Zap,
  Wifi,
  WifiOff
} from "lucide-react";

interface ExternalIntegrationsProps {
  roomId: string;
}

export const ExternalIntegrations = ({ roomId }: ExternalIntegrationsProps) => {
  const [discordEnabled, setDiscordEnabled] = useState(false);
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [botToken, setBotToken] = useState("");
  const [channelId, setChannelId] = useState("");

  const integrations = [
    {
      id: "discord",
      name: "Discord",
      description: "Send messages to Discord channels",
      enabled: discordEnabled,
      setEnabled: setDiscordEnabled,
      icon: MessageSquare,
      status: discordEnabled ? "connected" : "disconnected",
      fields: [
        { name: "webhookUrl", label: "Webhook URL", value: webhookUrl, setValue: setWebhookUrl }
      ]
    },
    {
      id: "telegram",
      name: "Telegram",
      description: "Forward messages to Telegram chats",
      enabled: telegramEnabled,
      setEnabled: setTelegramEnabled,
      icon: Send,
      status: telegramEnabled ? "connected" : "disconnected",
      fields: [
        { name: "botToken", label: "Bot Token", value: botToken, setValue: setBotToken },
        { name: "channelId", label: "Channel ID", value: channelId, setValue: setChannelId }
      ]
    },
    {
      id: "slack",
      name: "Slack",
      description: "Integrate with Slack workspaces",
      enabled: slackEnabled,
      setEnabled: setSlackEnabled,
      icon: MessageSquare,
      status: slackEnabled ? "connected" : "disconnected",
      fields: [
        { name: "webhookUrl", label: "Webhook URL", value: webhookUrl, setValue: setWebhookUrl }
      ]
    }
  ];

  const handleTestConnection = (integrationId: string) => {
    console.log(`Testing connection for ${integrationId}`);
    // Mock test functionality
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5" />
            External Integrations
            <Badge variant="outline" className="ml-auto">
              {integrations.filter(i => i.enabled).length} active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="integrations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="integrations" className="space-y-4">
              {integrations.map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={integration.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{integration.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {integration.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {integration.enabled ? (
                              <Wifi className="w-4 h-4 text-green-500" />
                            ) : (
                              <WifiOff className="w-4 h-4 text-gray-400" />
                            )}
                            <Badge 
                              variant={integration.enabled ? "default" : "secondary"}
                              className={integration.enabled ? "bg-green-500" : ""}
                            >
                              {integration.status}
                            </Badge>
                          </div>
                          <Switch
                            checked={integration.enabled}
                            onCheckedChange={integration.setEnabled}
                          />
                        </div>
                      </div>
                      
                      {integration.enabled && (
                        <div className="space-y-3">
                          {integration.fields.map((field) => (
                            <div key={field.name} className="space-y-1">
                              <label className="text-sm font-medium">
                                {field.label}
                              </label>
                              <Input
                                placeholder={`Enter ${field.label.toLowerCase()}...`}
                                value={field.value}
                                onChange={(e) => field.setValue(e.target.value)}
                                type={field.name.includes('token') ? 'password' : 'text'}
                              />
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTestConnection(integration.id)}
                            className="w-full"
                          >
                            <Zap className="w-4 h-4 mr-2" />
                            Test Connection
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Global Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-retry failed messages</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatically retry sending messages that fail
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Real-time notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Send notifications immediately when events occur
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Message formatting</h4>
                      <p className="text-sm text-muted-foreground">
                        Apply rich formatting to outgoing messages
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Discord message sent</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Telegram connection established</p>
                        <p className="text-xs text-muted-foreground">15 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Slack webhook test failed</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
