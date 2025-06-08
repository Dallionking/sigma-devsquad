# Role & Background
**Senior FANG Engineer Profile**: Senior Backend Engineer with 7+ years experience at Amazon or Google, specializing in task management systems, Kanban implementations, and real-time collaborative interfaces. Experience with TypeScript, Next.js, and WebSocket/real-time data synchronization. Background in project management tools (JIRA, Asana) development and drag-and-drop interfaces is highly valuable.

# Feature 3.0: Task Management & Kanban Board

## Description:
The Task Management & Kanban Board feature is the central workflow system of the Vibe DevSquad platform, enabling users and agents to create, assign, track, and visualize tasks through an interactive Kanban board. This feature implements a complete task management solution with Claude Task Master integration, drag-and-drop functionality, real-time updates, and workflow enforcement in a new Next.js project.

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

#### Subtask 1.1: Set up task management database schema
- [x] Before starting, use Context7 MCP to fetch latest Supabase schema design documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "database schema design"
- [x] Create tasks table with appropriate columns
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
  - [x] SQL to execute:
    ```sql
    CREATE TABLE tasks (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'backlog',
      priority TEXT NOT NULL DEFAULT 'medium',
      assignee_id UUID REFERENCES auth.users(id),
      created_by UUID REFERENCES auth.users(id) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      due_date TIMESTAMP WITH TIME ZONE,
      estimate_hours NUMERIC(5,2),
      tags TEXT[],
      metadata JSONB DEFAULT '{}'::JSONB
    );
    ```
- [x] Create task_dependencies table for tracking dependencies
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
  - [x] SQL to execute:
    ```sql
    CREATE TABLE task_dependencies (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
      depends_on_task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      created_by UUID REFERENCES auth.users(id) NOT NULL,
      UNIQUE(task_id, depends_on_task_id),
      CHECK (task_id != depends_on_task_id)
    );
    ```
- [x] Create task_comments table for discussion threads
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
  - [x] SQL to execute:
    ```sql
    CREATE TABLE task_comments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
      content TEXT NOT NULL,
      user_id UUID REFERENCES auth.users(id) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      parent_comment_id UUID REFERENCES task_comments(id)
    );
    ```
- [x] Create task_history table for tracking changes
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
  - [x] SQL to execute:
    ```sql
    CREATE TABLE task_history (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      task_id UUID REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
      field_name TEXT NOT NULL,
      old_value TEXT,
      new_value TEXT,
      changed_by UUID REFERENCES auth.users(id) NOT NULL,
      changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    ```
- [x] Set up appropriate indexes and foreign key constraints
  - [x] Use Supabase MCP with `mcp5_apply_migration` to add constraints
  - [x] SQL to execute:
    ```sql
    -- Indexes for faster querying
    CREATE INDEX idx_tasks_status ON tasks(status);
    CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
    CREATE INDEX idx_tasks_due_date ON tasks(due_date);
    CREATE INDEX idx_task_dependencies_task_id ON task_dependencies(task_id);
    CREATE INDEX idx_task_dependencies_depends_on ON task_dependencies(depends_on_task_id);
    CREATE INDEX idx_task_comments_task_id ON task_comments(task_id);
    CREATE INDEX idx_task_history_task_id ON task_history(task_id);
    
    -- Add RLS policies for security
    ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
    ALTER TABLE task_dependencies ENABLE ROW LEVEL SECURITY;
    ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;
    ALTER TABLE task_history ENABLE ROW LEVEL SECURITY;
    ```
- [x] Create database triggers for real-time updates
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create triggers
  - [x] SQL to execute:
    ```sql
    -- Function to update the updated_at timestamp
    CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
    
    -- Trigger for tasks table
    CREATE TRIGGER update_tasks_timestamp
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp();
    ```

📎 Use Supabase MCP for database schema creations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for task management
- [x] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [x] Implement `/api/tasks` route with GET (list) and POST (create) methods
- [x] Implement `/api/tasks/[id]` route with GET (detail), PUT (update), and DELETE methods
- [x] Implement `/api/tasks/[id]/status` route for updating task status
- [x] Implement `/api/tasks/[id]/dependencies` route for managing task dependencies
- [x] Implement `/api/projects/[id]/tasks` route for retrieving tasks by project

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Install and configure drag-and-drop library
- [x] Before starting, use Context7 MCP to fetch latest react-beautiful-dnd documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/atlassian/react-beautiful-dnd"` and topic: "getting started"
- [x] Install react-beautiful-dnd v13.1.1 and TypeScript types
  - [x] Run: `npm install react-beautiful-dnd@13.1.1 @types/react-beautiful-dnd`
  - [x] Verify installation by importing in a test file
- [x] Create DragDropContext provider in the task board component
  - [x] Use `/ui` command: "Create DragDropContext provider wrapper component for kanban board"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/kanban/drag-drop-context.tsx`
  - [x] Implement onDragEnd, onDragStart, and onDragUpdate event handlers
  - [x] Add state management for tracking current drag operation
- [x] Set up Droppable containers for task columns
  - [x] Use `/ui` command: "Create Droppable column container for kanban board"
  - [x] Reference: `/Magic Ui templates/kanban/droppable-column.tsx`
  - [x] Configure droppableId with column status value
  - [x] Add placeholder for drag destination
  - [x] Implement isDropDisabled logic for validation
- [x] Configure Draggable components for task cards
  - [x] Use `/ui` command: "Create Draggable task card component"
  - [x] Reference: `/Magic Ui templates/kanban/draggable-task-card.tsx`
  - [x] Set draggableId to task ID
  - [x] Implement getDraggableStyle helper for consistent styling
  - [x] Optimize with React.memo to prevent unnecessary re-renders
- [x] Implement drag handlers for status changes
  - [x] Create reusable handleDragEnd function
  - [x] Add validation for allowed status transitions
  - [x] Implement optimistic UI updates
- [x] Add custom drag handles for better mobile usability
  - [x] Use `/ui` command: "Create touch-friendly drag handle component"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/kanban/drag-handle.tsx`
  - [x] Ensure minimum touch target size of 44x44px
- [x] Implement keyboard accessibility for drag operations
  - [x] Add ARIA attributes for screen readers
  - [x] Support keyboard shortcuts for moving tasks between columns

📎 Use Context7 MCP for react-beautiful-dnd documentation

#### Subtask 1.4: Create Kanban board UI components
- [x] Before starting, use Context7 MCP to fetch latest Tailwind CSS documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "responsive design"
- [x] Create `KanbanBoard` container component with column layout
  - [x] Use `/ui` command: "Create responsive kanban board container with horizontal scrolling"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/kanban/kanban-board.tsx`
- [x] Create `KanbanColumn` component for each status (To Do, In Progress, QA, Done)
  - [x] Use `/ui` command: "Create kanban column with header and task list"
  - [x] Reference: `/Magic Ui templates/kanban/kanban-column.tsx`
- [x] Create `TaskCard` component for displaying task information
  - [x] Use `/ui` command: "Create task card with priority, status, and assignee"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/kanban/task-card.tsx`
- [x] Create `TaskForm` component for creating and editing tasks
  - [x] Use `/ui` command: "Create task form with validation and dependency selection"
  - [x] Reference: `/Magic Ui templates/forms/task-form.tsx`
- [x] Set up responsive layout with Tailwind CSS

📎 Use Magic UI MCP for component styling guidelines

✅ **Tier 1 Checkpoint**: Ensure all Tier 1 subtasks are complete and the database schema, API routes, and UI components are properly implemented before proceeding to Tier 2

### Tier 2 Task - Task Management Business Logic and Integration

#### Subtask 2.1: Implement Claude Task Master integration
- [x] Before starting, use Context7 MCP to fetch latest TaskMaster documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/eyaltoledano/claude-task-master"` and topic: "api integration"
- [x] Install Claude Task Master SDK: `npm install task-master-ai`
- [x] Create service for communicating with Claude Task Master MCP
  - [x] Use `/ui` command: "Create TaskMaster integration service with error handling"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/services/task-master-service.ts`
- [x] Implement task breakdown functionality for Planning Agent
  - [x] Use TaskMaster MCP with `mcp6_expand_task` command for task breakdown
- [x] Develop task creation from breakdown results
  - [x] Use TaskMaster MCP with `mcp6_add_task` command for task creation
- [x] Create validation logic for task structure
- [x] Implement error handling for failed Task Master operations

📎 Use TaskMaster MCP for task breakdown and management

#### Subtask 2.2: Implement task creation and editing logic
- [x] Before starting, use Context7 MCP to fetch latest React Hook Form documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react-hook-form/react-hook-form"` and topic: "validation"
- [x] Create form validation for task creation (required fields, format validation)
  - [x] Use `/ui` command: "Create form validation schema for task creation"
  - [x] Reference: `/Magic Ui templates/forms/validation-schema.ts`
- [x] Implement agent assignment dropdown with filtering
  - [x] Use `/ui` command: "Create searchable agent assignment dropdown"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/inputs/agent-dropdown.tsx`
- [x] Create priority selection with visual indicators
  - [x] Use `/ui` command: "Create priority selection with color indicators"
  - [x] Reference: `/Magic Ui templates/inputs/priority-selector.tsx`
- [x] Implement task dependency selection UI
  - [x] Use `/ui` command: "Create task dependency selection interface"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/inputs/dependency-selector.tsx`
- [x] Add error handling for failed operations with user feedback
  - [x] Use `/ui` command: "Create toast notification system for form feedback"
  - [x] Reference: `/Magic Ui templates/feedback/toast-notifications.tsx`

📎 Use Supabase MCP with `mcp5_execute_sql` for database operations

#### Subtask 2.3: Implement Kanban board interaction logic
- [x] Before starting, use Context7 MCP to fetch latest Supabase real-time documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "realtime subscriptions"
- [x] Create drag-and-drop handler for status changes
  - [x] Use `/ui` command: "Create drag-and-drop handler with optimistic updates"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/kanban/drag-handler.ts`
  - [x] Implement onDragEnd callback to update task status
  - [x] Create reusable updateTaskStatus function for API calls
  - [x] Add visual feedback during drag operations
- [x] Implement status change validation (e.g., dependencies must be completed first)
  - [x] Use `/ui` command: "Create task status validation service"
  - [x] Reference: `/Magic Ui templates/services/status-validation-service.ts`
  - [x] Create isValidStatusChange function with dependency checks
  - [x] Implement rules engine for workflow enforcement
  - [x] Add validation error feedback with toast notifications
- [x] Develop real-time updates using Supabase subscriptions
  - [x] Use Supabase MCP with `mcp5_execute_sql` to set up real-time triggers
  - [x] Create database triggers for task status changes
  - [x] Set up Supabase real-time channel subscription
  - [x] Implement React Query v3.39.3 for data synchronization
  - [x] Add reconnection logic for dropped connections
- [x] Create task filtering by assignee, priority, and keyword
  - [x] Use `/ui` command: "Create task filter component with multiple criteria"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/filters/task-filters.tsx`
- [x] Implement task sorting options
  - [x] Use `/ui` command: "Create sortable column headers for task lists"
  - [x] Reference: `/Magic Ui templates/tables/sortable-headers.tsx`
- [x] Implement optimistic UI updates for drag-and-drop operations
  - [x] Use `/ui` command: "Create optimistic UI update system for drag operations"
  - [x] Reference: `/Magic Ui templates/state/optimistic-updates.ts`
- [x] Implement task dependency visualization
  - [x] Before starting, use Context7 MCP to fetch latest visualization library documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/d3/d3"` and topic: "force directed graph"
- [x] Install D3.js v7.8.4: `npm install d3@7.8.4 @types/d3`
- [x] Create visual indicators for task dependencies on cards
  - [x] Use `/ui` command: "Create dependency badge component for task cards"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/badges/dependency-badge.tsx`
- [x] Implement dependency line visualization between connected tasks
  - [x] Use `/ui` command: "Create SVG dependency line visualization component"
  - [x] Reference: `/Magic Ui templates/visualizations/dependency-lines.tsx`
- [x] Develop interactive dependency creation by connecting cards
  - [x] Use `/ui` command: "Create interactive dependency creation interface"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/interactions/dependency-creator.tsx`
- [x] Create validation to prevent circular dependencies
  - [x] Use `/ui` command: "Create dependency cycle detection utility"
  - [x] Reference: `/Magic Ui templates/utils/cycle-detection.ts`
- [x] Add visual feedback for invalid dependency operations
  - [x] Use `/ui` command: "Create error animation for invalid dependency operations"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/animations/error-feedback.tsx`
- [x] Implement zooming and panning for dependency graph
  - [x] Use `/ui` command: "Create zoomable and pannable SVG container"
  - [x] Reference: `/Magic Ui templates/visualizations/zoomable-container.tsx`

📎 Use Operative.sh MCP for visualization components

✅ **Tier 2 Checkpoint**: Ensure all Tier 2 subtasks are complete and task creation, editing, status changes, and dependency management work correctly before proceeding to Tier 3

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance task card visualization
- [x] Before starting, use Context7 MCP to fetch latest accessibility color contrast documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "color contrast"
- [x] Add priority indicators with color coding (High: #E53E3E, Medium: #DD6B20, Low: #718096)
  - [x] Use `/ui` command: "Create priority indicator component with color coding"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/indicators/priority-indicator.tsx`
- [x] Implement status badges with distinct colors
  - [x] Use `/ui` command: "Create status badge component with accessible colors"
  - [x] Reference: `/Magic Ui templates/badges/status-badge.tsx`
- [x] Create agent avatar display for assigned agent
  - [x] Use `/ui` command: "Create agent avatar component with tooltip"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/avatars/agent-avatar.tsx`
- [x] Add due date visualization with approaching/overdue indicators
  - [x] Use `/ui` command: "Create due date component with status indicators"
  - [x] Reference: `/Magic Ui templates/indicators/due-date.tsx`
- [x] Implement progress indicators for multi-step tasks
  - [x] Use `/ui` command: "Create progress bar component for task completion"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/progress/task-progress.tsx`

📎 QA through Operative.sh MCP, visually confirm card layout and color coding

#### Subtask 3.2: Implement responsive design optimizations
- [x] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "responsive design"
- [x] Test and optimize mobile layout (vertical columns, swipeable)
  - [x] Use `/ui` command: "Create swipeable mobile kanban layout with vertical columns"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/responsive/mobile-kanban.tsx`
- [x] Create tablet layout (2 columns visible at once, horizontal scrolling)
  - [x] Use `/ui` command: "Create tablet-optimized kanban layout with horizontal scrolling"
  - [x] Reference: `/Magic Ui templates/responsive/tablet-kanban.tsx`
- [x] Optimize desktop layout (all columns visible, min-width 280px per column)
  - [x] Use `/ui` command: "Create desktop kanban layout with all columns visible"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/responsive/desktop-kanban.tsx`
- [x] Ensure responsive design for various screen sizes
  - [x] Use Tailwind CSS breakpoints: sm:640px, md:768px, lg:1024px
  - [x] Implement horizontal scrolling for mobile devices
  - [x] Create collapsible columns for small screens

📎 QA through Operative.sh MCP, test all breakpoints

#### Subtask 3.3: Implement interaction polish
- [x] Before starting, use Context7 MCP to fetch latest animation and interaction documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/framer/motion"` and topic: "animation transitions"
- [x] Add smooth animations for card movement (150ms transition)
  - [x] Use `/ui` command: "Create smooth card movement animations with Framer Motion"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/animations/card-movement.tsx`
- [x] Create hover states for interactive elements
  - [x] Use `/ui` command: "Create interactive hover states for kanban elements"
  - [x] Reference: `/Magic Ui templates/interactions/hover-states.tsx`
- [x] Implement card expansion for viewing details without leaving board
  - [x] Use `/ui` command: "Create expandable task card with details view"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/cards/expandable-task-card.tsx`
- [x] Add keyboard shortcuts for common actions
  - [x] Use `/ui` command: "Create keyboard shortcut system with help modal"
  - [x] Reference: `/Magic Ui templates/accessibility/keyboard-shortcuts.tsx`
- [x] Create toast notifications for status changes
  - [x] Use `/ui` command: "Create toast notification system for status updates"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/notifications/status-toast.tsx`
- [x] Optimize desktop layout (all columns visible, min-width 280px per column)
  - [x] Use `/ui` command: "Create desktop kanban layout with all columns visible"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/responsive/desktop-kanban.tsx`
- [x] Ensure drag handles are touch-friendly (min 44px×44px)
  - [x] Use `/ui` command: "Create touch-friendly drag handles for mobile interaction"
  - [x] Reference: `/Magic Ui templates/interactions/touch-drag-handle.tsx`
- [x] Implement column collapse functionality for focused work
  - [x] Use `/ui` command: "Create collapsible column component with toggle"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/kanban/collapsible-column.tsx`

✅ **QA COMPLETED through Operative.sh MCP - All interactions verified functional**

#### Subtask 3.4: Implement performance optimizations
- [x] Before starting, use Context7 MCP to fetch latest performance optimization documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "performance optimization"
- [x] Implement virtualized rendering for boards with many tasks
  - [x] Use `/ui` command: "Create virtualized task list for efficient rendering"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/performance/virtualized-task-list.tsx`
- [x] Add windowing for large datasets
  - [x] Use `/ui` command: "Create windowed list component for large datasets"
  - [x] Reference: `/Magic Ui templates/performance/windowed-list.tsx`
- [x] Optimize WebSocket connections with reconnection logic
  - [x] Use `/ui` command: "Create WebSocket manager with reconnection handling"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/services/websocket-manager.ts`
- [x] Implement optimistic UI updates for drag operations
  - [x] Use `/ui` command: "Create optimistic UI update system for drag operations"
  - [x] Reference: `/Magic Ui templates/state/optimistic-updates.ts`
- [x] Add client-side caching for frequently accessed data
  - [x] Use `/ui` command: "Create client-side cache service with TTL"
  - [x] Reference: `/.aigent/design/Magic Ui templates/agent-template/services/client-cache.ts`
- [x] Utilize Next.js server components where appropriate for improved performance

📎 QA through Operative.sh MCP, verify performance with 100+ tasks

✅ **Final Checkpoint**: Ensure all Tier 3 subtasks are complete and the Kanban board is visually polished, responsive, and performs well with large numbers of tasks before marking Phase 3 as finished
