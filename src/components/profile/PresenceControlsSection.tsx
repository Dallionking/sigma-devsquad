
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { StatusSelector } from "./StatusSelector";
import { CustomStatusMessage } from "./CustomStatusMessage";
import { AutoStatusSettings } from "./AutoStatusSettings";
import { StatusVisibilitySettings } from "./StatusVisibilitySettings";
import { Save, X, Edit2, Circle, Clock } from "lucide-react";

export type UserStatus = 'available' | 'away' | 'dnd' | 'invisible';

export interface PresenceSettings {
  status: UserStatus;
  customMessage: string;
  emoji: string;
  autoAwayEnabled: boolean;
  autoAwayMinutes: number;
  autoInvisibleEnabled: boolean;
  showStatusToEveryone: boolean;
  showStatusToTeammates: boolean;
  showLastSeen: boolean;
  clearMessageAfter: number; // minutes, 0 = never
}

export const PresenceControlsSection = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  const [settings, setSettings] = useState<PresenceSettings>({
    status: 'available',
    customMessage: '',
    emoji: '💼',
    autoAwayEnabled: true,
    autoAwayMinutes: 10,
    autoInvisibleEnabled: false,
    showStatusToEveryone: true,
    showStatusToTeammates: true,
    showLastSeen: true,
    clearMessageAfter: 60
  });

  // Track user activity for automatic status updates
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());
    
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => document.addEventListener(event, updateActivity, { passive: true }));
    
    return () => {
      events.forEach(event => document.removeEventListener(event, updateActivity));
    };
  }, []);

  // Auto-away functionality
  useEffect(() => {
    if (!settings.autoAwayEnabled || settings.status === 'dnd' || settings.status === 'invisible') {
      return;
    }

    const checkActivity = () => {
      const now = Date.now();
      const inactiveMinutes = (now - lastActivity) / (1000 * 60);
      
      if (inactiveMinutes >= settings.autoAwayMinutes && settings.status === 'available') {
        setSettings(prev => ({ ...prev, status: 'away' }));
        toast({
          title: "Status Updated",
          description: "You've been automatically set to Away due to inactivity.",
        });
      }
    };

    const interval = setInterval(checkActivity, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [lastActivity, settings.autoAwayEnabled, settings.autoAwayMinutes, settings.status, toast]);

  const handleSave = async () => {
    try {
      // Here you would typically save to your backend/Supabase
      toast({
        title: "Presence Settings Updated",
        description: "Your status and visibility preferences have been saved.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update presence settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    // Reset to saved values if needed
    setIsEditing(false);
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'available': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      case 'dnd': return 'text-red-500';
      case 'invisible': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case 'available': return 'Available';
      case 'away': return 'Away';
      case 'dnd': return 'Do Not Disturb';
      case 'invisible': return 'Invisible';
      default: return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            Presence & Status
            <Badge variant="outline" className="flex items-center gap-1">
              <Circle className={`w-2 h-2 fill-current ${getStatusColor(settings.status)}`} />
              {getStatusLabel(settings.status)}
            </Badge>
          </CardTitle>
          <CardDescription>
            Control your online status and visibility to other users
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
      <CardContent className="space-y-6">
        {/* Current Status Display */}
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Circle className={`w-3 h-3 fill-current ${getStatusColor(settings.status)}`} />
            <span className="font-medium">{getStatusLabel(settings.status)}</span>
          </div>
          {settings.customMessage && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{settings.emoji}</span>
              <span>{settings.customMessage}</span>
            </div>
          )}
          {settings.status === 'away' && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
              <Clock className="w-3 h-3" />
              Since {new Date(lastActivity).toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Status Selector */}
        <StatusSelector
          currentStatus={settings.status}
          onStatusChange={(status) => setSettings(prev => ({ ...prev, status }))}
          disabled={!isEditing}
        />

        {/* Custom Status Message */}
        <CustomStatusMessage
          message={settings.customMessage}
          emoji={settings.emoji}
          clearAfter={settings.clearMessageAfter}
          onMessageChange={(message) => setSettings(prev => ({ ...prev, customMessage: message }))}
          onEmojiChange={(emoji) => setSettings(prev => ({ ...prev, emoji }))}
          onClearAfterChange={(minutes) => setSettings(prev => ({ ...prev, clearMessageAfter: minutes }))}
          disabled={!isEditing}
        />

        {/* Automatic Status Settings */}
        <AutoStatusSettings
          autoAwayEnabled={settings.autoAwayEnabled}
          autoAwayMinutes={settings.autoAwayMinutes}
          autoInvisibleEnabled={settings.autoInvisibleEnabled}
          onAutoAwayToggle={(enabled) => setSettings(prev => ({ ...prev, autoAwayEnabled: enabled }))}
          onAutoAwayMinutesChange={(minutes) => setSettings(prev => ({ ...prev, autoAwayMinutes: minutes }))}
          onAutoInvisibleToggle={(enabled) => setSettings(prev => ({ ...prev, autoInvisibleEnabled: enabled }))}
          disabled={!isEditing}
        />

        {/* Status Visibility Settings */}
        <StatusVisibilitySettings
          showStatusToEveryone={settings.showStatusToEveryone}
          showStatusToTeammates={settings.showStatusToTeammates}
          showLastSeen={settings.showLastSeen}
          onShowToEveryoneChange={(show) => setSettings(prev => ({ ...prev, showStatusToEveryone: show }))}
          onShowToTeammatesChange={(show) => setSettings(prev => ({ ...prev, showStatusToTeammates: show }))}
          onShowLastSeenChange={(show) => setSettings(prev => ({ ...prev, showLastSeen: show }))}
          disabled={!isEditing}
        />

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Presence Settings
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
