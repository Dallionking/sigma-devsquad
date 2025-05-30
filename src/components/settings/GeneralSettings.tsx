
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";

interface GeneralSettingsProps {
  searchQuery?: string;
}

export const GeneralSettings = ({ searchQuery = "" }: GeneralSettingsProps) => {
  const [autoSave, setAutoSave] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [defaultTimeout, setDefaultTimeout] = useState("300");
  const [maxRetries, setMaxRetries] = useState("3");
  const [logLevel, setLogLevel] = useState("info");

  const handleSave = () => {
    console.log("Saving general settings:", {
      autoSave,
      debugMode,
      defaultTimeout,
      maxRetries,
      logLevel
    });
  };

  const handleReset = () => {
    setAutoSave(true);
    setDebugMode(false);
    setDefaultTimeout("300");
    setMaxRetries("3");
    setLogLevel("info");
  };

  return (
    <SettingsSection
      title="General Settings"
      description="Configure basic system preferences"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <SettingItem
        id="auto-save"
        type="switch"
        label="Auto-save Changes"
        description="Automatically save configuration changes"
        checked={autoSave}
        onCheckedChange={setAutoSave}
      />

      <SettingItem
        id="default-timeout"
        type="select"
        label="Default Agent Timeout"
        description="Default timeout for agent operations"
        value={defaultTimeout}
        onValueChange={setDefaultTimeout}
        options={[
          { value: "60", label: "1 minute" },
          { value: "300", label: "5 minutes" },
          { value: "600", label: "10 minutes" },
          { value: "1800", label: "30 minutes" }
        ]}
      />

      <SettingItem
        id="max-retries"
        type="input"
        label="Max Retries"
        description="Maximum number of retry attempts"
        value={maxRetries}
        onChange={setMaxRetries}
        inputType="number"
        placeholder="Enter max retries"
      />

      <SettingItem
        id="log-level"
        type="select"
        label="Log Level"
        description="System logging verbosity level"
        value={logLevel}
        onValueChange={setLogLevel}
        options={[
          { value: "error", label: "Error" },
          { value: "warn", label: "Warning" },
          { value: "info", label: "Info" },
          { value: "debug", label: "Debug" }
        ]}
      />

      <SettingItem
        id="debug-mode"
        type="switch"
        label="Debug Mode"
        description="Enable detailed logging and debugging"
        checked={debugMode}
        onCheckedChange={setDebugMode}
      />
    </SettingsSection>
  );
};
