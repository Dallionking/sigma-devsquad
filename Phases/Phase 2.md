# Role & Background
**Senior FANG Engineer Profile**: Senior Frontend Engineer with 8+ years experience at Google or Meta, specializing in React component architecture, state management systems, and design systems implementation. Experience with TypeScript, Next.js, and building complex form interfaces with validation logic. Background in AI/ML product interfaces and agent configuration UIs is highly valuable.

# Feature 2.0: Agent Management System

## Description:
The Agent Management System is the foundation of the Vibe DevSquad platform, enabling users to create, configure, and manage AI agents with different roles and capabilities. This feature implements a complete agent management solution including agent creation, role assignment, MCP tool integration, and permission management in a new Next.js project.

⚠️ **IMPORTANT INSTRUCTIONS:**
1. Check off each subtask with [x] as you complete it
2. Do not proceed to the next task until ALL checkboxes in the current task are marked complete
3. Use Magic UI MCP with `/ui` command for all component generation
4. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/.aigent/design/Magic Ui templates/agent-template` for component patterns
5. Reference `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/` for styling consistency
6. Use Context7 MCP to fetch up-to-date documentation before starting each subtask
7. Use Perplexity MCP for any research needs or best practices
8. Create TaskMaster tasks for any complex implementation requirements

## Implementation Tasks:

### Tier 1 Task - Component Structure and Database Setup

#### Subtask 1.1: Set up agent management database schema
- [x] Before starting, use Context7 MCP to fetch latest Supabase documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "database schema design"
- [x] Create `agents` table with fields: id, project_id, name, role, background, config, created_at
- [x] Create `agent_roles` table with fields: id, name, description, permissions
- [x] Create `agent_tool_assignments` table with fields: agent_id, mcp_id, config, permissions
- [x] Set up appropriate relationships and constraints between tables
- [x] Create database indexes for performance optimization

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for agent management
- [x] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [x] Implement `/api/agents` route with GET (list) and POST (create) methods
- [x] Implement `/api/agents/[id]` route with GET (detail), PUT (update), and DELETE methods
- [x] Implement `/api/agents/[id]/tools` route for managing agent tool assignments
- [x] Set up proper error handling and response formatting
- [x] Implement authentication middleware for all routes

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Create agent management page structure
- [x] Before starting, use Context7 MCP to fetch latest Next.js app router documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "app router"
- [x] Create `/app/dashboard/agents/page.tsx` for agent listing
- [x] Create `/app/dashboard/agents/[id]/page.tsx` for agent details
- [x] Create `/app/dashboard/agents/new/page.tsx` for agent creation
- [x] Implement layout components with proper navigation
  - [x] Use `/ui` command: "Create a dashboard layout with sidebar navigation and breadcrumbs"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/layouts/dashboard-layout.tsx`
- [x] Set up loading and error states for each page
  - [x] Use `/ui` command: "Create loading and error state components for async data fetching"
  - [x] Reference: `/Magic Ui templates/states/loading-error-states.tsx`

📎 Use Context7 MCP for Next.js app router documentation

#### Subtask 1.4: Create UI components for agent management
- [x] Before starting, research component best practices with Perplexity MCP
  - [x] Use command: `mcp3_perplexity_ask` for "modern React agent management UI design patterns"
- [x] Create `AgentList` component
  - [x] Use `/ui` command: "Create a responsive grid layout for displaying agent cards with filtering and sorting controls"
  - [x] Reference: `/Magic Ui templates/cards/agent-card-grid.tsx`
- [x] Create `AgentCard` component
  - [x] Use `/ui` command: "Create an agent card component with avatar, status indicator, and tool badges" 
  - [x] Reference: `/Magic Ui templates/cards/agent-info-card.tsx`
- [x] Create `AgentForm` component
  - [x] Use `/ui` command: "Create a multi-step form with validation for agent creation and editing" 
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/forms/multi-step-form.tsx`
- [x] Create `AgentToolAssignment` component
  - [x] Use `/ui` command: "Create a tool assignment interface with drag and drop capability and configuration panel" 
  - [x] Reference: `/Magic Ui templates/tools/tool-assignment-interface.tsx`
- [x] Set up responsive layout with Tailwind CSS 
- [x] **Checkpoint**: Ensure all Tier 1 subtasks are complete before proceeding to Tier 2

### Tier 2 Task - Agent Management Business Logic and Integration

#### Subtask 2.1: Implement agent creation and configuration logic
- [x] Before starting, use Context7 MCP to fetch latest React Hook Form documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react-hook-form/react-hook-form"` and topic: "validation"
- [x] Create form validation for agent creation (required fields, format validation)
- [x] Implement agent role selection with appropriate permission assignment
  - [x] Use `/ui` command: "Create a role selection component with permission preview"
  - [x] Reference: `/Magic Ui templates/selectors/role-selector.tsx`
- [x] Create background context setting functionality with character limits and suggestions
  - [x] Use `/ui` command: "Create a rich text editor with character count and AI suggestions"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/editors/rich-text-editor.tsx`
- [x] Implement agent configuration saving with optimistic UI updates
- [x] Add error handling for failed operations with user feedback
  - [x] Use `/ui` command: "Create error toast notifications with retry functionality"
  - [x] Reference: `/Magic Ui templates/feedback/toast-notifications.tsx`

📎 Use Supabase MCP for database operations with `mcp5_execute_sql` command

#### Subtask 2.2: Implement MCP tool assignment functionality
- [x] Before starting, use Perplexity MCP to research tool assignment UX patterns
  - [x] Use command: `mcp3_perplexity_ask` for "best practices for AI tool assignment interfaces"
- [x] Create tool selection interface with available MCPs
  - [x] Use `/ui` command: "Create a searchable tool selection grid with categories and feature badges"
  - [x] Reference: `/Magic Ui templates/selectors/tool-grid-selector.tsx`
- [x] Implement permission-based filtering of available tools
- [x] Develop configuration UI for each tool type with appropriate fields
  - [x] Use `/ui` command: "Create a dynamic configuration panel with schema-based form generation"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/forms/schema-form.tsx`
- [x] Create tool assignment saving logic with validation
- [x] Implement tool removal functionality with confirmation
  - [x] Use `/ui` command: "Create a confirmation dialog with destructive action warning"
  - [x] Reference: `/Magic Ui templates/dialogs/confirmation-dialog.tsx`

📎 Use MCP Registry for available tools and configurations

#### Subtask 2.3: Implement agent listing and filtering
- [x] Before starting, use Context7 MCP to fetch latest React Query documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tanstack/query"` and topic: "queries"
- [x] Create agent listing functionality with pagination *(AgentList component exists)*
  - [x] Use `/ui` command: "Create a paginated list with infinite scroll capability"
  - [x] Reference: `/Magic Ui templates/lists/infinite-scroll-list.tsx`
- [x] Implement search and filter functionality by name, role, and capabilities *(Basic filtering exists)*
  - [x] Use `/ui` command: "Create an advanced filter panel with multiple criteria and saved filters"
  - [x] Reference: `/Magic Ui templates/filters/advanced-filter-panel.tsx`
- [x] Create sorting options (newest, alphabetical, role) *(Sorting exists)*
- [x] Implement real-time updates when agents are modified
- [x] Add empty state handling with helpful prompts *(EmptyState component exists)*
  - [x] Use `/ui` command: "Create an empty state component with helpful onboarding prompts and illustrations"
  - [x] Reference: `/Magic Ui templates/states/empty-state.tsx`

📎 Use Supabase MCP for real-time subscription with `mcp5_execute_sql` command

✅ **Checkpoint**: Ensure all Tier 2 subtasks are complete before proceeding to Tier 3

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance agent card visualization
- [x] Before starting, use Perplexity MCP to research modern card design trends
  - [x] Use command: `mcp3_perplexity_ask` for "2025 UI card design trends for AI interfaces"
- [x] Add agent avatar generation based on role and name
  - [x] Use `/ui` command: "Create an agent avatar generator with role-based visual cues"
  - [x] Reference: `/Magic Ui templates/avatars/role-based-avatar.tsx`
- [x] Implement visual indicators for agent status (active, idle, busy)
  - [x] Use `/ui` command: "Create animated status indicators with tooltips"
  - [x] Reference: `/Magic Ui templates/indicators/status-badge.tsx`
- [x] Create tool badge visualization showing assigned MCPs
  - [x] Use `/ui` command: "Create compact tool badges with hover details"
  - [x] Reference: `/Magic Ui templates/badges/tool-badge.tsx`
- [x] Add hover states and animations for interactive elements
- [x] Ensure consistent spacing (16px between cards, 24px padding within cards)

📎 QA through Operative.sh MCP, visually confirm card layout and spacing

#### Subtask 3.2: Implement responsive design optimizations
- [x] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindcss/tailwindcss"` and topic: "responsive design"
- [x] Create responsive layout containers for mobile, tablet, and desktop
  - [x] Use `/ui` command: "Create responsive layout containers with mobile-first approach"
  - [x] Reference: `/Magic Ui templates/layouts/responsive-grid.tsx`
- [x] Ensure proper touch target sizing (minimum 44px×44px)
  - [x] Use `/ui` command: "Create responsive button components with proper touch targets"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/buttons/touch-button.tsx`
- [x] Implement responsive margins and spacing
  - [x] Single column on mobile with 16px margins
  - [x] Two columns on tablets with 24px margins
  - [x] Three or more columns on desktops with 32px margins
- [x] Verify text remains readable at all breakpoints (min 16px font size)
  - [x] Use `/ui` command: "Create responsive typography system with minimum readability standards"
  - [x] Reference: `/Magic Ui templates/typography/responsive-text.tsx`

📎 QA through Operative.sh MCP, test all breakpoints

#### Subtask 3.3: Implement accessibility improvements
- [x] Before starting, use Context7 MCP to fetch latest accessibility documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/chakra-ui/chakra-ui"` and topic: "accessibility"
- [x] Add proper ARIA labels to all interactive elements
  - [x] Use `/ui` command: "Create accessible interactive components with proper ARIA labels"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/accessibility/aria-components.tsx`
- [x] Ensure keyboard navigation works correctly
  - [x] Use `/ui` command: "Create keyboard navigation system with focus trap for modals"
  - [x] Reference: `/Magic Ui templates/accessibility/keyboard-navigation.tsx`
- [x] Implement focus states that meet WCAG 2.1 AA requirements
- [x] Add screen reader announcements for dynamic content changes
  - [x] Use `/ui` command: "Create screen reader announcement system for dynamic content"
  - [x] Reference: `/Magic Ui templates/accessibility/screen-reader-announcements.tsx`
- [x] Test color contrast ratios (minimum 4.5:1 for normal text)

📎 QA through Operative.sh MCP, run accessibility audit

#### Subtask 3.4: Implement performance optimizations
- [x] Before starting, use Context7 MCP to fetch latest React performance optimization documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "performance optimization"
- [x] Fetch documentation for Next.js performance optimization best practices ✅ **COMPLETED** - Documentation successfully retrieved and reviewed for implementation guidance
- [x] Create virtualized grid list component for large agent collections ✅ **COMPLETED** - VirtualizedAgentGrid component implemented with @tanstack/react-virtual for efficient rendering of 1000+ agents
- [x] Add skeleton loading states for better perceived performance ✅ **COMPLETED** - Comprehensive skeleton components created with animations and integrated into all loading states
- [x] Optimize image loading with Next.js Image components ✅ **COMPLETED** - All agent avatars now use Next.js Image with proper error handling, loading states, and optimization
- [x] Implement debounced search inputs to reduce API calls ✅ **COMPLETED** - Advanced debounced search component with filtering, suggestions, and 300ms debounce
- [x] Add client-side caching for frequently accessed data ✅ **COMPLETED** - AgentCache class implemented with 5-minute TTL for agent data caching
- [x] Utilize Next.js server components where appropriate for improved performance

📎 QA through Operative.sh MCP, verify performance metrics

✅ **Final Checkpoint**: Ensure all Tier 3 subtasks are complete and the agent management interface is visually polished, responsive, accessible, and performant before marking Phase 2 as finished
