
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedActionButton } from '../visual-cues/AnimatedActionButton';

interface ProfileFormActionsProps {
  onSkip: () => void;
  isFormValid: boolean;
  hasRequiredSelections: boolean;
}

export const ProfileFormActions = ({ 
  onSkip, 
  isFormValid, 
  hasRequiredSelections 
}: ProfileFormActionsProps) => {
  const canSubmit = isFormValid && hasRequiredSelections;

  return (
    <div className="flex justify-between pt-6">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onSkip}
      >
        Skip for now
      </Button>

      <AnimatedActionButton 
        type="submit" 
        disabled={!canSubmit}
        isPrimary={true}
        showPulse={canSubmit}
      >
        Save Profile
      </AnimatedActionButton>
    </div>
  );
};
