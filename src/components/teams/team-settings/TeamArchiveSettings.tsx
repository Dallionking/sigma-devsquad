
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Archive, 
  Trash2, 
  AlertTriangle, 
  Download, 
  Clock,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Team } from '@/types/teams';

interface TeamArchiveSettingsProps {
  team: Team;
  onArchiveTeam: (reason?: string) => void;
  onDeleteTeam: (confirmationText: string, reason?: string) => void;
  onExportTeamData: () => void;
}

export const TeamArchiveSettings = ({ 
  team, 
  onArchiveTeam, 
  onDeleteTeam,
  onExportTeamData 
}: TeamArchiveSettingsProps) => {
  const [archiveReason, setArchiveReason] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();

  const handleArchive = () => {
    onArchiveTeam(archiveReason);
    toast({
      title: "Team Archived",
      description: "Team has been successfully archived and moved to inactive status.",
    });
  };

  const handleDelete = () => {
    if (deleteConfirmation !== team.name) {
      toast({
        title: "Confirmation Failed",
        description: "Please type the team name exactly to confirm deletion.",
        variant: "destructive"
      });
      return;
    }

    onDeleteTeam(deleteConfirmation, deleteReason);
    toast({
      title: "Team Deleted",
      description: "Team has been permanently deleted.",
    });
  };

  const handleExportData = () => {
    onExportTeamData();
    toast({
      title: "Export Started",
      description: "Team data export has been initiated. You'll receive a download link shortly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Team Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Download a complete backup of your team's data including members, tasks, communications, and settings.
          </p>
          <Button onClick={handleExportData} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Team Data
          </Button>
        </CardContent>
      </Card>

      {/* Archive Team */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-700">
            <Archive className="w-5 h-5" />
            Archive Team
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Archiving will move the team to inactive status. Members won't be able to access it, but all data will be preserved.
              You can reactivate the team later if needed.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <div>
              <Label htmlFor="archive-reason">Reason for archiving (optional)</Label>
              <Textarea
                id="archive-reason"
                placeholder="Why is this team being archived?"
                value={archiveReason}
                onChange={(e) => setArchiveReason(e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              onClick={handleArchive}
              variant="outline"
              className="text-amber-700 border-amber-300 hover:bg-amber-50"
            >
              <Archive className="w-4 h-4 mr-2" />
              Archive Team
            </Button>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Delete Team - Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            Delete Team
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-destructive/50">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive">
              <strong>Warning:</strong> This action cannot be undone. All team data, including members, tasks, 
              communications, and settings will be permanently deleted.
            </AlertDescription>
          </Alert>

          {!showDeleteConfirm ? (
            <Button 
              onClick={() => setShowDeleteConfirm(true)}
              variant="destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Team
            </Button>
          ) : (
            <div className="space-y-4 border border-destructive/20 rounded-lg p-4 bg-destructive/5">
              <div className="flex items-center gap-2 text-destructive">
                <Shield className="w-4 h-4" />
                <span className="font-medium">Confirm Team Deletion</span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="delete-reason">Reason for deletion (optional)</Label>
                  <Textarea
                    id="delete-reason"
                    placeholder="Why is this team being deleted?"
                    value={deleteReason}
                    onChange={(e) => setDeleteReason(e.target.value)}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="delete-confirmation">
                    Type <strong>{team.name}</strong> to confirm deletion
                  </Label>
                  <Input
                    id="delete-confirmation"
                    placeholder={team.name}
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    disabled={deleteConfirmation !== team.name}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Permanently Delete Team
                  </Button>
                  <Button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmation('');
                      setDeleteReason('');
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
