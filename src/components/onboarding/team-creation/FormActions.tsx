
import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedActionButton } from '../visual-cues/AnimatedActionButton';
import { CheckCircle } from 'lucide-react';

interface FormActionsProps {
  isFormValid: boolean;
  onSubmit: () => void;
  onSkip: () => void;
}

export const FormActions = ({ isFormValid, onSubmit, onSkip }: FormActionsProps) => {
  return (
    <>
      {/* Form Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onSkip}>
          Skip for Now
        </Button>
        <AnimatedActionButton 
          onClick={onSubmit}
          disabled={!isFormValid}
          isPrimary={true}
          showPulse={isFormValid}
          className="flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Create Team</span>
        </AnimatedActionButton>
      </div>

      {/* Auto-save indicator */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Your progress is automatically saved every 3 seconds
        </p>
      </div>
    </>
  );
};
