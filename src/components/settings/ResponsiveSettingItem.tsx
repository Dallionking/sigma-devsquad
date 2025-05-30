
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BaseResponsiveSettingItemProps {
  label: string;
  description?: string;
  id: string;
  className?: string;
}

interface SwitchResponsiveSettingItemProps extends BaseResponsiveSettingItemProps {
  type: "switch";
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

interface InputResponsiveSettingItemProps extends BaseResponsiveSettingItemProps {
  type: "input";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputType?: "text" | "number" | "email" | "password";
}

interface TextareaResponsiveSettingItemProps extends BaseResponsiveSettingItemProps {
  type: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectResponsiveSettingItemProps extends BaseResponsiveSettingItemProps {
  type: "select";
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

interface ButtonResponsiveSettingItemProps extends BaseResponsiveSettingItemProps {
  type: "button";
  buttonText: string;
  onClick: () => void;
  variant?: "default" | "outline" | "secondary";
}

type ResponsiveSettingItemProps = 
  | SwitchResponsiveSettingItemProps 
  | InputResponsiveSettingItemProps 
  | TextareaResponsiveSettingItemProps 
  | SelectResponsiveSettingItemProps
  | ButtonResponsiveSettingItemProps;

export const ResponsiveSettingItem = (props: ResponsiveSettingItemProps) => {
  const { label, description, id, className } = props;
  const isMobile = useIsMobile();

  const renderControl = () => {
    switch (props.type) {
      case "switch":
        return (
          <Switch 
            id={id}
            checked={props.checked} 
            onCheckedChange={props.onCheckedChange}
            className="touch-target"
          />
        );
      
      case "input":
        return (
          <Input
            id={id}
            type={props.inputType || "text"}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className={cn(
              "bg-background border-border touch-target",
              isMobile ? "w-full" : "w-48"
            )}
          />
        );
      
      case "textarea":
        return (
          <Textarea
            id={id}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            rows={props.rows || 3}
            className="w-full bg-background border-border touch-target"
          />
        );
      
      case "select":
        return (
          <Select value={props.value} onValueChange={props.onValueChange}>
            <SelectTrigger 
              id={id} 
              className={cn(
                "bg-background border-border touch-target",
                isMobile ? "w-full" : "w-48"
              )}
            >
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {props.options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="touch-target"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "button":
        return (
          <Button
            onClick={props.onClick}
            variant={props.variant || "outline"}
            className={cn(
              "touch-target",
              isMobile && "w-full justify-between"
            )}
          >
            {props.buttonText}
            {isMobile && <ChevronRight className="w-4 h-4" />}
          </Button>
        );
    }
  };

  if (isMobile) {
    return (
      <div className={cn("space-y-3 py-4 border-b border-border last:border-b-0", className)}>
        <div className="space-y-2">
          <Label htmlFor={id} className="font-medium text-base text-card-foreground">
            {label}
          </Label>
          {description && (
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
        <div>
          {renderControl()}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-between py-4", className)}>
      <div className="space-y-1 flex-1">
        <Label htmlFor={id} className="font-medium text-card-foreground">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0 ml-4">
        {renderControl()}
      </div>
    </div>
  );
};
