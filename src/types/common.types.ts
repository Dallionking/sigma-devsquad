
/**
 * Common Type Definitions
 * Centralized type definitions used across the application
 */

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: 'success' | 'error' | 'loading';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ConfirmationDialog {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
  onCancel: () => void;
}

export interface NotificationSettings {
  agentStatus: boolean;
  taskCompletion: boolean;
  systemError: boolean;
  planningAgent: boolean;
  directMessaging: boolean;
}

export interface ConnectionInfo {
  isConnected: boolean;
  connectionType?: 'oauth' | 'webhook' | 'token';
  lastConnected?: Date;
  userName: string;
  serverName: string;
  channelName: string;
  permissions: string[];
  expiresAt?: Date;
}

export interface WebhookConfig {
  url: string;
  isEnabled: boolean;
  retryAttempts: number;
  timeout: number;
  useAuth: boolean;
  authToken?: string;
}

export interface ChannelConfig {
  id: string;
  name: string;
  type: 'dm' | 'group' | 'channel';
}

export interface MessageTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type StatusVariant = 'default' | 'success' | 'warning' | 'error';

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends BaseEntity {
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: string;
}

export interface Team extends BaseEntity {
  name: string;
  description?: string;
  type: string;
  memberCount: number;
}

export interface ConfigurationStatus {
  status: 'complete' | 'partial' | 'missing';
  details: string[];
  completionPercentage: number;
}
