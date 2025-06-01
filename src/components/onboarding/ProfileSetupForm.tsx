
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { EnhancedProfileAvatarUpload } from './profile-setup/EnhancedProfileAvatarUpload';
import { ProfileSkillsSelector } from './profile-setup/ProfileSkillsSelector';
import { ProfileFormActions } from './profile-setup/ProfileFormActions';
import { ValidatedFormField } from './form/ValidatedFormField';
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

  return (
    <div className="space-y-6">
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <EnhancedProfileAvatarUpload
            avatarPreview={avatarPreview}
            userName={userName}
            onAvatarChange={handleAvatarChange}
          />

          {/* Basic Information with inline validation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Basic Information</h3>
            
            <ValidatedFormField
              control={form.control}
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              isRequired={true}
              helpText="We use this to personalize your experience"
            />

            <ValidatedFormField
              control={form.control}
              name="jobTitle"
              label="Job Title/Role"
              placeholder="e.g. Senior Developer, Product Manager"
              isRequired={true}
              helpText="Helps us tailor agent recommendations"
            />

            <ValidatedFormField
              control={form.control}
              name="company"
              label="Company"
              placeholder="Your current company (optional)"
              isRequired={false}
            />

            <ValidatedFormField
              control={form.control}
              name="experience"
              label="Experience Level"
              type="select"
              placeholder="Select your experience level"
              isRequired={true}
              helpText="Determines the complexity of suggestions"
              options={[
                { value: "beginner", label: "Beginner (0-2 years)" },
                { value: "intermediate", label: "Intermediate (2-5 years)" },
                { value: "advanced", label: "Advanced (5+ years)" },
                { value: "expert", label: "Expert (10+ years)" }
              ]}
            />

            <ValidatedFormField
              control={form.control}
              name="bio"
              label="Bio/Description"
              type="textarea"
              placeholder="Tell us about yourself, your interests, and what you're working on..."
              isRequired={false}
              helpText="Optional - helps team members get to know you"
            />
          </div>

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
