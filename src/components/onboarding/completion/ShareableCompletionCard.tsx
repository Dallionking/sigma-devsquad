
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Download, Share2, Trophy, Users, Bot, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareableCompletionCardProps {
  profileData: any;
  teamData: any;
  agentData: any;
  onClose: () => void;
}

export const ShareableCompletionCard = ({ 
  profileData, 
  teamData, 
  agentData, 
  onClose 
}: ShareableCompletionCardProps) => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + '/join-team');
      toast({
        title: "Link copied!",
        description: "Team invitation link has been copied to clipboard."
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadCard = async () => {
    // In a real implementation, you'd use html2canvas or similar
    toast({
      title: "Download feature",
      description: "Card download feature would be implemented here."
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData?.name || 'I'} just completed Vibe DevSquad setup!`,
          text: `Check out my new AI development team: "${teamData?.teamName || 'My Team'}"`,
          url: window.location.origin + '/join-team'
        });
      } catch (error) {
        handleCopyLink(); // Fallback to copy
      }
    } else {
      handleCopyLink(); // Fallback to copy
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Achievement
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Shareable Card */}
          <Card 
            ref={cardRef}
            className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2"
          >
            <CardContent className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="w-12 h-12 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Setup Complete! 🎉
                </h2>
                <p className="text-lg text-muted-foreground">
                  {profileData?.name || 'Someone'} just configured their AI development team
                </p>
              </div>

              {/* Achievement Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Profile Setup</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="text-sm font-medium">Team Created</p>
                  <p className="text-xs text-muted-foreground">{teamData?.teamName || 'Team Name'}</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Bot className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm font-medium">Agent Ready</p>
                  <p className="text-xs text-muted-foreground">{agentData?.name || 'AI Agent'}</p>
                </div>
              </div>

              {/* Team Info */}
              {teamData && (
                <div className="bg-card/50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-2">Join My Team: "{teamData.teamName}"</h3>
                  <p className="text-sm text-muted-foreground mb-3">{teamData.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{teamData.category}</Badge>
                    {teamData.objectives?.slice(0, 2).map((objective: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {objective}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills & Interests */}
              {profileData && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Specializes in:</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {profileData.preferredLanguages?.slice(0, 4).map((lang: string) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                    {profileData.interests?.slice(0, 3).map((interest: string) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Branding */}
              <div className="text-center mt-8 pt-6 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Powered by Vibe DevSquad • AI Development Teams
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleShare} className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button onClick={handleCopyLink} variant="outline" className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            
            <Button onClick={handleDownloadCard} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Share your achievement and invite others to join your team!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
