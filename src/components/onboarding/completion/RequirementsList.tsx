
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info, Circle } from 'lucide-react';
import { CompletionIndicator } from './CompletionIndicator';
import { cn } from '@/lib/utils';

interface Requirement {
  id: string;
  label: string;
  description: string;
  isRequired: boolean;
  isCompleted: boolean;
  isMissing: boolean;
  helpText?: string;
}

interface RequirementsListProps {
  requirements: Requirement[];
  className?: string;
}

export const RequirementsList = ({ requirements, className }: RequirementsListProps) => {
  const requiredRequirements = requirements.filter(req => req.isRequired);
  const optionalRequirements = requirements.filter(req => !req.isRequired);
  
  const RequirementItem = ({ requirement }: { requirement: Requirement }) => (
    <div className={cn(
      "flex items-start space-x-3 p-3 rounded-lg border transition-colors",
      requirement.isCompleted && "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
      requirement.isMissing && "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
      !requirement.isCompleted && !requirement.isMissing && "bg-muted/30"
    )}>
      <CompletionIndicator
        isRequired={requirement.isRequired}
        isCompleted={requirement.isCompleted}
        showLabel={false}
        size="sm"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className={cn(
            "font-medium text-sm",
            requirement.isCompleted && "text-green-700 dark:text-green-400",
            requirement.isMissing && "text-orange-700 dark:text-orange-400"
          )}>
            {requirement.label}
          </h4>
          <CompletionIndicator
            isRequired={requirement.isRequired}
            isCompleted={requirement.isCompleted}
            showLabel={true}
            size="sm"
          />
        </div>
        
        <p className="text-xs text-muted-foreground mb-1">
          {requirement.description}
        </p>
        
        {requirement.helpText && (
          <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center space-x-1">
            <Info className="w-3 h-3" />
            <span>{requirement.helpText}</span>
          </p>
        )}
      </div>
    </div>
  );

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>Step Requirements</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {requiredRequirements.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-3 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span>Required Fields</span>
              <Badge variant="destructive" className="text-xs">
                {requiredRequirements.filter(req => req.isCompleted).length}/{requiredRequirements.length}
              </Badge>
            </h4>
            <div className="space-y-2">
              {requiredRequirements.map((requirement) => (
                <RequirementItem key={requirement.id} requirement={requirement} />
              ))}
            </div>
          </div>
        )}

        {optionalRequirements.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-3 flex items-center space-x-2">
              <Circle className="w-4 h-4 text-muted-foreground" />
              <span>Optional Fields</span>
              <Badge variant="secondary" className="text-xs">
                {optionalRequirements.filter(req => req.isCompleted).length}/{optionalRequirements.length}
              </Badge>
            </h4>
            <div className="space-y-2">
              {optionalRequirements.map((requirement) => (
                <RequirementItem key={requirement.id} requirement={requirement} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
