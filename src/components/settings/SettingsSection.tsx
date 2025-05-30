
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSave?: () => void;
  onReset?: () => void;
  searchQuery?: string;
}

export const SettingsSection = ({ 
  title, 
  description, 
  children, 
  onSave, 
  onReset,
  searchQuery = ""
}: SettingsSectionProps) => {
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const isVisible = searchQuery === "" || 
    title.toLowerCase().includes(searchQuery) || 
    description.toLowerCase().includes(searchQuery);

  if (!isVisible) return null;

  const handleSave = () => {
    onSave?.();
    setHasChanges(false);
    toast({
      title: "Settings Saved",
      description: `${title} settings have been saved successfully.`,
    });
  };

  const handleReset = () => {
    onReset?.();
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: `${title} settings have been reset to defaults.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">{title}</CardTitle>
            <CardDescription className="text-muted-foreground">{description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button 
              size="sm" 
              onClick={handleSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6" onClick={() => setHasChanges(true)}>
        {children}
      </CardContent>
    </Card>
  );
};
