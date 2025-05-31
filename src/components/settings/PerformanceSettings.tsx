
import { useState, useEffect } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PerformanceSettingsProps {
  performanceMode: string;
  setPerformanceMode: (value: string) => void;
  searchQuery?: string;
}

export const PerformanceSettings = ({ performanceMode, setPerformanceMode, searchQuery = "" }: PerformanceSettingsProps) => {
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [maxConcurrentAgents, setMaxConcurrentAgents] = useState("6");
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [preloadData, setPreloadData] = useState(false);
  const [enableBatching, setEnableBatching] = useState(true);
  const [enableCompression, setEnableCompression] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<any>(null);
  
  const { performance: perfSystem } = useDataPersistence();

  // Update performance metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const snapshot = perfSystem.monitoring.getPerformanceSnapshot();
      const queueStats = perfSystem.batching.getQueueStats();
      
      setPerformanceMetrics({
        ...snapshot,
        queueStats
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [perfSystem]);

  const handleSave = () => {
    console.log("Saving performance settings:", {
      performanceMode,
      realTimeUpdates,
      maxConcurrentAgents,
      cacheEnabled,
      preloadData,
      enableBatching,
      enableCompression
    });
  };

  const handleReset = () => {
    setPerformanceMode("balanced");
    setRealTimeUpdates(true);
    setMaxConcurrentAgents("6");
    setCacheEnabled(true);
    setPreloadData(false);
    setEnableBatching(true);
    setEnableCompression(false);
  };

  const handleFlushBatch = () => {
    perfSystem.batching.flushBatch();
  };

  const handleClearQueues = () => {
    perfSystem.batching.clearQueues();
  };

  const handleMemoryMeasurement = () => {
    perfSystem.monitoring.measureMemoryUsage();
  };

  return (
    <SettingsSection
      title="Performance Settings"
      description="Optimize system performance and resource usage"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      {/* Performance Mode */}
      <SettingItem
        id="performance-mode"
        type="select"
        label="Performance Mode"
        description="Choose optimization strategy"
        value={performanceMode}
        onValueChange={setPerformanceMode}
        options={[
          { value: "power-saver", label: "Power Saver" },
          { value: "balanced", label: "Balanced" },
          { value: "performance", label: "High Performance" }
        ]}
      />

      {/* Real-time Features */}
      <SettingItem
        id="real-time-updates"
        type="switch"
        label="Real-time Updates"
        description="Enable live updates for agent status"
        checked={realTimeUpdates}
        onCheckedChange={setRealTimeUpdates}
      />

      <SettingItem
        id="max-concurrent-agents"
        type="select"
        label="Max Concurrent Agents"
        description="Maximum number of agents running simultaneously"
        value={maxConcurrentAgents}
        onValueChange={setMaxConcurrentAgents}
        options={[
          { value: "3", label: "3 agents" },
          { value: "6", label: "6 agents" },
          { value: "10", label: "10 agents" },
          { value: "unlimited", label: "Unlimited" }
        ]}
      />

      {/* Performance Optimizations */}
      <SettingItem
        id="cache-enabled"
        type="switch"
        label="Enable Caching"
        description="Cache frequently accessed data for better performance"
        checked={cacheEnabled}
        onCheckedChange={setCacheEnabled}
      />

      <SettingItem
        id="preload-data"
        type="switch"
        label="Preload Data"
        description="Load data in advance to improve responsiveness"
        checked={preloadData}
        onCheckedChange={setPreloadData}
      />

      <SettingItem
        id="enable-batching"
        type="switch"
        label="Batch Updates"
        description="Group multiple state updates for better performance"
        checked={enableBatching}
        onCheckedChange={setEnableBatching}
      />

      <SettingItem
        id="enable-compression"
        type="switch"
        label="State Compression"
        description="Compress large state objects to save memory"
        checked={enableCompression}
        onCheckedChange={setEnableCompression}
      />

      {/* Performance Metrics Dashboard */}
      {performanceMetrics && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Performance Metrics
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMemoryMeasurement}
                >
                  Measure Memory
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleFlushBatch}
                  disabled={performanceMetrics.queueStats?.total === 0}
                >
                  Flush Batch ({performanceMetrics.queueStats?.total || 0})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearQueues}
                  disabled={performanceMetrics.queueStats?.total === 0}
                >
                  Clear Queues
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Real-time performance monitoring and batch processing status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Render Time</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.renderTime?.toFixed(2) || '0.00'}ms
                </div>
                <Badge variant={performanceMetrics.renderTime > 16 ? "destructive" : "secondary"}>
                  {performanceMetrics.renderTime > 16 ? "Slow" : "Good"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Memory Usage</div>
                <div className="text-2xl font-bold">
                  {((performanceMetrics.memoryUsage || 0) / (1024 * 1024)).toFixed(1)}MB
                </div>
                <Badge variant={performanceMetrics.memoryUsage > 50 * 1024 * 1024 ? "destructive" : "secondary"}>
                  {performanceMetrics.memoryUsage > 50 * 1024 * 1024 ? "High" : "Normal"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">State Updates</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.stateUpdateTime?.toFixed(2) || '0.00'}ms
                </div>
                <Badge variant={performanceMetrics.stateUpdateTime > 5 ? "destructive" : "secondary"}>
                  {performanceMetrics.stateUpdateTime > 5 ? "Slow" : "Fast"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">Event Processing</div>
                <div className="text-2xl font-bold">
                  {performanceMetrics.eventProcessingTime?.toFixed(2) || '0.00'}ms
                </div>
                <Badge variant={performanceMetrics.eventProcessingTime > 10 ? "destructive" : "secondary"}>
                  {performanceMetrics.eventProcessingTime > 10 ? "Slow" : "Fast"}
                </Badge>
              </div>
            </div>

            {/* Batch Queue Status */}
            {performanceMetrics.queueStats && (
              <div className="mt-6 pt-4 border-t">
                <div className="text-sm font-medium mb-3">Batch Queue Status</div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">
                      {performanceMetrics.queueStats.high || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">High Priority</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-600">
                      {performanceMetrics.queueStats.normal || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Normal Priority</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {performanceMetrics.queueStats.low || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Low Priority</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">
                      {performanceMetrics.queueStats.total || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Queued</div>
                  </div>
                </div>
                {performanceMetrics.queueStats.isProcessing && (
                  <div className="mt-2 text-center">
                    <Badge variant="outline" className="animate-pulse">
                      Processing Batch...
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </SettingsSection>
  );
};
