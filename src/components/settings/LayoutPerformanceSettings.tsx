
import { SettingItem } from "./SettingItem";
import { Zap } from "lucide-react";

interface LayoutPerformanceSettingsProps {
  compactMode: boolean;
  setCompactMode: (value: boolean) => void;
  animations: boolean;
  setAnimations: (value: boolean) => void;
}

export const LayoutPerformanceSettings = ({
  compactMode,
  setCompactMode,
  animations,
  setAnimations
}: LayoutPerformanceSettingsProps) => {
  return (
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
  );
};
