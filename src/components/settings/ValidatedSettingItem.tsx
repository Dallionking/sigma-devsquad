
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HelpTooltip } from "./HelpTooltip";
import { useInputValidation } from "@/hooks/useInputValidation";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

interface BaseValidatedSettingItemProps {
  label: string;
  description?: string;
  helpTitle?: string;
  helpContent?: string;
  helpLinks?: { url: string; label: string }[];
  id: string;
  className?: string;
}

interface SwitchValidatedSettingItemProps extends BaseValidatedSettingItemProps {
  type: "switch";
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

interface InputValidatedSettingItemProps extends BaseValidatedSettingItemProps {
  type: "input";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputType?: "text" | "number" | "email" | "password" | "url";
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

interface TextareaValidatedSettingItemProps extends BaseValidatedSettingItemProps {
  type: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
}

interface SelectValidatedSettingItemProps extends BaseValidatedSettingItemProps {
  type: "select";
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

type ValidatedSettingItemProps = 
  | SwitchValidatedSettingItemProps 
  | InputValidatedSettingItemProps 
  | TextareaValidatedSettingItemProps 
  | SelectValidatedSettingItemProps;

export const ValidatedSettingItem = (props: ValidatedSettingItemProps) => {
  const { label, description, helpTitle, helpContent, helpLinks, id, className } = props;

  // Only use validation for input and textarea types
  const validation = 'validation' in props ? props.validation : undefined;
  
  const {
    value: validatedValue,
    error,
    isValidating,
    handleChange,
    handleBlur
  } = useInputValidation(
    'value' in props ? props.value : "",
    {
      rules: validation || {},
      validateOnChange: true,
      validateOnBlur: true
    }
  );

  const showValidation = (props.type === "input" || props.type === "textarea") && validation;

  const renderControl = () => {
    switch (props.type) {
      case "switch":
        return (
          <Switch 
            id={id}
            checked={props.checked} 
            onCheckedChange={props.onCheckedChange} 
          />
        );
      
      case "input":
        return (
          <div className="relative">
            <Input
              id={id}
              type={props.inputType || "text"}
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
                if (showValidation) handleChange(e.target.value);
              }}
              onBlur={showValidation ? handleBlur : undefined}
              placeholder={props.placeholder}
              className={cn(
                "w-48 bg-background border-border transition-colors",
                error && "border-red-500",
                !error && showValidation && props.value && "border-green-500"
              )}
            />
            {showValidation && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                {isValidating ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                ) : error ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : props.value ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : null}
              </div>
            )}
          </div>
        );
      
      case "textarea":
        return (
          <div className="relative">
            <Textarea
              id={id}
              value={props.value}
              onChange={(e) => {
                props.onChange(e.target.value);
                if (showValidation) handleChange(e.target.value);
              }}
              onBlur={showValidation ? handleBlur : undefined}
              placeholder={props.placeholder}
              rows={props.rows || 3}
              className={cn(
                "w-full bg-background border-border transition-colors",
                error && "border-red-500",
                !error && showValidation && props.value && "border-green-500"
              )}
            />
          </div>
        );
      
      case "select":
        return (
          <Select value={props.value} onValueChange={props.onValueChange}>
            <SelectTrigger id={id} className="w-48 bg-background border-border">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {props.options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1 flex-1">
          <div className="flex items-center gap-2">
            <Label htmlFor={id} className="font-medium text-card-foreground">
              {label}
            </Label>
            {helpTitle && helpContent && (
              <HelpTooltip
                title={helpTitle}
                content={helpContent}
                links={helpLinks}
                trigger="hover"
                position="top"
              />
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {showValidation && error && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </p>
          )}
        </div>
        <div className="flex-shrink-0">
          {renderControl()}
        </div>
      </div>
    </div>
  );
};
