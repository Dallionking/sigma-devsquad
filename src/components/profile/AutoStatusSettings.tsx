
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Moon } from "lucide-react";

interface AutoStatusSettingsProps {
  autoAwayEnabled: boolean;
  autoAwayMinutes: number;
  autoInvisibleEnabled: boolean;
  onAutoAwayToggle: (enabled: boolean) => void;
  onAutoAwayMinutesChange: (minutes: number) => void;
  onAutoInvisibleToggle: (enabled: boolean) => void;
  disabled?: boolean;
}

export const AutoStatusSettings = ({
  autoAwayEnabled,
  autoAwayMinutes,
  autoInvisibleEnabled,
  onAutoAwayToggle,
  onAutoAwayMinutesChange,
  onAutoInvisibleToggle,
  disabled
}: AutoStatusSettingsProps) => {
  const awayTimeOptions = [
    { value: 5, label: '5 minutes' },
    { value: 10, label: '10 minutes' },
    { value: 15, label: '15 minutes' },
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Automatic Status Updates</Label>
        <p className="text-sm text-muted-foreground">
          Let the system update your status based on activity
        </p>
      </div>

      <div className="space-y-6">
        {/* Auto Away */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <Label className="font-medium">Auto Away</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically set status to Away when inactive
              </p>
            </div>
            <Switch
              checked={autoAwayEnabled}
              onCheckedChange={onAutoAwayToggle}
              disabled={disabled}
            />
          </div>

          {autoAwayEnabled && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="awayTime" className="text-sm">
                Set to Away after
              </Label>
              <Select
                value={autoAwayMinutes.toString()}
                onValueChange={(value) => onAutoAwayMinutesChange(parseInt(value))}
                disabled={disabled}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {awayTimeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Auto Invisible (for future use) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-muted-foreground" />
                <Label className="font-medium">Auto Invisible</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Automatically go invisible during off-hours
              </p>
            </div>
            <Switch
              checked={autoInvisibleEnabled}
              onCheckedChange={onAutoInvisibleToggle}
              disabled={disabled}
            />
          </div>

          {autoInvisibleEnabled && (
            <div className="ml-6 text-sm text-muted-foreground">
              <p>⏰ Based on your work schedule (9 AM - 6 PM)</p>
              <p className="text-xs mt-1">
                Configure work hours in Calendar Settings
              </p>
            </div>
          )}
        </div>

        {/* Activity Detection Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 dark:text-blue-100">
                Activity Detection
              </p>
              <p className="text-blue-700 dark:text-blue-300 mt-1">
                We track mouse movement, keyboard input, and app interaction to determine activity. 
                Your privacy is protected - no content is monitored.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
