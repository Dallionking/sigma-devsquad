
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";

interface AppearanceSettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  searchQuery?: string;
}

export const AppearanceSettings = ({ darkMode, setDarkMode, searchQuery = "" }: AppearanceSettingsProps) => {
  const [interfaceScale, setInterfaceScale] = useState("100");
  const [accentColor, setAccentColor] = useState("blue");
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);

  const handleSave = () => {
    console.log("Saving appearance settings:", {
      darkMode,
      interfaceScale,
      accentColor,
      compactMode,
      animations
    });
  };

  const handleReset = () => {
    setDarkMode(false);
    setInterfaceScale("100");
    setAccentColor("blue");
    setCompactMode(false);
    setAnimations(true);
  };

  return (
    <SettingsSection
      title="Appearance Settings"
      description="Customize the visual appearance of the interface"
      onSave={handleSave}
      onReset={handleReset}
      searchQuery={searchQuery}
    >
      <SettingItem
        id="dark-mode"
        type="switch"
        label="Dark Mode"
        description="Switch to dark theme"
        checked={darkMode}
        onCheckedChange={setDarkMode}
      />

      <SettingItem
        id="interface-scale"
        type="select"
        label="Interface Scale"
        description="Adjust the overall size of UI elements"
        value={interfaceScale}
        onValueChange={setInterfaceScale}
        options={[
          { value: "90", label: "90%" },
          { value: "100", label: "100%" },
          { value: "110", label: "110%" },
          { value: "125", label: "125%" }
        ]}
      />

      <SettingItem
        id="accent-color"
        type="select"
        label="Accent Color"
        description="Choose the primary accent color"
        value={accentColor}
        onValueChange={setAccentColor}
        options={[
          { value: "blue", label: "Blue" },
          { value: "green", label: "Green" },
          { value: "purple", label: "Purple" },
          { value: "orange", label: "Orange" }
        ]}
      />

      <SettingItem
        id="compact-mode"
        type="switch"
        label="Compact Mode"
        description="Use smaller spacing and compact layouts"
        checked={compactMode}
        onCheckedChange={setCompactMode}
      />

      <SettingItem
        id="animations"
        type="switch"
        label="Enable Animations"
        description="Show smooth transitions and animations"
        checked={animations}
        onCheckedChange={setAnimations}
      />
    </SettingsSection>
  );
};
