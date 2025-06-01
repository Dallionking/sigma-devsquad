
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  jobTitle: z.string().min(2, { message: "Job title is required." }),
  company: z.string().optional(),
  bio: z.string().max(500).optional(),
  profileImage: z.string().optional(),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  preferredLanguages: z.array(z.string()).min(1),
  interests: z.array(z.string()).min(1),
});

type FormData = z.infer<typeof formSchema>;

interface ProfileSetupFormProps {
  onComplete: (data: FormData) => void;
  onSkip: () => void;
  initialData?: FormData | null;
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

export const ProfileSetupForm = ({ onComplete, onSkip, initialData }: ProfileSetupFormProps) => {
  const { toast } = useToast();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = (data: FormData) => {
    // Remove the draft when successfully submitting
    localStorage.removeItem('profile-setup-draft');
    
    // Include selected languages and interests
    data.preferredLanguages = selectedLanguages;
    data.interests = selectedInterests;
    
    onComplete(data);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        form.setValue("profileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleLanguage = (language: string) => {
    setSelectedLanguages(prev => {
      if (prev.includes(language)) {
        const updated = prev.filter(l => l !== language);
        form.setValue("preferredLanguages", updated);
        return updated;
      } else {
        const updated = [...prev, language];
        form.setValue("preferredLanguages", updated);
        return updated;
      }
    });
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest)) {
        const updated = prev.filter(i => i !== interest);
        form.setValue("interests", updated);
        return updated;
      } else {
        const updated = [...prev, interest];
        form.setValue("interests", updated);
        return updated;
      }
    });
  };

  const userInitials = form.watch("name")
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Avatar upload */}
        <div className="flex flex-col items-center justify-center">
          <Avatar className="w-24 h-24 border-2 border-primary/30">
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                {userInitials || "AI"}
              </AvatarFallback>
            )}
          </Avatar>
          <label htmlFor="avatar-upload" className="mt-4 inline-block">
            <Button type="button" variant="outline" size="sm" className="cursor-pointer" asChild>
              <span>Upload photo</span>
            </Button>
            <Input 
              id="avatar-upload"
              type="file" 
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your job title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company/Organization</FormLabel>
                <FormControl>
                  <Input placeholder="Where do you work?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
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

        <div className="space-y-4">
          <FormField
            control={form.control}
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
                        onClick={() => toggleLanguage(language)}
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
            control={form.control}
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
                        onClick={() => toggleInterest(interest)}
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

        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onSkip}
          >
            Skip for now
          </Button>
          <Button 
            type="submit" 
            disabled={!form.formState.isValid || selectedLanguages.length === 0 || selectedInterests.length === 0}
          >
            Save Profile
          </Button>
        </div>
      </form>
    </Form>
  );
};
