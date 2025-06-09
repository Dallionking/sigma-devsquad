
import React from 'react';

export const LimitlessTagline = () => {
  return (
    <div className="limitless-tagline opacity-0 animate-fade-in-delayed text-center">
      <p className="text-3xl lg:text-4xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] bg-clip-text text-transparent relative limitless-tagline-text inline-block">
          🚀 Develop Beyond Limits
          <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] animate-line-grow rounded-full"></span>
        </span>
      </p>
      <p className="text-sm text-muted-foreground mt-2 opacity-80">
        Experience the power of unlimited development potential
      </p>
    </div>
  );
};
