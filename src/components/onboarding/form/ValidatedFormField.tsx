
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface ValidatedFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label: string;
  description?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
  isRequired?: boolean;
  helpText?: string;
  className?: string;
}

export function ValidatedFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  placeholder,
  type = 'text',
  options = [],
  isRequired = false,
  helpText,
  className
}: ValidatedFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const hasValue = field.value && (typeof field.value === 'string' ? field.value.trim() : true);
        const isValid = !fieldState.error && hasValue;
        const hasError = !!fieldState.error;

        return (
          <FormItem className={cn("space-y-2", className)}>
            <div className="flex items-center justify-between">
              <FormLabel className="flex items-center space-x-2">
                <span>{label}</span>
                {isRequired && (
                  <Badge 
                    variant={hasError ? "destructive" : hasValue ? "default" : "secondary"} 
                    className="text-xs px-1.5 py-0.5"
                  >
                    Required
                  </Badge>
                )}
                {!isRequired && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    Optional
                  </Badge>
                )}
              </FormLabel>
              
              <div className="flex items-center space-x-1">
                {isValid ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : hasError ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : (
                  <div className="w-4 h-4" /> // Placeholder for spacing
                )}
              </div>
            </div>

            <FormControl>
              <div className={cn(
                "relative",
                hasError && "ring-2 ring-red-500/20 rounded-md",
                isValid && "ring-2 ring-green-500/20 rounded-md"
              )}>
                {type === 'textarea' ? (
                  <Textarea
                    placeholder={placeholder}
                    className={cn(
                      hasError && "border-red-500 focus:border-red-500",
                      isValid && "border-green-500"
                    )}
                    {...field}
                  />
                ) : type === 'select' ? (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={cn(
                      hasError && "border-red-500 focus:border-red-500",
                      isValid && "border-green-500"
                    )}>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    type={type}
                    placeholder={placeholder}
                    className={cn(
                      hasError && "border-red-500 focus:border-red-500",
                      isValid && "border-green-500"
                    )}
                    {...field}
                  />
                )}
              </div>
            </FormControl>

            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}

            {helpText && !fieldState.error && (
              <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                <Info className="w-3 h-3" />
                <span>{helpText}</span>
              </p>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
