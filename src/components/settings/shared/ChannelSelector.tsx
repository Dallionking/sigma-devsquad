
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { Hash, RefreshCw, MessageSquare } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
}

interface ChannelMapping {
  [key: string]: string; // notification type -> channel id
}

interface ChannelSelectorProps {
  platform: 'discord' | 'telegram';
  isConnected: boolean;
  channelMappings: ChannelMapping;
  onChannelMappingChange: (mappings: ChannelMapping) => void;
}

const notificationTypes = [
  { key: 'agentStatus', label: 'Agent Status Changes' },
  { key: 'taskCompletion', label: 'Task Completions' },
  { key: 'systemError', label: 'System Errors' },
  { key: 'planningAgent', label: 'Planning Agent Updates' },
  { key: 'directMessage', label: 'Direct Messages' }
];

export const ChannelSelector = ({
  platform,
  isConnected,
  channelMappings,
  onChannelMappingChange
}: ChannelSelectorProps) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchChannels = async () => {
    if (!isConnected) return;
    
    setIsLoading(true);
    try {
      // Simulate API call to fetch channels
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockChannels: Channel[] = [
        { id: '1', name: 'general', type: 'text' },
        { id: '2', name: 'notifications', type: 'text' },
        { id: '3', name: 'alerts', type: 'text' },
        { id: '4', name: 'planning-updates', type: 'text' },
        { id: '5', name: 'system-status', type: 'text' }
      ];
      
      setChannels(mockChannels);
      toast({
        title: "Channels Updated",
        description: `Successfully fetched ${platform} channels`,
      });
    } catch (error) {
      toast({
        title: "Failed to Fetch Channels",
        description: `Could not retrieve ${platform} channels`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchChannels();
    }
  }, [isConnected]);

  const handleChannelChange = (notificationType: string, channelId: string) => {
    const updatedMappings = {
      ...channelMappings,
      [notificationType]: channelId
    };
    onChannelMappingChange(updatedMappings);
  };

  if (!isConnected) {
    return (
      <Card className="opacity-60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Hash className="w-5 h-5" />
            Channel Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Connect to {platform} to configure channel mappings
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5" />
            Channel Configuration
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchChannels}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          <p className="text-sm text-muted-foreground mb-4">
            Configure which {platform} channels should receive specific notification types
          </p>
          
          {notificationTypes.map((type) => (
            <div key={type.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <Label className="font-medium">{type.label}</Label>
              </div>
              
              <div className="flex items-center gap-2">
                <Select
                  value={channelMappings[type.key] || ""}
                  onValueChange={(value) => handleChannelChange(type.key, value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        <div className="flex items-center gap-2">
                          <Hash className="w-3 h-3" />
                          {channel.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {channelMappings[type.key] && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Configured
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
