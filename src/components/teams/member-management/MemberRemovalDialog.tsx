
import React, { useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Users, UserMinus } from 'lucide-react';

interface MemberRemovalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName?: string;
  memberCount?: number;
  onConfirm: () => void;
  isBulkRemoval?: boolean;
}

export const MemberRemovalDialog = ({
  open,
  onOpenChange,
  memberName,
  memberCount = 1,
  onConfirm,
  isBulkRemoval = false
}: MemberRemovalDialogProps) => {
  const [confirmationChecks, setConfirmationChecks] = useState({
    removeAccess: false,
    transferTasks: false,
    notify: false
  });

  const allChecked = Object.values(confirmationChecks).every(Boolean);

  const handleConfirm = () => {
    if (allChecked) {
      onConfirm();
      // Reset checks
      setConfirmationChecks({
        removeAccess: false,
        transferTasks: false,
        notify: false
      });
    }
  };

  const handleCheckChange = (key: keyof typeof confirmationChecks) => (checked: boolean) => {
    setConfirmationChecks(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const displayText = isBulkRemoval 
    ? `${memberCount} member${memberCount > 1 ? 's' : ''}`
    : memberName || 'this member';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            {isBulkRemoval ? (
              <>
                <Users className="w-4 h-4" />
                Remove Multiple Members
              </>
            ) : (
              <>
                <UserMinus className="w-4 h-4" />
                Remove Team Member
              </>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              You are about to remove <strong>{displayText}</strong> from the team. 
              This action cannot be undone.
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
                Before proceeding, please confirm:
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="removeAccess"
                    checked={confirmationChecks.removeAccess}
                    onCheckedChange={handleCheckChange('removeAccess')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="removeAccess" className="text-sm text-amber-900 dark:text-amber-100">
                      Remove access to all team resources and projects
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="transferTasks"
                    checked={confirmationChecks.transferTasks}
                    onCheckedChange={handleCheckChange('transferTasks')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="transferTasks" className="text-sm text-amber-900 dark:text-amber-100">
                      Reassign or transfer any assigned tasks to other team members
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="notify"
                    checked={confirmationChecks.notify}
                    onCheckedChange={handleCheckChange('notify')}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="notify" className="text-sm text-amber-900 dark:text-amber-100">
                      {isBulkRemoval 
                        ? 'Notify the removed members about their removal'
                        : `Notify ${memberName || 'the member'} about their removal`
                      }
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!allChecked}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isBulkRemoval ? `Remove ${memberCount} Member${memberCount > 1 ? 's' : ''}` : 'Remove Member'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
