
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send,
  Mail,
  Webhook,
  Settings,
  Test,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: string;
  name: string;
  type: "discord" | "telegram" | "email" | "webhook";
  enabled: boolean;
  status: "connected" | "disconnected" | "error";
  lastUsed?: Date;
  config: Record<string, any>;
}

interface ExternalIntegrationsProps {
  roomId: string;
}

export const ExternalIntegrations = ({ roomId }: ExternalIntegrationsProps) => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [discordWebhook, setDiscordWebhook] = useState("");
  const [telegramBotToken, setTelegramBotToken] = useState("");
  const [telegramChatId, setTelegramChatId] = useState("");
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "",
    username: "",
    password: "",
    fromEmail: ""
  });
  const [webhookUrl, setWebhookUrl] = useState("");
  const [testMessage, setTestMessage] = useState("Test message from communication hub");
  const { toast } = useToast();

  // Mock data
  useState(() => {
    const mockIntegrations: Integration[] = [
      {
        id: "1",
        name: "Team Discord",
        type: "discord",
        enabled: true,
        status: "connected",
        lastUsed: new Date(Date.now() - 3600000),
        config: { webhookUrl: "https://discord.com/api/webhooks/..." }
      },
      {
        id: "2", 
        name: "Project Telegram",
        type: "telegram",
        enabled: false,
        status: "disconnected",
        config: { botToken: "", chatId: "" }
      },
      {
        id: "3",
        name: "Email Notifications",
        type: "email",
        enabled: true,
        status: "connected",
        lastUsed: new Date(Date.now() - 1800000),
        config: { fromEmail: "notifications@company.com" }
      }
    ];
    setIntegrations(mockIntegrations);
  });

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === integrationId
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ));
  };

  const testDiscordWebhook = async () => {
    if (!discordWebhook) {
      toast({
        title: "Error",
        description: "Please enter a Discord webhook URL",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(discordWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: testMessage,
          embeds: [{
            title: "Test Message",
            description: "This is a test from your communication hub",
            color: 0x00ff00,
            timestamp: new Date().toISOString()
          }]
        })
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Discord webhook test successful!"
        });
      } else {
        throw new Error("Webhook request failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Discord webhook test failed. Please check your webhook URL.",
        variant: "destructive"
      });
    }
  };

  const testTelegramBot = async () => {
    if (!telegramBotToken || !telegramChatId) {
      toast({
        title: "Error",
        description: "Please enter both bot token and chat ID",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: `🤖 ${testMessage}\n\nSent from Communication Hub`,
          parse_mode: "Markdown"
        })
      });

      const result = await response.json();
      
      if (result.ok) {
        toast({
          title: "Success",
          description: "Telegram bot test successful!"
        });
      } else {
        throw new Error(result.description || "Telegram API error");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Telegram bot test failed. Please check your credentials.",
        variant: "destructive"
      });
    }
  };

  const testWebhook = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: testMessage,
          timestamp: new Date().toISOString(),
          source: "communication-hub",
          roomId: roomId
        })
      });

      if (response.ok) {
        toast({
          title: "Success", 
          description: "Webhook test successful!"
        });
      } else {
        throw new Error("Webhook request failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Webhook test failed. Please check your URL.",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatLastUsed = (date?: Date) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="h-full space-y-4">
      {/* Integration Overview */}
      <Card>
        <CardHeader>
          <CardTitle>External Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <span className="font-medium">{integration.name}</span>
                  </div>
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={() => toggleIntegration(integration.id)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Status: {integration.status}</p>
                  <p>Last used: {formatLastUsed(integration.lastUsed)}</p>
                </div>
                <Badge variant={integration.enabled ? "default" : "secondary"} className="mt-2">
                  {integration.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Configuration */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="discord" className="h-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="discord">Discord</TabsTrigger>
              <TabsTrigger value="telegram">Telegram</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="webhook">Webhook</TabsTrigger>
            </TabsList>

            {/* Discord Configuration */}
            <TabsContent value="discord" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Webhook URL</label>
                  <Input
                    placeholder="https://discord.com/api/webhooks/..."
                    value={discordWebhook}
                    onChange={(e) => setDiscordWebhook(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Get this from your Discord server settings → Integrations → Webhooks
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Test Message</label>
                  <Textarea
                    placeholder="Enter test message..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={testDiscordWebhook}>
                    <Test className="w-4 h-4 mr-2" />
                    Test Discord
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://support.discord.com/hc/en-us/articles/228383668" target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Setup Guide
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Telegram Configuration */}
            <TabsContent value="telegram" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bot Token</label>
                  <Input
                    type="password"
                    placeholder="Bot token from @BotFather"
                    value={telegramBotToken}
                    onChange={(e) => setTelegramBotToken(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Chat ID</label>
                  <Input
                    placeholder="Chat ID or @channel_name"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Use @userinfobot to get your chat ID
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Test Message</label>
                  <Textarea
                    placeholder="Enter test message..."
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={2}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={testTelegramBot}>
                    <Test className="w-4 h-4 mr-2" />
                    Test Telegram
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="https://core.telegram.org/bots#botfather" target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Create Bot
                    </a>
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Email Configuration */}
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Host</label>
                    <Input
                      placeholder="smtp.gmail.com"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Port</label>
                    <Input
                      placeholder="587"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <Input
                    placeholder="your-email@example.com"
                    value={emailSettings.username}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="App-specific password"
                    value={emailSettings.password}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">From Email</label>
                  <Input
                    placeholder="notifications@yourcompany.com"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                  />
                </div>
                
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Test Email Configuration
                </Button>
              </div>
            </TabsContent>

            {/* Webhook Configuration */}
            <TabsContent value="webhook" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Webhook URL</label>
                  <Input
                    placeholder="https://your-api.com/webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your endpoint should accept POST requests with JSON payload
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Test Payload</label>
                  <Textarea
                    value={JSON.stringify({
                      message: testMessage,
                      timestamp: new Date().toISOString(),
                      source: "communication-hub",
                      roomId: roomId
                    }, null, 2)}
                    readOnly
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
                
                <Button onClick={testWebhook}>
                  <Webhook className="w-4 h-4 mr-2" />
                  Test Webhook
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
