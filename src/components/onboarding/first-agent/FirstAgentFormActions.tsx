
import React from 'react';
import { Button } from '@/components/ui/button';

interface FirstAgentFormActionsProps {
  onSkip: () => void;
  hasValidConfiguration: () => boolean;
}

export const FirstAgentFormActions = ({
  onSkip,
  hasValidConfiguration
}: FirstAgentFormActionsProps) => {
  return (
    <div className="flex justify-between pt-6 border-t">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onSkip}
        className="px-6"
      >
        Skip for now
      </Button>

      <Button 
        type="submit" 
        disabled={!hasValidConfiguration()}
        className="px-6"
      >
        Create Agent
      </Button>
    </div>
  );
};
