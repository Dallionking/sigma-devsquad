# 06. Teams Management

## Role & Background
**Senior FANG Engineer Profile**: Senior Engineering Manager with 10+ years experience at Microsoft or Amazon, specializing in team collaboration systems, organizational hierarchy, and permission management. Experience with TypeScript, Next.js, and building complex team management interfaces. Background in enterprise collaboration tools, organizational charts, and team analytics is highly valuable.

## Feature Description
The Teams Management feature enables users to create, organize, and manage both human and AI agent teams within the Vibe DevSquad platform. This feature implements a complete team management solution including team creation, member assignment, hierarchy visualization, performance tracking, and permission management in a new Next.js project.

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

### Tier 1 Task - Team Management Infrastructure Setup

#### Subtask 1.1: Set up teams database schema
- [ ] Before starting, use Context7 MCP to fetch latest Supabase schema design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "database schema design"
- [ ] Use Perplexity MCP to research team management best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for team management database schema design and organizational hierarchy systems"
- [ ] Create `teams` table with fields: id, name, description, team_type (human, agent, mixed), created_at, updated_at, avatar_url, organization_id
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `team_members` table with fields: id, team_id, member_id, member_type (user, agent), role, joined_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `team_hierarchy` table with fields: id, parent_team_id, child_team_id, relationship_type
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `team_permissions` table with fields: id, team_id, resource_type, resource_id, permission_level
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Set up appropriate relationships and constraints between tables
- [ ] Create database indexes for performance optimization

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for team management
- [ ] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [ ] Use Perplexity MCP to research API design best practices for team management
  - [ ] Use command: `mcp3_perplexity_ask` with query: "REST API design patterns for team management and organizational hierarchy systems"
- [ ] Implement `/api/teams` route with GET (list) and POST (create) methods
- [ ] Implement `/api/teams/[id]` route with GET (detail), PUT (update), and DELETE methods
- [ ] Implement `/api/teams/[id]/members` route for managing team members
- [ ] Implement `/api/teams/[id]/hierarchy` route for managing team hierarchy
- [ ] Implement `/api/teams/[id]/permissions` route for managing team permissions

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Create team hierarchy visualization components
- [ ] Before starting, use Context7 MCP to fetch latest D3.js documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/d3/d3"` and topic: "hierarchy visualization"
- [ ] Use Perplexity MCP to research hierarchy visualization patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for organizational hierarchy visualization with D3.js and interactive team charts"
- [ ] Install D3.js for visualization: `npm install d3 @types/d3`
- [ ] Create `TeamHierarchyChart` component for visualizing team relationships
  - [ ] Use `/ui` command: "Create interactive team hierarchy chart with D3.js integration"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/visualization/hierarchy-chart.tsx`
- [ ] Implement zoom and pan functionality for large hierarchies
- [ ] Create interactive node selection and detail view
- [ ] Implement hierarchy manipulation through drag-and-drop

📎 Use Context7 MCP for D3.js documentation

#### Subtask 1.4: Create UI components for team management
- [ ] Before starting, use Context7 MCP to fetch latest React component design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/facebook/react"` and topic: "component design patterns"
- [ ] Use Perplexity MCP to research UI patterns for team management interfaces
  - [ ] Use command: `mcp3_perplexity_ask` with query: "UI design patterns for team management interfaces and organizational tools"
- [ ] Create `TeamList` component for displaying available teams
  - [ ] Use `/ui` command: "Create team list with grid layout and team cards"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/teams/team-list.tsx`
- [ ] Create `TeamDetail` component for viewing team information
  - [ ] Use `/ui` command: "Create team detail view with member list and statistics"
  - [ ] Reference: `/Magic Ui templates/teams/team-detail.tsx`
- [ ] Create `TeamForm` component for creating and editing teams
  - [ ] Use `/ui` command: "Create team creation form with validation and member selection"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/forms/team-form.tsx`
- [ ] Create `TeamMemberManagement` component for managing team members
  - [ ] Use `/ui` command: "Create team member management interface with role assignment"
  - [ ] Reference: `/Magic Ui templates/teams/member-management.tsx`
- [ ] Set up responsive layout with Tailwind CSS
- [ ] Follow Vibe DevSquad design system guidelines in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/vibe-devsquad/.aigent/design/vibe_devsquad_design_system.md`

📎 Use Magic UI MCP for component styling guidelines

✅ **Tier 1 Checkpoint**: Ensure all Tier 1 subtasks are complete and the database schema, API routes, hierarchy visualization, and UI components are properly implemented before proceeding to Tier 2

**🔄 Git Commit and Push After Tier 1:**
```bash
git add .
git commit -m "feat: implement Phase 6 Tier 1 - Teams Management infrastructure setup

- Set up teams database schema with hierarchy and permissions
- Created Next.js API routes for team management operations
- Built team hierarchy visualization components with D3.js
- Developed UI components for team management with Magic UI templates
- Configured responsive layout and component styling"
git push origin main
```

### Tier 2 Task - Team Management Business Logic

#### Subtask 2.1: Implement team creation and configuration
- [ ] Before starting, use Context7 MCP to fetch latest form validation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react-hook-form/react-hook-form"` and topic: "form validation"
- [ ] Use Perplexity MCP to research team configuration best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for team creation and configuration in organizational management systems"
- [ ] Create form validation for team creation (required fields, format validation)
- [ ] Implement team type selection with appropriate UI changes
- [ ] Create team avatar upload and generation
- [ ] Implement team configuration saving with optimistic UI updates
- [ ] Add error handling for failed operations with user feedback

📎 Use Supabase MCP for database operations with `mcp5_execute_sql`

#### Subtask 2.2: Implement team member management
- [ ] Before starting, use Context7 MCP to fetch latest user management documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/auth"` and topic: "user management"
- [ ] Use Perplexity MCP to research member management patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "User role management and member invitation patterns in team collaboration systems"
- [ ] Create member search and invitation interface
- [ ] Implement role assignment within teams
- [ ] Develop member removal functionality with confirmation
- [ ] Create bulk member operations (add, remove, change role)
- [ ] Implement member activity tracking

📎 Use Supabase MCP for member operations with `mcp5_execute_sql`

#### Subtask 2.3: Implement team hierarchy management
- [ ] Before starting, use Context7 MCP to fetch latest tree structure documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/d3/d3"` and topic: "tree structures"
- [ ] Use Perplexity MCP to research hierarchy management patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Organizational hierarchy management patterns and circular dependency prevention"
- [ ] Create parent-child team relationship creation
- [ ] Implement hierarchy visualization with collapsible nodes
- [ ] Develop hierarchy manipulation through UI
- [ ] Create validation for circular relationships
- [ ] Implement permission inheritance through hierarchy

📎 Use Supabase MCP for hierarchy operations with `mcp5_execute_sql`

#### Subtask 2.4: Implement team performance analytics
- [ ] Before starting, use Context7 MCP to fetch latest analytics documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/recharts/recharts"` and topic: "data visualization"
- [ ] Use Perplexity MCP to research performance analytics patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Team performance analytics and metrics visualization in organizational management systems"
- [ ] Create team performance metrics collection
- [ ] Implement performance dashboard with charts
- [ ] Develop comparison between teams
- [ ] Create historical performance tracking
- [ ] Implement performance alerts and notifications

📎 Use Operative.sh MCP for analytics visualization with `mcp7_web_eval_agent`

✅ **Tier 2 Checkpoint**: Ensure all Tier 2 subtasks are complete and team creation, member management, hierarchy visualization, and performance tracking work correctly before proceeding to Tier 3

**🔄 Git Commit and Push After Tier 2:**
```bash
git add .
git commit -m "feat: implement Phase 6 Tier 2 - Teams Management business logic

- Built team creation and configuration with validation
- Created member management with role assignment and bulk operations
- Implemented hierarchy management with circular dependency prevention
- Added performance analytics with dashboard and comparison features"
git push origin main
```

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance team visualization
- [ ] Before starting, use Context7 MCP to fetch latest UI design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindcss/tailwindcss"` and topic: "color design"
- [ ] Use Perplexity MCP to research team visualization patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Visual design patterns for team management interfaces and organizational charts"
- [ ] Add team card design with avatars and member count
- [ ] Implement visual distinction between team types (human: #3182CE, agent: #805AD5, mixed: #38A169)
- [ ] Create member role visualization with badges
- [ ] Add activity indicators for team status
- [ ] Implement performance metric sparklines

📎 Use Operative.sh MCP for visual confirmation with `mcp7_web_eval_agent`

#### Subtask 3.2: Implement responsive design optimizations
- [ ] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/w3c/css"` and topic: "responsive design"
- [ ] Use Perplexity MCP to research responsive design patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Responsive design patterns for team management interfaces and organizational tools"
- [ ] Test and optimize mobile layout (single column, collapsible sections)
- [ ] Create tablet layout (2 columns, side panel)
- [ ] Optimize desktop layout (multi-panel with hierarchy visualization)
- [ ] Ensure touch targets are appropriate size (min 44px×44px)
- [ ] Implement responsive hierarchy visualization

📎 Use Operative.sh MCP for breakpoint testing with `mcp7_web_eval_agent`

#### Subtask 3.3: Implement interaction polish
- [ ] Before starting, use Context7 MCP to fetch latest animation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/framer/motion"` and topic: "animations"
- [ ] Use Perplexity MCP to research interaction design patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Interaction design patterns for team management interfaces with animations and keyboard shortcuts"
- [ ] Add smooth animations for state changes (150ms transition)
- [ ] Create hover states for interactive elements
- [ ] Implement keyboard shortcuts for common actions
- [ ] Add drag-and-drop for team ordering and hierarchy management
- [ ] Create contextual menus for team actions

📎 Use Operative.sh MCP for interaction verification with `mcp7_web_eval_agent`

#### Subtask 3.4: Implement accessibility and performance optimizations
- [ ] Before starting, use Context7 MCP to fetch latest accessibility documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/w3c/wcag"` and topic: "accessibility guidelines"
- [ ] Use Perplexity MCP to research accessibility patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Accessibility patterns for team management interfaces and organizational tools with screen readers"
- [ ] Implement ARIA labels for screen readers
- [ ] Add keyboard navigation for all interactive elements
- [ ] Create high contrast mode support
- [ ] Implement lazy loading for large team lists
- [ ] Add performance monitoring for hierarchy rendering
- [ ] Optimize bundle size with code splitting

📎 Use Magic UI MCP for accessibility and performance guidelines

✅ **Tier 3 Checkpoint**: Ensure all Tier 3 subtasks are complete and the teams management interface is visually polished, responsive, accessible, and performs well with large team hierarchies before saying it's complete

**🔄 Git Commit and Push After Tier 3 (Phase 6 Complete):**
```bash
git add .
git commit -m "feat: complete Phase 6 - Teams Management UI polish and QA

- Enhanced team visualization with color coding and performance metrics
- Implemented responsive design optimizations for all screen sizes
- Added interaction polish with animations and keyboard shortcuts
- Implemented accessibility and performance optimizations
- Completed comprehensive QA verification through Operative.sh MCP"
git push origin main
```

---

## 🎉 Phase 6 Complete!
The Teams Management feature is now fully implemented with:
- ✅ Complete database schema and API infrastructure
- ✅ Team hierarchy visualization with D3.js
- ✅ Comprehensive UI components with Magic UI templates
- ✅ Team creation, member management, and hierarchy operations
- ✅ Performance analytics with dashboard and comparison features
- ✅ Responsive design and interaction polish
- ✅ Accessibility features and performance optimizations
- ✅ Comprehensive QA verification
