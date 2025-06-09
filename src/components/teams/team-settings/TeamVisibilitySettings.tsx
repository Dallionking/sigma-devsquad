
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Globe, Lock, EyeOff, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export type TeamVisibility = 'public' | 'private' | 'secret';

interface TeamVisibilitySettingsProps {
  visibility: TeamVisibility;
  onVisibilityChange: (visibility: TeamVisibility) => void;
}

const visibilityOptions = [
  {
    value: 'public' as TeamVisibility,
    label: 'Public',
    description: 'Anyone can discover and view this team',
    icon: Globe,
    badge: 'Open',
    badgeVariant: 'default' as const
  },
  {
    value: 'private' as TeamVisibility,
    label: 'Private',
    description: 'Only team members can view team details',
    icon: Lock,
    badge: 'Members Only',
    badgeVariant: 'secondary' as const
  },
  {
    value: 'secret' as TeamVisibility,
    label: 'Secret',
    description: 'Team is hidden from discovery and member-only access',
    icon: EyeOff,
    badge: 'Hidden',
    badgeVariant: 'outline' as const
  }
];

export const TeamVisibilitySettings = ({ 
  visibility, 
  onVisibilityChange 
}: TeamVisibilitySettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Visibility</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={visibility} onValueChange={onVisibilityChange}>
          {visibilityOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div key={option.value} className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.value} className="flex items-center gap-2 cursor-pointer">
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{option.label}</span>
                    <Badge variant={option.badgeVariant} className="text-xs">
                      {option.badge}
                    </Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </RadioGroup>

        {visibility === 'secret' && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Secret teams won't appear in team listings and can only be accessed by direct invitation.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
