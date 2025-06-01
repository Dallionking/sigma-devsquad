
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationShortcut {
  key: string;
  path: string;
  description: string;
  modifiers?: {
    ctrl?: boolean;
    alt?: boolean;
    shift?: boolean;
    meta?: boolean;
  };
}

interface UseNavigationShortcutsOptions {
  enabled?: boolean;
  shortcuts?: NavigationShortcut[];
  onShortcutUsed?: (shortcut: NavigationShortcut) => void;
}

const defaultShortcuts: NavigationShortcut[] = [
  {
    key: 'h',
    path: '/dashboard',
    description: 'Go to Dashboard',
    modifiers: { ctrl: true }
  },
  {
    key: 't',
    path: '/teams',
    description: 'Go to Teams',
    modifiers: { ctrl: true }
  },
  {
    key: 'p',
    path: '/planning-agent',
    description: 'Go to Planning Agent',
    modifiers: { ctrl: true }
  },
  {
    key: 'a',
    path: '/agent-configuration',
    description: 'Go to Agent Configuration',
    modifiers: { ctrl: true }
  },
  {
    key: 'm',
    path: '/mcp-management',
    description: 'Go to MCP Management',
    modifiers: { ctrl: true }
  },
  {
    key: 'l',
    path: '/llm-integration',
    description: 'Go to LLM Integration',
    modifiers: { ctrl: true }
  },
  {
    key: 'i',
    path: '/ide-integration',
    description: 'Go to IDE Integration',
    modifiers: { ctrl: true }
  },
  {
    key: ',',
    path: '/settings',
    description: 'Go to Settings',
    modifiers: { ctrl: true }
  }
];

export const useNavigationShortcuts = ({
  enabled = true,
  shortcuts = defaultShortcuts,
  onShortcutUsed
}: UseNavigationShortcutsOptions = {}) => {
  const navigate = useNavigate();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled) return;

    const shortcut = shortcuts.find(s => {
      const keyMatches = s.key.toLowerCase() === event.key.toLowerCase();
      const ctrlMatches = !!s.modifiers?.ctrl === (event.ctrlKey || event.metaKey);
      const altMatches = !!s.modifiers?.alt === event.altKey;
      const shiftMatches = !!s.modifiers?.shift === event.shiftKey;
      const metaMatches = !!s.modifiers?.meta === event.metaKey;

      return keyMatches && ctrlMatches && altMatches && shiftMatches && metaMatches;
    });

    if (shortcut) {
      event.preventDefault();
      navigate(shortcut.path);
      onShortcutUsed?.(shortcut);
    }
  }, [enabled, shortcuts, navigate, onShortcutUsed]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getShortcutText = useCallback((shortcut: NavigationShortcut) => {
    const parts: string[] = [];
    
    if (shortcut.modifiers?.ctrl || shortcut.modifiers?.meta) {
      parts.push(navigator.platform.includes('Mac') ? '⌘' : 'Ctrl');
    }
    if (shortcut.modifiers?.alt) {
      parts.push(navigator.platform.includes('Mac') ? '⌥' : 'Alt');
    }
    if (shortcut.modifiers?.shift) {
      parts.push('⇧');
    }
    
    parts.push(shortcut.key.toUpperCase());
    
    return parts.join(' + ');
  }, []);

  return {
    shortcuts,
    getShortcutText,
    enabled
  };
};
