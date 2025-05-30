
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemePreviewCard } from "./ThemePreviewCard";
import { ThemeDisplaySettings } from "./ThemeDisplaySettings";
import { LayoutPerformanceSettings } from "./LayoutPerformanceSettings";
import { AccessibilitySettings } from "./AccessibilitySettings";

interface AppearanceSettingsProps {
  searchQuery?: string;
}

export const AppearanceSettings = ({ searchQuery = "" }: AppearanceSettingsProps) => {
  const { darkMode, toggleDarkMode, useSystemPreference, setUseSystemPreference } = useTheme();
  const [interfaceScale, setInterfaceScale] = useState("100");
  const [accentColor, setAccentColor] = useState("blue");
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  const handleSave = () => {
    console.log("Saving appearance settings:", {
      darkMode,
      useSystemPreference,
      interfaceScale,
      accentColor,
      compactMode,
      animations,
      highContrast
    });
  };

  const handleReset = () => {
    setUseSystemPreference(true);
    setInterfaceScale("100");
    setAccentColor("blue");
    setCompactMode(false);
    setAnimations(true);
    setHighContrast(false);
  };

  return (
    <div className="space-y-8">
      <ThemePreviewCard 
        darkMode={darkMode}
        useSystemPreference={useSystemPreference}
        highContrast={highContrast}
        animations={animations}
      />

      <SettingsSection
        title="Appearance Settings"
        description="Customize the visual appearance and accessibility of the interface"
        onSave={handleSave}
        onReset={handleReset}
        searchQuery={searchQuery}
      >
        <ThemeDisplaySettings
          useSystemPreference={useSystemPreference}
          setUseSystemPreference={setUseSystemPreference}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          interfaceScale={interfaceScale}
          setInterfaceScale={setInterfaceScale}
          accentColor={accentColor}
          setAccentColor={setAccentColor}
        />

        <LayoutPerformanceSettings
          compactMode={compactMode}
          setCompactMode={setCompactMode}
          animations={animations}
          setAnimations={setAnimations}
        />

        <AccessibilitySettings
          highContrast={highContrast}
          setHighContrast={setHighContrast}
        />
      </SettingsSection>
    </div>
  );
};
