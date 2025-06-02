
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TeamType } from '@/types/teams';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';
import { CheckCircle, Lightbulb, Users, Bot, GitMerge } from 'lucide-react';
import { teamTypeOptions, getCompositionLabel } from './teamTypeData';

interface TeamTypeDetailsProps {
  selectedType: TeamType;
}

export const TeamTypeDetails = ({ selectedType }: TeamTypeDetailsProps) => {
  const selectedOption = teamTypeOptions.find(option => option.type === selectedType);

  if (!selectedOption) return null;

  const getCompositionIcon = (composition: string) => {
    switch (composition) {
      case 'human': return Users;
      case 'ai': return Bot;
      case 'hybrid': return GitMerge;
      default: return Users;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border-primary/20 mt-6">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{getTeamTypeIcon(selectedOption.type)}</div>
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {selectedOption.label}
              <Lightbulb className="w-4 h-4 text-primary" />
            </CardTitle>
            <p className="text-sm text-muted-foreground">{selectedOption.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Core Capabilities
            </h4>
            <div className="space-y-2">
              {selectedOption.capabilities.map((capability) => (
                <div key={capability} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                  <span>{capability}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-sm">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedOption.toolsUsed.map((tool) => (
                <Badge key={tool} variant="outline" className="text-xs">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-sm">Example Use Cases</h4>
          <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
            {selectedOption.example}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm">Recommended Team Compositions</h4>
          <div className="grid gap-3">
            {selectedOption.recommendedComposition.map((comp) => {
              const Icon = getCompositionIcon(comp);
              return (
                <div key={comp} className="flex items-center gap-3 p-3 rounded-lg bg-background/60 border">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium text-sm">{getCompositionLabel(comp)} Team</span>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {comp === 'human' && 'Best for creative problem-solving and complex decision-making'}
                      {comp === 'ai' && 'Ideal for automated tasks and consistent execution'}
                      {comp === 'hybrid' && 'Combines human creativity with AI efficiency'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
