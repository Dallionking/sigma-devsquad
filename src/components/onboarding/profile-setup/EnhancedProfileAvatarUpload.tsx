
import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TooltipWrapper } from '../tooltips/TooltipWrapper';
import { MicroProgressIndicators } from '../micro-progress/MicroProgressIndicators';
import { useMicroProgress } from '@/hooks/useMicroProgress';
import { Upload, CheckCircle } from 'lucide-react';

interface EnhancedProfileAvatarUploadProps {
  avatarPreview: string | null;
  userName: string;
  onAvatarChange: (avatarUrl: string) => void;
}

export const EnhancedProfileAvatarUpload = ({ 
  avatarPreview, 
  userName, 
  onAvatarChange 
}: EnhancedProfileAvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { progressState, showUploadProgress, updateUploadProgress, showSuccess, hideProgress } = useMicroProgress();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      showUploadProgress('Uploading profile photo...', 0);

      // Simulate realistic upload progress
      const reader = new FileReader();
      
      // Simulate upload progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        updateUploadProgress(progress);
      }, 200);

      reader.onloadend = () => {
        // Complete the upload
        clearInterval(progressInterval);
        updateUploadProgress(100);
        
        setTimeout(() => {
          const result = reader.result as string;
          onAvatarChange(result);
          setIsUploading(false);
          setUploadComplete(true);
          showSuccess('Profile photo uploaded successfully!');
        }, 500);
      };

      reader.readAsDataURL(file);
    }
  };

  const userInitials = userName
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <TooltipWrapper
      id="profile-avatar-section"
      title="Profile Photo Section"
      content="Upload a profile photo that will be visible to your team members and in agent communications. You can skip this if you prefer to use your initials. Supported formats: JPG, PNG, GIF. Maximum size: 5MB."
      position="bottom"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-primary/30">
            {avatarPreview ? (
              <AvatarImage src={avatarPreview} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">
                {userInitials || "AI"}
              </AvatarFallback>
            )}
          </Avatar>
          
          {/* Upload success indicator */}
          {uploadComplete && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-in zoom-in-0 duration-300">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          )}
          
          {/* Upload overlay during upload */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-white animate-pulse" />
            </div>
          )}
        </div>
        
        {/* Upload progress indicator */}
        {progressState.isVisible && (
          <MicroProgressIndicators
            type={progressState.type!}
            message={progressState.message}
            progress={progressState.progress}
            isVisible={progressState.isVisible}
            onComplete={hideProgress}
            className="w-full"
          />
        )}
        
        <label htmlFor="avatar-upload" className="inline-block">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="cursor-pointer" 
            asChild
            disabled={isUploading}
          >
            <span>
              {isUploading ? 'Uploading...' : uploadComplete ? 'Change photo' : 'Upload photo'}
            </span>
          </Button>
          <Input 
            id="avatar-upload"
            type="file" 
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>
    </TooltipWrapper>
  );
};
