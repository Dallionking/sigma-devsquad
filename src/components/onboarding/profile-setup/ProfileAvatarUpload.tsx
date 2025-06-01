
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TooltipWrapper } from '../tooltips/TooltipWrapper';

interface ProfileAvatarUploadProps {
  avatarPreview: string | null;
  userName: string;
  onAvatarChange: (avatarUrl: string) => void;
}

export const ProfileAvatarUpload = ({ 
  avatarPreview, 
  userName, 
  onAvatarChange 
}: ProfileAvatarUploadProps) => {
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onAvatarChange(result);
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
    </TooltipWrapper>
  );
};
