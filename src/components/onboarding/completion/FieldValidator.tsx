
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FieldValidatorProps {
  label: string;
  isRequired: boolean;
  isValid: boolean;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FieldValidator = ({
  label,
  isRequired,
  isValid,
  helpText,
  children,
  className
}: FieldValidatorProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 text-sm font-medium">
          <span>{label}</span>
          {isRequired && (
            <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
              Required
            </Badge>
          )}
          {!isRequired && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
              Optional
            </Badge>
          )}
        </label>
        
        <div className="flex items-center space-x-1">
          {isValid ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : isRequired ? (
            <AlertCircle className="w-4 h-4 text-orange-500" />
          ) : (
            <Circle className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {children}
      
      {helpText && (
        <p className="text-xs text-muted-foreground flex items-start space-x-1">
          <Circle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{helpText}</span>
        </p>
      )}
    </div>
  );
};
