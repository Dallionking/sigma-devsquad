import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { EnhancedProfileAvatarUpload } from './profile-setup/EnhancedProfileAvatarUpload';
import { ProfileBasicInfoForm } from './profile-setup/ProfileBasicInfoForm';
import { ProfileSkillsSelector } from './profile-setup/ProfileSkillsSelector';
import { ProfileFormActions } from './profile-setup/ProfileFormActions';
import { ValidationMessage } from './completion/ValidationMessage';
import { MicroProgressIndicators } from './micro-progress/MicroProgressIndicators';
import { useMicroProgress } from '@/hooks/useMicroProgress';
import { profileSetupSchema, type ProfileSetupFormData } from './profile-setup/types';

interface ProfileSetupFormProps {
  onComplete: (data: ProfileSetupFormData) => void;
  onSkip: () => void;
  initialData?: ProfileSetupFormData | null;
}

export const ProfileSetupForm = ({ onComplete, onSkip, initialData }: ProfileSetupFormProps) => {
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { progressState, showProcessing, showSuccess, hideProgress } = useMicroProgress();

  const form = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues: {
      name: "",
      jobTitle: "",
      company: "",
      bio: "",
      profileImage: "",
      experience: "beginner",
      preferredLanguages: [],
      interests: [],
    },
  });

  // Load initial data if available (for revisiting completed steps)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
      if (initialData.profileImage) {
        setAvatarPreview(initialData.profileImage);
      }
      if (initialData.preferredLanguages) {
        setSelectedLanguages(initialData.preferredLanguages);
      }
      if (initialData.interests) {
        setSelectedInterests(initialData.interests);
      }
    } else {
      // Try to load data from localStorage as fallback
      const savedProfile = localStorage.getItem('profile-setup-draft');
      if (savedProfile) {
        try {
          const parsedProfile = JSON.parse(savedProfile);
          form.reset(parsedProfile);
          if (parsedProfile.profileImage) {
            setAvatarPreview(parsedProfile.profileImage);
          }
          if (parsedProfile.preferredLanguages) {
            setSelectedLanguages(parsedProfile.preferredLanguages);
          }
          if (parsedProfile.interests) {
            setSelectedInterests(parsedProfile.interests);
          }
        } catch (error) {
          console.error('Failed to parse profile data:', error);
        }
      }
    }
  }, [initialData, form]);

  // Auto-save form data as draft
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('profile-setup-draft', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (data: ProfileSetupFormData) => {
    showProcessing('Saving your profile...');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Remove the draft when successfully submitting
    localStorage.removeItem('profile-setup-draft');
    
    // Include selected languages and interests
    data.preferredLanguages = selectedLanguages;
    data.interests = selectedInterests;
    
    showSuccess('Profile saved successfully!');
    
    setTimeout(() => {
      onComplete(data);
    }, 1000);
  };

  const handleAvatarChange = (avatarUrl: string) => {
    setAvatarPreview(avatarUrl);
    form.setValue("profileImage", avatarUrl);
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(language)) {
        const updated = prev.filter(l => l !== language);
        form.setValue("preferredLanguages", updated);
        showSuccess(`Removed ${language}`);
        return updated;
      } else {
        const updated = [...prev, language];
        form.setValue("preferredLanguages", updated);
        showSuccess(`Added ${language}`);
        return updated;
      }
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        const updated = prev.filter(i => i !== interest);
        form.setValue("interests", updated);
        showSuccess(`Removed ${interest}`);
        return updated;
      } else {
        const updated = [...prev, interest];
        form.setValue("interests", updated);
        showSuccess(`Added ${interest}`);
        return updated;
      }
    });
  };

  const userName = form.watch("name") || "";
  const hasRequiredSelections = selectedLanguages.length >= 2 && selectedInterests.length >= 3;
  
  // Get current form data for validation
  const currentFormData = {
    ...form.getValues(),
    preferredLanguages: selectedLanguages,
    interests: selectedInterests
  };

  return (
    <div className="space-y-6">
      {/* Validation status message */}
      <ValidationMessage 
        step="profile-setup"
        stepData={currentFormData}
      />
      
      {/* Micro progress indicator */}
      {progressState.isVisible && (
        <MicroProgressIndicators
          type={progressState.type!}
          message={progressState.message}
          isVisible={progressState.isVisible}
          onComplete={hideProgress}
        />
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <EnhancedProfileAvatarUpload
            avatarPreview={avatarPreview}
            userName={userName}
            onAvatarChange={handleAvatarChange}
          />

          <ProfileBasicInfoForm control={form.control} />

          <ProfileSkillsSelector
            control={form.control}
            selectedLanguages={selectedLanguages}
            selectedInterests={selectedInterests}
            onLanguageToggle={toggleLanguage}
            onInterestToggle={toggleInterest}
          />

          <ProfileFormActions
            onSkip={onSkip}
            isFormValid={form.formState.isValid}
            hasRequiredSelections={hasRequiredSelections}
          />
        </form>
      </Form>
    </div>
  );
};
