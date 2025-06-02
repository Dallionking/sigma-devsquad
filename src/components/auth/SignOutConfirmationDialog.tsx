
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertTriangle, LogOut } from "lucide-react";

interface SignOutConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const SignOutConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false
}: SignOutConfirmationDialogProps) => {
  const [rememberChoice, setRememberChoice] = useState(false);

  const handleStaySignedIn = () => {
    if (rememberChoice) {
      // Store preference in localStorage for future sessions
      localStorage.setItem('skipSignOutConfirmation', 'true');
    }
    onOpenChange(false);
  };

  const handleSignOut = () => {
    if (rememberChoice) {
      // Store preference to always show confirmation
      localStorage.setItem('alwaysConfirmSignOut', 'true');
    }
    onConfirm();
  };

  const handleRememberChoiceChange = (checked: boolean | "indeterminate") => {
    setRememberChoice(checked === true);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
              <LogOut className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold">
                Sign Out Confirmation
              </AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogDescription className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to sign out? You'll need to sign in again to access your account and any unsaved work may be lost.
          </p>
          
          {/* Security Warning */}
          <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-900/10">
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-orange-800 dark:text-orange-200">
              <p className="font-medium mb-1">Security Notice:</p>
              <p>
                For your security, we'll invalidate all active sessions across all devices. 
                If you're on a shared computer, this helps protect your account.
              </p>
            </div>
          </div>

          {/* Remember Choice Option */}
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="remember-choice"
              checked={rememberChoice}
              onCheckedChange={handleRememberChoiceChange}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label 
                htmlFor="remember-choice" 
                className="text-sm font-medium cursor-pointer"
              >
                Remember my choice
              </Label>
              <p className="text-xs text-muted-foreground">
                Skip this confirmation in the future (not recommended for shared computers)
              </p>
            </div>
          </div>
        </AlertDialogDescription>

        <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
          <AlertDialogCancel 
            onClick={handleStaySignedIn}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            Stay Signed In
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600 flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            {isLoading ? "Signing out..." : "Sign Out"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
