
import React from 'react';
import { AgentCreationButton } from "@/components/agent-creation/AgentCreationButton";

export const FloatingActionButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="transition-transform hover:scale-105 duration-200">
        <AgentCreationButton />
      </div>
    </div>
  );
};
