
import React from 'react';
import { Button } from '@/components/ui/button';
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
        <Button 
          onClick={onSubmit}
          disabled={!isFormValid}
          className="flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Create Team</span>
        </Button>
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
