
import React from 'react';
import { SlidePresentation } from '@/components/presentations/SlidePresentation';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

const PitchDeck = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-black">
        <SlidePresentation />
      </div>
    </ErrorBoundary>
  );
};

export default PitchDeck;
