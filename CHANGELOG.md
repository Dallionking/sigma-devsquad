# Changelog

All notable changes to the Vibe DevSquad platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Phase 7 Complete - IDE Integrations (June 2025)

#### Added
- **Universal VS Code Extension** (v1.0.6)
  - Single extension works across VS Code, Cursor, and Windsurf IDEs
  - AI-powered chat interface with streaming responses
  - Quick action buttons for file analysis, project analysis, and task creation
  - WebSocket bridge for real-time communication with Vibe DevSquad platform
  - Cursor-style UI with dark theme and modern design
  - Published to VS Code Marketplace

- **Cursor MCP Server** (v1.0.0)
  - Model Context Protocol server for enhanced AI capabilities
  - 7 specialized tools: chat, file analysis, project analysis, task management, context sharing
  - Streaming support for real-time AI responses
  - Automatic reconnection with exponential backoff
  - Published to npm registry as @vibedevsquad/cursor-mcp-server

- **Windsurf MCP Extension** (v1.0.0)
  - Complete MCP implementation for Windsurf IDE
  - 10 comprehensive tools including collaboration and workflow management
  - Windsurf-specific command execution support
  - Real-time collaboration features integration
  - Full TypeScript implementation with Zod validation

- **Automated Installer System**
  - Universal npm package installer for all IDEs
  - Auto-detection of VS Code, Cursor, and Windsurf installations
  - Smart installation with version checking and force reinstall options
  - Combined installer for both MCP servers and extension
  - Cross-platform support (Windows, macOS, Linux)

#### Changed
- Renamed cursor-extension to vscode-extension to reflect universal compatibility
- Updated all documentation to emphasize multi-IDE support
- Simplified publishing workflow for single extension deployment
- Consolidated build and test scripts for unified development

#### Technical Improvements
- Fixed TypeScript build errors across all MCP implementations
- Implemented consistent tool naming conventions
- Added comprehensive error handling and logging
- Optimized WebSocket communication with automatic reconnection
- Enhanced security with API key authentication

### Phase 6 Complete - Planning Agent Interface (June 2025)

#### Added
- **AI Planning Agent Interface** at `/dashboard/planning`
  - Real-time streaming AI responses with token-by-token display
  - Context-aware planning with workspace and file integration
  - Message history with regeneration capabilities
  - Quick action buttons for common planning tasks
  - Dark theme UI matching platform design

- **Planning Service Infrastructure**
  - WebSocket-based real-time communication
  - Comprehensive error handling and retry logic
  - Mock service for development environment
  - Production service with full AI integration

### Phase 5 Complete - MCP Registry & Task Management (June 2025)

#### Added
- **MCP Registry System** at `/dashboard/mcps`
  - Browse and discover available MCPs
  - Dynamic configuration UI based on MCP schemas
  - Category-based organization (AI Models, Research, Development, etc.)
  - Real-time status monitoring
  - Cost tracking and usage analytics

- **Advanced Task Management**
  - Kanban board with 5 status columns
  - Drag-and-drop functionality with @dnd-kit
  - Task dependencies with circular detection
  - Advanced filtering and search
  - Keyboard shortcuts for power users
  - Task history and audit trails

- **MCP Orchestration Engine**
  - Visual workflow builder
  - Rule-based automation
  - Context sharing between MCPs
  - Performance monitoring

### Phase 4 Complete - Dashboard & Navigation (May 2025)

#### Added
- **Responsive Dashboard Layout**
  - Collapsible sidebar navigation
  - Mobile-first responsive design
  - Quick access navigation icons
  - Breadcrumb navigation

### Phase 3 Complete - Authentication & User Management (May 2025)

#### Added
- **Supabase Authentication**
  - Email/password authentication
  - OAuth providers (GitHub, Google)
  - Role-based access control
  - Row-level security policies

### Phase 2 Complete - Project Setup & Infrastructure (April 2025)

#### Added
- **Next.js 14 Application**
  - App Router architecture
  - TypeScript configuration
  - Tailwind CSS styling
  - Supabase integration

### Phase 1 Complete - Planning & Design (April 2025)

#### Added
- **Project Architecture**
  - Comprehensive phase-based development plan
  - Technology stack selection
  - Database schema design
  - API architecture planning

## [1.0.6] - 2025-06-09

### Added
- Initial public release of Vibe DevSquad VS Code Extension
- Support for VS Code, Cursor, and Windsurf IDEs

## [1.0.0] - 2025-06-09

### Added
- Initial release of Cursor MCP Server
- Initial release of Windsurf MCP Extension
