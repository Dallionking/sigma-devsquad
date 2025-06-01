
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Clock, AlertTriangle, Info } from 'lucide-react';
import { OnboardingStep } from '@/contexts/OnboardingContext';
import { getCompletionMessage } from '@/contexts/onboarding/completion';

interface ValidationMessageProps {
  step: OnboardingStep;
  stepData: any;
  className?: string;
}

export const ValidationMessage = ({ step, stepData, className }: ValidationMessageProps) => {
  const message = getCompletionMessage(step, stepData);
  
  const getIcon = () => {
    switch (message.type) {
      case 'success':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <Clock className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getVariant = () => {
    switch (message.type) {
      case 'success':
        return 'default';
      case 'warning':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Alert variant={getVariant()} className={className}>
      {getIcon()}
      <AlertDescription className="ml-2">
        {message.message}
      </AlertDescription>
    </Alert>
  );
};
