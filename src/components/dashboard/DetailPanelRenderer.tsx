
import React from 'react';
import { DetailPanel } from "./DetailPanel";
import { AgentCommunicationInterface } from "@/components/teams/AgentCommunicationInterface";
import { ViewMode, Agent, Task, Message } from "@/types";
import { AgentProfile } from "@/types/teams";

interface DetailPanelRendererProps {
  selectedAgent: Agent | null;
  selectedTask: Task | null;
  selectedMessage: Message | null;
  selectedAgentProfile: AgentProfile | null;
  viewMode: ViewMode;
  agents: Agent[];
  onDismiss: () => void;
}

export const DetailPanelRenderer = ({
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedAgentProfile,
  viewMode,
  agents,
  onDismiss,
}: DetailPanelRendererProps) => {
  if (selectedAgentProfile) {
    return (
      <AgentCommunicationInterface
        agent={selectedAgentProfile}
        onClose={onDismiss}
      />
    );
  }
  
  const hasSelection = selectedAgent || selectedTask || selectedMessage;
  if (hasSelection) {
    return (
      <DetailPanel 
        selectedAgent={selectedAgent}
        selectedTask={selectedTask}
        selectedMessage={selectedMessage}
        viewMode={viewMode}
        agents={agents}
        onDismiss={onDismiss}
      />
    );
  }
  
  return null;
};
