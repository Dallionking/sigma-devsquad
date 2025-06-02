
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Link, 
  Mail, 
  Copy, 
  Users, 
  Calendar,
  Clock,
  Shield,
  Eye,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdvancedSharingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  presentation: {
    id: string;
    title: string;
  } | null;
}

export const AdvancedSharingModal = ({
  open,
  onOpenChange,
  presentation
}: AdvancedSharingModalProps) => {
  const [shareMethod, setShareMethod] = useState<'link' | 'email' | 'collaborate'>('link');
  const [emailAddresses, setEmailAddresses] = useState('');
  const [message, setMessage] = useState('');
  const [permissions, setPermissions] = useState<'view' | 'edit'>('view');
  const [requireAuth, setRequireAuth] = useState(false);
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [expiryDate, setExpiryDate] = useState('');
  const [passwordProtected, setPasswordProtected] = useState(false);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const shareUrl = `https://vibe.dev/presentations/${presentation?.id}/view`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Share link has been copied to clipboard.",
    });
  };

  const handleEmailShare = () => {
    const emails = emailAddresses.split(',').map(email => email.trim()).filter(Boolean);
    console.log('Sending to emails:', emails);
    toast({
      title: "Invitations Sent",
      description: `Sent presentation access to ${emails.length} recipient(s).`,
    });
  };

  const handleCollaborationInvite = () => {
    console.log('Setting up collaboration');
    toast({
      title: "Collaboration Enabled",
      description: "Presentation is now available for real-time collaboration.",
    });
  };

  if (!presentation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Share Presentation</span>
          </DialogTitle>
          <DialogDescription>
            Share "{presentation.title}" with others
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Share Method Selection */}
          <div className="flex space-x-2">
            <Button
              variant={shareMethod === 'link' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShareMethod('link')}
            >
              <Link className="w-4 h-4 mr-2" />
              Share Link
            </Button>
            <Button
              variant={shareMethod === 'email' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShareMethod('email')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Invite
            </Button>
            <Button
              variant={shareMethod === 'collaborate' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShareMethod('collaborate')}
            >
              <Users className="w-4 h-4 mr-2" />
              Collaborate
            </Button>
          </div>

          {/* Link Sharing */}
          {shareMethod === 'link' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Share URL</Label>
                <div className="flex space-x-2">
                  <Input value={shareUrl} readOnly />
                  <Button variant="outline" onClick={handleCopyLink}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must sign in to view
                    </p>
                  </div>
                  <Switch
                    checked={requireAuth}
                    onCheckedChange={setRequireAuth}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Password Protection</Label>
                    <p className="text-sm text-muted-foreground">
                      Require password to access
                    </p>
                  </div>
                  <Switch
                    checked={passwordProtected}
                    onCheckedChange={setPasswordProtected}
                  />
                </div>

                {passwordProtected && (
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Link Expiry</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically expire access
                    </p>
                  </div>
                  <Switch
                    checked={expiryEnabled}
                    onCheckedChange={setExpiryEnabled}
                  />
                </div>

                {expiryEnabled && (
                  <div className="space-y-2">
                    <Label>Expiry Date</Label>
                    <Input
                      type="datetime-local"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Email Sharing */}
          {shareMethod === 'email' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email Addresses</Label>
                <Textarea
                  placeholder="Enter email addresses separated by commas..."
                  value={emailAddresses}
                  onChange={(e) => setEmailAddresses(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Message (Optional)</Label>
                <Textarea
                  placeholder="Add a personal message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Permission Level</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={permissions === 'view' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPermissions('view')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Only
                  </Button>
                  <Button
                    variant={permissions === 'edit' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPermissions('edit')}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Can Edit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Collaboration */}
          {shareMethod === 'collaborate' && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Real-time Collaboration</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Enable multiple users to edit and present simultaneously with live cursors and changes.
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    Live Editing
                  </Badge>
                  <Badge variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    Real-time Preview
                  </Badge>
                  <Badge variant="outline">
                    <Shield className="w-3 h-3 mr-1" />
                    Version Control
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Collaborator Emails</Label>
                <Textarea
                  placeholder="Enter collaborator email addresses..."
                  value={emailAddresses}
                  onChange={(e) => setEmailAddresses(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            
            <div className="space-x-2">
              {shareMethod === 'link' && (
                <Button onClick={handleCopyLink}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              )}
              {shareMethod === 'email' && (
                <Button onClick={handleEmailShare}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invites
                </Button>
              )}
              {shareMethod === 'collaborate' && (
                <Button onClick={handleCollaborationInvite}>
                  <Users className="w-4 h-4 mr-2" />
                  Enable Collaboration
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
