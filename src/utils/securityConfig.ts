
/**
 * Security Configuration Manager
 * Handles secure configuration management and validation
 */

export interface SecurityConfig {
  apiEndpoints: {
    allowedDomains: string[];
    rateLimiting: {
      enabled: boolean;
      maxRequests: number;
      windowMs: number;
    };
  };
  webhooks: {
    validateSignatures: boolean;
    allowedSources: string[];
    maxPayloadSize: number;
  };
  encryption: {
    algorithm: string;
    keyLength: number;
  };
}

const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  apiEndpoints: {
    allowedDomains: [
      'api.openai.com',
      'api.anthropic.com',
      'discord.com',
      'api.telegram.org'
    ],
    rateLimiting: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60000
    }
  },
  webhooks: {
    validateSignatures: true,
    allowedSources: ['discord.com', 'telegram.org'],
    maxPayloadSize: 1024 * 1024 // 1MB
  },
  encryption: {
    algorithm: 'AES-256-GCM',
    keyLength: 32
  }
};

export class SecurityConfigManager {
  private config: SecurityConfig;

  constructor(config?: Partial<SecurityConfig>) {
    this.config = { ...DEFAULT_SECURITY_CONFIG, ...config };
  }

  validateWebhookSource(source: string): boolean {
    return this.config.webhooks.allowedSources.some(allowed => 
      source.includes(allowed)
    );
  }

  validateApiEndpoint(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return this.config.apiEndpoints.allowedDomains.includes(urlObj.hostname);
    } catch {
      return false;
    }
  }

  sanitizeInput(input: string): string {
    // Basic input sanitization
    return input
      .replace(/[<>]/g, '') // Remove potential XSS vectors
      .trim()
      .substring(0, 1000); // Limit length
  }

  validatePayloadSize(payload: string): boolean {
    return new Blob([payload]).size <= this.config.webhooks.maxPayloadSize;
  }

  getConfig(): SecurityConfig {
    return { ...this.config };
  }
}

export const securityConfig = new SecurityConfigManager();
