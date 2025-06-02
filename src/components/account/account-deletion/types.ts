
export interface AccountDeletionRequest {
  id: string;
  status: string;
  scheduled_deletion_date: string;
  reason?: string;
  feedback?: string;
  created_at: string;
}

export interface DeletionWarningProps {
  onProceed: () => void;
  onCancel: () => void;
}

export interface DeletionFormProps {
  onSubmit: (reason: string, feedback: string) => void;
  onCancel: () => void;
  loading?: boolean;
}

export interface DeletionStatusProps {
  request: AccountDeletionRequest;
  onCancel: () => void;
}
