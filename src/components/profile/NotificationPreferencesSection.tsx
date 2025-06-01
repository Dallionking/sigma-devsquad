
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, MessageSquare, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettings {
  email: {
    projectUpdates: boolean;
    taskAssignments: boolean;
    teamInvitations: boolean;
    securityAlerts: boolean;
    marketingEmails: boolean;
  };
  push: {
    directMessages: boolean;
    mentions: boolean;
    taskDeadlines: boolean;
    systemAlerts: boolean;
  };
  frequency: string;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export const NotificationPreferencesSection = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      projectUpdates: true,
      taskAssignments: true,
      teamInvitations: true,
      securityAlerts: true,
      marketingEmails: false,
    },
    push: {
      directMessages: true,
      mentions: true,
      taskDeadlines: true,
      systemAlerts: true,
    },
    frequency: "immediate",
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00",
    },
  });

  const [originalSettings, setOriginalSettings] = useState(settings);

  const handleEmailToggle = (key: keyof typeof settings.email) => {
    setSettings(prev => ({
      ...prev,
      email: {
        ...prev.email,
        [key]: !prev.email[key]
      }
    }));
  };

  const handlePushToggle = (key: keyof typeof settings.push) => {
    setSettings(prev => ({
      ...prev,
      push: {
        ...prev.push,
        [key]: !prev.push[key]
      }
    }));
  };

  const handleQuietHoursToggle = () => {
    setSettings(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        enabled: !prev.quietHours.enabled
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOriginalSettings(settings);
      setIsEditing(false);
      
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setSettings(originalSettings);
    setIsEditing(false);
  };

  const startEdit = () => {
    setOriginalSettings(settings);
    setIsEditing(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Manage how and when you receive notifications
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" onClick={startEdit}>
            Edit Preferences
          </Button>
        )}
      </div>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="projectUpdates">Project Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about project progress and milestones</p>
              </div>
              <Switch
                id="projectUpdates"
                checked={settings.email.projectUpdates}
                onCheckedChange={() => handleEmailToggle('projectUpdates')}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="taskAssignments">Task Assignments</Label>
                <p className="text-sm text-muted-foreground">When you're assigned to new tasks</p>
              </div>
              <Switch
                id="taskAssignments"
                checked={settings.email.taskAssignments}
                onCheckedChange={() => handleEmailToggle('taskAssignments')}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="teamInvitations">Team Invitations</Label>
                <p className="text-sm text-muted-foreground">When you're invited to join a team</p>
              </div>
              <Switch
                id="teamInvitations"
                checked={settings.email.teamInvitations}
                onCheckedChange={() => handleEmailToggle('teamInvitations')}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="securityAlerts">Security Alerts</Label>
                <p className="text-sm text-muted-foreground">Important security notifications and login alerts</p>
              </div>
              <Switch
                id="securityAlerts"
                checked={settings.email.securityAlerts}
                onCheckedChange={() => handleEmailToggle('securityAlerts')}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Product updates, newsletters, and promotional content</p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.email.marketingEmails}
                onCheckedChange={() => handleEmailToggle('marketingEmails')}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="directMessages">Direct Messages</Label>
                <p className="text-sm text-muted-foreground">When someone sends you a direct message</p>
              </div>
              <Switch
                id="directMessages"
                checked={settings.push.directMessages}
                onCheckedChange={() => handlePushToggle('directMessages')}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mentions">Mentions</Label>
                <p className="text-sm text-muted-foreground">When you're mentioned in comments or discussions</p>
              </div>
              <Switch
                id="mentions"
                checked={settings.push.mentions}
                onCheckedChange={() => handlePushToggle('mentions')}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="taskDeadlines">Task Deadlines</Label>
                <p className="text-sm text-muted-foreground">Reminders for upcoming task deadlines</p>
              </div>
              <Switch
                id="taskDeadlines"
                checked={settings.push.taskDeadlines}
                onCheckedChange={() => handlePushToggle('taskDeadlines')}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="systemAlerts">System Alerts</Label>
                <p className="text-sm text-muted-foreground">Important system notifications and maintenance updates</p>
              </div>
              <Switch
                id="systemAlerts"
                checked={settings.push.systemAlerts}
                onCheckedChange={() => handlePushToggle('systemAlerts')}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Notification Frequency</Label>
              <Select 
                value={settings.frequency} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, frequency: value }))}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="quietHours">Quiet Hours</Label>
                <Switch
                  id="quietHours"
                  checked={settings.quietHours.enabled}
                  onCheckedChange={handleQuietHoursToggle}
                  disabled={!isEditing}
                />
              </div>
              {settings.quietHours.enabled && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">From</Label>
                    <Input
                      type="time"
                      value={settings.quietHours.start}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, start: e.target.value }
                      }))}
                      disabled={!isEditing}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">To</Label>
                    <Input
                      type="time"
                      value={settings.quietHours.end}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        quietHours: { ...prev.quietHours, end: e.target.value }
                      }))}
                      disabled={!isEditing}
                      className="text-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save/Cancel Actions */}
      {isEditing && (
        <div className="flex gap-2">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Preferences"}
          </Button>
          <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};
