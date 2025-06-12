# Vibe Dev Squad - Project Biography

## Project Overview
Vibe Dev Squad is a comprehensive AI-powered development platform that seamlessly integrates with VS Code, Cursor, and Windsurf IDEs through universal extensions and MCP servers. The platform features a web dashboard with LLM key management, complete MCP (Model Context Protocol) registry and integration system, advanced task management with Kanban boards, AI planning agent interface, collaborative planning canvas with real-time editing capabilities, and accessibility-first design. With Phase 9 complete, developers can now collaborate in real-time on planning canvases with presence indicators, conflict resolution, version control, and commenting systems.

## Core Mission
To create an intelligent, collaborative development environment where AI agents work alongside human developers to enhance productivity, maintain code quality, and accelerate project delivery through seamless IDE integration, comprehensive MCP orchestration, advanced task management, real-time collaborative planning tools, and accessibility-focused design across all platforms.

## Key Features
- **Universal IDE Extension**: Single VS Code extension that works across VS Code, Cursor, and Windsurf IDEs with AI-powered chat interface and quick actions
- **MCP Servers**: Dedicated MCP servers for Cursor and Windsurf with specialized tools for enhanced AI capabilities
- **Automated Installer**: npm package installer that auto-detects IDEs and handles both extension and MCP server installation
- **MCP Registry & Integration System**: Complete MCP management with registry, configuration management, planning agent orchestration, usage analytics, and adapter framework
- **Task Management System**: Comprehensive API infrastructure with CRUD operations, dependencies with circular detection, comments, attachments, history tracking, and drag-and-drop Kanban board
- **AI Planning Agent**: Real-time streaming AI assistant with context-aware planning and WebSocket-based communication
- **Collaborative Planning Canvas**: Real-time collaborative editing with presence indicators, conflict resolution, change history, versioning, and commenting system
- **LLM Key Management Dashboard**: Complete CRUD operations for API key management with responsive grid layout
- **Accessibility-First Design**: WCAG 2.1 AA compliant with custom accessibility hooks and keyboard navigation
- **Advanced Security**: Credential encryption, role-based access control, rate limiting, audit logging, and Row-Level Security policies
- **Performance Optimization**: Grid-based layouts, React Query caching, optimistic UI updates, and database query optimization

## Technology Stack
- **Frontend**: Next.js 15.3.3 with Turbopack, React 18, TypeScript (strict mode)
- **IDE Extensions**: VS Code Extension API with WebView integration
- **MCP Protocol**: Full MCP compliance with streaming support and Zod validation
- **Styling**: Tailwind CSS with responsive grid utilities and custom accessibility enhancements
- **Data Management**: React Query with optimistic updates and background refresh
- **UI Components**: shadcn/ui with custom accessibility hooks
- **Database**: Supabase PostgreSQL with type-safe client and real-time subscriptions
- **Testing**: Jest, React Testing Library, web-eval-agent MCP for automated UI testing
- **AI Integration**: Multiple MCP servers (Context7, Perplexity, GitHub, Supabase, Task Master, 21st.dev, Sequential Thinking)
- **Accessibility**: Custom hooks (useAriaLive, useFocusStyles, useHighContrast, useKeyboardShortcuts)
- **Real-time Communication**: WebSocket bridge for IDE-platform communication

## Architecture Highlights
- **Universal Extension Architecture**: Single codebase supporting multiple VS Code-based IDEs
- **MCP Server Design**: Modular tool-based architecture with automatic reconnection
- **Cross-Platform Installer**: Intelligent IDE detection and platform-specific installation
- **Responsive Grid Layouts**: CSS Grid with `auto-rows-fr` for consistent card heights
- **Virtual Scrolling Replacement**: Performance-optimized grid layouts over complex virtualization
- **Accessibility Hooks**: Comprehensive WCAG 2.1 AA compliance with screen reader support
- **MCP Orchestration**: Adapter pattern for seamless AI agent integration
- **QA Automation**: Visual inspection protocols with screenshot analysis

## Project Structure
- **Phases**: Development organized into 19 phases (Phase 0-18)
- **Current Status**: Phase 9 complete (Collaborative Editing)
- **Documentation**: Centralized in `.aigent/` directory with comprehensive change logs
- **UI Templates**: Magic UI templates with accessibility enhancements
- **Rules & Protocols**: Comprehensive operational guidelines in `.windsurf/rules`
- **Extension Packages**: vscode-extension/, cursor-mcp-server/, windsurf-mcp-server/, installer/

## Recent Major Achievements
- **Phase 9 Completion**: Collaborative editing 100% complete with real-time presence indicators, conflict resolution, version control, and commenting system
- **Phase 8 Completion**: Onboarding experience 66% complete with Tier 1 finished
- **Phase 7 Completion**: Universal VS Code extension, Cursor MCP server, Windsurf MCP extension, and automated installer
- **IDE Integration**: Seamless integration with VS Code, Cursor, and Windsurf through single extension
- **npm Publishing**: Published extension installer and MCP servers to npm registry
- **VS Code Marketplace**: Published universal extension to VS Code Marketplace
- **Phase 6 Completion**: AI Planning Agent interface with real-time streaming responses
- **Phase 5 Completion**: Complete MCP registry and integration system, advanced task management with Kanban boards
- **QA Protocol Establishment**: Automated testing with visual inspection requirements
- **Accessibility Compliance**: Full WCAG 2.1 AA compliance with custom hooks
- **Performance Optimization**: Grid-based layouts with improved rendering performance

## Success Metrics
- **IDE Coverage**: 100% support for VS Code, Cursor, and Windsurf IDEs
- **Extension Downloads**: Growing adoption across all supported IDEs
- **MCP Tools**: 17+ specialized tools across Cursor and Windsurf MCP servers
- **MCP Registry System**: 100% complete with full integration capabilities
- **Task Management API**: 100% complete with advanced features (dependencies, comments, attachments, history)
- **Security Implementation**: Comprehensive with encryption, RBAC, rate limiting, and audit logging  
- **Accessibility Score**: WCAG 2.1 AA compliance achieved
- **Performance**: Optimized database queries and grid layout implementation
- **API Coverage**: Complete CRUD operations with validation and error handling
- **Development Velocity**: Task-driven development with comprehensive MCP integration

## Vision
To become the leading AI-augmented development platform that seamlessly blends human creativity with AI efficiency across all major development environments. By providing universal IDE support, comprehensive MCP orchestration, advanced task management, real-time collaborative planning tools, and accessibility-first design principles, Vibe DevSquad sets new standards for collaborative software development. The platform will continue to evolve with cutting-edge AI integration, robust security, exceptional user experience, and seamless developer workflows across all platforms.
