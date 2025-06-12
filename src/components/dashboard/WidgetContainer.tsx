// Phase 11: Widget Container Component
// Flexible container for dashboard widgets with controls and interactions

"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MoreVertical,
  Maximize2,
  Minimize2,
  X,
  RefreshCw,
  Download,
  Settings,
  Eye,
  EyeOff,
  GripVertical,
  Filter,
  Calendar,
  Share,
  Copy,
  Edit3,
  Trash2
} from 'lucide-react';

interface WidgetContainerProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  isResizable?: boolean;
  isDraggable?: boolean;
  isLoading?: boolean;
  error?: string | null;
  lastUpdated?: Date | string;
  onRemove?: (id: string) => void;
  onMaximize?: (id: string) => void;
  onRefresh?: (id: string) => void;
  onEdit?: (id: string) => void;
  onExport?: (id: string) => void;
  onShare?: (id: string) => void;
  isMaximized?: boolean;
  isVisible?: boolean;
  refreshInterval?: number;
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'destructive';
  }>;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({
  id,
  title,
  children,
  className = '',
  isResizable = true,
  isDraggable = true,
  isLoading = false,
  error = null,
  lastUpdated,
  onRemove,
  onMaximize,
  onRefresh,
  onEdit,
  onExport,
  onShare,
  isMaximized = false,
  isVisible = true,
  refreshInterval,
  actions = []
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [internalVisible, setInternalVisible] = useState(isVisible);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout>();

  // Handle auto-refresh
  useEffect(() => {
    if (autoRefresh && refreshInterval && onRefresh) {
      refreshTimerRef.current = setInterval(() => {
        onRefresh(id);
      }, refreshInterval * 1000);
    }

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [autoRefresh, refreshInterval, onRefresh, id]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatLastUpdated = (timestamp: Date | string) => {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const handleRemove = () => {
    setInternalVisible(false);
    setTimeout(() => {
      onRemove?.(id);
    }, 200);
  };

  const defaultActions = [
    onEdit && {
      label: 'Edit Widget',
      icon: <Edit3 size={16} />,
      onClick: () => onEdit(id)
    },
    onShare && {
      label: 'Share',
      icon: <Share size={16} />,
      onClick: () => onShare(id)
    },
    onExport && {
      label: 'Export Data',
      icon: <Download size={16} />,
      onClick: () => onExport(id)
    },
    {
      label: autoRefresh ? 'Disable Auto-refresh' : 'Enable Auto-refresh',
      icon: <RefreshCw size={16} />,
      onClick: () => setAutoRefresh(!autoRefresh)
    },
    onRemove && {
      label: 'Remove Widget',
      icon: <Trash2 size={16} />,
      onClick: handleRemove,
      variant: 'destructive' as const
    }
  ].filter(Boolean) as NonNullable<WidgetContainerProps['actions']>;

  const allActions = [...actions, ...defaultActions];

  return (
    <AnimatePresence>
      {internalVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className={`
            relative bg-card border border-border rounded-xl overflow-hidden shadow-sm
            hover:shadow-md transition-shadow duration-200
            ${isMaximized ? 'fixed inset-4 z-50 shadow-2xl' : ''}
            ${className}
          `}
        >
          {/* Widget Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {isDraggable && (
                <div className="cursor-move opacity-50 hover:opacity-100 transition-opacity">
                  <GripVertical size={16} />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{title}</h3>
                {lastUpdated && (
                  <p className="text-xs text-muted-foreground">
                    Updated {formatLastUpdated(lastUpdated)}
                  </p>
                )}
              </div>
              
              {isLoading && (
                <RefreshCw className="animate-spin text-muted-foreground" size={16} />
              )}
              
              {autoRefresh && !isLoading && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 dark:bg-green-950/20 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Auto
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-1 ml-2">
              {onRefresh && (
                <button
                  onClick={() => onRefresh(id)}
                  disabled={isLoading}
                  className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
                </button>
              )}
              
              {onMaximize && (
                <button
                  onClick={() => onMaximize(id)}
                  className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  title={isMaximized ? 'Minimize' : 'Maximize'}
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              )}
              
              {/* Menu Button */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1.5 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  title="More options"
                >
                  <MoreVertical size={16} />
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-50"
                    >
                      <div className="p-1">
                        {allActions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              action.onClick();
                              setIsMenuOpen(false);
                            }}
                            className={`
                              w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-left
                              transition-colors
                              ${action.variant === 'destructive'
                                ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20'
                                : 'text-foreground hover:bg-muted'
                              }
                            `}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Widget Content */}
          <div className="relative">
            {error ? (
              <div className="p-6 text-center">
                <div className="text-red-500 mb-2">⚠️ Error Loading Widget</div>
                <p className="text-sm text-muted-foreground mb-4">{error}</p>
                {onRefresh && (
                  <button
                    onClick={() => onRefresh(id)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Try Again
                  </button>
                )}
              </div>
            ) : (
              <div className="p-4">
                {children}
              </div>
            )}
            
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <RefreshCw className="animate-spin" size={20} />
                  <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WidgetContainer;
