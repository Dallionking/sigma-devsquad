# 04. Agent Communication Hub

## Role & Background
**Senior FANG Engineer Profile**: Senior Full-Stack Engineer with 8+ years experience at Facebook or Google, specializing in real-time communication systems, messaging protocols, and distributed systems. Experience with TypeScript, Next.js, WebSockets, and event-driven architectures. Background in chat applications, notification systems, and AI agent communication frameworks is highly valuable.

## Feature Description
The Agent Communication Hub is the central nervous system of the Vibe DevSquad platform, enabling seamless communication between human users and AI agents as well as agent-to-agent communication. This feature implements a complete communication solution with Google A2A protocol integration, real-time messaging, conversation history, and structured communication patterns in a new Next.js project.

## Implementation Tasks:

### Tier 1 Task - Communication Infrastructure Setup

#### Subtask 1.1: Set up communication database schema
- [x] Create `conversations` table with fields: id, project_id, title, created_at, updated_at, type (direct, group, broadcast)
- [x] Create `conversation_participants` table with fields: conversation_id, participant_id, participant_type (user, agent), joined_at
- [x] Create `messages` table with fields: id, conversation_id, sender_id, sender_type, content, content_type, metadata, sent_at, read_at
- [x] Create `message_attachments` table with fields: id, message_id, file_path, file_type, file_size
- [x] Create `planning_sessions` table with fields: id, conversation_id, status, context_json, created_at, updated_at
- [x] Create `agent_capabilities` table with fields: id, agent_id, capability_name, description, parameters_json
- [x] Create `projects` table with fields: id, user_id, name, description, status, created_at, updated_at
- [x] Create `llm_api_keys` table with fields: id, user_id, provider, key_encrypted, name, is_active, created_at, updated_at
- [x] Create `llm_usage` table with fields: id, api_key_id, tokens_used, cost, timestamp, request_type
- [x] Set up appropriate relationships and constraints between tables
- [x] Create database indexes for performance optimization

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for communication
- [x] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [x] Use Perplexity MCP to research API design best practices for messaging systems
  - [x] Use command: `mcp3_perplexity_ask` with query: "REST API design patterns for real-time messaging and communication systems"
- [x] Implement `/api/conversations` route with GET (list) and POST (create) methods
- [x] Implement `/api/conversations/[id]` route with GET (detail), PUT (update), and DELETE methods
- [x] Implement `/api/conversations/[id]/messages` route for retrieving and sending messages
- [x] Implement `/api/conversations/[id]/participants` route for managing participants
- [x] Implement `/api/planning` route for creating and managing planning sessions
- [x] Implement `/api/planning/[id]/tasks` route for task management within planning sessions
- [x] Implement `/api/projects` route for project creation and management
- [x] Implement `/api/llm/keys` route for managing LLM API keys
- [x] Implement WebSocket endpoint for real-time communication

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Set up Google A2A protocol integration
- [x] Before starting, use Context7 MCP to fetch latest Google A2A protocol documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/google/a2a-protocol"` and topic: "agent communication"
- [x] Use Perplexity MCP to research agent-to-agent communication patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Agent-to-agent communication protocols and message formatting best practices"
- [x] Install Google A2A SDK: `npm install @google/a2a-protocol`
- [x] Create A2A client service:
  ```typescript
  // src/services/a2aService.ts
  import { A2AClient } from '@google/a2a-protocol'
  
  export class A2AService {
    private client: A2AClient
    
    constructor() {
      this.client = new A2AClient({
        // Configuration
      })
    }
    
    // Implement methods for agent communication
  }
  ```
- [x] Configure message formatting according to A2A protocol
- [x] Set up agent discovery and routing mechanisms
- [x] Implement error handling and retry logic
- [x] Create agent capability registration and discovery system

📎 Use Context7 MCP for Google A2A protocol documentation

#### Subtask 1.4: Create UI components for communication interface
- [x] Before starting, use Context7 MCP to fetch latest React component design documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/facebook/react"` and topic: "component design patterns"
- [x] Use Perplexity MCP to research messaging UI patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Modern messaging interface design patterns and user experience best practices"
- [x] Create `ConversationList` component for displaying available conversations
  - [x] Use `/ui` command: "Create conversation list with search and filtering"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/messaging/conversation-list.tsx`
- [x] Create `ConversationView` component for displaying messages in a conversation
  - [x] Use `/ui` command: "Create message thread view with typing indicators"
  - [x] Reference: `/Magic Ui templates/messaging/conversation-view.tsx`
- [x] Create `MessageInput` component for composing and sending messages
  - [x] Use `/ui` command: "Create message input with rich text and attachment support"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/messaging/message-input.tsx`
- [x] Create `ParticipantList` component for displaying and managing conversation participants
  - [x] Use `/ui` command: "Create participant list with role indicators"
  - [x] Reference: `/Magic Ui templates/messaging/participant-list.tsx`
- [x] Create `PlanningAgentInterface` component for dedicated planning agent interactions
  - [x] Use `/ui` command: "Create planning agent interface with canvas and context panels"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/planning/planning-interface.tsx`
- [x] Create `AgentCapabilityBrowser` component for discovering agent capabilities
  - [x] Use `/ui` command: "Create agent capability browser with search and filtering"
  - [x] Reference: `/Magic Ui templates/agents/capability-browser.tsx`
- [x] Create `ProjectCreation` component for initiating new projects
  - [x] Use `/ui` command: "Create project creation wizard with templates"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/projects/project-creation.tsx`
- [x] Create `AgentSidebar` component for displaying and accessing project agents
  - [x] Use `/ui` command: "Create agent sidebar with status indicators and quick actions"
  - [x] Reference: `/Magic Ui templates/agents/agent-sidebar.tsx`
- [x] Create `LLMKeyManager` component for managing API keys
  - [x] Use `/ui` command: "Create secure API key management interface"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/settings/llm-key-manager.tsx`
- [x] Set up responsive layout with Tailwind CSS
- [x] Reference Magic UI templates in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/.aigent/design/Magic Ui templates/agent-template`
- [x] Reference Magic UI templates in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/`
- [x] Follow Vibe DevSquad design system guidelines in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/vibe-devsquad/.aigent/design/vibe_devsquad_design_system.md`

📎 Use Magic UI MCP for component styling guidelines

✅ **Tier 1 Checkpoint**: Ensure all Tier 1 subtasks are complete and the database schema, API routes, Google A2A integration, and UI components are properly implemented before proceeding to Tier 2

**🔄 Git Commit and Push After Tier 1:**
```bash
git add .
git commit -m "feat: implement Phase 4 Tier 1 - Agent Communication Hub infrastructure setup

- Set up communication database schema with all required tables
- Created Next.js API routes for conversations, messages, and planning
- Integrated Google A2A protocol for agent communication
- Built UI components for messaging interface with Magic UI templates
- Configured responsive layout and component styling"
git push origin main
```

### Tier 2 Task - Communication Business Logic and Integration

#### Subtask 2.1: Implement real-time messaging functionality
- [ ] Before starting, use Context7 MCP to fetch latest WebSocket implementation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "real-time subscriptions"
- [ ] Use Perplexity MCP to research real-time messaging best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Real-time messaging implementation patterns with WebSockets and optimistic updates"
- [x] Set up WebSocket connection management with reconnection logic
- [x] Implement message sending with optimistic updates
- [x] Create message receipt and read status tracking
- [x] Develop typing indicators and presence information
- [x] Implement notification system for new messages
- [x] Create message threading for complex conversations

📎 Use Supabase MCP for real-time subscription setup

#### Subtask 2.2: Implement Google A2A protocol integration
- [x] Before starting, use Context7 MCP to fetch latest A2A protocol message handling documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/google/a2a-protocol"` and topic: "message handling"
- [x] Use Perplexity MCP to research agent orchestration patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Multi-agent orchestration patterns and capability-based routing systems"
- [x] Create message parsers for A2A protocol formats
- [x] Implement structured message handling for different message types
- [x] Develop agent capability discovery and negotiation
- [x] Create message routing based on agent capabilities
- [x] Implement context preservation between messages
- [x] Create agent orchestration patterns for multi-agent workflows

📎 Use Context7 MCP for Google A2A protocol handling

#### Subtask 2.3: Implement Planning Agent interface
- [x] Before starting, use Context7 MCP to fetch latest task management documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/taskmaster-ai/taskmaster"` and topic: "task orchestration"
- [x] Use Perplexity MCP to research planning agent UI patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Planning agent interface design patterns for project management and task orchestration"
- [x] Create dedicated Planning Agent conversation UI with canvas view
- [x] Implement context panel showing project information
- [x] Develop research integration with sandbox browser environment
- [x] Create feature breakdown visualization
- [x] Implement task creation and management through conversation
- [x] Develop PRD generation interface with templates
- [x] Create agent orchestration controls for delegating tasks
- [x] Implement project creation workflow (research → PRD → technical breakdown → phases)
- [x] Create agent assignment interface for project staffing
- [x] Implement agent creation with "Senior FANG" role specifications
- [x] Integrate Planning Agent tab in main dashboard with toggle to metrics view

📎 Use Claude Task Master MCP for planning assistance

#### Subtask 2.4: Implement LLM API key management
- [x] Before starting, use Context7 MCP to fetch latest encryption and security documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "encryption and security"
- [x] Use Perplexity MCP to research API key security best practices
  - [x] Use command: `mcp3_perplexity_ask` with query: "API key management security patterns and encryption best practices for multi-provider systems"
- [x] Create secure API key storage with encryption
- [x] Implement "Bring Your Own Key" (BYOK) interface for multiple providers
- [x] Develop integrated model access with credit system
- [x] Create usage tracking and reporting
- [x] Implement provider-specific adapters (OpenAI, Anthropic, Google, DeepSeek, etc.)
- [x] Create intelligent routing between models based on task requirements
- [x] Implement cost optimization features

**✅ COMPLETED**: Implemented comprehensive LLM API key management system with:
- Secure encryption using Web Crypto API (AES-256-GCM)
- Multi-provider support (OpenAI, Anthropic, Google, DeepSeek, Groq, Perplexity, Cohere)
- Complete UI interface with key management, usage tracking, and cost monitoring
- Database schema with proper RLS policies and audit logging
- React hook for seamless integration with UI components
- Key rotation, deactivation, and lifecycle management
- Usage analytics and provider breakdown reporting

📎 Use Supabase MCP for secure key storage

✅ **Tier 2 Checkpoint**: Ensure all Tier 2 subtasks are complete and real-time messaging, A2A protocol integration, Planning Agent interface, and LLM key management work correctly before proceeding to Tier 3

**🔄 Git Commit and Push After Tier 2:**
```bash
git add .
git commit -m "feat: implement Phase 4 Tier 2 - Agent Communication Hub business logic

- Implemented real-time messaging with WebSocket connections and optimistic updates
- Integrated Google A2A protocol for agent-to-agent communication
- Built Planning Agent interface with canvas view and project management
- Created secure LLM API key management with multi-provider support
- Added agent orchestration and capability-based routing"
git push origin main
```

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance message visualization
- [x] Before starting, use Context7 MCP to fetch latest UI accessibility documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "accessibility"
- [x] Use Perplexity MCP to research message UI design patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Modern messaging interface design patterns with accessibility and visual hierarchy"
- [x] Implement message bubbles with sender identification
- [x] Create message status indicators (sending, sent, delivered, read)
- [x] Add timestamp formatting with relative time
- [x] Implement message formatting (markdown, code blocks)
- [x] Create rich media previews for links and attachments
- [x] Develop specialized message types for planning activities
- [x] Implement agent sidebar with clear visual distinction between agent types
- [x] **COMPLETED**: Enhanced MessageList component with date separators, unread markers, message grouping, and accessibility features
- [x] **COMPLETED**: Enhanced TypingIndicator with multiple user support, avatars, and ARIA accessibility
- [x] **COMPLETED**: Enhanced MessageInput with file attachments, reply previews, character count, and accessibility
- [x] **COMPLETED**: Created comprehensive ChatInterface component integrating all messaging components with participants sidebar, scroll management, and modern UI patterns

📎 QA through Operative.sh MCP, visually confirm message layout and formatting

#### Subtask 3.2: Implement responsive design
- [x] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "responsive design"
- [x] Use Perplexity MCP to research responsive messaging interface patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Responsive design patterns for messaging interfaces across mobile, tablet, and desktop"
- [x] **COMPLETED**: Test and optimize mobile layout (full-screen conversation view)
- [x] **COMPLETED**: Create tablet layout (sidebar + conversation view)
- [x] **COMPLETED**: Optimize desktop layout (multi-column with details panel)
- [x] **COMPLETED**: Ensure touch targets are appropriate size (min 44px×44px)
- [x] **COMPLETED**: Implement collapsible panels for focused communication
- [x] **COMPLETED**: Create specialized layouts for planning sessions
- [x] **COMPLETED**: Optimize agent sidebar for all device sizes
- [x] **COMPLETED**: Create responsive dashboard with Planning Agent and metrics toggle

📎 QA through Operative.sh MCP, test all breakpoints

#### Subtask 3.3: Enhance Planning Agent Interface
- [x] Research React interactive components with Context7 MCP (`mcp1_get-library-docs` with library ID `/reactjs/react.dev` and topic "interactive components")
- [x] Research planning agent interface design best practices with Perplexity MCP (`mcp3_perplexity_ask` with query about planning agent interface design with visual feedback and interactive elements)
- [x] Create visual distinctions for agent messages with icons, colors, and confidence indicators
- [x] Implement context-aware suggestion bubbles with priority-based styling
- [x] Add visual feedback for agent orchestration activities with progress tracking
- [x] Create interactive feature breakdown visualization with dependency mapping
- [x] Implement project creation workflow with step-by-step progress indicators
- [x] Add smooth transitions and hover effects throughout the interface
- [x] Integrate enhanced components into the main Planning Agent Interface layout
- [x] Implement specialized UI for task creation and management workflows
- [x] Create sandbox browser environment integration for research activities
- [x] Design seamless toggle between Planning Agent and metrics dashboard views
- [x] Add real-time collaboration indicators for multi-user planning sessions
- [x] Implement advanced filtering and search capabilities for planning artifacts
- [x] Create export functionality for planning documents and task breakdowns
- [x] QA test enhanced Planning Agent Interface with Operative.sh MCP (`mcp7_web_eval_agent` with URL `http://localhost:3001/dashboard/planning` and task "Test enhanced Planning Agent Interface with visual feedback, interactive elements, and smooth transitions")

📎 QA through Operative.sh MCP, verify Planning Agent interface

#### Subtask 3.4: Implement performance optimizations
- [x] Before starting, use Context7 MCP to fetch latest React performance optimization documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/facebook/react"` and topic: "performance optimization"
- [x] Use Perplexity MCP to research messaging performance patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Performance optimization patterns for real-time messaging interfaces with large message volumes"
- [x] Implement virtualized rendering for long conversations
- [x] Add message batching for efficient network usage
- [x] Optimize image loading with progressive enhancement
- [x] Implement message caching for offline access
- [x] Add background syncing for unread messages
- [x] Create efficient state management for complex planning sessions
- [x] Optimize agent sidebar rendering for many agents
- [x] Implement LLM usage optimization features
- [x] Utilize Next.js server components where appropriate for improved performance

📎 QA through Operative.sh MCP, verify performance with 1000+ messages

#### Subtask 3.5: Production readiness and staging environment setup
- [x] Create staging environment configuration with real Supabase database
  - [x] Set up staging Supabase project: `https://svaokjkfcmqjrlsypabo.supabase.co`
  - [x] Configure `.env.staging` with production-like settings
  - [x] Implement feature flags for gradual service migration
- [x] Update application configuration for environment detection
  - [x] Enhanced `config.ts` to detect staging environment
  - [x] Implement service factory for automatic mock/real service switching
  - [x] Add staging helper functions and environment checks
- [x] Create deployment scripts and npm commands
  - [x] Added `npm run preview` for staging environment
  - [x] Created `scripts/deploy-staging.sh` for automated deployment
  - [x] Added staging test and build commands
- [x] Database schema setup and seeding
  - [x] Applied all migrations to staging database
  - [x] Seeded sample data for agents and projects
  - [x] Verified database connectivity and performance
- [x] Configuration validation and testing
  - [x] Created `scripts/test-staging-config.js` for environment validation
  - [x] Verified all environment variables and service configurations
  - [x] Tested staging server startup and functionality

#### Subtask 3.6: Documentation updates for Phase 4 completion
- [x] Update platform feature documentation (`Features.md`)
  - [x] Added AI Planning Agent Interface documentation
  - [x] Documented environment management system
  - [x] Updated usage tips and best practices
  - [x] Added production readiness features
- [x] Create comprehensive deployment environment guide
  - [x] Created `DEPLOYMENT_ENVIRONMENTS.md` with complete environment strategy
  - [x] Documented development, staging, and production workflows
  - [x] Added troubleshooting and monitoring guidance
  - [x] Included service migration strategy and feature flags
- [x] Update staging setup documentation (`STAGING_SETUP.md`)
  - [x] Documented infrastructure and database schema
  - [x] Added feature flags and service configuration details
  - [x] Included deployment and testing instructions

📎 Comprehensive documentation ensures smooth transition to production

✅ **Final Checkpoint**: Ensure all Tier 3 subtasks are complete and the Agent Communication Hub is visually polished, responsive, performs well with large message volumes, has staging environment fully configured, and comprehensive documentation updated before marking Phase 4 as finished

**🔄 Git Commit and Push After Tier 3 (Phase 4 Complete):**
```bash
git add .
git commit -m "feat: complete Phase 4 Tier 3 - Agent Communication Hub production readiness

- Enhanced message visualization with status indicators and rich formatting
- Implemented responsive design across all device breakpoints  
- Polished Planning Agent interface with interactive elements
- Optimized performance for large message volumes and complex planning sessions
- Set up staging environment with real Supabase database
- Created comprehensive environment management system with feature flags
- Updated platform documentation with AI Planning features
- Added deployment environment guide and staging setup documentation
- Completed comprehensive QA testing with Operative.sh MCP

✅ Phase 4 (Agent Communication Hub) - COMPLETE"
git push origin main
