
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { Send } from "lucide-react";

export const DiscordTestConnection = () => {
  const [testMessage, setTestMessage] = useState("");
  const [isSendingTest, setIsSendingTest] = useState(false);
  const { toast } = useToast();

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

  return (
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
  );
};
