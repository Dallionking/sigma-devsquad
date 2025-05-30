
import { useState, useCallback, useEffect } from "react";

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationOptions {
  rules: ValidationRule;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  debounceMs?: number;
}

export const useInputValidation = (initialValue: string = "", options: ValidationOptions) => {
  const { rules, validateOnChange = true, validateOnBlur = true, debounceMs = 300 } = options;
  
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [hasBeenTouched, setHasBeenTouched] = useState(false);

  const validate = useCallback((inputValue: string): string | null => {
    if (rules.required && !inputValue.trim()) {
      return "This field is required";
    }

    if (rules.minLength && inputValue.length < rules.minLength) {
      return `Minimum length is ${rules.minLength} characters`;
    }

    if (rules.maxLength && inputValue.length > rules.maxLength) {
      return `Maximum length is ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(inputValue)) {
      return "Invalid format";
    }

    if (rules.custom) {
      return rules.custom(inputValue);
    }

    return null;
  }, [rules]);

  const validateWithDebounce = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (inputValue: string) => {
        setIsValidating(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const validationError = validate(inputValue);
          setError(validationError);
          setIsValidating(false);
        }, debounceMs);
      };
    })(),
    [validate, debounceMs]
  );

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    setHasBeenTouched(true);
    
    if (validateOnChange) {
      validateWithDebounce(newValue);
    }
  }, [validateOnChange, validateWithDebounce]);

  const handleBlur = useCallback(() => {
    setHasBeenTouched(true);
    
    if (validateOnBlur) {
      const validationError = validate(value);
      setError(validationError);
      setIsValidating(false);
    }
  }, [validateOnBlur, validate, value]);

  const forceValidate = useCallback(() => {
    const validationError = validate(value);
    setError(validationError);
    setIsValidating(false);
    return validationError === null;
  }, [validate, value]);

  const reset = useCallback(() => {
    setValue(initialValue);
    setError(null);
    setIsValidating(false);
    setHasBeenTouched(false);
  }, [initialValue]);

  const isValid = error === null && hasBeenTouched;

  return {
    value,
    error,
    isValidating,
    isValid,
    hasBeenTouched,
    handleChange,
    handleBlur,
    forceValidate,
    reset
  };
};
