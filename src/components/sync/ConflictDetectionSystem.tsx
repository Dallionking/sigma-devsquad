import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Shield, Zap, Settings, Scan } from "lucide-react";

interface ConflictRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  sensitivity: 'low' | 'medium' | 'high';
  autoResolve: boolean;
}

interface DetectionStats {
  totalScans: number;
  conflictsDetected: number;
  autoResolved: number;
  lastScan: Date;
}

export const ConflictDetectionSystem = () => {
  const [isAutoDetectionEnabled, setIsAutoDetectionEnabled] = useState(true);
  const [detectionRules, setDetectionRules] = useState<ConflictRule[]>([
    {
      id: 'structural-changes',
      name: 'Structural Changes',
      description: 'Detect conflicts in component structure and hierarchy',
      enabled: true,
      sensitivity: 'high',
      autoResolve: false
    },
    {
      id: 'style-conflicts',
      name: 'Style Conflicts',
      description: 'Detect conflicting CSS and styling changes',
      enabled: true,
      sensitivity: 'medium',
      autoResolve: true
    },
    {
      id: 'data-schema',
      name: 'Data Schema Changes',
      description: 'Detect conflicts in data structure and types',
      enabled: true,
      sensitivity: 'high',
      autoResolve: false
    },
    {
      id: 'configuration',
      name: 'Configuration Changes',
      description: 'Detect conflicts in app configuration and settings',
      enabled: false,
      sensitivity: 'low',
      autoResolve: true
    }
  ]);

  const [stats, setStats] = useState<DetectionStats>({
    totalScans: 247,
    conflictsDetected: 12,
    autoResolved: 8,
    lastScan: new Date()
  });

  const { toast } = useToast();

  useEffect(() => {
    if (isAutoDetectionEnabled) {
      const interval = setInterval(() => {
        // Simulate conflict detection
        const hasNewConflicts = Math.random() > 0.9;
        if (hasNewConflicts) {
          setStats(prev => ({
            ...prev,
            totalScans: prev.totalScans + 1,
            conflictsDetected: prev.conflictsDetected + 1,
            lastScan: new Date()
          }));

          toast({
            title: "Conflict Detected",
            description: "New conflict detected in component structure",
            variant: "destructive"
          });
        } else {
          setStats(prev => ({
            ...prev,
            totalScans: prev.totalScans + 1,
            lastScan: new Date()
          }));
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoDetectionEnabled, toast]);

  const toggleRule = (ruleId: string, field: 'enabled' | 'autoResolve') => {
    setDetectionRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, [field]: !rule[field] }
        : rule
    ));
  };

  const updateSensitivity = (ruleId: string, sensitivity: 'low' | 'medium' | 'high') => {
    setDetectionRules(prev => prev.map(rule => 
      rule.id === ruleId 
        ? { ...rule, sensitivity }
        : rule
    ));
  };

  const runManualScan = () => {
    toast({
      title: "Manual Scan Started",
      description: "Scanning for conflicts across all components..."
    });

    // Simulate scan
    setTimeout(() => {
      setStats(prev => ({
        ...prev,
        totalScans: prev.totalScans + 1,
        lastScan: new Date()
      }));

      toast({
        title: "Scan Complete",
        description: "No conflicts detected in manual scan"
      });
    }, 2000);
  };

  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
      case 'high': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'low': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Detection Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Conflict Detection System</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Auto-detection</span>
              <Switch 
                checked={isAutoDetectionEnabled}
                onCheckedChange={setIsAutoDetectionEnabled}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">{stats.totalScans}</div>
              <div className="text-sm text-muted-foreground">Total Scans</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-destructive">{stats.conflictsDetected}</div>
              <div className="text-sm text-muted-foreground">Conflicts Found</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.autoResolved}</div>
              <div className="text-sm text-muted-foreground">Auto-Resolved</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium">{stats.lastScan.toLocaleTimeString()}</div>
              <div className="text-sm text-muted-foreground">Last Scan</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button onClick={runManualScan} className="flex-1">
              <Scan className="w-4 h-4 mr-2" />
              Run Manual Scan
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Advanced Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detection Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Detection Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {detectionRules.map((rule) => (
            <div key={rule.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium">{rule.name}</h4>
                    <Badge className={getSensitivityColor(rule.sensitivity)}>
                      {rule.sensitivity}
                    </Badge>
                    {rule.autoResolve && (
                      <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
                        <Zap className="w-3 h-3 mr-1" />
                        Auto-resolve
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {rule.description}
                  </p>
                </div>
                <Switch 
                  checked={rule.enabled}
                  onCheckedChange={() => toggleRule(rule.id, 'enabled')}
                />
              </div>

              {rule.enabled && (
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Sensitivity:</span>
                      <div className="flex space-x-1">
                        {(['low', 'medium', 'high'] as const).map((level) => (
                          <Button
                            key={level}
                            size="sm"
                            variant={rule.sensitivity === level ? 'default' : 'outline'}
                            onClick={() => updateSensitivity(rule.id, level)}
                            className="h-6 px-2 text-xs"
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Auto-resolve:</span>
                    <Switch 
                      checked={rule.autoResolve}
                      onCheckedChange={() => toggleRule(rule.id, 'autoResolve')}
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Status Alert */}
      {!isAutoDetectionEnabled && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Automatic conflict detection is disabled. You may miss important conflicts.
            <Button 
              variant="link" 
              className="p-0 h-auto ml-2"
              onClick={() => setIsAutoDetectionEnabled(true)}
            >
              Enable now
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
