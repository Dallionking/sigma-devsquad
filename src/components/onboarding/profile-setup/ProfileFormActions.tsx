
import React from 'react';
import { Button } from '@/components/ui/button';
import { TooltipWrapper } from '../tooltips/TooltipWrapper';

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
      <TooltipWrapper
        id="skip-profile-setup"
        title="Skip Profile Setup"
        content="You can skip this step and set up your profile later from the settings page. However, completing your profile helps agents provide better assistance."
        position="top"
        showIcon={false}
      >
        <Button 
          type="button" 
          variant="outline" 
          onClick={onSkip}
        >
          Skip for now
        </Button>
      </TooltipWrapper>

      <TooltipWrapper
        id="save-profile"
        title={canSubmit ? "Save Profile" : "Complete Required Fields"}
        content={canSubmit 
          ? "Save your profile information and continue to the next step of onboarding." 
          : "Please fill out all required fields and select at least one programming language and area of interest before saving."
        }
        position="top"
        showIcon={false}
      >
        <Button 
          type="submit" 
          disabled={!canSubmit}
        >
          Save Profile
        </Button>
      </TooltipWrapper>
    </div>
  );
};
