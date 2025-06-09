
/**
 * Input Validation Utilities
 * Provides comprehensive input validation and sanitization
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitized?: string;
}

export class InputValidator {
  static validateEmail(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: string[] = [];
    
    if (!email || email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    } else if (email.length > 254) {
      errors.push('Email too long');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized: email.trim().toLowerCase()
    };
  }

  static validateWebhookUrl(url: string): ValidationResult {
    const errors: string[] = [];
    
    if (!url || url.trim().length === 0) {
      errors.push('Webhook URL is required');
    } else {
      try {
        const urlObj = new URL(url);
        if (!['https:', 'http:'].includes(urlObj.protocol)) {
          errors.push('Webhook URL must use HTTP or HTTPS protocol');
        }
        if (urlObj.hostname === 'localhost' && window.location.hostname !== 'localhost') {
          errors.push('Localhost URLs not allowed in production');
        }
      } catch {
        errors.push('Invalid URL format');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized: url.trim()
    };
  }

  static validateApiKey(apiKey: string, minLength: number = 32): ValidationResult {
    const errors: string[] = [];
    
    if (!apiKey || apiKey.trim().length === 0) {
      errors.push('API key is required');
    } else if (apiKey.length < minLength) {
      errors.push(`API key must be at least ${minLength} characters`);
    } else if (!/^[a-zA-Z0-9_-]+$/.test(apiKey)) {
      errors.push('API key contains invalid characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized: apiKey.trim()
    };
  }

  static validateChannelId(channelId: string): ValidationResult {
    const errors: string[] = [];
    
    if (!channelId || channelId.trim().length === 0) {
      errors.push('Channel ID is required');
    } else if (!/^\d+$/.test(channelId) && !channelId.startsWith('@')) {
      errors.push('Invalid channel ID format');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitized: channelId.trim()
    };
  }

  static sanitizeMessage(message: string): string {
    return message
      .replace(/[<>]/g, '') // Remove potential XSS vectors
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .trim()
      .substring(0, 2000); // Limit message length
  }
}
