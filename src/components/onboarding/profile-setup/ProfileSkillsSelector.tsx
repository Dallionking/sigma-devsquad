
import React from 'react';
import { Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface FormData {
  name: string;
  jobTitle: string;
  company: string;
  bio: string;
  experience: "beginner" | "intermediate" | "advanced";
  preferredLanguages: string[];
  interests: string[];
  profileImage: string;
}

interface ProfileSkillsSelectorProps {
  control: Control<FormData>;
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

export const ProfileSkillsSelector = ({ 
  control, 
  selectedLanguages, 
  selectedInterests, 
  onLanguageToggle, 
  onInterestToggle 
}: ProfileSkillsSelectorProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="preferredLanguages"
        render={() => (
          <FormItem>
            <FormLabel>Preferred Programming Languages</FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((language) => (
                  <Button
                    key={language}
                    type="button"
                    variant={selectedLanguages.includes(language) ? "default" : "outline"}
                    size="sm"
                    onClick={() => onLanguageToggle(language)}
                    className={selectedLanguages.includes(language) ? "bg-primary text-primary-foreground" : ""}
                  >
                    {language}
                  </Button>
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
            <FormLabel>Areas of Interest</FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <Button
                    key={interest}
                    type="button"
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    size="sm"
                    onClick={() => onInterestToggle(interest)}
                    className={selectedInterests.includes(interest) ? "bg-primary text-primary-foreground" : ""}
                  >
                    {interest}
                  </Button>
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
