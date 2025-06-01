
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RotateCcw, HelpCircle } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useToast } from '@/hooks/use-toast';

interface GeneralSettingsProps {
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  autoBackup: boolean;
  setAutoBackup: (value: boolean) => void;
  performanceMode: string;
  setPerformanceMode: (value: string) => void;
}

export const GeneralSettings = ({
  notifications,
  setNotifications,
  autoBackup,
  setAutoBackup,
  performanceMode,
  setPerformanceMode,
}: GeneralSettingsProps) => {
  const { resetOnboarding } = useOnboarding();
  const { toast } = useToast();

  const handleRestartOnboarding = () => {
    resetOnboarding();
    toast({
      title: "Onboarding Restarted",
      description: "The onboarding tour will now begin from the start.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Enable Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications for important updates
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-backup">Auto Backup</Label>
              <p className="text-sm text-muted-foreground">
                Automatically save your work every few minutes
              </p>
            </div>
            <Switch
              id="auto-backup"
              checked={autoBackup}
              onCheckedChange={setAutoBackup}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Help & Guidance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Restart Onboarding Tour</Label>
              <p className="text-sm text-muted-foreground">
                Go through the setup process again to learn about features
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestartOnboarding}
              className="flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Tour</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
