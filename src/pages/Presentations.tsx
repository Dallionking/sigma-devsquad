
import React from 'react';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { PresentationsLayout } from '@/components/presentations/PresentationsLayout';

const Presentations = () => {
  return (
    <ErrorBoundary>
      <PresentationsLayout />
    </ErrorBoundary>
  );
};

export default Presentations;
