
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TooltipWrapper } from '../tooltips/TooltipWrapper';
import { type ProfileSetupFormData } from './types';

interface ProfileBasicInfoFormProps {
  control: Control<ProfileSetupFormData>;
}

export const ProfileBasicInfoForm = ({ control }: ProfileBasicInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <TooltipWrapper
              id="profile-name"
              title="Full Name"
              content="Enter your full name as you'd like it to appear to your team members and in communications."
              position="top"
            >
              <FormLabel>Full Name</FormLabel>
            </TooltipWrapper>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <TooltipWrapper
              id="profile-job-title"
              title="Job Title"
              content="Your current job title or role. This helps agents understand your expertise and responsibilities."
              position="top"
            >
              <FormLabel>Job Title</FormLabel>
            </TooltipWrapper>
            <FormControl>
              <Input placeholder="Enter your job title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <TooltipWrapper
              id="profile-company"
              title="Company/Organization"
              content="The company or organization you work for. This is optional but helps provide context for project discussions."
              position="top"
            >
              <FormLabel>Company/Organization</FormLabel>
            </TooltipWrapper>
            <FormControl>
              <Input placeholder="Where do you work?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <TooltipWrapper
              id="profile-experience"
              title="Experience Level"
              content="Select your overall experience level in software development. This helps agents adjust their communication style and suggestions."
              position="top"
            >
              <FormLabel>Experience Level</FormLabel>
            </TooltipWrapper>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="md:col-span-2">
        <FormField
          control={control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <TooltipWrapper
                id="profile-bio"
                title="Bio"
                content="A brief description about yourself, your interests, and what you're working on. This helps agents provide more personalized assistance."
                position="top"
              >
                <FormLabel>Bio</FormLabel>
              </TooltipWrapper>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a bit about yourself..." 
                  {...field}
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
