import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  File, 
  Folder, 
  Search, 
  MoreHorizontal, 
  Plus, 
  X, 
  Terminal, 
  Bot, 
  Send, 
  Maximize2, 
  Minimize2,
  FileText,
  Settings,
  Play,
  Square,
  RotateCcw,
  Copy,
  Download,
  Trash2,
  Edit,
  FolderPlus,
  FilePlus,
  Menu,
  Sidebar,
  Code,
  MessageSquare,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from '@/components/ui/context-menu';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  isExpanded?: boolean;
  content?: string;
  language?: string;
}

interface OpenTab {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isDirty: boolean;
}

interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
  type: 'success' | 'error' | 'info';
}

interface AiMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const WebContainerWorkspace = () => {
  // State management
  const [fileTree] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      path: '/src',
      isExpanded: true,
      children: [
        {
          id: '2',
          name: 'components',
          type: 'folder',
          path: '/src/components',
          isExpanded: false,
          children: [
            { id: '3', name: 'App.tsx', type: 'file', path: '/src/components/App.tsx', content: '// App component\nexport default function App() {\n  return <div>Hello World</div>;\n}', language: 'typescript' }
          ]
        },
        { id: '4', name: 'index.tsx', type: 'file', path: '/src/index.tsx', content: '// Entry point\nimport React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./components/App";\n\nReactDOM.render(<App />, document.getElementById("root"));', language: 'typescript' }
      ]
    },
    { id: '5', name: 'package.json', type: 'file', path: '/package.json', content: '{\n  "name": "webcontainer-project",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-dom": "^18.0.0"\n  }\n}', language: 'json' },
    { id: '6', name: 'README.md', type: 'file', path: '/README.md', content: '# WebContainer Project\n\nThis is a sample project running in a WebContainer.\n\n## Getting Started\n\n1. Install dependencies: `npm install`\n2. Start development server: `npm start`\n', language: 'markdown' }
  ]);

  const [openTabs, setOpenTabs] = useState<OpenTab[]>([
    {
      id: '4',
      name: 'index.tsx',
      path: '/src/index.tsx',
      content: '// Entry point\nimport React from "react";\nimport ReactDOM from "react-dom";\nimport App from "./components/App";\n\nReactDOM.render(<App />, document.getElementById("root"));',
      language: 'typescript',
      isDirty: false
    }
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('4');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [aiPanelCollapsed, setAiPanelCollapsed] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [terminalHistory] = useState<TerminalCommand[]>([
    {
      id: '1',
      command: 'npm install',
      output: 'Installing dependencies...\n✓ react@18.2.0\n✓ react-dom@18.2.0\nDone in 2.3s',
      timestamp: new Date(Date.now() - 60000),
      type: 'success'
    },
    {
      id: '2',
      command: 'npm start',
      output: 'Starting development server...\nServer running on http://localhost:3000',
      timestamp: new Date(Date.now() - 30000),
      type: 'info'
    }
  ]);

  const [aiMessages] = useState<AiMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Welcome to the AI-powered workspace! I can help you with coding, debugging, and project management. What would you like to work on?',
      timestamp: new Date(Date.now() - 120000)
    },
    {
      id: '2',
      type: 'user',
      content: 'Can you help me create a new React component?',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: '3',
      type: 'assistant',
      content: 'Absolutely! I can help you create a React component. What kind of component would you like to create? Please provide some details about its functionality.',
      timestamp: new Date(Date.now() - 30000)
    }
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const aiChatRef = useRef<HTMLDivElement>(null);

  // Utility functions
  const getFileIcon = (fileName: string, type: string) => {
    if (type === 'folder') return <Folder className="h-4 w-4 text-blue-500" />;
    
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'tsx':
      case 'ts':
        return <FileText className="h-4 w-4 text-blue-400" />;
      case 'json':
        return <FileText className="h-4 w-4 text-yellow-500" />;
      case 'md':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLanguageFromExtension = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'tsx':
      case 'ts':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      default:
        return 'text';
    }
  };

  const handleFileClick = (node: FileNode) => {
    if (node.type === 'file') {
      const existingTab = openTabs.find(tab => tab.id === node.id);
      if (!existingTab) {
        const newTab: OpenTab = {
          id: node.id,
          name: node.name,
          path: node.path,
          content: node.content || '// Empty file',
          language: node.language || getLanguageFromExtension(node.name),
          isDirty: false
        };
        setOpenTabs(prev => [...prev, newTab]);
      }
      setActiveTabId(node.id);
    }
  };

  const handleTabClose = (tabId: string) => {
    setOpenTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTabId === tabId) {
      const remainingTabs = openTabs.filter(tab => tab.id !== tabId);
      setActiveTabId(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : '');
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      console.log('Terminal command:', terminalInput);
      setTerminalInput('');
    }
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiInput.trim()) {
      setIsAiLoading(true);
      console.log('AI query:', aiInput);
      setAiInput('');
      // Simulate AI response
      setTimeout(() => {
        setIsAiLoading(false);
      }, 2000);
    }
  };

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map((node) => (
      <div key={node.id}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={`flex items-center gap-2 px-2 py-1 hover:bg-muted cursor-pointer text-sm select-none`}
              style={{ paddingLeft: `${8 + depth * 16}px` }}
              onClick={() => handleFileClick(node)}
            >
              {node.type === 'folder' && (
                <button className="flex items-center justify-center w-4 h-4">
                  {node.isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </button>
              )}
              {getFileIcon(node.name, node.type)}
              <span className="truncate">{node.name}</span>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {node.type === 'folder' ? (
              <>
                <ContextMenuItem>
                  <FilePlus className="h-4 w-4 mr-2" />
                  New File
                </ContextMenuItem>
                <ContextMenuItem>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Folder
                </ContextMenuItem>
                <ContextMenuSeparator />
              </>
            ) : (
              <>
                <ContextMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Path
                </ContextMenuItem>
                <ContextMenuSeparator />
              </>
            )}
            <ContextMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        {node.type === 'folder' && node.isExpanded && node.children && (
          <div>
            {renderFileTree(node.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  const activeTab = openTabs.find(tab => tab.id === activeTabId);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (aiChatRef.current) {
      aiChatRef.current.scrollTop = aiChatRef.current.scrollHeight;
    }
  }, [aiMessages]);

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-background text-foreground">
        {/* Header/Toolbar */}
        <div className="h-12 bg-muted border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Square className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">WebContainer</Badge>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Sidebar */}
            {!sidebarCollapsed && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
                  <div className="h-full flex flex-col bg-muted/30 border-r border-border">
                    {/* Sidebar Header */}
                    <div className="h-12 flex items-center justify-between px-4 border-b border-border">
                      <h3 className="font-semibold text-sm">Explorer</h3>
                      <div className="flex items-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <FilePlus className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>New File</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <FolderPlus className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>New Folder</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <RotateCcw className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Refresh</TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Search */}
                    <div className="p-2 border-b border-border">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search files..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-8 h-8"
                        />
                      </div>
                    </div>

                    {/* File Tree */}
                    <ScrollArea className="flex-1">
                      <div className="p-2">
                        {renderFileTree(fileTree)}
                      </div>
                    </ScrollArea>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
              </>
            )}

            {/* Main Editor Area */}
            <ResizablePanel defaultSize={sidebarCollapsed ? 70 : 50}>
              <ResizablePanelGroup direction="vertical">
                {/* Editor */}
                <ResizablePanel defaultSize={terminalCollapsed ? 100 : 70}>
                  <div className="h-full flex flex-col">
                    {/* Tab Bar */}
                    {openTabs.length > 0 && (
                      <div className="h-10 bg-muted border-b border-border flex items-center overflow-x-auto">
                        {openTabs.map((tab) => (
                          <div
                            key={tab.id}
                            className={`flex items-center gap-2 px-4 h-full border-r border-border cursor-pointer hover:bg-background transition-colors ${
                              activeTabId === tab.id ? 'bg-background' : ''
                            }`}
                            onClick={() => setActiveTabId(tab.id)}
                          >
                            {getFileIcon(tab.name, 'file')}
                            <span className="text-sm whitespace-nowrap">
                              {tab.name}
                              {tab.isDirty && <span className="text-orange-500">•</span>}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 ml-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTabClose(tab.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Editor Content */}
                    <div className="flex-1 bg-background">
                      {activeTab ? (
                        <div className="h-full p-4">
                          <pre className="text-sm font-mono whitespace-pre-wrap">
                            {activeTab.content}
                          </pre>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>Select a file to start editing</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ResizablePanel>

                {/* Terminal */}
                {!terminalCollapsed && (
                  <>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={30} minSize={20}>
                      <div className="h-full flex flex-col bg-muted/50 border-t border-border">
                        {/* Terminal Header */}
                        <div className="h-10 flex items-center justify-between px-4 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Terminal className="h-4 w-4" />
                            <span className="font-semibold text-sm">Terminal</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setTerminalCollapsed(true)}
                            >
                              <Minimize2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Terminal Content */}
                        <ScrollArea className="flex-1 p-4" ref={terminalRef}>
                          <div className="font-mono text-sm space-y-2">
                            {terminalHistory.map((cmd) => (
                              <div key={cmd.id} className="space-y-1">
                                <div className="text-blue-400">
                                  <span className="text-green-400">$</span> {cmd.command}
                                </div>
                                <div className={`whitespace-pre-wrap pl-2 ${
                                  cmd.type === 'error' ? 'text-red-400' : 
                                  cmd.type === 'success' ? 'text-green-400' : 
                                  'text-muted-foreground'
                                }`}>
                                  {cmd.output}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>

                        {/* Terminal Input */}
                        <div className="border-t border-border p-2">
                          <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                            <span className="text-green-400 font-mono text-sm">$</span>
                            <Input
                              value={terminalInput}
                              onChange={(e) => setTerminalInput(e.target.value)}
                              placeholder="Type a command..."
                              className="font-mono text-sm bg-transparent border-none focus:ring-0 focus:ring-offset-0"
                            />
                          </form>
                        </div>
                      </div>
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </ResizablePanel>

            {/* AI Panel */}
            {!aiPanelCollapsed && (
              <>
                <ResizableHandle />
                <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
                  <div className="h-full flex flex-col bg-muted/30 border-l border-border">
                    {/* AI Panel Header */}
                    <div className="h-12 flex items-center justify-between px-4 border-b border-border">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-blue-500" />
                        <span className="font-semibold text-sm">AI Assistant</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAiPanelCollapsed(true)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* AI Chat Messages */}
                    <ScrollArea className="flex-1 p-4" ref={aiChatRef}>
                      <div className="space-y-4">
                        {aiMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-2 ${
                              message.type === 'user' ? 'flex-row-reverse' : ''
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-blue-500 text-white'
                            }`}>
                              {message.type === 'user' ? (
                                <span className="text-xs font-semibold">U</span>
                              ) : (
                                <Bot className="h-4 w-4" />
                              )}
                            </div>
                            <Card className={`p-3 max-w-[80%] ${
                              message.type === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-background'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </Card>
                          </div>
                        ))}
                        {isAiLoading && (
                          <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                            <Card className="p-3 bg-background">
                              <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm text-muted-foreground">AI is thinking...</span>
                              </div>
                            </Card>
                          </div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* AI Input */}
                    <div className="border-t border-border p-3">
                      <form onSubmit={handleAiSubmit} className="space-y-2">
                        <Input
                          value={aiInput}
                          onChange={(e) => setAiInput(e.target.value)}
                          placeholder="Ask AI for help..."
                          className="text-sm"
                        />
                        <Button 
                          type="submit" 
                          size="sm" 
                          className="w-full"
                          disabled={!aiInput.trim() || isAiLoading}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>

        {/* Footer */}
        <div className="h-6 bg-muted border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Ready</span>
            {terminalCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 text-xs"
                onClick={() => setTerminalCollapsed(false)}
              >
                <Terminal className="h-3 w-3 mr-1" />
                Terminal
              </Button>
            )}
            {aiPanelCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 text-xs"
                onClick={() => setAiPanelCollapsed(false)}
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                AI Chat
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>TypeScript</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default WebContainerWorkspace;
