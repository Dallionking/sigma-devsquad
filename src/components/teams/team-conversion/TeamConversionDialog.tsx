
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeamType, Team } from '@/types/teams';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';
import { AlertTriangle, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { useTeams } from '@/contexts/TeamContext';
import { useToast } from '@/hooks/use-toast';

interface TeamConversionDialogProps {
  team: Team;
  children: React.ReactNode;
}

const teamTypeConversions: Record<TeamType, {
  canConvertTo: TeamType[];
  restrictions: string[];
  migrationSteps: string[];
}> = {
  frontend: {
    canConvertTo: ['design', 'product'],
    restrictions: ['Cannot convert to backend without restructuring components', 'QA conversion requires testing framework changes'],
    migrationSteps: ['Review component architecture', 'Update skill requirements', 'Reassign specialized tasks']
  },
  backend: {
    canConvertTo: ['devops', 'data'],
    restrictions: ['Cannot convert to frontend without UI/UX skills', 'Design conversion not recommended'],
    migrationSteps: ['Audit API dependencies', 'Review database access', 'Update infrastructure needs']
  },
  devops: {
    canConvertTo: ['backend', 'data'],
    restrictions: ['Frontend conversion requires significant retraining', 'Design conversion not feasible'],
    migrationSteps: ['Review infrastructure automation', 'Audit deployment pipelines', 'Update monitoring setup']
  },
  qa: {
    canConvertTo: ['backend', 'data', 'product'],
    restrictions: ['Frontend conversion needs UI testing experience', 'DevOps conversion requires infrastructure knowledge'],
    migrationSteps: ['Transition testing frameworks', 'Update quality metrics', 'Reassign test automation']
  },
  data: {
    canConvertTo: ['backend', 'qa', 'product'],
    restrictions: ['Frontend conversion requires visualization skills', 'Design conversion not recommended'],
    migrationSteps: ['Review data pipelines', 'Update analytics tools', 'Migrate reporting systems']
  },
  design: {
    canConvertTo: ['frontend', 'product'],
    restrictions: ['Backend/DevOps conversions require technical retraining', 'Data conversion needs analytics skills'],
    migrationSteps: ['Review design systems', 'Update prototyping tools', 'Transition to development focus']
  },
  product: {
    canConvertTo: ['design', 'qa', 'data'],
    restrictions: ['Technical conversions require domain expertise', 'DevOps conversion not recommended'],
    migrationSteps: ['Review product roadmaps', 'Update stakeholder processes', 'Transition planning workflows']
  }
};

export const TeamConversionDialog = ({ team, children }: TeamConversionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedTargetType, setSelectedTargetType] = useState<TeamType | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { updateTeam } = useTeams();
  const { toast } = useToast();

  const currentTypeConfig = teamTypeConversions[team.type];
  const canConvert = currentTypeConfig.canConvertTo.length > 0;

  const handleConversionSelect = (targetType: TeamType) => {
    setSelectedTargetType(targetType);
    setShowConfirmation(true);
  };

  const handleConfirmConversion = () => {
    if (!selectedTargetType) return;

    updateTeam(team.id, {
      type: selectedTargetType,
      // Add a note about the conversion in objectives
      objectives: [
        ...team.objectives,
        `Converted from ${team.type} team on ${new Date().toLocaleDateString()}`
      ]
    });

    toast({
      title: "Team Conversion Successful",
      description: `${team.name} has been converted to a ${selectedTargetType} team.`,
    });

    setOpen(false);
    setShowConfirmation(false);
    setSelectedTargetType(null);
  };

  const handleBack = () => {
    setShowConfirmation(false);
    setSelectedTargetType(null);
  };

  const renderConversionOptions = () => (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Available Conversions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select a team type to convert to. Only compatible conversions are shown.
        </p>
      </div>

      {canConvert ? (
        <div className="grid grid-cols-1 gap-3">
          {currentTypeConfig.canConvertTo.map((targetType) => (
            <Card
              key={targetType}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => handleConversionSelect(targetType)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTeamTypeIcon(targetType)}</span>
                    <div>
                      <h4 className="font-medium capitalize">{targetType} Team</h4>
                      <p className="text-sm text-muted-foreground">
                        Convert to {targetType} specialization
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Alert>
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            No direct conversions available for {team.type} teams. Consider creating a new team instead.
          </AlertDescription>
        </Alert>
      )}

      {currentTypeConfig.restrictions.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="space-y-1">
              <strong>Conversion Restrictions:</strong>
              <ul className="list-disc list-inside text-sm space-y-1">
                {currentTypeConfig.restrictions.map((restriction, index) => (
                  <li key={index}>{restriction}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTeamTypeIcon(team.type)}</span>
            <Badge variant="outline" className="capitalize">{team.type}</Badge>
          </div>
          <ArrowRight className="w-6 h-6 text-primary" />
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTeamTypeIcon(selectedTargetType!)}</span>
            <Badge variant="default" className="capitalize">{selectedTargetType}</Badge>
          </div>
        </div>
        <h3 className="font-medium">Confirm Team Conversion</h3>
        <p className="text-sm text-muted-foreground">
          Converting "{team.name}" from {team.type} to {selectedTargetType}
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> This conversion will change the team's specialization and may affect member roles and responsibilities.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Migration Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {currentTypeConfig.migrationSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex gap-2 pt-4">
        <Button variant="outline" onClick={handleBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleConfirmConversion} className="flex-1">
          Convert Team
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {showConfirmation ? 'Confirm Conversion' : 'Convert Team Type'}
          </DialogTitle>
        </DialogHeader>

        {showConfirmation ? renderConfirmation() : renderConversionOptions()}
      </DialogContent>
    </Dialog>
  );
};
