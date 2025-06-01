
import { useEffect } from 'react';

interface UsePanelKeyboardShortcutsProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export const usePanelKeyboardShortcuts = ({
  isVisible,
  onDismiss
}: UsePanelKeyboardShortcutsProps) => {
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onDismiss]);
};
