
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, X, Edit2, Bell, Mail, MessageSquare, Calendar } from "lucide-react";

export const NotificationPreferencesSection = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    // Email Notifications
    emailDigest: true,
    emailMarketing: false,
    emailSecurity: true,
    emailTeamUpdates: true,
    emailTaskAssignments: true,
    emailComments: true,
    
    // Push Notifications
    pushEnabled: true,
    pushTaskUpdates: true,
    pushMessages: true,
    pushMentions: true,
    pushDeadlines: true,
    
    // In-App Notifications
    inAppMessages: true,
    inAppTaskUpdates: true,
    inAppSystemUpdates: true,
    
    // Frequency Settings
    digestFrequency: 'daily',
    quietHoursEnabled: true,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00'
  });

  const handleSave = async () => {
    try {
      // Here you would typically save notification preferences to your backend
      toast({
        title: "Notification Preferences Updated",
        description: "Your notification settings have been saved successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notification preferences. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    // Reset to original values
    setIsEditing(false);
  };

  const handleTestNotification = () => {
    toast({
      title: "Test Notification",
      description: "This is how your notifications will appear!",
    });
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Email Notifications
            </CardTitle>
            <CardDescription>
              Choose which email notifications you'd like to receive
            </CardDescription>
          </div>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a summary of your daily activity
                </p>
              </div>
              <Switch
                checked={notifications.emailDigest}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailDigest: checked })}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Task Assignments</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when you're assigned to new tasks
                </p>
              </div>
              <Switch
                checked={notifications.emailTaskAssignments}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailTaskAssignments: checked })}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Team Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Stay informed about team announcements and updates
                </p>
              </div>
              <Switch
                checked={notifications.emailTeamUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailTeamUpdates: checked })}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Comments & Mentions</Label>
                <p className="text-sm text-muted-foreground">
                  Be notified when someone comments or mentions you
                </p>
              </div>
              <Switch
                checked={notifications.emailComments}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailComments: checked })}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Security Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Important security notifications (recommended)
                </p>
              </div>
              <Switch
                checked={notifications.emailSecurity}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailSecurity: checked })}
                disabled={!isEditing}
              />
            </div>
          </div>

          {notifications.emailDigest && (
            <div className="space-y-2 pt-4 border-t">
              <Label htmlFor="digestFrequency">Digest Frequency</Label>
              <Select
                value={notifications.digestFrequency}
                onValueChange={(value) => setNotifications({ ...notifications, digestFrequency: value })}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Real-time</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Manage your browser and mobile push notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Allow this app to send you push notifications
              </p>
            </div>
            <Switch
              checked={notifications.pushEnabled}
              onCheckedChange={(checked) => setNotifications({ ...notifications, pushEnabled: checked })}
              disabled={!isEditing}
            />
          </div>

          {notifications.pushEnabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Changes to your assigned tasks
                  </p>
                </div>
                <Switch
                  checked={notifications.pushTaskUpdates}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushTaskUpdates: checked })}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">
                    New messages in your conversations
                  </p>
                </div>
                <Switch
                  checked={notifications.pushMessages}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushMessages: checked })}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mentions</Label>
                  <p className="text-sm text-muted-foreground">
                    When someone mentions you in comments
                  </p>
                </div>
                <Switch
                  checked={notifications.pushMentions}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushMentions: checked })}
                  disabled={!isEditing}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Upcoming Deadlines</Label>
                  <p className="text-sm text-muted-foreground">
                    Reminders for approaching due dates
                  </p>
                </div>
                <Switch
                  checked={notifications.pushDeadlines}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushDeadlines: checked })}
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Quiet Hours
          </CardTitle>
          <CardDescription>
            Set times when you don't want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">
                Pause non-urgent notifications during specified times
              </p>
            </div>
            <Switch
              checked={notifications.quietHoursEnabled}
              onCheckedChange={(checked) => setNotifications({ ...notifications, quietHoursEnabled: checked })}
              disabled={!isEditing}
            />
          </div>

          {notifications.quietHoursEnabled && (
            <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                <Label htmlFor="quietStart">Start Time</Label>
                <Select
                  value={notifications.quietHoursStart}
                  onValueChange={(value) => setNotifications({ ...notifications, quietHoursStart: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quietEnd">End Time</Label>
                <Select
                  value={notifications.quietHoursEnd}
                  onValueChange={(value) => setNotifications({ ...notifications, quietHoursEnd: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={`${i.toString().padStart(2, '0')}:00`}>
                        {`${i.toString().padStart(2, '0')}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Preferences
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            onClick={handleTestNotification}
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Test Notification
          </Button>
        )}
      </div>
    </div>
  );
};
