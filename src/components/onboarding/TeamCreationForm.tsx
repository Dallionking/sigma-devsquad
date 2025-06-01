import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useInputValidation } from '@/hooks/useInputValidation';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, X, Users, Bot, Plus, Mail, Trash2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamMember {
  id: string;
  email: string;
  role: 'admin' | 'member';
}

interface TeamCreationData {
  teamName: string;
  teamDescription: string;
  teamType: 'human' | 'ai';
  teamAvatar?: string;
  members: TeamMember[];
}

interface TeamCreationFormProps {
  onComplete: (data: TeamCreationData) => void;
  onSkip: () => void;
}

const memberRoleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'member', label: 'Member' }
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const TeamCreationForm = ({ onComplete, onSkip }: TeamCreationFormProps) => {
  const { toast } = useToast();
  const [teamAvatar, setTeamAvatar] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [teamType, setTeamType] = useState<'human' | 'ai'>('human');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'admin' | 'member'>('member');

  // Form validation
  const teamName = useInputValidation('', {
    rules: { required: true, minLength: 2, maxLength: 50 },
    validateOnChange: true,
    debounceMs: 300
  });

  const teamDescription = useInputValidation('', {
    rules: { required: true, minLength: 10, maxLength: 500 },
    validateOnChange: true,
    debounceMs: 300
  });

  const memberEmail = useInputValidation(newMemberEmail, {
    rules: { 
      required: false, 
      pattern: emailRegex,
      custom: (value: string) => {
        if (value && !emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        return null;
      }
    },
    validateOnChange: true,
    debounceMs: 300
  });

  // Update member email validation when newMemberEmail changes
  React.useEffect(() => {
    memberEmail.handleChange(newMemberEmail);
  }, [newMemberEmail]);

  // Combine all form data
  const formData: TeamCreationData = {
    teamName: teamName.value,
    teamDescription: teamDescription.value,
    teamType,
    teamAvatar,
    members
  };

  // Auto-save functionality
  const { forceSave } = useAutoSave(formData, {
    delay: 3000,
    enabled: true,
    showToast: true,
    onSave: async () => {
      localStorage.setItem('team-creation-draft', JSON.stringify(formData));
    }
  });

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('team-creation-draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        teamName.handleChange(parsed.teamName || '');
        teamDescription.handleChange(parsed.teamDescription || '');
        setTeamType(parsed.teamType || 'human');
        setTeamAvatar(parsed.teamAvatar || '');
        setMembers(parsed.members || []);
      } catch (error) {
        console.error('Failed to load saved team data:', error);
      }
    }
  }, []);

  const handleAvatarUpload = useCallback((file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please choose an image smaller than 2MB.',
        variant: 'destructive'
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please choose an image file (JPG, PNG, GIF).',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setTeamAvatar(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleAvatarUpload(files[0]);
    }
  }, [handleAvatarUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleAvatarUpload(files[0]);
    }
  }, [handleAvatarUpload]);

  const addMember = () => {
    if (!newMemberEmail.trim() || memberEmail.error) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      });
      return;
    }

    // Check for duplicate emails
    if (members.some(member => member.email.toLowerCase() === newMemberEmail.toLowerCase())) {
      toast({
        title: 'Duplicate email',
        description: 'This email is already added to the team.',
        variant: 'destructive'
      });
      return;
    }

    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      email: newMemberEmail.trim(),
      role: newMemberRole
    };

    setMembers(prev => [...prev, newMember]);
    setNewMemberEmail('');
    setNewMemberRole('member');
  };

  const removeMember = (memberId: string) => {
    setMembers(prev => prev.filter(member => member.id !== memberId));
  };

  const updateMemberRole = (memberId: string, role: 'admin' | 'member') => {
    setMembers(prev => prev.map(member => 
      member.id === memberId ? { ...member, role } : member
    ));
  };

  const isFormValid = () => {
    return (
      !teamName.error && teamName.value.trim() &&
      !teamDescription.error && teamDescription.value.trim()
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast({
        title: 'Please complete all required fields',
        description: 'Make sure team name and description are filled out correctly.',
        variant: 'destructive'
      });
      return;
    }

    // Clear the draft from localStorage
    localStorage.removeItem('team-creation-draft');
    
    await forceSave();
    onComplete(formData);
  };

  const handleSkipForNow = async () => {
    // Save current progress before skipping
    await forceSave();
    onSkip();
  };

  return (
    <div className="space-y-6">
      {/* Team Avatar Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team Avatar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-20 w-20 border-2 border-dashed border-border">
              <AvatarImage src={teamAvatar} alt="Team Avatar" />
              <AvatarFallback className="bg-muted">
                <Camera className="w-6 h-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>

            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-4 w-full max-w-sm transition-colors cursor-pointer",
                isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              )}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <div className="text-center space-y-2">
                <Upload className="w-5 h-5 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drop team avatar here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max 2MB.
                </p>
              </div>
            </div>

            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />

            {teamAvatar && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTeamAvatar('')}
                className="flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Remove Avatar</span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Team Basic Information */}
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
                value={teamName.value}
                onChange={(e) => teamName.handleChange(e.target.value)}
                onBlur={teamName.handleBlur}
                placeholder="Enter team name"
                className={cn(
                  teamName.error && "border-red-500",
                  !teamName.error && teamName.value && "border-green-500"
                )}
              />
              {!teamName.error && teamName.value && (
                <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              )}
            </div>
            {teamName.error && (
              <p className="text-sm text-red-500">{teamName.error}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="teamDescription">Team Description *</Label>
            <div className="relative">
              <Textarea
                id="teamDescription"
                value={teamDescription.value}
                onChange={(e) => teamDescription.handleChange(e.target.value)}
                onBlur={teamDescription.handleBlur}
                placeholder="Describe the team's purpose and goals"
                rows={3}
                className={cn(
                  teamDescription.error && "border-red-500",
                  !teamDescription.error && teamDescription.value && "border-green-500"
                )}
              />
              {!teamDescription.error && teamDescription.value && (
                <CheckCircle className="absolute right-3 top-3 w-4 h-4 text-green-500" />
              )}
            </div>
            {teamDescription.error && (
              <p className="text-sm text-red-500">{teamDescription.error}</p>
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
                onCheckedChange={(checked) => setTeamType(checked ? 'ai' : 'human')}
              />
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">AI Team</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Member Invitation Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Invite Team Members</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <Input
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Enter email address"
                className={cn(
                  memberEmail.error && newMemberEmail && "border-red-500"
                )}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addMember();
                  }
                }}
              />
              {memberEmail.error && newMemberEmail && (
                <p className="text-sm text-red-500 mt-1">{memberEmail.error}</p>
              )}
            </div>
            <Select value={newMemberRole} onValueChange={(value: 'admin' | 'member') => setNewMemberRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {memberRoleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            type="button"
            variant="outline"
            onClick={addMember}
            className="w-full flex items-center space-x-2"
            disabled={!newMemberEmail.trim() || !!memberEmail.error}
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </Button>

          {/* Members List */}
          {members.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Added Members ({members.length})</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 bg-accent/30 rounded-md">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{member.email}</span>
                      <Badge variant={member.role === 'admin' ? 'default' : 'secondary'} className="text-xs">
                        {member.role}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Select 
                        value={member.role} 
                        onValueChange={(value: 'admin' | 'member') => updateMemberRole(member.id, value)}
                      >
                        <SelectTrigger className="h-7 w-20 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {memberRoleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMember(member.id)}
                        className="h-7 w-7 p-0 hover:bg-red-100 hover:text-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleSkipForNow}>
          Skip for Now
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Create Team</span>
        </Button>
      </div>

      {/* Auto-save indicator */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Your progress is automatically saved every 3 seconds
        </p>
      </div>
    </div>
  );
};
