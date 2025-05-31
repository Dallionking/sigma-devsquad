
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { MessageCircle, CheckCircle, Info } from "lucide-react";

interface TelegramConnectionStatusProps {
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
}

export const TelegramConnectionStatus = ({ isConnected, onConnectionChange }: TelegramConnectionStatusProps) => {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
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
      
      onConnectionChange(true);
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
    onConnectionChange(false);
    setBotToken("");
    setChatId("");
    toast({
      title: "Telegram Disconnected",
      description: "Successfully disconnected from Telegram",
    });
  };

  return (
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
  );
};
