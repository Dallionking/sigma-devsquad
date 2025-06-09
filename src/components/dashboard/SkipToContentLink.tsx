
import React from 'react';

export const SkipToContentLink = () => {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};
