
import React, { useState } from 'react';
import { useAccountDeletion } from './account-deletion/useAccountDeletion';
import { DeletionWarning } from './account-deletion/DeletionWarning';
import { DeletionForm } from './account-deletion/DeletionForm';
import { DeletionStatus } from './account-deletion/DeletionStatus';

export const AccountDeletion = () => {
  const {
    deletionRequest,
    loading,
    submitting,
    submitDeletionRequest,
    cancelDeletionRequest
  } = useAccountDeletion();

  const [showForm, setShowForm] = useState(false);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-muted rounded-lg"></div>
      </div>
    );
  }

  // Show status if there's an active deletion request
  if (deletionRequest && deletionRequest.status !== 'cancelled') {
    return (
      <DeletionStatus
        request={deletionRequest}
        onCancel={cancelDeletionRequest}
      />
    );
  }

  // Show form if user has proceeded past warning
  if (showForm) {
    return (
      <DeletionForm
        onSubmit={submitDeletionRequest}
        onCancel={() => setShowForm(false)}
        loading={submitting}
      />
    );
  }

  // Show warning by default
  return (
    <DeletionWarning
      onProceed={() => setShowForm(true)}
      onCancel={() => {}}
    />
  );
};
