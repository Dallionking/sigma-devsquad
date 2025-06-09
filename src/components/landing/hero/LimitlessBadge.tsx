
import React from 'react';

export const LimitlessBadge = () => {
  return (
    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#6C5CE7]/15 to-[#00B8D9]/15 rounded-full border-2 border-[#6C5CE7]/30 backdrop-blur-sm limitless-badge animate-pulse-glow shadow-lg">
      <div className="w-5 h-5 mr-3 bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] rounded-full pill-icon animate-limitless-pulse relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] rounded-full animate-ping opacity-30"></div>
      </div>
      <span className="text-base font-semibold bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] bg-clip-text text-transparent">
        ✨ Unlock Your Development Potential
      </span>
    </div>
  );
};
