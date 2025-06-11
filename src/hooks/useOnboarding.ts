import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { OnboardingService } from '@/services/onboarding';
import { toast } from 'sonner';

export const useOnboarding = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const userId = user?.id;

  // Fetch onboarding progress
  const { data: progress, isLoading: progressLoading } = useQuery({
    queryKey: ['onboarding-progress', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      let progress = await OnboardingService.getProgress(userId);
      if (!progress) {
        progress = await OnboardingService.initializeProgress(userId);
      }
      return progress;
    },
    enabled: !!userId
  });

  // Fetch onboarding steps
  const { data: steps = [], isLoading: stepsLoading } = useQuery({
    queryKey: ['onboarding-steps'],
    queryFn: OnboardingService.getSteps
  });

  // Fetch detailed progress
  const { data: detailedProgress = [] } = useQuery({
    queryKey: ['onboarding-detailed-progress', userId],
    queryFn: () => OnboardingService.getDetailedProgress(userId!),
    enabled: !!userId
  });

  // Fetch user preferences
  const { data: preferences } = useQuery({
    queryKey: ['user-preferences', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      let prefs = await OnboardingService.getPreferences(userId);
      if (!prefs) {
        prefs = await OnboardingService.initializePreferences(userId);
      }
      return prefs;
    },
    enabled: !!userId
  });

  // Complete step mutation
  const completeStepMutation = useMutation({
    mutationFn: ({ stepId, stepNumber }: { stepId: string; stepNumber: number }) => 
      OnboardingService.completeStep(userId!, stepId, stepNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-progress'] });
      queryClient.invalidateQueries({ queryKey: ['onboarding-detailed-progress'] });
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
      toast.success('Step completed!');
    },
    onError: (error) => {
      toast.error('Failed to complete step');
      console.error('Complete step error:', error);
    }
  });

  // Skip step mutation
  const skipStepMutation = useMutation({
    mutationFn: ({ stepId, stepNumber }: { stepId: string; stepNumber: number }) => 
      OnboardingService.skipStep(userId!, stepId, stepNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['onboarding-progress'] });
      queryClient.invalidateQueries({ queryKey: ['onboarding-detailed-progress'] });
      toast.info('Step skipped');
    },
    onError: (error) => {
      toast.error('Failed to skip step');
      console.error('Skip step error:', error);
    }
  });

  // Submit feedback mutation
  const submitFeedbackMutation = useMutation({
    mutationFn: ({ 
      stepNumber, 
      rating, 
      feedbackText,
      feedbackType = 'step_specific'
    }: { 
      stepNumber: number; 
      rating: number; 
      feedbackText?: string;
      feedbackType?: string;
    }) => 
      OnboardingService.submitFeedback(userId!, stepNumber, rating, feedbackText, feedbackType),
    onSuccess: () => {
      toast.success('Thank you for your feedback!');
    },
    onError: (error) => {
      toast.error('Failed to submit feedback');
      console.error('Submit feedback error:', error);
    }
  });

  // Update preferences mutation
  const updatePreferencesMutation = useMutation({
    mutationFn: (updates: Parameters<typeof OnboardingService.updatePreferences>[1]) => 
      OnboardingService.updatePreferences(userId!, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
      toast.success('Preferences updated');
    },
    onError: (error) => {
      toast.error('Failed to update preferences');
      console.error('Update preferences error:', error);
    }
  });

  // Get analytics
  const { data: analytics } = useQuery({
    queryKey: ['onboarding-analytics', userId],
    queryFn: () => OnboardingService.getAnalytics(userId!),
    enabled: !!userId
  });

  // Helper functions
  const getCurrentStep = () => {
    const currentStepNumber = progress?.current_step || 1;
    return steps.find(s => s.step_number === currentStepNumber);
  };

  const getStepProgress = (stepId: string) => {
    return detailedProgress.find(p => p.step_id === stepId);
  };

  const isStepCompleted = (stepNumber: number) => {
    const completedSteps = (progress?.completed_steps as number[]) || [];
    return completedSteps.includes(stepNumber);
  };

  const canSkipCurrentStep = () => {
    const currentStep = getCurrentStep();
    return currentStep && !currentStep.is_required;
  };

  return {
    // Data
    progress,
    steps,
    detailedProgress,
    preferences,
    analytics,
    
    // Loading states
    isLoading: progressLoading || stepsLoading,
    
    // Mutations
    completeStep: completeStepMutation.mutate,
    skipStep: skipStepMutation.mutate,
    submitFeedback: submitFeedbackMutation.mutate,
    updatePreferences: updatePreferencesMutation.mutate,
    
    // Helper functions
    getCurrentStep,
    getStepProgress,
    isStepCompleted,
    canSkipCurrentStep,
    
    // Mutation states
    isCompletingStep: completeStepMutation.isPending,
    isSkippingStep: skipStepMutation.isPending,
    isSubmittingFeedback: submitFeedbackMutation.isPending,
    isUpdatingPreferences: updatePreferencesMutation.isPending
  };
};
