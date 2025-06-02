
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Bell, MessageSquare, CheckCircle, UserPlus, AlertTriangle } from 'lucide-react';

export interface TeamNotificationPreferences {
  memberJoined: boolean;
  memberLeft: boolean;
  taskAssigned: boolean;
  taskCompleted: boolean;
  taskOverdue: boolean;
  newMessage: boolean;
  mentionInMessage: boolean;
  teamUpdates: boolean;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  channels: {
    email: boolean;
    inApp: boolean;
    discord: boolean;
    slack: boolean;
  };
}

interface TeamNotificationSettingsProps {
  preferences: TeamNotificationPreferences;
  onPreferencesChange: (preferences: TeamNotificationPreferences) => void;
}

export const TeamNotificationSettings = ({ 
  preferences, 
  onPreferencesChange 
}: TeamNotificationSettingsProps) => {
  const updatePreference = (key: keyof TeamNotificationPreferences, value: any) => {
    onPreferencesChange({ ...preferences, [key]: value });
  };

  const updateChannel = (channel: keyof TeamNotificationPreferences['channels'], value: boolean) => {
    onPreferencesChange({
      ...preferences,
      channels: { ...preferences.channels, [channel]: value }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Team Activity Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Team Activity
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="member-joined">Member joined team</Label>
              <Switch
                id="member-joined"
                checked={preferences.memberJoined}
                onCheckedChange={(value) => updatePreference('memberJoined', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="member-left">Member left team</Label>
              <Switch
                id="member-left"
                checked={preferences.memberLeft}
                onCheckedChange={(value) => updatePreference('memberLeft', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="team-updates">Team updates and announcements</Label>
              <Switch
                id="team-updates"
                checked={preferences.teamUpdates}
                onCheckedChange={(value) => updatePreference('teamUpdates', value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Task Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Task Activity
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="task-assigned">Task assigned to me</Label>
              <Switch
                id="task-assigned"
                checked={preferences.taskAssigned}
                onCheckedChange={(value) => updatePreference('taskAssigned', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-completed">Task completed</Label>
              <Switch
                id="task-completed"
                checked={preferences.taskCompleted}
                onCheckedChange={(value) => updatePreference('taskCompleted', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-overdue" className="flex items-center gap-2">
                Task overdue
                <AlertTriangle className="w-3 h-3 text-red-500" />
              </Label>
              <Switch
                id="task-overdue"
                checked={preferences.taskOverdue}
                onCheckedChange={(value) => updatePreference('taskOverdue', value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Communication Notifications */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Communication
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="new-message">New team messages</Label>
              <Switch
                id="new-message"
                checked={preferences.newMessage}
                onCheckedChange={(value) => updatePreference('newMessage', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="mention-message">Mentions in messages</Label>
              <Switch
                id="mention-message"
                checked={preferences.mentionInMessage}
                onCheckedChange={(value) => updatePreference('mentionInMessage', value)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Frequency */}
        <div className="space-y-4">
          <h4 className="font-medium">Notification Frequency</h4>
          <div className="space-y-2">
            <Label htmlFor="frequency">How often to receive notifications</Label>
            <Select value={preferences.frequency} onValueChange={(value: any) => updatePreference('frequency', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly digest</SelectItem>
                <SelectItem value="daily">Daily digest</SelectItem>
                <SelectItem value="weekly">Weekly digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Separator />

        {/* Notification Channels */}
        <div className="space-y-4">
          <h4 className="font-medium">Notification Channels</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-channel">Email notifications</Label>
              <Switch
                id="email-channel"
                checked={preferences.channels.email}
                onCheckedChange={(value) => updateChannel('email', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-channel">In-app notifications</Label>
              <Switch
                id="app-channel"
                checked={preferences.channels.inApp}
                onCheckedChange={(value) => updateChannel('inApp', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="discord-channel">Discord notifications</Label>
              <Switch
                id="discord-channel"
                checked={preferences.channels.discord}
                onCheckedChange={(value) => updateChannel('discord', value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="slack-channel">Slack notifications</Label>
              <Switch
                id="slack-channel"
                checked={preferences.channels.slack}
                onCheckedChange={(value) => updateChannel('slack', value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
