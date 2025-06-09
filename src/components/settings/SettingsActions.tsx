
import { Button } from "@/components/ui/button";

interface SettingsActionsProps {
  onSaveAll: () => void;
  onResetAll: () => void;
}

export const SettingsActions = ({ onSaveAll, onResetAll }: SettingsActionsProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-8 border-t border-border">
      <Button 
        variant="outline" 
        onClick={onResetAll}
        className="btn-secondary-enhanced w-full sm:w-auto"
      >
        Reset to Defaults
      </Button>
      <Button 
        onClick={onSaveAll}
        className="btn-primary-enhanced w-full sm:w-auto"
      >
        Save All Changes
      </Button>
    </div>
  );
};
