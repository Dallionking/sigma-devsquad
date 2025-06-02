
import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Circle, Moon, XCircle, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserStatus } from "./PresenceControlsSection";

interface StatusSelectorProps {
  currentStatus: UserStatus;
  onStatusChange: (status: UserStatus) => void;
  disabled?: boolean;
}

export const StatusSelector = ({ currentStatus, onStatusChange, disabled }: StatusSelectorProps) => {
  const statusOptions = [
    {
      value: 'available' as UserStatus,
      label: 'Available',
      description: 'Ready to collaborate and receive notifications',
      icon: Circle,
      color: 'text-green-500'
    },
    {
      value: 'away' as UserStatus,
      label: 'Away',
      description: 'Temporarily unavailable but will see notifications',
      icon: Moon,
      color: 'text-yellow-500'
    },
    {
      value: 'dnd' as UserStatus,
      label: 'Do Not Disturb',
      description: 'Focused work time - only urgent notifications',
      icon: XCircle,
      color: 'text-red-500'
    },
    {
      value: 'invisible' as UserStatus,
      label: 'Invisible',
      description: 'Appear offline to others',
      icon: EyeOff,
      color: 'text-gray-400'
    }
  ];

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Status</Label>
        <p className="text-sm text-muted-foreground">
          Choose how you appear to other team members
        </p>
      </div>
      
      <RadioGroup
        value={currentStatus}
        onValueChange={onStatusChange}
        disabled={disabled}
        className="space-y-3"
      >
        {statusOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = currentStatus === option.value;
          
          return (
            <div key={option.value} className="flex items-start space-x-3">
              <RadioGroupItem 
                value={option.value} 
                id={option.value}
                className="mt-1"
              />
              <Label 
                htmlFor={option.value}
                className={cn(
                  "flex-1 cursor-pointer",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", option.color)} />
                  <div className="space-y-1">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
