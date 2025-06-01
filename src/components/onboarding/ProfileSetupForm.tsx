
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInputValidation } from '@/hooks/useInputValidation';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useToast } from '@/hooks/use-toast';
import { Camera, CheckCircle, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileSetupData {
  fullName: string;
  jobTitle: string;
  company: string;
  teamSize: string;
  developmentFocus: string;
  profilePhoto?: string;
}

interface ProfileSetupFormProps {
  onComplete: (data: ProfileSetupData) => void;
  onSkip: () => void;
}

const developmentFocusOptions = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Full Stack Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'devops', label: 'DevOps / Infrastructure' },
  { value: 'ai-ml', label: 'AI / Machine Learning' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'qa', label: 'Quality Assurance' },
  { value: 'data', label: 'Data Engineering' },
  { value: 'other', label: 'Other' }
];

const teamSizeOptions = [
  { value: 'solo', label: 'Solo Developer' },
  { value: '2-5', label: '2-5 developers' },
  { value: '6-10', label: '6-10 developers' },
  { value: '11-25', label: '11-25 developers' },
  { value: '26-50', label: '26-50 developers' },
  { value: '50+', label: '50+ developers' }
];

export const ProfileSetupForm = ({ onComplete, onSkip }: ProfileSetupFormProps) => {
  const { toast } = useToast();
  const [profilePhoto, setProfilePhoto] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [teamSize, setTeamSize] = useState('');
  const [developmentFocus, setDevelopmentFocus] = useState('');

  // Form validation for each field
  const fullName = useInputValidation('', {
    rules: { required: true, minLength: 2, maxLength: 50 },
    validateOnChange: true,
    debounceMs: 300
  });

  const jobTitle = useInputValidation('', {
    rules: { required: true, minLength: 2, maxLength: 100 },
    validateOnChange: true,
    debounceMs: 300
  });

  const company = useInputValidation('', {
    rules: { required: true, minLength: 2, maxLength: 100 },
    validateOnChange: true,
    debounceMs: 300
  });

  // Combine all form data
  const formData: ProfileSetupData = {
    fullName: fullName.value,
    jobTitle: jobTitle.value,
    company: company.value,
    teamSize,
    developmentFocus,
    profilePhoto
  };

  // Auto-save functionality
  const { forceSave } = useAutoSave(formData, {
    delay: 3000,
    enabled: true,
    showToast: true,
    onSave: async () => {
      // Save to localStorage for persistence during onboarding
      localStorage.setItem('profile-setup-draft', JSON.stringify(formData));
    }
  });

  // Load saved data on component mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('profile-setup-draft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        fullName.handleChange(parsed.fullName || '');
        jobTitle.handleChange(parsed.jobTitle || '');
        company.handleChange(parsed.company || '');
        setTeamSize(parsed.teamSize || '');
        setDevelopmentFocus(parsed.developmentFocus || '');
        setProfilePhoto(parsed.profilePhoto || '');
      } catch (error) {
        console.error('Failed to load saved profile data:', error);
      }
    }
  }, []);

  const handlePhotoUpload = useCallback((file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please choose an image smaller than 2MB.',
        variant: 'destructive'
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please choose an image file (JPG, PNG, GIF).',
        variant: 'destructive'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setProfilePhoto(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handlePhotoUpload(files[0]);
    }
  }, [handlePhotoUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handlePhotoUpload(files[0]);
    }
  }, [handlePhotoUpload]);

  const isFormValid = () => {
    return (
      !fullName.error && fullName.value.trim() &&
      !jobTitle.error && jobTitle.value.trim() &&
      !company.error && company.value.trim() &&
      teamSize &&
      developmentFocus
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast({
        title: 'Please complete all fields',
        description: 'Make sure all required fields are filled out correctly.',
        variant: 'destructive'
      });
      return;
    }

    // Clear the draft from localStorage
    localStorage.removeItem('profile-setup-draft');
    
    await forceSave();
    onComplete(formData);
  };

  return (
    <div className="space-y-6">
      {/* Profile Photo Upload */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Label className="text-base font-medium">Profile Photo</Label>
            
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-2 border-dashed border-border">
                <AvatarImage src={profilePhoto} alt="Profile" />
                <AvatarFallback className="bg-muted">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>

              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 w-full max-w-sm transition-colors cursor-pointer",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                )}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <div className="text-center space-y-2">
                  <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drop your photo here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              {profilePhoto && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProfilePhoto('')}
                  className="flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Remove Photo</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <div className="relative">
            <Input
              id="fullName"
              value={fullName.value}
              onChange={(e) => fullName.handleChange(e.target.value)}
              onBlur={fullName.handleBlur}
              placeholder="Enter your full name"
              className={cn(
                fullName.error && "border-red-500",
                !fullName.error && fullName.value && "border-green-500"
              )}
            />
            {!fullName.error && fullName.value && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
          </div>
          {fullName.error && (
            <p className="text-sm text-red-500">{fullName.error}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title *</Label>
          <div className="relative">
            <Input
              id="jobTitle"
              value={jobTitle.value}
              onChange={(e) => jobTitle.handleChange(e.target.value)}
              onBlur={jobTitle.handleBlur}
              placeholder="e.g. Senior Developer, Product Manager"
              className={cn(
                jobTitle.error && "border-red-500",
                !jobTitle.error && jobTitle.value && "border-green-500"
              )}
            />
            {!jobTitle.error && jobTitle.value && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
          </div>
          {jobTitle.error && (
            <p className="text-sm text-red-500">{jobTitle.error}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <div className="relative">
            <Input
              id="company"
              value={company.value}
              onChange={(e) => company.handleChange(e.target.value)}
              onBlur={company.handleBlur}
              placeholder="Enter your company name"
              className={cn(
                company.error && "border-red-500",
                !company.error && company.value && "border-green-500"
              )}
            />
            {!company.error && company.value && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
          </div>
          {company.error && (
            <p className="text-sm text-red-500">{company.error}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Team Size *</Label>
          <div className="relative">
            <Select value={teamSize} onValueChange={setTeamSize}>
              <SelectTrigger className={cn(teamSize && "border-green-500")}>
                <SelectValue placeholder="Select your team size" />
              </SelectTrigger>
              <SelectContent>
                {teamSizeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {teamSize && (
              <CheckCircle className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Development Focus *</Label>
          <div className="relative">
            <Select value={developmentFocus} onValueChange={setDevelopmentFocus}>
              <SelectTrigger className={cn(developmentFocus && "border-green-500")}>
                <SelectValue placeholder="Select your primary development focus" />
              </SelectTrigger>
              <SelectContent>
                {developmentFocusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {developmentFocus && (
              <CheckCircle className="absolute right-8 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onSkip}>
          Skip for Now
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Complete Profile Setup</span>
        </Button>
      </div>

      {/* Auto-save indicator */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Your progress is automatically saved every 3 seconds
        </p>
      </div>
    </div>
  );
};
