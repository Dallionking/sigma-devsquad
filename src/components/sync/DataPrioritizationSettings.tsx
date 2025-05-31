
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowUp, 
  ArrowDown, 
  Users, 
  MessageSquare, 
  FileText, 
  Database,
  Settings2,
  Save
} from "lucide-react";

interface DataPriority {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  priority: number;
  enabled: boolean;
  description: string;
  estimatedSize: string;
}

export const DataPrioritizationSettings = () => {
  const { toast } = useToast();
  const [dataPriorities, setDataPriorities] = useState<DataPriority[]>([
    {
      id: 'agents',
      name: 'Agent Configurations',
      icon: Users,
      priority: 1,
      enabled: true,
      description: 'Agent settings, roles, and configurations',
      estimatedSize: '2-5 KB per agent'
    },
    {
      id: 'tasks',
      name: 'Task Management',
      icon: FileText,
      priority: 2,
      enabled: true,
      description: 'Tasks, assignments, and progress tracking',
      estimatedSize: '1-3 KB per task'
    },
    {
      id: 'messages',
      name: 'Message History',
      icon: MessageSquare,
      priority: 3,
      enabled: false,
      description: 'Chat history and communication logs',
      estimatedSize: '500 B - 2 KB per message'
    },
    {
      id: 'analytics',
      name: 'Analytics Data',
      icon: Database,
      priority: 4,
      enabled: false,
      description: 'Performance metrics and usage statistics',
      estimatedSize: '10-50 KB per report'
    }
  ]);

  const [syncStrategy, setSyncStrategy] = useState<'priority' | 'size' | 'time'>('priority');
  const [maxOfflineStorage, setMaxOfflineStorage] = useState([50]); // MB
  const [autoCleanup, setAutoCleanup] = useState(true);
  const [cleanupAge, setCleanupAge] = useState([30]); // days

  const updatePriority = (id: string, newPriority: number) => {
    setDataPriorities(prev => prev.map(item => 
      item.id === id ? { ...item, priority: newPriority } : item
    ));
  };

  const toggleEnabled = (id: string) => {
    setDataPriorities(prev => prev.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    ));
  };

  const movePriority = (id: string, direction: 'up' | 'down') => {
    setDataPriorities(prev => {
      const currentIndex = prev.findIndex(item => item.id === id);
      if (currentIndex === -1) return prev;

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newArray = [...prev];
      [newArray[currentIndex], newArray[newIndex]] = [newArray[newIndex], newArray[currentIndex]];
      
      // Update priority numbers
      return newArray.map((item, index) => ({
        ...item,
        priority: index + 1
      }));
    });
  };

  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Data prioritization settings have been updated",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings2 className="w-5 h-5" />
          <span>Data Prioritization Settings</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Sync Strategy */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Sync Strategy</h4>
          <Select value={syncStrategy} onValueChange={(value: any) => setSyncStrategy(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priority-based (sync most important first)</SelectItem>
              <SelectItem value="size">Size-based (sync smallest items first)</SelectItem>
              <SelectItem value="time">Time-based (sync oldest changes first)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Data Type Priorities */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Data Type Priorities</h4>
          <div className="space-y-3">
            {dataPriorities
              .sort((a, b) => a.priority - b.priority)
              .map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => movePriority(item.id, 'up')}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => movePriority(item.id, 'down')}
                        disabled={index === dataPriorities.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                    </div>

                    <Badge variant="outline" className="min-w-[2rem] justify-center">
                      {item.priority}
                    </Badge>

                    <ItemIcon className="w-5 h-5 text-muted-foreground" />

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{item.name}</span>
                        <Switch
                          checked={item.enabled}
                          onCheckedChange={() => toggleEnabled(item.id)}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Size: {item.estimatedSize}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <Separator />

        {/* Storage Limits */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Storage Management</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Maximum Offline Storage</label>
                <span className="text-sm text-muted-foreground">{maxOfflineStorage[0]} MB</span>
              </div>
              <Slider
                value={maxOfflineStorage}
                onValueChange={setMaxOfflineStorage}
                max={500}
                min={10}
                step={10}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto-cleanup old data</label>
                <p className="text-xs text-muted-foreground">
                  Automatically remove data older than specified period
                </p>
              </div>
              <Switch
                checked={autoCleanup}
                onCheckedChange={setAutoCleanup}
              />
            </div>

            {autoCleanup && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Cleanup after</label>
                  <span className="text-sm text-muted-foreground">{cleanupAge[0]} days</span>
                </div>
                <Slider
                  value={cleanupAge}
                  onValueChange={setCleanupAge}
                  max={365}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveSettings}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
