
import { SettingsSection } from "../SettingsSection";
import { SettingItem } from "../SettingItem";

interface StateManagementConfig {
  updateFrequency: string;
  cachingStrategy: string;
  persistenceMode: string;
  debugMode: boolean;
  performanceLevel: string;
  compressionEnabled: boolean;
}

interface StateManagementTabProps {
  stateConfig: StateManagementConfig;
  updateStateConfig: (updates: Partial<StateManagementConfig>) => void;
  saveStateSettings: () => void;
  resetStateSettings: () => void;
  searchQuery?: string;
}

export const StateManagementTab = ({
  stateConfig,
  updateStateConfig,
  saveStateSettings,
  resetStateSettings,
  searchQuery = ""
}: StateManagementTabProps) => {
  return (
    <SettingsSection
      title="State Management Settings"
      description="Configure how the application manages and persists state"
      onSave={saveStateSettings}
      onReset={resetStateSettings}
      searchQuery={searchQuery}
    >
      <SettingItem
        id="update-frequency"
        type="select"
        label="Update Frequency"
        description="How often state updates are processed"
        value={stateConfig.updateFrequency}
        onValueChange={(value) => updateStateConfig({ updateFrequency: value })}
        options={[
          { value: "high", label: "High (16ms)" },
          { value: "medium", label: "Medium (50ms)" },
          { value: "low", label: "Low (100ms)" },
          { value: "minimal", label: "Minimal (500ms)" }
        ]}
      />

      <SettingItem
        id="caching-strategy"
        type="select"
        label="Caching Strategy"
        description="How data is cached and retrieved"
        value={stateConfig.cachingStrategy}
        onValueChange={(value) => updateStateConfig({ cachingStrategy: value })}
        options={[
          { value: "aggressive", label: "Aggressive - Cache everything" },
          { value: "smart", label: "Smart - Cache frequently used" },
          { value: "minimal", label: "Minimal - Cache essential only" },
          { value: "disabled", label: "Disabled - No caching" }
        ]}
      />

      <SettingItem
        id="persistence-mode"
        type="select"
        label="Persistence Preferences"
        description="Where and how state data is stored"
        value={stateConfig.persistenceMode}
        onValueChange={(value) => updateStateConfig({ persistenceMode: value })}
        options={[
          { value: "session", label: "Session Storage" },
          { value: "local", label: "Local Storage" },
          { value: "memory", label: "Memory Only" },
          { value: "cloud", label: "Cloud Sync" }
        ]}
      />

      <SettingItem
        id="debug-mode"
        type="switch"
        label="Debug Mode"
        description="Enable detailed state debugging and logging"
        checked={stateConfig.debugMode}
        onCheckedChange={(checked) => updateStateConfig({ debugMode: checked })}
      />

      <SettingItem
        id="performance-level"
        type="select"
        label="Performance Optimization"
        description="Level of performance optimizations applied"
        value={stateConfig.performanceLevel}
        onValueChange={(value) => updateStateConfig({ performanceLevel: value })}
        options={[
          { value: "maximum", label: "Maximum - All optimizations" },
          { value: "balanced", label: "Balanced - Smart optimizations" },
          { value: "minimal", label: "Minimal - Basic optimizations" },
          { value: "disabled", label: "Disabled - No optimizations" }
        ]}
      />

      <SettingItem
        id="compression-enabled"
        type="switch"
        label="Data Compression"
        description="Compress large state objects to save memory"
        checked={stateConfig.compressionEnabled}
        onCheckedChange={(checked) => updateStateConfig({ compressionEnabled: checked })}
      />
    </SettingsSection>
  );
};
