
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
  onDismissSelection: () => void;
}

export const DetailPanelRenderer = ({
  selectedAgent,
  selectedTask,
  selectedMessage,
  selectedAgentProfile,
  onDismissSelection,
}: DetailPanelRendererProps) => {
  if (selectedAgentProfile) {
    return (
      <AgentCommunicationInterface
        agent={selectedAgentProfile}
        onClose={onDismissSelection}
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
        viewMode="workflow"
        agents={[]}
        onDismiss={onDismissSelection}
      />
    );
  }
  
  return null;
};
