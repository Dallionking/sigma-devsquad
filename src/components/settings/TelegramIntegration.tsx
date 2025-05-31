
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ValidatedSettingItem } from "./ValidatedSettingItem";
import { SettingsSection } from "./SettingsSection";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { MessageCircle, Send, CheckCircle, AlertCircle, Info } from "lucide-react";

interface TelegramIntegrationProps {
  searchQuery?: string;
}

export const TelegramIntegration = ({ searchQuery = "" }: TelegramIntegrationProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [testMessage, setTestMessage] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  
  // Notification settings
  const [agentStatusNotifications, setAgentStatusNotifications] = useState(true);
  const [taskCompletionNotifications, setTaskCompletionNotifications] = useState(true);
  const [systemErrorNotifications, setSystemErrorNotifications] = useState(true);
  const [planningAgentNotifications, setPlanningAgentNotifications] = useState(true);
  const [directMessaging, setDirectMessaging] = useState(true);

  const { toast } = useToast();

  const handleConnect = async () => {
    if (!botToken || !chatId) {
      toast({
        title: "Missing Information",
        description: "Please provide both bot token and chat ID",
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
        title: "Telegram Connected",
        description: "Successfully connected to Telegram bot",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Telegram. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setBotToken("");
    setChatId("");
    toast({
      title: "Telegram Disconnected",
      description: "Successfully disconnected from Telegram",
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
        description: "Test message sent successfully to Telegram",
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
    console.log("Saving Telegram settings:", {
      isConnected,
      agentStatusNotifications,
      taskCompletionNotifications,
      systemErrorNotifications,
      planningAgentNotifications,
      directMessaging
    });
    
    toast({
      title: "Settings Saved",
      description: "Telegram integration settings have been saved",
    });
  };

  const handleReset = () => {
    setAgentStatusNotifications(true);
    setTaskCompletionNotifications(true);
    setSystemErrorNotifications(true);
    setPlanningAgentNotifications(true);
    setDirectMessaging(true);
    
    toast({
      title: "Settings Reset",
      description: "Telegram notification settings have been reset to defaults",
    });
  };

  return (
    <SettingsSection
      title="Telegram Integration"
      description="Connect to Telegram for external notifications and messaging"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <OptimizedStack gap="md">
        {/* Connection Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="w-5 h-5 text-blue-500" />
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
                      To connect Telegram, you'll need to create a bot and get your chat ID. 
                      <a 
                        href="https://core.telegram.org/bots#creating-a-new-bot" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        Learn how to create a Telegram bot
                      </a>
                    </AlertDescription>
                  </Alert>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bot-token">Bot Token</Label>
                      <Input
                        id="bot-token"
                        type="password"
                        placeholder="Enter your Telegram bot token"
                        value={botToken}
                        onChange={(e) => setBotToken(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="chat-id">Chat ID</Label>
                      <Input
                        id="chat-id"
                        placeholder="Enter your Telegram chat ID"
                        value={chatId}
                        onChange={(e) => setChatId(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleConnect}
                    disabled={isConnecting || !botToken || !chatId}
                    className="w-full md:w-auto"
                  >
                    {isConnecting ? "Connecting..." : "Connect to Telegram"}
                  </Button>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Connected to Telegram</span>
                  </div>
                  <Button variant="outline" onClick={handleDisconnect}>
                    Disconnect
                  </Button>
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
                  id="agent-status-telegram"
                  type="switch"
                  label="Agent Status Changes"
                  description="Receive notifications when agents change status"
                  checked={agentStatusNotifications}
                  onCheckedChange={setAgentStatusNotifications}
                />

                <ValidatedSettingItem
                  id="task-completion-telegram"
                  type="switch"
                  label="Task Completions"
                  description="Receive notifications when tasks are completed"
                  checked={taskCompletionNotifications}
                  onCheckedChange={setTaskCompletionNotifications}
                />

                <ValidatedSettingItem
                  id="system-error-telegram"
                  type="switch"
                  label="System Errors"
                  description="Receive notifications about critical system errors"
                  checked={systemErrorNotifications}
                  onCheckedChange={setSystemErrorNotifications}
                />

                <ValidatedSettingItem
                  id="planning-agent-telegram"
                  type="switch"
                  label="Planning Agent Updates"
                  description="Receive notifications from the Planning Agent"
                  checked={planningAgentNotifications}
                  onCheckedChange={setPlanningAgentNotifications}
                />

                <ValidatedSettingItem
                  id="direct-messaging-telegram"
                  type="switch"
                  label="Direct Messaging"
                  description="Allow sending messages directly to Planning Agent via Telegram"
                  checked={directMessaging}
                  onCheckedChange={setDirectMessaging}
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
                    placeholder="Enter a test message to send to Telegram"
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
