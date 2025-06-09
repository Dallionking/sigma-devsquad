
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  RefreshCcw, 
  Zap, 
  Battery, 
  Wifi, 
  Clock, 
  AlertTriangle,
  Settings,
  Save
} from "lucide-react";

export const BackgroundSyncOptions = () => {
  const { toast } = useToast();
  
  // Sync Settings
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState([30]); // seconds
  const [syncOnReconnection, setSyncOnReconnection] = useState(true);
  const [retryAttempts, setRetryAttempts] = useState([3]);
  const [retryDelay, setRetryDelay] = useState([5]); // seconds

  // Battery & Performance
  const [batteryOptimization, setBatteryOptimization] = useState(true);
  const [lowBatteryThreshold, setLowBatteryThreshold] = useState([20]); // percentage
  const [wifiOnlySync, setWifiOnlySync] = useState(false);
  const [backgroundSyncLimit, setBackgroundSyncLimit] = useState([100]); // operations per hour

  // Conflict Resolution
  const [conflictResolution, setConflictResolution] = useState<'manual' | 'local' | 'remote'>('manual');
  const [autoMerge, setAutoMerge] = useState(false);

  const saveSettings = () => {
    toast({
      title: "Background Sync Settings Saved",
      description: "Your sync preferences have been updated",
    });
  };

  const testSync = () => {
    toast({
      title: "Testing Sync",
      description: "Running sync test with current settings...",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <RefreshCcw className="w-5 h-5" />
          <span>Background Sync Options</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Auto Sync Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <Zap className="w-4 h-4" />
            <span>Automatic Sync</span>
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Enable auto-sync</label>
                <p className="text-xs text-muted-foreground">
                  Automatically sync changes in the background
                </p>
              </div>
              <Switch
                checked={autoSync}
                onCheckedChange={setAutoSync}
              />
            </div>

            {autoSync && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Sync interval</label>
                    <Badge variant="outline">{syncInterval[0]}s</Badge>
                  </div>
                  <Slider
                    value={syncInterval}
                    onValueChange={setSyncInterval}
                    max={300}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    How often to check for changes
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Sync on reconnection</label>
                    <p className="text-xs text-muted-foreground">
                      Immediately sync when coming back online
                    </p>
                  </div>
                  <Switch
                    checked={syncOnReconnection}
                    onCheckedChange={setSyncOnReconnection}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Retry Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Retry Configuration</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Retry attempts</label>
                <Badge variant="outline">{retryAttempts[0]} times</Badge>
              </div>
              <Slider
                value={retryAttempts}
                onValueChange={setRetryAttempts}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Retry delay</label>
                <Badge variant="outline">{retryDelay[0]}s</Badge>
              </div>
              <Slider
                value={retryDelay}
                onValueChange={setRetryDelay}
                max={60}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Performance & Battery */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <Battery className="w-4 h-4" />
            <span>Performance & Battery</span>
          </h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Battery optimization</label>
                <p className="text-xs text-muted-foreground">
                  Reduce sync frequency when battery is low
                </p>
              </div>
              <Switch
                checked={batteryOptimization}
                onCheckedChange={setBatteryOptimization}
              />
            </div>

            {batteryOptimization && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Low battery threshold</label>
                  <Badge variant="outline">{lowBatteryThreshold[0]}%</Badge>
                </div>
                <Slider
                  value={lowBatteryThreshold}
                  onValueChange={setLowBatteryThreshold}
                  max={50}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">WiFi only sync</label>
                <p className="text-xs text-muted-foreground">
                  Only sync when connected to WiFi
                </p>
              </div>
              <Switch
                checked={wifiOnlySync}
                onCheckedChange={setWifiOnlySync}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Background sync limit</label>
                <Badge variant="outline">{backgroundSyncLimit[0]}/hour</Badge>
              </div>
              <Slider
                value={backgroundSyncLimit}
                onValueChange={setBackgroundSyncLimit}
                max={500}
                min={10}
                step={10}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum sync operations per hour
              </p>
            </div>
          </div>
        </div>

        {/* Conflict Resolution */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Conflict Resolution</span>
          </h4>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Default resolution strategy</label>
              <Select value={conflictResolution} onValueChange={(value: any) => setConflictResolution(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual resolution (recommended)</SelectItem>
                  <SelectItem value="local">Always prefer local changes</SelectItem>
                  <SelectItem value="remote">Always prefer remote changes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Enable auto-merge</label>
                <p className="text-xs text-muted-foreground">
                  Attempt to merge non-conflicting changes automatically
                </p>
              </div>
              <Switch
                checked={autoMerge}
                onCheckedChange={setAutoMerge}
              />
            </div>
          </div>
        </div>

        {/* Warning for WiFi-only mode */}
        {wifiOnlySync && (
          <Alert>
            <Wifi className="h-4 w-4" />
            <AlertDescription>
              WiFi-only mode is enabled. Changes will not sync when using mobile data.
            </AlertDescription>
          </Alert>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={testSync}>
            <Settings className="w-4 h-4 mr-2" />
            Test Sync
          </Button>
          <Button onClick={saveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
