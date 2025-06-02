
import { useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseViewSwitchingShortcutsProps {
  showTeamView: boolean;
  onToggleView: (showTeamView: boolean) => void;
  enabled?: boolean;
}

export const useViewSwitchingShortcuts = ({
  showTeamView,
  onToggleView,
  enabled = true
}: UseViewSwitchingShortcutsProps) => {
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    // Alt + T for Team View
    if (event.altKey && event.key.toLowerCase() === 't') {
      event.preventDefault();
      if (!showTeamView) {
        onToggleView(true);
        toast({
          title: "Switched to Team View",
          description: "Now viewing collaborative teams and workflows",
          duration: 2000,
        });
      }
    }

    // Alt + I for Individual Agents View
    if (event.altKey && event.key.toLowerCase() === 'i') {
      event.preventDefault();
      if (showTeamView) {
        onToggleView(false);
        toast({
          title: "Switched to Individual Agents",
          description: "Now viewing individual AI agents and tasks",
          duration: 2000,
        });
      }
    }
  }, [enabled, showTeamView, onToggleView]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    shortcuts: [
      {
        key: 'Alt + T',
        description: 'Switch to Team View',
        action: () => onToggleView(true)
      },
      {
        key: 'Alt + I', 
        description: 'Switch to Individual Agents View',
        action: () => onToggleView(false)
      }
    ]
  };
};
