
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { OptimizedStack } from "@/components/layout/SpaceOptimizedContainer";
import { Hash, MessageSquare, Bell } from "lucide-react";
import { ChannelConfig } from "@/types/webhook";

interface ChannelSelectorProps {
  channels: ChannelConfig[];
  selectedChannels: Record<string, string>;
  onChannelChange: (notificationType: string, channelId: string) => void;
  platform: 'discord' | 'telegram';
}

export const ChannelSelector = ({
  channels,
  selectedChannels,
  onChannelChange,
  platform
}: ChannelSelectorProps) => {
  const notificationTypes = [
    { id: 'agent_status', label: 'Agent Status Changes', icon: Bell },
    { id: 'task_completion', label: 'Task Completions', icon: MessageSquare },
    { id: 'system_error', label: 'System Errors', icon: Bell },
    { id: 'planning_agent', label: 'Planning Agent Updates', icon: MessageSquare },
    { id: 'direct_message', label: 'Direct Messages', icon: MessageSquare },
  ];

  const getChannelIcon = (channel: ChannelConfig) => {
    if (platform === 'discord') {
      return channel.type === 'voice' ? '🔊' : '#';
    }
    return '@';
  };

  const getChannelDisplayName = (channel: ChannelConfig) => {
    const prefix = getChannelIcon(channel);
    return `${prefix}${channel.name}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Hash className="w-5 h-5" />
          Channel Configuration
          <Badge variant="outline" className="text-xs">
            {platform === 'discord' ? 'Discord' : 'Telegram'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <OptimizedStack gap="sm">
          {channels.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No channels available</p>
              <p className="text-xs text-gray-400">
                Connect your {platform} account to see available channels
              </p>
            </div>
          ) : (
            notificationTypes.map((type) => (
              <div key={type.id} className="space-y-2">
                <Label htmlFor={`channel-${type.id}`} className="flex items-center gap-2">
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </Label>
                <Select
                  value={selectedChannels[type.id] || ''}
                  onValueChange={(value) => onChannelChange(type.id, value)}
                >
                  <SelectTrigger id={`channel-${type.id}`}>
                    <SelectValue placeholder="Select channel..." />
                  </SelectTrigger>
                  <SelectContent>
                    {channels.map((channel) => (
                      <SelectItem key={channel.id} value={channel.id}>
                        {getChannelDisplayName(channel)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))
          )}
        </OptimizedStack>
      </CardContent>
    </Card>
  );
};
