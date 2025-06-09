
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Monitor, Sun, Moon, Eye } from "lucide-react";

interface ThemePreviewCardProps {
  darkMode: boolean;
  useSystemPreference: boolean;
  highContrast: boolean;
  animations: boolean;
}

export const ThemePreviewCard = ({ 
  darkMode, 
  useSystemPreference, 
  highContrast, 
  animations 
}: ThemePreviewCardProps) => {
  return (
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
  );
};
