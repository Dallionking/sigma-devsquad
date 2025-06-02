
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { WorkflowTemplate } from '@/types/workflow-templates';
import { Share2, Link, Mail, Users, Globe, Lock, Copy, Check } from 'lucide-react';

interface TemplateSharingProps {
  templates: WorkflowTemplate[];
  onShareTemplate: (templateId: string, shareSettings: ShareSettings) => void;
}

interface ShareSettings {
  isPublic: boolean;
  allowedUsers: string[];
  shareLink: string;
  permissions: 'view' | 'edit' | 'clone';
}

export const TemplateSharing: React.FC<TemplateSharingProps> = ({
  templates,
  onShareTemplate
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [shareSettings, setShareSettings] = useState<ShareSettings>({
    isPublic: false,
    allowedUsers: [],
    shareLink: '',
    permissions: 'view'
  });
  const [newUserEmail, setNewUserEmail] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const generateShareLink = (template: WorkflowTemplate) => {
    return `${window.location.origin}/templates/shared/${template.id}`;
  };

  const handleShare = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    setShareSettings({
      isPublic: template.isPublic || false,
      allowedUsers: [],
      shareLink: generateShareLink(template),
      permissions: 'view'
    });
  };

  const addUser = () => {
    if (newUserEmail.trim() && !shareSettings.allowedUsers.includes(newUserEmail.trim())) {
      setShareSettings(prev => ({
        ...prev,
        allowedUsers: [...prev.allowedUsers, newUserEmail.trim()]
      }));
      setNewUserEmail('');
    }
  };

  const removeUser = (email: string) => {
    setShareSettings(prev => ({
      ...prev,
      allowedUsers: prev.allowedUsers.filter(user => user !== email)
    }));
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareSettings.shareLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const saveShareSettings = () => {
    if (selectedTemplate) {
      onShareTemplate(selectedTemplate.id, shareSettings);
      setSelectedTemplate(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Template Sharing</h2>
        <p className="text-muted-foreground">Share your workflow templates with your team or the community</p>
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(template => (
          <Card key={template.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {template.isPublic ? (
                    <Globe className="w-4 h-4 text-green-500" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-500" />
                  )}
                  <Badge variant={template.isPublic ? 'default' : 'secondary'}>
                    {template.isPublic ? 'Public' : 'Private'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Used {template.usage} times</span>
                  <span>{template.category}</span>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleShare(template)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Template
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share Template</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      {/* Public/Private Toggle */}
                      <div className="flex items-center justify-between">
                        <Label htmlFor="public-toggle">Make Public</Label>
                        <Switch
                          id="public-toggle"
                          checked={shareSettings.isPublic}
                          onCheckedChange={(checked) => 
                            setShareSettings(prev => ({ ...prev, isPublic: checked }))
                          }
                        />
                      </div>

                      {/* Share Link */}
                      <div>
                        <Label>Share Link</Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <Input
                            value={shareSettings.shareLink}
                            readOnly
                            className="flex-1"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyShareLink}
                          >
                            {copiedLink ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Specific Users */}
                      {!shareSettings.isPublic && (
                        <div>
                          <Label>Share with specific users</Label>
                          <div className="mt-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Input
                                value={newUserEmail}
                                onChange={(e) => setNewUserEmail(e.target.value)}
                                placeholder="Enter email address"
                                onKeyPress={(e) => e.key === 'Enter' && addUser()}
                              />
                              <Button size="sm" onClick={addUser}>
                                Add
                              </Button>
                            </div>
                            
                            {shareSettings.allowedUsers.length > 0 && (
                              <div className="space-y-1">
                                {shareSettings.allowedUsers.map(email => (
                                  <div key={email} className="flex items-center justify-between p-2 bg-muted rounded">
                                    <span className="text-sm">{email}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeUser(email)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Permissions */}
                      <div>
                        <Label>Permissions</Label>
                        <div className="mt-1 space-y-2">
                          {['view', 'edit', 'clone'].map(permission => (
                            <label key={permission} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="permissions"
                                value={permission}
                                checked={shareSettings.permissions === permission}
                                onChange={(e) => setShareSettings(prev => ({
                                  ...prev,
                                  permissions: e.target.value as any
                                }))}
                              />
                              <span className="capitalize">{permission}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-4">
                        <Button onClick={saveShareSettings} className="flex-1">
                          Save Share Settings
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
