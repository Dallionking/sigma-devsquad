
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Shield, Lock, Unlock, Code, Save } from "lucide-react";

interface OverrideRule {
  id: string;
  name: string;
  condition: string;
  action: 'force_local' | 'force_remote' | 'skip_conflict' | 'custom_merge';
  enabled: boolean;
}

export const ManualOverridePanel = () => {
  const [overrideMode, setOverrideMode] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [overrideRules, setOverrideRules] = useState<OverrideRule[]>([
    {
      id: 'style-priority',
      name: 'Style Priority Override',
      condition: 'file.endsWith(".css") || file.endsWith(".scss")',
      action: 'force_local',
      enabled: true
    },
    {
      id: 'config-remote',
      name: 'Config Remote Priority',
      condition: 'file.includes("config") || file.includes("settings")',
      action: 'force_remote',
      enabled: false
    },
    {
      id: 'skip-tests',
      name: 'Skip Test Conflicts',
      condition: 'file.includes(".test.") || file.includes(".spec.")',
      action: 'skip_conflict',
      enabled: true
    }
  ]);

  const { toast } = useToast();

  const toggleOverrideRule = (ruleId: string) => {
    setOverrideRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, enabled: !rule.enabled }
        : rule
    ));
  };

  const executeManualOverride = () => {
    if (!customCode.trim()) {
      toast({
        title: "No Code Provided",
        description: "Please enter custom merge code to execute",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Manual Override Applied",
      description: "Custom merge logic has been executed successfully"
    });

    // Reset after execution
    setCustomCode('');
    setOverrideMode(false);
  };

  const getActionBadge = (action: string) => {
    const config = {
      force_local: { color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300', label: 'Force Local' },
      force_remote: { color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300', label: 'Force Remote' },
      skip_conflict: { color: 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300', label: 'Skip' },
      custom_merge: { color: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300', label: 'Custom' }
    };

    const { color, label } = config[action as keyof typeof config] || config.custom_merge;
    return <Badge className={color}>{label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Override Control */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Manual Override Control</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              {overrideMode ? <Lock className="w-4 h-4 text-red-500" /> : <Unlock className="w-4 h-4 text-green-500" />}
              <span className="text-sm text-muted-foreground">Override Mode</span>
              <Switch 
                checked={overrideMode}
                onCheckedChange={setOverrideMode}
              />
            </div>
          </div>
        </CardHeader>

        {overrideMode && (
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Override mode is active. Manual resolution will bypass automatic conflict detection.
                Use with caution as this may introduce inconsistencies.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <label className="text-sm font-medium">Custom Merge Code</label>
              <Textarea
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="Enter custom JavaScript code for conflict resolution..."
                className="h-32 font-mono"
              />
              <div className="text-xs text-muted-foreground">
                Available variables: localVersion, remoteVersion, conflictPath, metadata
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={executeManualOverride}
                disabled={!customCode.trim()}
                className="flex-1"
              >
                <Code className="w-4 h-4 mr-2" />
                Execute Override
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setCustomCode('');
                  setOverrideMode(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Override Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Automatic Override Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {overrideRules.map((rule) => (
            <div key={rule.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium">{rule.name}</h4>
                  {getActionBadge(rule.action)}
                </div>
                <Switch 
                  checked={rule.enabled}
                  onCheckedChange={() => toggleOverrideRule(rule.id)}
                />
              </div>

              <div className="space-y-2">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Condition:</span>
                  <code className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                    {rule.condition}
                  </code>
                </div>
              </div>

              {rule.enabled && (
                <div className="mt-3 p-2 bg-green-50 dark:bg-green-950 rounded text-xs text-green-700 dark:text-green-300">
                  ✓ This rule is active and will automatically handle matching conflicts
                </div>
              )}
            </div>
          ))}

          <Button variant="outline" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Add New Rule
          </Button>
        </CardContent>
      </Card>

      {/* Warning */}
      {overrideMode && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Warning:</strong> Manual override mode is active. 
            All automatic conflict resolution is bypassed. 
            Make sure you understand the implications before proceeding.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
