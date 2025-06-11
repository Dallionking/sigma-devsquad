import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type OnboardingProgress = Database['public']['Tables']['onboarding_progress']['Row'];
type OnboardingStep = Database['public']['Tables']['onboarding_steps']['Row'];
type UserPreferences = Database['public']['Tables']['user_preferences']['Row'];
type OnboardingFeedback = Database['public']['Tables']['onboarding_feedback']['Row'];
type UserStepProgress = Database['public']['Tables']['user_step_progress']['Row'];

export class OnboardingService {
  /**
   * Get the current user's onboarding progress
   */
  static async getProgress(userId: string): Promise<OnboardingProgress | null> {
    const { data, error } = await supabase
      .from('onboarding_progress')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching onboarding progress:', error);
      throw error;
    }

    return data;
  }

  /**
   * Initialize onboarding progress for a new user
   */
  static async initializeProgress(userId: string): Promise<OnboardingProgress> {
    const { data, error } = await supabase
      .from('onboarding_progress')
      .insert({
        user_id: userId,
        current_step: 1,
        completed_steps: [],
        status: 'in_progress'
      })
      .select()
      .single();

    if (error) {
      console.error('Error initializing onboarding progress:', error);
      throw error;
    }

    return data;
  }

  /**
   * Update user's onboarding progress
   */
  static async updateProgress(
    userId: string,
    updates: Partial<Omit<OnboardingProgress, 'id' | 'user_id'>>
  ): Promise<OnboardingProgress> {
    const { data, error } = await supabase
      .from('onboarding_progress')
      .update({
        ...updates,
        last_activity_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating onboarding progress:', error);
      throw error;
    }

    return data;
  }

  /**
   * Get all onboarding steps
   */
  static async getSteps(): Promise<OnboardingStep[]> {
    const { data, error } = await supabase
      .from('onboarding_steps')
      .select('*')
      .order('step_number', { ascending: true });

    if (error) {
      console.error('Error fetching onboarding steps:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Get detailed progress for all steps
   */
  static async getDetailedProgress(userId: string): Promise<UserStepProgress[]> {
    const { data, error } = await supabase
      .from('user_step_progress')
      .select(`
        *,
        onboarding_steps (*)
      `)
      .eq('user_id', userId)
      .order('onboarding_steps.step_number', { ascending: true });

    if (error) {
      console.error('Error fetching detailed progress:', error);
      throw error;
    }

    return data || [];
  }

  /**
   * Mark a step as complete
   */
  static async completeStep(
    userId: string,
    stepId: string,
    stepNumber: number
  ): Promise<void> {
    // Update user_step_progress
    const { error: stepError } = await supabase
      .from('user_step_progress')
      .upsert({
        user_id: userId,
        step_id: stepId,
        status: 'completed',
        completion_timestamp: new Date().toISOString(),
        attempt_count: 1
      });

    if (stepError) {
      console.error('Error updating step progress:', stepError);
      throw stepError;
    }

    // Get current progress
    const progress = await this.getProgress(userId);
    if (!progress) {
      throw new Error('Onboarding progress not found');
    }

    // Update completed steps array
    const completedSteps = progress.completed_steps as number[] || [];
    if (!completedSteps.includes(stepNumber)) {
      completedSteps.push(stepNumber);
    }

    // Check if all steps are completed
    const allSteps = await this.getSteps();
    const requiredSteps = allSteps.filter(s => s.is_required);
    const allRequiredCompleted = requiredSteps.every(
      step => completedSteps.includes(step.step_number)
    );

    // Update onboarding progress
    await this.updateProgress(userId, {
      completed_steps: completedSteps,
      current_step: Math.max(...completedSteps) + 1,
      status: allRequiredCompleted ? 'completed' : 'in_progress',
      completed_at: allRequiredCompleted ? new Date().toISOString() : null
    });

    // Update user preferences if onboarding is completed
    if (allRequiredCompleted) {
      await this.updatePreferences(userId, { onboarding_completed: true });
    }
  }

  /**
   * Submit feedback for a step
   */
  static async submitFeedback(
    userId: string,
    stepNumber: number,
    rating: number,
    feedbackText?: string,
    feedbackType: string = 'step_specific'
  ): Promise<OnboardingFeedback> {
    const { data, error } = await supabase
      .from('onboarding_feedback')
      .insert({
        user_id: userId,
        step_number: stepNumber,
        rating,
        feedback_text: feedbackText,
        feedback_type: feedbackType
      })
      .select()
      .single();

    if (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }

    return data;
  }

  /**
   * Get user preferences
   */
  static async getPreferences(userId: string): Promise<UserPreferences | null> {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user preferences:', error);
      throw error;
    }

    return data;
  }

  /**
   * Initialize user preferences
   */
  static async initializePreferences(userId: string): Promise<UserPreferences> {
    const { data, error } = await supabase
      .from('user_preferences')
      .insert({
        user_id: userId,
        onboarding_completed: false,
        show_tips: true,
        theme_preference: 'system',
        onboarding_pace: 'standard',
        communication_preferences: {},
        feature_interests: []
      })
      .select()
      .single();

    if (error) {
      console.error('Error initializing user preferences:', error);
      throw error;
    }

    return data;
  }

  /**
   * Update user preferences
   */
  static async updatePreferences(
    userId: string,
    updates: Partial<Omit<UserPreferences, 'id' | 'user_id'>>
  ): Promise<UserPreferences> {
    const { data, error } = await supabase
      .from('user_preferences')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user preferences:', error);
      throw error;
    }

    return data;
  }

  /**
   * Skip a step
   */
  static async skipStep(
    userId: string,
    stepId: string,
    stepNumber: number
  ): Promise<void> {
    // Update user_step_progress
    const { error: stepError } = await supabase
      .from('user_step_progress')
      .upsert({
        user_id: userId,
        step_id: stepId,
        status: 'skipped',
        completion_timestamp: new Date().toISOString()
      });

    if (stepError) {
      console.error('Error skipping step:', stepError);
      throw stepError;
    }

    // Update current step
    const progress = await this.getProgress(userId);
    if (progress) {
      await this.updateProgress(userId, {
        current_step: stepNumber + 1
      });
    }
  }

  /**
   * Get onboarding analytics for a user
   */
  static async getAnalytics(userId: string) {
    const progress = await this.getProgress(userId);
    const detailedProgress = await this.getDetailedProgress(userId);
    const preferences = await this.getPreferences(userId);
    const steps = await this.getSteps();

    const completedSteps = (progress?.completed_steps as number[] || []).length;
    const totalSteps = steps.length;
    const requiredSteps = steps.filter(s => s.is_required).length;
    const completionPercentage = totalSteps > 0 
      ? Math.round((completedSteps / totalSteps) * 100) 
      : 0;

    const totalTimeSpent = detailedProgress.reduce(
      (acc, step) => acc + (step.time_spent || 0), 
      0
    );

    return {
      userId,
      status: progress?.status || 'not_started',
      completedSteps,
      totalSteps,
      requiredSteps,
      completionPercentage,
      totalTimeSpent,
      startedAt: progress?.started_at,
      completedAt: progress?.completed_at,
      lastActivityAt: progress?.last_activity_at,
      pace: preferences?.onboarding_pace || 'standard',
      currentStep: progress?.current_step || 1
    };
  }
}
