
import React from 'react';
import { MessageCircle, Plus, Users, Headphones } from 'lucide-react';
import { EmptyStateCard } from './EmptyStateCard';
import { useNavigate } from 'react-router-dom';

interface MessagesEmptyStateProps {
  onStartChat?: () => void;
}

export const MessagesEmptyState = ({ onStartChat }: MessagesEmptyStateProps) => {
  const navigate = useNavigate();

  const handleViewCommunication = () => {
    navigate('/dashboard?view=communication');
  };

  const handleSetupIntegrations = () => {
    navigate('/settings?tab=notifications');
  };

  const tips = [
    "Communicate directly with your AI agents",
    "Create group conversations for team coordination",
    "Set up notifications for important updates",
    "Use @mentions to get specific agent attention"
  ];

  return (
    <EmptyStateCard
      icon={MessageCircle}
      title="Start Communicating"
      description="Begin conversations with your AI agents and teams. Real-time communication helps coordinate work, provide feedback, and stay updated on progress."
      illustration="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center"
      tips={tips}
      action={onStartChat ? {
        label: "Start Chat",
        onClick: onStartChat
      } : undefined}
      secondaryAction={{
        label: "Communication Hub",
        onClick: handleViewCommunication
      }}
      tertiaryAction={{
        label: "Setup Notifications",
        onClick: handleSetupIntegrations
      }}
    />
  );
};
