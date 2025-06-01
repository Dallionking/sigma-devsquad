
import React, { useState } from 'react';
import { Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { TooltipWrapper } from '../tooltips/TooltipWrapper';
import { InteractiveTooltip } from '../tooltips/InteractiveTooltip';
import { useSequentialTooltips } from '../tooltips/useSequentialTooltips';
import { type ProfileSetupFormData } from './types';

interface ProfileSkillsSelectorProps {
  control: Control<ProfileSetupFormData>;
  selectedLanguages: string[];
  selectedInterests: string[];
  onLanguageToggle: (language: string) => void;
  onInterestToggle: (interest: string) => void;
}

const languageOptions = [
  "JavaScript", "TypeScript", "Python", "Go", "Rust", 
  "Java", "C#", "C++", "PHP", "Ruby", "Swift", "Kotlin"
];

const interestOptions = [
  "Web Development", "Mobile Apps", "DevOps", "Game Dev",
  "AI/ML", "Data Science", "Cloud", "Blockchain",
  "Security", "Design", "Backend", "Frontend"
];

const skillsSequence = [
  {
    id: "skills-intro",
    title: "Select Your Skills",
    content: "Choose the programming languages and areas you're interested in. This helps us recommend the best agents and templates for your projects."
  },
  {
    id: "languages-guide",
    title: "Programming Languages",
    content: "Select the programming languages you work with or want to learn. You can choose multiple languages."
  },
  {
    id: "interests-guide",
    title: "Areas of Interest",
    content: "Pick the areas you're most interested in. This helps agents understand your focus areas and provide relevant suggestions."
  }
];

export const ProfileSkillsSelector = ({ 
  control, 
  selectedLanguages, 
  selectedInterests, 
  onLanguageToggle, 
  onInterestToggle 
}: ProfileSkillsSelectorProps) => {
  const [showGuidance, setShowGuidance] = useState(false);
  const {
    currentIndex,
    currentTooltip,
    isActive,
    totalSequence,
    startSequence,
    nextTooltip,
    previousTooltip,
    endSequence
  } = useSequentialTooltips(skillsSequence);

  const handleStartGuidance = () => {
    setShowGuidance(true);
    startSequence();
  };

  return (
    <div className="space-y-6">
      {/* Guidance trigger button */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleStartGuidance}
          className="text-sm"
        >
          Show Skills Guide
        </Button>
      </div>

      {/* Sequential tooltip overlay */}
      {isActive && currentTooltip && (
        <InteractiveTooltip
          id={currentTooltip.id}
          title={currentTooltip.title}
          content={currentTooltip.content}
          position="bottom"
          showOnMount={true}
          isSequential={true}
          sequenceIndex={currentIndex}
          totalSequence={totalSequence}
          onNext={nextTooltip}
          onPrevious={previousTooltip}
          onDismiss={endSequence}
        >
          <div className="absolute inset-0 bg-black/20 rounded-lg pointer-events-none" />
        </InteractiveTooltip>
      )}

      <FormField
        control={control}
        name="preferredLanguages"
        render={() => (
          <FormItem>
            <TooltipWrapper
              id="preferred-languages"
              title="Programming Languages"
              content="Select the programming languages you're familiar with or interested in learning. This helps agents provide relevant code examples and suggestions."
              position="top"
            >
              <FormLabel>Preferred Programming Languages</FormLabel>
            </TooltipWrapper>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((language) => (
                  <TooltipWrapper
                    key={language}
                    id={`language-${language.toLowerCase()}`}
                    title={language}
                    content={`Click to ${selectedLanguages.includes(language) ? 'remove' : 'add'} ${language} ${selectedLanguages.includes(language) ? 'from' : 'to'} your preferred languages.`}
                    position="top"
                    trigger="hover"
                    showIcon={false}
                  >
                    <Button
                      type="button"
                      variant={selectedLanguages.includes(language) ? "default" : "outline"}
                      size="sm"
                      onClick={() => onLanguageToggle(language)}
                      className={selectedLanguages.includes(language) ? "bg-primary text-primary-foreground" : ""}
                    >
                      {language}
                    </Button>
                  </TooltipWrapper>
                ))}
              </div>
            </FormControl>
            {selectedLanguages.length === 0 && (
              <FormMessage>Please select at least one language</FormMessage>
            )}
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="interests"
        render={() => (
          <FormItem>
            <TooltipWrapper
              id="interests"
              title="Areas of Interest"
              content="Choose the areas you're most passionate about or want to focus on. This helps us suggest relevant projects and connect you with appropriate agents."
              position="top"
            >
              <FormLabel>Areas of Interest</FormLabel>
            </TooltipWrapper>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <TooltipWrapper
                    key={interest}
                    id={`interest-${interest.toLowerCase().replace(/\s+/g, '-')}`}
                    title={interest}
                    content={`Click to ${selectedInterests.includes(interest) ? 'remove' : 'add'} ${interest} ${selectedInterests.includes(interest) ? 'from' : 'to'} your interests.`}
                    position="top"
                    trigger="hover"
                    showIcon={false}
                  >
                    <Button
                      type="button"
                      variant={selectedInterests.includes(interest) ? "default" : "outline"}
                      size="sm"
                      onClick={() => onInterestToggle(interest)}
                      className={selectedInterests.includes(interest) ? "bg-primary text-primary-foreground" : ""}
                    >
                      {interest}
                    </Button>
                  </TooltipWrapper>
                ))}
              </div>
            </FormControl>
            {selectedInterests.length === 0 && (
              <FormMessage>Please select at least one interest</FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
