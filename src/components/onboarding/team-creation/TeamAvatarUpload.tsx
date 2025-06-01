
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Camera, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TeamAvatarUploadProps {
  teamAvatar: string;
  onAvatarChange: (avatar: string) => void;
}

export const TeamAvatarUpload = ({ teamAvatar, onAvatarChange }: TeamAvatarUploadProps) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const handleAvatarUpload = useCallback((file: File) => {
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
      onAvatarChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [toast, onAvatarChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleAvatarUpload(files[0]);
    }
  }, [handleAvatarUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleAvatarUpload(files[0]);
    }
  }, [handleAvatarUpload]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Team Avatar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20 border-2 border-dashed border-border">
            <AvatarImage src={teamAvatar} alt="Team Avatar" />
            <AvatarFallback className="bg-muted">
              <Camera className="w-6 h-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-4 w-full max-w-sm transition-colors cursor-pointer",
              isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onClick={() => document.getElementById('avatar-upload')?.click()}
          >
            <div className="text-center space-y-2">
              <Upload className="w-5 h-5 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drop team avatar here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />

          {teamAvatar && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAvatarChange('')}
              className="flex items-center space-x-2"
            >
              <X className="w-4 h-4" />
              <span>Remove Avatar</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
