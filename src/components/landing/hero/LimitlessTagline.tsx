
import React from 'react';

export const LimitlessTagline = () => {
  return (
    <div className="limitless-tagline opacity-0 animate-fade-in-delayed">
      <p className="text-2xl lg:text-3xl font-semibold">
        <span className="bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] bg-clip-text text-transparent relative limitless-tagline-text">
          Develop Beyond Limits
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] animate-line-grow"></span>
        </span>
      </p>
    </div>
  );
};
