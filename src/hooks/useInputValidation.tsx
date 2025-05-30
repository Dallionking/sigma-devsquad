
import { useState, useCallback, useRef, useEffect } from 'react';

interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface UseInputValidationOptions {
  rules: ValidationRules;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export const useInputValidation = (
  initialValue: string,
  options: UseInputValidationOptions
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const debounceTimeoutRef = useRef<NodeJS.Timeout>();

  const validate = useCallback((val: string) => {
    const { rules } = options;

    if (rules.required && !val.trim()) {
      return "This field is required";
    }

    if (rules.minLength && val.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters required`;
    }

    if (rules.maxLength && val.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} characters allowed`;
    }

    if (rules.pattern && !rules.pattern.test(val)) {
      return "Invalid format";
    }

    if (rules.custom) {
      return rules.custom(val);
    }

    return null;
  }, [options]);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    
    if (options.validateOnChange) {
      setIsValidating(true);
      
      // Clear existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      
      // Set new timeout with debounce
      debounceTimeoutRef.current = setTimeout(() => {
        setError(validate(newValue));
        setIsValidating(false);
      }, options.debounceMs || 300);
    }
  }, [validate, options.validateOnChange, options.debounceMs]);

  const handleBlur = useCallback(() => {
    if (options.validateOnBlur) {
      setError(validate(value));
    }
  }, [validate, value, options.validateOnBlur]);

  const forceValidate = useCallback(() => {
    const validationError = validate(value);
    setError(validationError);
    return !validationError;
  }, [validate, value]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    value,
    error,
    isValidating,
    handleChange,
    handleBlur,
    validate: (val: string) => validate(val),
    forceValidate
  };
};
