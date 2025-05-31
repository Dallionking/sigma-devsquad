
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, RotateCcw } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSave?: () => void;
  onReset?: () => void;
  searchQuery?: string;
  headerElement?: ReactNode;
}

export const SettingsSection = ({ 
  title, 
  description, 
  children, 
  onSave, 
  onReset, 
  searchQuery = "",
  headerElement
}: SettingsSectionProps) => {
  // Filter content based on search query
  const isVisible = !searchQuery || 
    title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (description && description.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!isVisible) return null;

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {headerElement && (
            <div className="flex-shrink-0">
              {headerElement}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}
        
        {(onSave || onReset) && (
          <div className="flex items-center gap-2 pt-4 border-t">
            {onSave && (
              <Button onClick={onSave} size="sm" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            )}
            {onReset && (
              <Button onClick={onReset} variant="outline" size="sm" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
