
import { SettingItem } from "./SettingItem";
import { Eye } from "lucide-react";

interface AccessibilitySettingsProps {
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
}

export const AccessibilitySettings = ({
  highContrast,
  setHighContrast
}: AccessibilitySettingsProps) => {
  return (
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
  );
};
