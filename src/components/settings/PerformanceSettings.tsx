
import { useState, useEffect } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { useDataPersistence } from "@/contexts/DataPersistenceContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Zap, Activity } from "lucide-react";

interface PerformanceSettingsProps {
  performanceMode: string;
  setPerformanceMode: (value: string) => void;
  searchQuery?: string;
}

export const PerformanceSettings = ({ performanceMode, setPerformanceMode, searchQuery = "" }: PerformanceSettingsProps) => {
  // Render Optimization Settings
  const [renderOptimization, setRenderOptimization] = useState(true);
  const [virtualScrolling, setVirtualScrolling] = useState(false);
  const [memoization, setMemoization] = useState(true);
  const [componentLazyLoading, setComponentLazyLoading] = useState(true);

  // Network & Batching Settings
  const [networkBatching, setNetworkBatching] = useState(true);
  const [requestDeduplication, setRequestDeduplication] = useState(true);
  const [batchDelay, setBatchDelay] = useState("50");
  const [maxBatchSize, setMaxBatchSize] = useState("10");

  // Memory Management Settings
  const [memoryOptimization, setMemoryOptimization] = useState(true);
  const [autoCleanup, setAutoCleanup] = useState(true);
  const [memoryThreshold, setMemoryThreshold] = useState("80");
  const [cacheSize, setCacheSize] = useState("50");

  // Background Processing Settings
  const [backgroundProcessing, setBackgroundProcessing] = useState(true);
  const [workerThreads, setWorkerThreads] = useState(false);
  const [priorityQueuing, setPriorityQueuing] = useState(true);
  const [processingDelay, setProcessingDelay] = useState("100");

  // Animation & UI Settings
  const [animationComplexity, setAnimationComplexity] = useState("medium");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);

  // Lazy Loading Settings
  const [lazyLoadingEnabled, setLazyLoadingEnabled] = useState(true);
  const [intersectionThreshold, setIntersectionThreshold] = useState("0.1");
  const [preloadMargin, setPreloadMargin] = useState("50");

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

  const handleSaveRenderSettings = () => {
    console.log("Saving render optimization settings:", {
      renderOptimization,
      virtualScrolling,
      memoization,
      componentLazyLoading
    });
  };

  const handleSaveNetworkSettings = () => {
    console.log("Saving network settings:", {
      networkBatching,
      requestDeduplication,
      batchDelay,
      maxBatchSize
    });
  };

  const handleSaveMemorySettings = () => {
    console.log("Saving memory settings:", {
      memoryOptimization,
      autoCleanup,
      memoryThreshold,
      cacheSize
    });
  };

  const handleSaveBackgroundSettings = () => {
    console.log("Saving background processing settings:", {
      backgroundProcessing,
      workerThreads,
      priorityQueuing,
      processingDelay
    });
  };

  const handleSaveAnimationSettings = () => {
    console.log("Saving animation settings:", {
      animationComplexity,
      reducedMotion,
      hardwareAcceleration
    });
  };

  const handleSaveLazyLoadingSettings = () => {
    console.log("Saving lazy loading settings:", {
      lazyLoadingEnabled,
      intersectionThreshold,
      preloadMargin
    });
  };

  const handleResetAllSettings = () => {
    setPerformanceMode("balanced");
    setRenderOptimization(true);
    setVirtualScrolling(false);
    setMemoization(true);
    setComponentLazyLoading(true);
    setNetworkBatching(true);
    setRequestDeduplication(true);
    setBatchDelay("50");
    setMaxBatchSize("10");
    setMemoryOptimization(true);
    setAutoCleanup(true);
    setMemoryThreshold("80");
    setCacheSize("50");
    setBackgroundProcessing(true);
    setWorkerThreads(false);
    setPriorityQueuing(true);
    setProcessingDelay("100");
    setAnimationComplexity("medium");
    setReducedMotion(false);
    setHardwareAcceleration(true);
    setLazyLoadingEnabled(true);
    setIntersectionThreshold("0.1");
    setPreloadMargin("50");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            Performance Configuration
          </CardTitle>
          <CardDescription>
            Advanced performance optimization and resource management settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="optimization" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Optimization
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Monitoring
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <SettingsSection
                title="General Performance Settings"
                description="Basic performance mode and optimization preferences"
                onSave={() => console.log("General settings saved")}
                onReset={handleResetAllSettings}
                searchQuery={searchQuery}
              >
                <SettingItem
                  id="performance-mode"
                  type="select"
                  label="Performance Mode"
                  description="Overall performance optimization strategy"
                  value={performanceMode}
                  onValueChange={setPerformanceMode}
                  options={[
                    { value: "power-saver", label: "Power Saver - Minimal resources" },
                    { value: "balanced", label: "Balanced - Smart optimization" },
                    { value: "performance", label: "High Performance - Maximum speed" },
                    { value: "custom", label: "Custom - Manual configuration" }
                  ]}
                />

                <SettingItem
                  id="render-optimization"
                  type="switch"
                  label="Render Optimization Toggles"
                  description="Enable advanced rendering optimizations"
                  checked={renderOptimization}
                  onCheckedChange={setRenderOptimization}
                />

                <SettingItem
                  id="network-batching"
                  type="switch"
                  label="Network Request Batching"
                  description="Group multiple requests for better performance"
                  checked={networkBatching}
                  onCheckedChange={setNetworkBatching}
                />

                <SettingItem
                  id="memory-optimization"
                  type="switch"
                  label="Memory Management Options"
                  description="Automatic memory cleanup and optimization"
                  checked={memoryOptimization}
                  onCheckedChange={setMemoryOptimization}
                />

                <SettingItem
                  id="background-processing"
                  type="switch"
                  label="Background Processing Controls"
                  description="Enable background task processing"
                  checked={backgroundProcessing}
                  onCheckedChange={setBackgroundProcessing}
                />
              </SettingsSection>
            </TabsContent>

            <TabsContent value="optimization" className="space-y-6 mt-6">
              <SettingsSection
                title="Advanced Optimization Settings"
                description="Fine-tune specific performance aspects"
                onSave={() => console.log("Optimization settings saved")}
                onReset={handleResetAllSettings}
                searchQuery={searchQuery}
              >
                <div className="space-y-4">
                  <h4 className="font-medium">Animation & UI Performance</h4>
                  <SettingItem
                    id="animation-complexity"
                    type="select"
                    label="Animation Complexity Settings"
                    description="Control animation detail and smoothness"
                    value={animationComplexity}
                    onValueChange={setAnimationComplexity}
                    options={[
                      { value: "minimal", label: "Minimal - Essential animations only" },
                      { value: "medium", label: "Medium - Balanced animations" },
                      { value: "rich", label: "Rich - Full animation suite" },
                      { value: "disabled", label: "Disabled - No animations" }
                    ]}
                  />

                  <SettingItem
                    id="reduced-motion"
                    type="switch"
                    label="Respect Reduced Motion"
                    description="Honor user's reduced motion preferences"
                    checked={reducedMotion}
                    onCheckedChange={setReducedMotion}
                  />

                  <SettingItem
                    id="hardware-acceleration"
                    type="switch"
                    label="Hardware Acceleration"
                    description="Use GPU for better performance"
                    checked={hardwareAcceleration}
                    onCheckedChange={setHardwareAcceleration}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Lazy Loading Configuration</h4>
                  <SettingItem
                    id="lazy-loading-enabled"
                    type="switch"
                    label="Lazy Loading Thresholds"
                    description="Enable intelligent content loading"
                    checked={lazyLoadingEnabled}
                    onCheckedChange={setLazyLoadingEnabled}
                  />

                  <SettingItem
                    id="intersection-threshold"
                    type="select"
                    label="Intersection Threshold"
                    description="When to start loading content"
                    value={intersectionThreshold}
                    onValueChange={setIntersectionThreshold}
                    options={[
                      { value: "0.0", label: "Immediate - As soon as visible" },
                      { value: "0.1", label: "Early - 10% visible" },
                      { value: "0.3", label: "Balanced - 30% visible" },
                      { value: "0.5", label: "Late - 50% visible" }
                    ]}
                  />

                  <SettingItem
                    id="preload-margin"
                    type="select"
                    label="Preload Margin"
                    description="Distance ahead to preload content"
                    value={preloadMargin}
                    onValueChange={setPreloadMargin}
                    options={[
                      { value: "0", label: "None - No preloading" },
                      { value: "25", label: "Small - 25px margin" },
                      { value: "50", label: "Medium - 50px margin" },
                      { value: "100", label: "Large - 100px margin" }
                    ]}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Advanced Rendering</h4>
                  <SettingItem
                    id="virtual-scrolling"
                    type="switch"
                    label="Virtual Scrolling"
                    description="Render only visible items in large lists"
                    checked={virtualScrolling}
                    onCheckedChange={setVirtualScrolling}
                  />

                  <SettingItem
                    id="memoization"
                    type="switch"
                    label="Component Memoization"
                    description="Cache expensive component renders"
                    checked={memoization}
                    onCheckedChange={setMemoization}
                  />

                  <SettingItem
                    id="component-lazy-loading"
                    type="switch"
                    label="Component Lazy Loading"
                    description="Load components only when needed"
                    checked={componentLazyLoading}
                    onCheckedChange={setComponentLazyLoading}
                  />
                </div>
              </SettingsSection>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6 mt-6">
              {/* Performance Metrics Dashboard */}
              {performanceMetrics && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Performance Metrics
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => perfSystem.monitoring.measureMemoryUsage()}
                        >
                          Measure Memory
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => perfSystem.batching.flushBatch()}
                          disabled={performanceMetrics.queueStats?.total === 0}
                        >
                          Flush Batch ({performanceMetrics.queueStats?.total || 0})
                        </Button>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      Real-time performance monitoring and optimization status
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
                        <div className="text-sm font-medium">Network Requests</div>
                        <div className="text-2xl font-bold">
                          {performanceMetrics.networkRequestTime?.toFixed(2) || '0.00'}ms
                        </div>
                        <Badge variant={performanceMetrics.networkRequestTime > 200 ? "destructive" : "secondary"}>
                          {performanceMetrics.networkRequestTime > 200 ? "Slow" : "Fast"}
                        </Badge>
                      </div>
                    </div>

                    {/* Performance Status Grid */}
                    <div className="mt-6 pt-4 border-t">
                      <div className="text-sm font-medium mb-3">Optimization Status</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Badge variant={renderOptimization ? "default" : "secondary"}>
                            {renderOptimization ? "Enabled" : "Disabled"}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">Render Opt.</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={networkBatching ? "default" : "secondary"}>
                            {networkBatching ? "Enabled" : "Disabled"}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">Network Batch</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={memoryOptimization ? "default" : "secondary"}>
                            {memoryOptimization ? "Enabled" : "Disabled"}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">Memory Opt.</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={lazyLoadingEnabled ? "default" : "secondary"}>
                            {lazyLoadingEnabled ? "Enabled" : "Disabled"}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">Lazy Loading</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
