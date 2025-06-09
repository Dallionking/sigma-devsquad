
import React from 'react';

export const ProgressSidebarFooter = () => {
  return (
    <div className="p-4 border-t border-border/50 bg-muted/30">
      <div className="text-xs text-muted-foreground space-y-1">
        <p>🗺️ <strong>Roadmap Navigation:</strong></p>
        <p>• Click any available step to jump to it</p>
        <p>• Progress is automatically saved</p>
        <p>• Time estimates help plan your session</p>
        <p>• Complete all required fields to progress</p>
      </div>
    </div>
  );
};
