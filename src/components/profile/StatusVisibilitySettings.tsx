
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, Users, Clock, Shield } from "lucide-react";

interface StatusVisibilitySettingsProps {
  showStatusToEveryone: boolean;
  showStatusToTeammates: boolean;
  showLastSeen: boolean;
  onShowToEveryoneChange: (show: boolean) => void;
  onShowToTeammatesChange: (show: boolean) => void;
  onShowLastSeenChange: (show: boolean) => void;
  disabled?: boolean;
}

export const StatusVisibilitySettings = ({
  showStatusToEveryone,
  showStatusToTeammates,
  showLastSeen,
  onShowToEveryoneChange,
  onShowToTeammatesChange,
  onShowLastSeenChange,
  disabled
}: StatusVisibilitySettingsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Status Visibility</Label>
        <p className="text-sm text-muted-foreground">
          Control who can see your status and activity information
        </p>
      </div>

      <div className="space-y-6">
        {/* Who can see status */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <Label className="font-medium">Who can see my status</Label>
          </div>
          
          <div className="ml-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Everyone</Label>
                <p className="text-xs text-muted-foreground">
                  All users in the workspace can see your status
                </p>
              </div>
              <Switch
                checked={showStatusToEveryone}
                onCheckedChange={onShowToEveryoneChange}
                disabled={disabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Teammates only</Label>
                <p className="text-xs text-muted-foreground">
                  Only members of your teams can see your status
                </p>
              </div>
              <Switch
                checked={showStatusToTeammates}
                onCheckedChange={onShowToTeammatesChange}
                disabled={disabled || showStatusToEveryone}
              />
            </div>
          </div>
        </div>

        {/* Last seen visibility */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <Label className="font-medium">Show "Last seen"</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Let others see when you were last active
              </p>
            </div>
            <Switch
              checked={showLastSeen}
              onCheckedChange={onShowLastSeenChange}
              disabled={disabled}
            />
          </div>
        </div>

        {/* Privacy notice */}
        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-900 dark:text-amber-100">
                Privacy Notice
              </p>
              <p className="text-amber-700 dark:text-amber-300 mt-1">
                When invisible, you'll appear offline to others but can still receive and send messages. 
                Administrators may still see your actual status for security purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Status summary */}
        <div className="p-3 border rounded-lg bg-muted/30">
          <Label className="text-sm font-medium">Current Settings Summary</Label>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p>• Status visible to: {showStatusToEveryone ? 'Everyone' : showStatusToTeammates ? 'Teammates only' : 'Nobody'}</p>
            <p>• Last seen: {showLastSeen ? 'Visible' : 'Hidden'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
