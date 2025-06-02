
import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TeamType } from '@/types/teams';
import { getTeamTypeIcon } from '@/utils/teamVisualUtils';
import { CheckCircle, ArrowRight, Users, Bot, GitMerge } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TeamTypeOption as TeamTypeOptionData, getCompositionLabel } from './teamTypeData';

interface TeamTypeOptionProps {
  option: TeamTypeOptionData;
  isSelected: boolean;
  onSelect: (type: TeamType) => void;
}

export const TeamTypeOption = ({ option, isSelected, onSelect }: TeamTypeOptionProps) => {
  const getCompositionIcon = (composition: string) => {
    switch (composition) {
      case 'human': return Users;
      case 'ai': return Bot;
      case 'hybrid': return GitMerge;
      default: return Users;
    }
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md group relative overflow-hidden border-2",
        isSelected 
          ? "ring-2 ring-primary bg-primary/5 shadow-lg border-primary" 
          : "hover:border-primary/30 border-border"
      )}
      onClick={() => onSelect(option.type)}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Icon Section */}
          <div className="flex-shrink-0">
            <div className="text-3xl">{getTeamTypeIcon(option.type)}</div>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <CardTitle className="text-lg font-semibold flex items-center gap-2 mb-1">
                  {option.label}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              {isSelected && (
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              )}
            </div>

            {/* Capabilities and Composition in horizontal layout */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Capabilities */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {option.capabilities.slice(0, 3).map((capability) => (
                    <Badge key={capability} variant="secondary" className="text-xs px-2 py-1">
                      {capability}
                    </Badge>
                  ))}
                  {option.capabilities.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      +{option.capabilities.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Team Composition */}
              <div className="flex flex-wrap gap-2">
                {option.recommendedComposition.map((comp) => {
                  const Icon = getCompositionIcon(comp);
                  return (
                    <div key={comp} className="flex items-center gap-1.5 text-xs bg-muted/60 rounded-md px-2 py-1.5">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="font-medium">{getCompositionLabel(comp)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
