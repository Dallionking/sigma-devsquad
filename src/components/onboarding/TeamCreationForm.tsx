
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Users, Building, Target, UserPlus, Check } from 'lucide-react';

interface TeamCreationFormProps {
  onComplete: (data: any) => void;
  onSkip: () => void;
}

export const TeamCreationForm = ({ onComplete, onSkip }: TeamCreationFormProps) => {
  const [formData, setFormData] = useState({
    teamName: '',
    description: '',
    isPublic: false,
    inviteMembers: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Create Your First Team</h3>
        <p className="text-muted-foreground">
          Teams help organize your agents and projects effectively. You can always create more teams later.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building className="w-5 h-5" />
            <span>Team Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="teamName">Team Name *</Label>
              <Input
                id="teamName"
                value={formData.teamName}
                onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value }))}
                placeholder="e.g., Frontend Development Team"
                className={errors.teamName ? 'border-red-500' : ''}
              />
              {errors.teamName && (
                <p className="text-sm text-red-500 mt-1">{errors.teamName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your team's purpose and goals..."
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="isPublic">Public Team</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow other users to discover and request to join this team
                  </p>
                </div>
                <Switch
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="inviteMembers">Invite Members Later</Label>
                  <p className="text-sm text-muted-foreground">
                    Set up member invitations after creating the team
                  </p>
                </div>
                <Switch
                  id="inviteMembers"
                  checked={formData.inviteMembers}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inviteMembers: checked }))}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
              >
                Skip for Now
              </Button>
              <Button
                type="submit"
                className="flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Create Team</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="bg-accent/50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center space-x-2">
          <Target className="w-4 h-4" />
          <span>Why Create a Team?</span>
        </h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li>• Organize your AI agents by project or department</li>
          <li>• Set team-specific goals and objectives</li>
          <li>• Collaborate with other team members</li>
          <li>• Track team performance and metrics</li>
        </ul>
      </div>
    </div>
  );
};
