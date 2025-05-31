
export interface WebhookConfig {
  url: string;
  isEnabled: boolean;
  retryAttempts: number;
  timeout: number;
  useAuth: boolean;
  authToken: string;
}

export interface ChannelConfig {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'dm';
}

export interface MessageTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
}
