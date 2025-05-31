
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
    const handleKeyDown = (event: KeyboardEvent) => {
      // Esc to close panel
      if (event.key === 'Escape' && isVisible) {
        event.preventDefault();
        onDismiss();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onDismiss]);
};
