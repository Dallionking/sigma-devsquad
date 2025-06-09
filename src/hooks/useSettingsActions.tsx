
import { useToast } from "@/hooks/use-toast";

interface UseSettingsActionsProps {
  setNotifications: (value: boolean) => void;
  setAutoBackup: (value: boolean) => void;
  setPerformanceMode: (value: string) => void;
}

export const useSettingsActions = ({
  setNotifications,
  setAutoBackup,
  setPerformanceMode,
}: UseSettingsActionsProps) => {
  const { toast } = useToast();

  const handleSaveAll = () => {
    toast({
      title: "All Settings Saved",
      description: "All configuration changes have been saved successfully.",
    });
  };

  const handleResetAll = () => {
    setNotifications(true);
    setAutoBackup(true);
    setPerformanceMode("balanced");
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
      variant: "destructive",
    });
  };

  return {
    handleSaveAll,
    handleResetAll,
  };
};
