
import { SettingItem } from "./SettingItem";
import { Monitor } from "lucide-react";

interface ThemeDisplaySettingsProps {
  useSystemPreference: boolean;
  setUseSystemPreference: (value: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  interfaceScale: string;
  setInterfaceScale: (value: string) => void;
  accentColor: string;
  setAccentColor: (value: string) => void;
}

export const ThemeDisplaySettings = ({
  useSystemPreference,
  setUseSystemPreference,
  darkMode,
  toggleDarkMode,
  interfaceScale,
  setInterfaceScale,
  accentColor,
  setAccentColor
}: ThemeDisplaySettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
          <Monitor className="w-4 h-4" />
          Theme & Display
        </h4>
        <p className="text-sm text-muted-foreground">Control how the interface looks and feels</p>
      </div>

      <SettingItem
        id="use-system-preference"
        type="switch"
        label="Use System Theme"
        description="Automatically switch between light and dark mode based on your system preference"
        checked={useSystemPreference}
        onCheckedChange={setUseSystemPreference}
      />

      {!useSystemPreference && (
        <SettingItem
          id="dark-mode"
          type="switch"
          label="Dark Mode"
          description="Switch to dark theme for better viewing in low light"
          checked={darkMode}
          onCheckedChange={toggleDarkMode}
        />
      )}

      <SettingItem
        id="interface-scale"
        type="select"
        label="Interface Scale"
        description="Adjust the overall size of UI elements for better readability"
        value={interfaceScale}
        onValueChange={setInterfaceScale}
        options={[
          { value: "75", label: "75% - Compact" },
          { value: "90", label: "90% - Small" },
          { value: "100", label: "100% - Default" },
          { value: "110", label: "110% - Large" },
          { value: "125", label: "125% - Extra Large" },
          { value: "150", label: "150% - Maximum" }
        ]}
      />

      <SettingItem
        id="accent-color"
        type="select"
        label="Accent Color"
        description="Choose the primary accent color used throughout the interface"
        value={accentColor}
        onValueChange={setAccentColor}
        options={[
          { value: "blue", label: "Blue - Default" },
          { value: "green", label: "Green - Nature" },
          { value: "purple", label: "Purple - Creative" },
          { value: "orange", label: "Orange - Energetic" },
          { value: "red", label: "Red - Bold" },
          { value: "teal", label: "Teal - Calm" }
        ]}
      />
    </div>
  );
};
