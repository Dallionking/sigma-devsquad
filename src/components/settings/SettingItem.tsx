
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BaseSettingItemProps {
  label: string;
  description?: string;
  id: string;
}

interface SwitchSettingItemProps extends BaseSettingItemProps {
  type: "switch";
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

interface InputSettingItemProps extends BaseSettingItemProps {
  type: "input";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputType?: "text" | "number" | "email" | "password";
}

interface TextareaSettingItemProps extends BaseSettingItemProps {
  type: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

interface SelectSettingItemProps extends BaseSettingItemProps {
  type: "select";
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

type SettingItemProps = SwitchSettingItemProps | InputSettingItemProps | TextareaSettingItemProps | SelectSettingItemProps;

export const SettingItem = (props: SettingItemProps) => {
  const { label, description, id } = props;

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
          <Input
            id={id}
            type={props.inputType || "text"}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            className="w-48 bg-background border-border"
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
            className="w-full bg-background border-border"
          />
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
    <div className="flex items-center justify-between space-y-2">
      <div className="space-y-1">
        <Label htmlFor={id} className="font-medium text-card-foreground">
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex-shrink-0">
        {renderControl()}
      </div>
    </div>
  );
};
