
import React from 'react';

export const LimitlessBadge = () => {
  return (
    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#6C5CE7]/10 to-[#00B8D9]/10 rounded-full border border-[#6C5CE7]/20 mb-6 backdrop-blur-sm limitless-badge animate-pulse-glow">
      <div className="w-4 h-4 mr-2 bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] rounded-full pill-icon animate-pulse"></div>
      <span className="text-sm font-medium bg-gradient-to-r from-[#6C5CE7] to-[#00B8D9] bg-clip-text text-transparent">
        Unlock Your Development Potential
      </span>
    </div>
  );
};
