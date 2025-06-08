# 09. Planning Canvas and Research Hub

## Role & Background
**Senior FANG Engineer Profile**: Senior Research Engineer with 9+ years experience at Google or Meta, specializing in collaborative planning tools, knowledge management systems, and research interfaces. Experience with TypeScript, Next.js, and building interactive canvas applications. Background in knowledge graphs, collaborative editing, and AI-assisted research is highly valuable.

## Feature Description
The Planning Canvas and Research Hub feature provides a collaborative workspace for planning projects, conducting research, and organizing knowledge within the Vibe DevSquad platform. This feature implements a complete planning solution with interactive canvas, knowledge integration, AI-assisted research, and collaborative editing in a new Next.js project.

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

### Tier 1 Task - Planning Canvas Infrastructure Setup

#### Subtask 1.1: Set up planning canvas database schema
- [ ] Before starting, use Context7 MCP to fetch latest Supabase schema design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "database schema design"
- [ ] Use Perplexity MCP to research planning canvas best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for planning canvas database schema design and collaborative workspace data models"
- [ ] Create `canvases` table with fields: id, project_id, title, description, created_by, created_at, updated_at, version
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `canvas_elements` table with fields: id, canvas_id, element_type, content, position_x, position_y, width, height, style_json, created_at, updated_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `canvas_connections` table with fields: id, canvas_id, source_element_id, target_element_id, connection_type, path_points, style_json
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `canvas_collaborators` table with fields: id, canvas_id, user_id, permission_level, joined_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Set up appropriate relationships and constraints between tables
- [ ] Create database indexes for performance optimization

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for planning canvas
- [ ] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [ ] Use Perplexity MCP to research canvas API patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "API design patterns for collaborative canvas applications and real-time synchronization"
- [ ] Implement `/api/canvases` route with GET (list) and POST (create) methods
- [ ] Implement `/api/canvases/[id]` route with GET (detail), PUT (update), and DELETE methods
- [ ] Implement `/api/canvases/[id]/elements` route for managing canvas elements
- [ ] Implement `/api/canvases/[id]/connections` route for managing connections
- [ ] Implement `/api/canvases/[id]/collaborators` route for managing collaborators

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Set up interactive canvas framework
- [ ] Before starting, use Context7 MCP to fetch latest React Flow documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/reactflow/reactflow"` and topic: "canvas implementation"
- [ ] Use Perplexity MCP to research interactive canvas patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Interactive canvas implementation patterns with React Flow and collaborative editing"
- [ ] Install React Flow for canvas: `npm install reactflow`
- [ ] Create Canvas container component:
  ```typescript
  // src/components/canvas/PlanningCanvas.tsx
  import { useCallback } from 'react';
  import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
  } from 'reactflow';
  import 'reactflow/dist/style.css';
  
  const PlanningCanvas = ({ initialNodes, initialEdges }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    // ...
  }
  ```
- [ ] Create custom node types for different planning elements
- [ ] Implement drag and drop functionality
- [ ] Set up canvas persistence and auto-save

📎 Use Context7 MCP for React Flow documentation

#### Subtask 1.4: Create UI components for planning interface
- [ ] Before starting, use Context7 MCP to fetch latest Magic UI documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/shadcn/ui"` and topic: "component patterns"
- [ ] Use Perplexity MCP to research planning interface patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "UI/UX patterns for planning canvas interfaces and collaborative workspace design"
- [ ] Use Magic UI MCP to create `CanvasList` component for displaying available canvases
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "canvas list" and context: "Planning canvas list component with grid layout and search"
- [ ] Use Magic UI MCP to create `CanvasToolbar` component with editing tools
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "toolbar" and context: "Canvas toolbar with drawing tools, shapes, and editing controls"
- [ ] Use Magic UI MCP to create `ElementPanel` component for adding new elements
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "element panel" and context: "Draggable element panel with different planning element types"
- [ ] Use Magic UI MCP to create `ElementProperties` component for editing element properties
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "properties panel" and context: "Properties panel for editing element styles, content, and connections"
- [ ] Set up responsive layout with Tailwind CSS
- [ ] Reference Magic UI templates in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/.aigent/design/Magic Ui templates/agent-template`
- [ ] Reference Magic UI templates in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/`
- [ ] Follow Vibe DevSquad design system guidelines in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/vibe-devsquad/.aigent/design/vibe_devsquad_design_system.md`

📎 Use Magic UI MCP for component styling guidelines

**⚠️ TIER 1 CHECKPOINT:** Do not proceed to Tier 2 until ALL Tier 1 subtasks are marked complete [x]

**🔄 Git Commit and Push Instructions:**
After completing all Tier 1 subtasks, commit and push your changes:
```bash
git add .
git commit -m "Phase 9 Tier 1: Planning canvas infrastructure setup complete"
git push origin main
```

### Tier 2 Task - Planning Canvas Business Logic and Integration

#### Subtask 2.1: Implement canvas element management
- [ ] Before starting, use Context7 MCP to fetch latest React Flow element management documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/reactflow/reactflow"` and topic: "custom nodes and elements"
- [ ] Use Perplexity MCP to research canvas element management patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Canvas element management patterns for collaborative planning tools and rich text editing"
- [ ] Create element creation functionality for different types (note, task, research, image)
- [ ] Implement element editing with rich text support
- [ ] Develop element positioning and resizing
- [ ] Create element styling options
- [ ] Implement element grouping and selection
- [ ] Add error handling for failed operations with user feedback

📎 Use Supabase MCP for real-time element updates with `mcp5_execute_sql` command

#### Subtask 2.2: Implement connection management
- [ ] Before starting, use Context7 MCP to fetch latest React Flow connection documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/reactflow/reactflow"` and topic: "edges and connections"
- [ ] Use Perplexity MCP to research connection management patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Connection management patterns for planning canvas applications and visual relationship modeling"
- [ ] Create connection creation between elements
- [ ] Implement connection styling options
- [ ] Develop connection path editing
- [ ] Create connection labeling
- [ ] Implement connection validation

📎 Use Supabase MCP for real-time connection updates with `mcp5_execute_sql` command

#### Subtask 2.3: Implement AI-assisted research integration
- [ ] Before starting, use Context7 MCP to fetch latest AI integration documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/openai/openai-node"` and topic: "AI integration patterns"
- [ ] Use Perplexity MCP to research AI-assisted research patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "AI-assisted research integration patterns for planning tools and knowledge graph generation"
- [ ] Create research query interface
- [ ] Implement research result visualization
- [ ] Develop automatic element creation from research
- [ ] Create citation and source tracking
- [ ] Implement knowledge graph generation

📎 Use Task Master MCP for research assistance with `mcp6_add_task` command

#### Subtask 2.4: Implement collaborative editing
- [ ] Before starting, use Context7 MCP to fetch latest Supabase Realtime documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "realtime collaboration"
- [ ] Use Perplexity MCP to research collaborative editing patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Real-time collaborative editing patterns for canvas applications and conflict resolution strategies"
- [ ] Create real-time collaboration using Supabase Realtime
- [ ] Implement user presence indicators
- [ ] Develop conflict resolution for simultaneous edits
- [ ] Create change history and versioning
- [ ] Implement commenting on elements

📎 Use Supabase MCP for real-time collaboration with `mcp5_execute_sql` command

**⚠️ TIER 2 CHECKPOINT:** Do not proceed to Tier 3 until ALL Tier 2 subtasks are marked complete [x]

**🔄 Git Commit and Push Instructions:**
After completing all Tier 2 subtasks, commit and push your changes:
```bash
git add .
git commit -m "Phase 9 Tier 2: Planning canvas business logic and integration complete"
git push origin main
```

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance canvas visualization
- [ ] Before starting, use Context7 MCP to fetch latest animation and visualization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/framer/motion"` and topic: "canvas animations"
- [ ] Use Perplexity MCP to research canvas visualization best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Canvas visualization best practices for planning tools and interactive element animations"
- [ ] Add element styling with customizable colors and borders
- [ ] Implement connection styling with different line types
- [ ] Create smooth animations for element movement (200ms ease-out)
- [ ] Add visual feedback for interactions
- [ ] Implement minimap for navigation
- [ ] Create zoom controls with presets

📎 Use Operative.sh MCP for QA verification: `mcp7_web_eval_agent` to visually confirm canvas visualization

#### Subtask 3.2: Implement responsive design optimizations
- [ ] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindcss/tailwindcss"` and topic: "responsive design"
- [ ] Use Perplexity MCP to research responsive canvas design patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Responsive design patterns for canvas applications and touch-optimized interactions"
- [ ] Test and optimize mobile layout (simplified controls, touch gestures)
- [ ] Create tablet layout (side panel, touch-optimized)
- [ ] Optimize desktop layout (full feature set, keyboard shortcuts)
- [ ] Ensure touch targets are appropriate size (min 44px×44px)
- [ ] Implement responsive toolbar positioning

📎 Use Operative.sh MCP for QA verification: `mcp7_web_eval_agent` to test all breakpoints

#### Subtask 3.3: Implement interaction polish
- [ ] Before starting, use Context7 MCP to fetch latest interaction design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react/react"` and topic: "event handling and interactions"
- [ ] Use Perplexity MCP to research interaction polish patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Interaction polish patterns for canvas applications including keyboard shortcuts and gesture support"
- [ ] Add keyboard shortcuts for common actions
- [ ] Implement multi-select and bulk operations
- [ ] Create context menus for quick actions
- [ ] Develop snap-to-grid functionality
- [ ] Implement undo/redo functionality
- [ ] Add gesture support for touch devices

📎 Use Operative.sh MCP for QA verification: `mcp7_web_eval_agent` to verify interactions

#### Subtask 3.4: Implement performance optimizations
- [ ] Before starting, use Context7 MCP to fetch latest React performance optimization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react/react"` and topic: "performance optimization"
- [ ] Use Perplexity MCP to research canvas performance patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Canvas performance optimization patterns for large-scale collaborative applications and virtualization techniques"
- [ ] Add virtualization for large canvases
- [ ] Implement element culling for off-screen items
- [ ] Create progressive loading for complex canvases
- [ ] Develop optimized rendering for connections
- [ ] Implement efficient state management
- [ ] Add background saving and synchronization
- [ ] Utilize Next.js server components where appropriate for improved performance

📎 Use Operative.sh MCP for QA verification: `mcp7_web_eval_agent` to verify performance with complex canvases

**⚠️ TIER 3 CHECKPOINT:** Do not proceed until ALL Tier 3 subtasks are marked complete [x]

**🔄 Git Commit and Push Instructions:**
After completing all Tier 3 subtasks, commit and push your changes:
```bash
git add .
git commit -m "Phase 9 Tier 3: Planning canvas UI polish and QA complete"
git push origin main
```

## Phase 9 Completion Summary

Upon completion of all tiers, the Planning Canvas and Research Hub will provide:

### ✅ **Infrastructure Features:**
- Complete database schema for canvases, elements, connections, and collaborators
- RESTful API routes for all canvas operations
- Interactive React Flow-based canvas framework
- Responsive UI components with Magic UI styling

### ✅ **Business Logic Features:**
- Comprehensive element management with rich text editing
- Advanced connection management with styling options
- AI-assisted research integration with knowledge graphs
- Real-time collaborative editing with conflict resolution

### ✅ **Quality Assurance Features:**
- Enhanced visualization with animations and styling
- Responsive design optimized for mobile, tablet, and desktop
- Polished interactions with keyboard shortcuts and gestures
- Performance optimizations for large-scale collaborative use

### ✅ **Technical Achievements:**
- Scalable canvas architecture supporting hundreds of elements
- Real-time synchronization across multiple collaborators
- AI-powered research integration with automatic element generation
- Production-ready performance with virtualization and optimization

**🎉 Phase 9 Status: COMPLETE** - Planning Canvas and Research Hub ready for production deployment with comprehensive collaborative planning capabilities.
