
import { useState, useEffect } from 'react';
import { OnboardingStep } from '@/contexts/OnboardingContext';

export const useOnboardingHelp = (currentStep: OnboardingStep) => {
  const [isHelpCollapsed, setIsHelpCollapsed] = useState(false);

  // Auto-expand help panel for new steps
  useEffect(() => {
    setIsHelpCollapsed(false);
  }, [currentStep]);

  const toggleHelpPanel = () => {
    setIsHelpCollapsed(prev => !prev);
  };

  // Save help panel preference to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('onboarding-help-collapsed');
    if (saved !== null) {
      setIsHelpCollapsed(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('onboarding-help-collapsed', JSON.stringify(isHelpCollapsed));
  }, [isHelpCollapsed]);

  return {
    isHelpCollapsed,
    toggleHelpPanel
  };
};
