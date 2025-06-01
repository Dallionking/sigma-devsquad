
import React from 'react';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="flex justify-between pt-6">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onSkip}
      >
        Skip for now
      </Button>
      <Button 
        type="submit" 
        disabled={!isFormValid || !hasRequiredSelections}
      >
        Save Profile
      </Button>
    </div>
  );
};
