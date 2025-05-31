
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Zap, Memory, Cpu, HardDrive } from "lucide-react";

interface OptimizationSettings {
  enableMemoization: boolean;
  enableVirtualization: boolean;
  enableBatching: boolean;
  enableCompression: boolean;
  enableLazyLoading: boolean;
  enableCaching: boolean;
}

export const PerformanceOptimizationPanel = () => {
  const [settings, setSettings] = useState<OptimizationSettings>({
    enableMemoization: true,
    enableVirtualization: false,
    enableBatching: true,
    enableCompression: false,
    enableLazyLoading: true,
    enableCaching: true
  });

  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const updateSetting = (key: keyof OptimizationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const runOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setOptimizationProgress(i);
    }
    
    setIsOptimizing(false);
  };

  const getOptimizationScore = () => {
    const enabledCount = Object.values(settings).filter(Boolean).length;
    return Math.round((enabledCount / Object.keys(settings).length) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Performance Optimization
          </div>
          <Badge variant={getOptimizationScore() >= 80 ? "default" : "secondary"}>
            {getOptimizationScore()}% optimized
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Component Memoization</div>
                  <div className="text-sm text-muted-foreground">
                    Cache expensive component renders
                  </div>
                </div>
                <Switch
                  checked={settings.enableMemoization}
                  onCheckedChange={(checked) => updateSetting('enableMemoization', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Virtual Scrolling</div>
                  <div className="text-sm text-muted-foreground">
                    Render only visible list items
                  </div>
                </div>
                <Switch
                  checked={settings.enableVirtualization}
                  onCheckedChange={(checked) => updateSetting('enableVirtualization', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Batched Updates</div>
                  <div className="text-sm text-muted-foreground">
                    Group state updates for better performance
                  </div>
                </div>
                <Switch
                  checked={settings.enableBatching}
                  onCheckedChange={(checked) => updateSetting('enableBatching', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Data Compression</div>
                  <div className="text-sm text-muted-foreground">
                    Compress large data objects
                  </div>
                </div>
                <Switch
                  checked={settings.enableCompression}
                  onCheckedChange={(checked) => updateSetting('enableCompression', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Lazy Loading</div>
                  <div className="text-sm text-muted-foreground">
                    Load components only when needed
                  </div>
                </div>
                <Switch
                  checked={settings.enableLazyLoading}
                  onCheckedChange={(checked) => updateSetting('enableLazyLoading', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Smart Caching</div>
                  <div className="text-sm text-muted-foreground">
                    Cache frequently accessed data
                  </div>
                </div>
                <Switch
                  checked={settings.enableCaching}
                  onCheckedChange={(checked) => updateSetting('enableCaching', checked)}
                />
              </div>
            </div>

            {isOptimizing && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Applying optimizations...</div>
                <Progress value={optimizationProgress} className="h-2" />
              </div>
            )}

            <Button 
              onClick={runOptimization}
              disabled={isOptimizing}
              className="w-full"
            >
              {isOptimizing ? 'Optimizing...' : 'Apply Optimizations'}
            </Button>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Cpu className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm font-medium">CPU Usage</div>
                  <div className="text-2xl font-bold">23%</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Memory className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-sm font-medium">Memory Efficiency</div>
                  <div className="text-2xl font-bold">87%</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm">Enable Virtual Scrolling</div>
                <div className="text-xs text-muted-foreground">
                  For lists with 100+ items, virtual scrolling can improve performance by 50-70%
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm">Use Data Compression</div>
                <div className="text-xs text-muted-foreground">
                  Large datasets can benefit from compression to reduce memory usage
                </div>
              </div>
              <div className="p-3 border rounded-lg">
                <div className="font-medium text-sm">Optimize Re-renders</div>
                <div className="text-xs text-muted-foreground">
                  Consider using React.memo for components that render frequently
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
