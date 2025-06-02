
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Plus, Trash2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TeamRole } from '@/types/teams';

interface InviteMember {
  email: string;
  role: TeamRole;
}

interface MemberInvitationDialogProps {
  teamId: string;
  children: React.ReactNode;
  onInviteMembers?: (invitations: InviteMember[]) => void;
}

export const MemberInvitationDialog = ({ teamId, children, onInviteMembers }: MemberInvitationDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [invitations, setInvitations] = useState<InviteMember[]>([]);
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<TeamRole>('junior');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addInvitation = () => {
    if (!newEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive"
      });
      return;
    }

    if (!isValidEmail(newEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    if (invitations.some(inv => inv.email.toLowerCase() === newEmail.toLowerCase())) {
      toast({
        title: "Duplicate email",
        description: "This email is already in the invitation list.",
        variant: "destructive"
      });
      return;
    }

    setInvitations(prev => [...prev, { email: newEmail.trim(), role: newRole }]);
    setNewEmail('');
    setNewRole('junior');
  };

  const removeInvitation = (email: string) => {
    setInvitations(prev => prev.filter(inv => inv.email !== email));
  };

  const updateInvitationRole = (email: string, role: TeamRole) => {
    setInvitations(prev => prev.map(inv => 
      inv.email === email ? { ...inv, role } : inv
    ));
  };

  const sendInvitations = async () => {
    if (invitations.length === 0) {
      toast({
        title: "No invitations",
        description: "Please add at least one email invitation.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call for sending invitations
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onInviteMembers?.(invitations);
      
      toast({
        title: "Invitations sent",
        description: `${invitations.length} invitation${invitations.length > 1 ? 's' : ''} sent successfully.`,
      });
      
      setInvitations([]);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Failed to send invitations",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    { value: 'lead' as TeamRole, label: 'Lead' },
    { value: 'senior' as TeamRole, label: 'Senior' },
    { value: 'mid' as TeamRole, label: 'Mid' },
    { value: 'junior' as TeamRole, label: 'Junior' }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Invite Team Members
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add Invitation Form */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter email address"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addInvitation();
                      }
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={newRole} onValueChange={(value: TeamRole) => setNewRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={addInvitation}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Invitation List
              </Button>
            </CardContent>
          </Card>

          {/* Invitations List */}
          {invitations.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Pending Invitations ({invitations.length})
              </Label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {invitations.map((invitation) => (
                  <div key={invitation.email} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{invitation.email}</p>
                        <Badge variant="outline" className="text-xs">
                          {invitation.role}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select 
                        value={invitation.role} 
                        onValueChange={(value: TeamRole) => updateInvitationRole(invitation.email, value)}
                      >
                        <SelectTrigger className="h-8 w-24 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {roleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInvitation(invitation.email)}
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={sendInvitations}
              disabled={invitations.length === 0 || isLoading}
            >
              {isLoading ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send {invitations.length} Invitation{invitations.length > 1 ? 's' : ''}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
