
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInputValidation } from '@/hooks/useInputValidation';
import { Users, Bot, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamInformationFormProps {
  teamType: 'human' | 'ai';
  onTeamTypeChange: (type: 'human' | 'ai') => void;
  teamNameValidation: ReturnType<typeof useInputValidation>;
  teamDescriptionValidation: ReturnType<typeof useInputValidation>;
}

export const TeamInformationForm = ({
  teamType,
  onTeamTypeChange,
  teamNameValidation,
  teamDescriptionValidation
}: TeamInformationFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Team Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="teamName">Team Name *</Label>
          <div className="relative">
            <Input
              id="teamName"
              value={teamNameValidation.value}
              onChange={(e) => teamNameValidation.handleChange(e.target.value)}
              onBlur={teamNameValidation.handleBlur}
              placeholder="Enter team name"
              className={cn(
                teamNameValidation.error && "border-red-500",
                !teamNameValidation.error && teamNameValidation.value && "border-green-500"
              )}
            />
            {!teamNameValidation.error && teamNameValidation.value && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
          </div>
          {teamNameValidation.error && (
            <p className="text-sm text-red-500">{teamNameValidation.error}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="teamDescription">Team Description *</Label>
          <div className="relative">
            <Textarea
              id="teamDescription"
              value={teamDescriptionValidation.value}
              onChange={(e) => teamDescriptionValidation.handleChange(e.target.value)}
              onBlur={teamDescriptionValidation.handleBlur}
              placeholder="Describe the team's purpose and goals"
              rows={3}
              className={cn(
                teamDescriptionValidation.error && "border-red-500",
                !teamDescriptionValidation.error && teamDescriptionValidation.value && "border-green-500"
              )}
            />
            {!teamDescriptionValidation.error && teamDescriptionValidation.value && (
              <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
            )}
          </div>
          {teamDescriptionValidation.error && (
            <p className="text-sm text-red-500">{teamDescriptionValidation.error}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Team Type</Label>
          <div className="flex items-center space-x-4 p-3 bg-accent/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Human Team</span>
            </div>
            <Switch
              checked={teamType === 'ai'}
              onCheckedChange={(checked) => onTeamTypeChange(checked ? 'ai' : 'human')}
            />
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">AI Team</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
