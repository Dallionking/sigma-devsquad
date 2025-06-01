
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInputValidation } from "@/hooks/useInputValidation";
import { Lock, Save, X, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SecuritySection = () => {
  const { toast } = useToast();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation
  const currentPassword = useInputValidation("", {
    rules: { required: true, minLength: 6 },
    validateOnChange: true,
    debounceMs: 300
  });

  const newPassword = useInputValidation("", {
    rules: { 
      required: true, 
      minLength: 8,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      custom: (value) => {
        if (value && value === currentPassword.value) {
          return "New password must be different from current password";
        }
        return null;
      }
    },
    validateOnChange: true,
    debounceMs: 300
  });

  const confirmPassword = useInputValidation("", {
    rules: { 
      required: true,
      custom: (value) => {
        if (value && value !== newPassword.value) {
          return "Passwords do not match";
        }
        return null;
      }
    },
    validateOnChange: true,
    debounceMs: 300
  });

  const handlePasswordChange = async () => {
    setIsSaving(true);
    
    // Validate all fields
    const isValid = currentPassword.forceValidate() && 
                   newPassword.forceValidate() && 
                   confirmPassword.forceValidate();
    
    if (!isValid) {
      setIsSaving(false);
      return;
    }

    try {
      // Simulate API call for password change
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      
      // Reset form
      currentPassword.handleChange("");
      newPassword.handleChange("");
      confirmPassword.handleChange("");
      setIsChangingPassword(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    currentPassword.handleChange("");
    newPassword.handleChange("");
    confirmPassword.handleChange("");
    setIsChangingPassword(false);
  };

  return (
    <div className="space-y-6">
      {/* Password Change Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Password
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your account password
            </p>
          </div>
          {!isChangingPassword && (
            <Button variant="outline" onClick={() => setIsChangingPassword(true)}>
              Change Password
            </Button>
          )}
        </CardHeader>
        
        {isChangingPassword && (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword.value}
                  onChange={(e) => currentPassword.handleChange(e.target.value)}
                  onBlur={currentPassword.handleBlur}
                  className={currentPassword.error ? "border-red-500" : ""}
                  placeholder="Enter your current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {currentPassword.error && (
                <p className="text-sm text-red-500">{currentPassword.error}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword.value}
                  onChange={(e) => newPassword.handleChange(e.target.value)}
                  onBlur={newPassword.handleBlur}
                  className={newPassword.error ? "border-red-500" : ""}
                  placeholder="Enter your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {newPassword.error && (
                <p className="text-sm text-red-500">{newPassword.error}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Password must be at least 8 characters with uppercase, lowercase, number, and special character.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword.value}
                  onChange={(e) => confirmPassword.handleChange(e.target.value)}
                  onBlur={confirmPassword.handleBlur}
                  className={confirmPassword.error ? "border-red-500" : ""}
                  placeholder="Confirm your new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {confirmPassword.error && (
                <p className="text-sm text-red-500">{confirmPassword.error}</p>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handlePasswordChange} 
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Updating..." : "Update Password"}
              </Button>
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Security Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Security Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Last Login</Label>
              <p className="text-sm text-muted-foreground">Today at 2:30 PM</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Account Created</Label>
              <p className="text-sm text-muted-foreground">January 15, 2024</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Password Last Changed</Label>
              <p className="text-sm text-muted-foreground">30 days ago</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Not enabled</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
