
import { useState } from "react";
import { SettingsSection } from "./SettingsSection";
import { SettingItem } from "./SettingItem";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Monitor, Sun, Moon, Zap, Eye } from "lucide-react";

interface AppearanceSettingsProps {
  searchQuery?: string;
}

export const AppearanceSettings = ({ searchQuery = "" }: AppearanceSettingsProps) => {
  const { darkMode, toggleDarkMode, systemPreference, useSystemPreference, setUseSystemPreference } = useTheme();
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
      {/* Theme Preview Card */}
      <Card className="card-enhanced overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Theme Preview</CardTitle>
              <CardDescription>See how your theme choices look</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Current Theme Display */}
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                {darkMode ? (
                  <Moon className="w-4 h-4 text-blue-500" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-500" />
                )}
                <span className="font-medium text-sm">
                  {useSystemPreference ? 'System' : darkMode ? 'Dark' : 'Light'} Mode
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Currently active theme
              </div>
            </div>

            {/* System Preference Indicator */}
            {useSystemPreference && (
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-sm">Auto-Sync</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  Following system preference
                </div>
              </div>
            )}

            {/* Accessibility Indicator */}
            {(highContrast || !animations) && (
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-purple-500" />
                  <span className="font-medium text-sm">Accessibility</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {highContrast && !animations ? 'High contrast, reduced motion' :
                   highContrast ? 'High contrast enabled' :
                   'Reduced motion enabled'}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Settings */}
      <SettingsSection
        title="Appearance Settings"
        description="Customize the visual appearance and accessibility of the interface"
        onSave={handleSave}
        onReset={handleReset}
        searchQuery={searchQuery}
      >
        {/* Theme Settings Group */}
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

        {/* Layout Settings Group */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-border pb-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Layout & Performance
            </h4>
            <p className="text-sm text-muted-foreground">Optimize the interface for your workflow</p>
          </div>

          <SettingItem
            id="compact-mode"
            type="switch"
            label="Compact Mode"
            description="Use smaller spacing and compact layouts to fit more content on screen"
            checked={compactMode}
            onCheckedChange={setCompactMode}
          />

          <SettingItem
            id="animations"
            type="switch"
            label="Enable Animations"
            description="Show smooth transitions and animations (disable for better performance or accessibility)"
            checked={animations}
            onCheckedChange={setAnimations}
          />
        </div>

        {/* Accessibility Settings Group */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-border pb-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Accessibility
            </h4>
            <p className="text-sm text-muted-foreground">Make the interface more accessible and easier to use</p>
          </div>

          <SettingItem
            id="high-contrast"
            type="switch"
            label="High Contrast Mode"
            description="Increase contrast between text and backgrounds for better visibility"
            checked={highContrast}
            onCheckedChange={setHighContrast}
          />
        </div>
      </SettingsSection>
    </div>
  );
};
