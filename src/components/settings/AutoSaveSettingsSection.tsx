
import { ReactNode, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Save, RotateCcw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AutoSaveSettingsSectionProps {
  title: string;
  description: string;
  children: ReactNode;
  data: any;
  onSave: (data: any) => Promise<void> | void;
  onReset?: () => void;
  searchQuery?: string;
  autoSaveDelay?: number;
  showAutoSaveStatus?: boolean;
  category?: string;
  className?: string;
}

export const AutoSaveSettingsSection = ({ 
  title, 
  description, 
  children, 
  data,
  onSave,
  onReset,
  searchQuery = "",
  autoSaveDelay = 2000,
  showAutoSaveStatus = true,
  category,
  className
}: AutoSaveSettingsSectionProps) => {
  const { toast } = useToast();

  const isVisible = searchQuery === "" || 
    title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category && category.toLowerCase().includes(searchQuery.toLowerCase()));

  const { forceSave, isSaving } = useAutoSave(data, {
    delay: autoSaveDelay,
    onSave: () => onSave(data),
    enabled: true,
    showToast: false // We'll handle our own toast
  });

  const handleManualSave = async () => {
    try {
      await forceSave();
      toast({
        title: "Settings Saved",
        description: `${title} settings have been saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
      toast({
        title: "Settings Reset",
        description: `${title} settings have been reset to defaults.`,
        variant: "destructive",
      });
    }
  };

  if (!isVisible) return null;

  return (
    <Card className={cn(
      "bg-card border-border transition-all duration-200 hover:shadow-md",
      className
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-card-foreground">{title}</CardTitle>
              {category && (
                <Badge variant="outline" className="text-xs">
                  {category}
                </Badge>
              )}
              {showAutoSaveStatus && isSaving && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 animate-pulse" />
                  Auto-saving...
                </Badge>
              )}
            </div>
            <CardDescription className="text-muted-foreground">
              {description}
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            {onReset && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                className="flex items-center gap-2 hover:bg-destructive/10"
                disabled={isSaving}
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
            )}
            
            <Button 
              size="sm" 
              onClick={handleManualSave}
              className="flex items-center gap-2"
              disabled={isSaving}
            >
              <Save className={cn("w-4 h-4", isSaving && "animate-pulse")} />
              <span className="hidden sm:inline">
                {isSaving ? "Saving..." : "Save"}
              </span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {children}
        
        {showAutoSaveStatus && (
          <div className="text-xs text-muted-foreground pt-4 border-t border-border">
            Auto-save enabled • Changes are saved automatically after {autoSaveDelay / 1000} seconds
          </div>
        )}
      </CardContent>
    </Card>
  );
};
