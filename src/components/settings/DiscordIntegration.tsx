
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ValidatedSettingItem } from "./ValidatedSettingItem";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { MessageSquare, Send, CheckCircle, Info, Hash, Server } from "lucide-react";

interface DiscordIntegrationProps {
  searchQuery?: string;
}

export const DiscordIntegration = ({ searchQuery = "" }: DiscordIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [serverName, setServerName] = useState("");
  const [channelName, setChannelName] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  
  // Notification settings
  const [agentStatusNotifications, setAgentStatusNotifications] = useState(true);
  const [taskCompletionNotifications, setTaskCompletionNotifications] = useState(true);
  const [systemErrorNotifications, setSystemErrorNotifications] = useState(true);
  const [planningAgentNotifications, setPlanningAgentNotifications] = useState(true);
  const [directMessaging, setDirectMessaging] = useState(true);
  const [roleBasedNotifications, setRoleBasedNotifications] = useState(true);

  const { toast } = useToast();

  const handleConnect = async () => {
    if (!webhookUrl) {
      toast({
        title: "Missing Information",
        description: "Please provide a Discord webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      toast({
        title: "Discord Connected",
        description: "Successfully connected to Discord webhook",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Discord. Please check your webhook URL.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setWebhookUrl("");
    setServerName("");
    setChannelName("");
    toast({
      title: "Discord Disconnected",
      description: "Successfully disconnected from Discord",
    });
  };

  const handleTestMessage = async () => {
    if (!testMessage.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter a test message",
        variant: "destructive",
      });
      return;
    }

    setIsSendingTest(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Test Message Sent",
        description: "Test message sent successfully to Discord",
      });
      setTestMessage("");
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Failed to send test message",
        variant: "destructive",
      });
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleSave = () => {
    console.log("Saving Discord settings:", {
      isConnected,
      serverName,
      channelName,
      agentStatusNotifications,
      taskCompletionNotifications,
      systemErrorNotifications,
      planningAgentNotifications,
      directMessaging,
      roleBasedNotifications
    });
    
    toast({
      title: "Settings Saved",
      description: "Discord integration settings have been saved",
    });
  };

  const handleReset = () => {
    setAgentStatusNotifications(true);
    setTaskCompletionNotifications(true);
    setSystemErrorNotifications(true);
    setPlanningAgentNotifications(true);
    setDirectMessaging(true);
    setRoleBasedNotifications(true);
    
    toast({
      title: "Settings Reset",
      description: "Discord notification settings have been reset to defaults",
    });
  };

  return (
    <SettingsSection
      title="Discord Integration"
      description="Connect to Discord for webhook-based notifications and team communication"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <OptimizedStack gap="md">
        {/* Connection Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              Connection Status
              {isConnected && <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>}
              {!isConnected && <Badge variant="secondary" className="bg-gray-100 text-gray-800">Disconnected</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <OptimizedStack gap="sm">
              {!isConnected ? (
                <>
                  <Alert>
                    <Info className="w-4 h-4" />
                    <AlertDescription>
                      To connect Discord, you'll need to create a webhook in your Discord server. 
                      <a 
                        href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        Learn how to create a Discord webhook
                      </a>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="webhook-url">Webhook URL</Label>
                      <Input
                        id="webhook-url"
                        type="url"
                        placeholder="https://discord.com/api/webhooks/..."
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="server-name">Server Name (Optional)</Label>
                        <div className="relative">
                          <Server className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <Input
                            id="server-name"
                            placeholder="My Discord Server"
                            value={serverName}
                            onChange={(e) => setServerName(e.target.value)}
                            className="bg-background pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="channel-name">Channel Name (Optional)</Label>
                        <div className="relative">
                          <Hash className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                          <Input
                            id="channel-name"
                            placeholder="notifications"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                            className="bg-background pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleConnect}
                    disabled={isConnecting || !webhookUrl}
                    className="w-full md:w-auto"
                  >
                    {isConnecting ? "Connecting..." : "Connect to Discord"}
                  </Button>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium">Connected to Discord</span>
                    </div>
                    <Button variant="outline" onClick={handleDisconnect}>
                      Disconnect
                    </Button>
                  </div>
                  
                  {(serverName || channelName) && (
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {serverName && (
                        <div className="flex items-center gap-1">
                          <Server className="w-4 h-4" />
                          <span>{serverName}</span>
                        </div>
                      )}
                      {channelName && (
                        <div className="flex items-center gap-1">
                          <Hash className="w-4 h-4" />
                          <span>{channelName}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </OptimizedStack>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        {isConnected && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <OptimizedStack gap="sm">
                <ValidatedSettingItem
                  id="agent-status-discord"
                  type="switch"
                  label="Agent Status Changes"
                  description="Receive notifications when agents change status"
                  checked={agentStatusNotifications}
                  onCheckedChange={setAgentStatusNotifications}
                />

                <ValidatedSettingItem
                  id="task-completion-discord"
                  type="switch"
                  label="Task Completions"
                  description="Receive notifications when tasks are completed"
                  checked={taskCompletionNotifications}
                  onCheckedChange={setTaskCompletionNotifications}
                />

                <ValidatedSettingItem
                  id="system-error-discord"
                  type="switch"
                  label="System Errors"
                  description="Receive notifications about critical system errors"
                  checked={systemErrorNotifications}
                  onCheckedChange={setSystemErrorNotifications}
                />

                <ValidatedSettingItem
                  id="planning-agent-discord"
                  type="switch"
                  label="Planning Agent Updates"
                  description="Receive notifications from the Planning Agent"
                  checked={planningAgentNotifications}
                  onCheckedChange={setPlanningAgentNotifications}
                />

                <ValidatedSettingItem
                  id="direct-messaging-discord"
                  type="switch"
                  label="Direct Messaging"
                  description="Allow sending messages directly to Planning Agent via Discord"
                  checked={directMessaging}
                  onCheckedChange={setDirectMessaging}
                />

                <ValidatedSettingItem
                  id="role-based-notifications"
                  type="switch"
                  label="Role-Based Notifications"
                  description="Include user roles in notifications for team context"
                  checked={roleBasedNotifications}
                  onCheckedChange={setRoleBasedNotifications}
                />
              </OptimizedStack>
            </CardContent>
          </Card>
        )}

        {/* Test Connection */}
        {isConnected && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Test Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <OptimizedStack gap="sm">
                <div className="space-y-2">
                  <Label htmlFor="test-message">Test Message</Label>
                  <Input
                    id="test-message"
                    placeholder="Enter a test message to send to Discord"
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    className="bg-background"
                  />
                </div>
                
                <Button 
                  onClick={handleTestMessage}
                  disabled={isSendingTest || !testMessage.trim()}
                  className="w-full md:w-auto flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSendingTest ? "Sending..." : "Send Test Message"}
                </Button>
              </OptimizedStack>
            </CardContent>
          </Card>
        )}
      </OptimizedStack>
    </SettingsSection>
  );
};
