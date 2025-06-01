
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useInputValidation } from "@/hooks/useInputValidation";
import { Camera, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PersonalInfoSection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form validation
  const fullName = useInputValidation(user?.user_metadata?.full_name || "", {
    rules: { required: true, minLength: 2 },
    validateOnChange: true,
    debounceMs: 300
  });

  const email = useInputValidation(user?.email || "", {
    rules: { 
      required: true, 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    validateOnChange: true,
    debounceMs: 300
  });

  const bio = useInputValidation("", {
    rules: { maxLength: 500 },
    validateOnChange: true,
    debounceMs: 300
  });

  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [selectedRole, setSelectedRole] = useState("member");

  const handleSave = async () => {
    setIsSaving(true);
    
    // Validate all fields
    const isValid = fullName.forceValidate() && email.forceValidate() && bio.forceValidate();
    
    if (!isValid) {
      setIsSaving(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
      
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    fullName.handleChange(user?.user_metadata?.full_name || "");
    email.handleChange(user?.email || "");
    bio.handleChange("");
    setIsEditing(false);
  };

  const timezones = [
    { value: "America/New_York", label: "Eastern Time (GMT-5)" },
    { value: "America/Chicago", label: "Central Time (GMT-6)" },
    { value: "America/Denver", label: "Mountain Time (GMT-7)" },
    { value: "America/Los_Angeles", label: "Pacific Time (GMT-8)" },
    { value: "UTC", label: "UTC (GMT+0)" },
    { value: "Europe/London", label: "London (GMT+0)" },
    { value: "Europe/Paris", label: "Paris (GMT+1)" },
    { value: "Asia/Tokyo", label: "Tokyo (GMT+9)" },
  ];

  return (
    <div className="space-y-6">
      {/* Avatar Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage 
                src={user?.user_metadata?.avatar_url} 
                alt={user?.user_metadata?.full_name || "User"}
              />
              <AvatarFallback className="bg-gradient-to-br from-vibe-primary to-vibe-secondary text-white font-bold text-xl">
                {user?.user_metadata?.full_name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Upload Photo
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max file size 2MB.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information Form */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Personal Information</CardTitle>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName.value}
                onChange={(e) => fullName.handleChange(e.target.value)}
                onBlur={fullName.handleBlur}
                disabled={!isEditing}
                className={fullName.error ? "border-red-500" : ""}
              />
              {fullName.error && (
                <p className="text-sm text-red-500">{fullName.error}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email.value}
                onChange={(e) => email.handleChange(e.target.value)}
                onBlur={email.handleBlur}
                disabled={!isEditing}
                className={email.error ? "border-red-500" : ""}
              />
              {email.error && (
                <p className="text-sm text-red-500">{email.error}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole} disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Time Zone</Label>
              <Select value={selectedTimezone} onValueChange={setSelectedTimezone} disabled={!isEditing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              value={bio.value}
              onChange={(e) => bio.handleChange(e.target.value)}
              onBlur={bio.handleBlur}
              disabled={!isEditing}
              rows={4}
              className={bio.error ? "border-red-500" : ""}
            />
            {bio.error && (
              <p className="text-sm text-red-500">{bio.error}</p>
            )}
            <p className="text-xs text-muted-foreground">
              {bio.value.length}/500 characters
            </p>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
