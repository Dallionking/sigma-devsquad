
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";

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

  const handleSave = () => {
    console.log("Saving performance settings:", {
      performanceMode,
      realTimeUpdates,
      maxConcurrentAgents,
      cacheEnabled,
      preloadData
    });
  };

  const handleReset = () => {
    setPerformanceMode("balanced");
    setRealTimeUpdates(true);
    setMaxConcurrentAgents("6");
    setCacheEnabled(true);
    setPreloadData(false);
  };

  return (
    <SettingsSection
      title="Performance Settings"
      description="Optimize system performance and resource usage"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
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
    </SettingsSection>
  );
};
