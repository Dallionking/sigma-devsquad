
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useInputValidation } from '@/hooks/useInputValidation';
import { useToast } from '@/hooks/use-toast';
import { Mail, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TeamMember } from './types';
import { memberRoleOptions, emailRegex } from './constants';

interface MemberInvitationProps {
  members: TeamMember[];
  onMembersChange: (members: TeamMember[]) => void;
}

export const MemberInvitation = ({ members, onMembersChange }: MemberInvitationProps) => {
  const { toast } = useToast();
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'admin' | 'member'>('member');

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
  useEffect(() => {
    memberEmail.handleChange(newMemberEmail);
  }, [newMemberEmail]);

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

    onMembersChange([...members, newMember]);
    setNewMemberEmail('');
    setNewMemberRole('member');
  };

  const removeMember = (memberId: string) => {
    onMembersChange(members.filter(member => member.id !== memberId));
  };

  const updateMemberRole = (memberId: string, role: 'admin' | 'member') => {
    onMembersChange(members.map(member => 
      member.id === memberId ? { ...member, role } : member
    ));
  };

  return (
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
  );
};
