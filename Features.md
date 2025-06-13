# 📋 Vibe DevSquad Platform Features - User Manual

*Last Updated: Phase 12 AI Agent Marketplace Complete - December 2025*

This document serves as a comprehensive guide to all features available in the Vibe DevSquad platform. Each feature is documented with its location, purpose, and usage instructions.

---

## 🏠 Dashboard Overview

### Location: `/dashboard`
**What it does**: Central hub for accessing all platform features with responsive navigation

**Features Available:**
- **Responsive Sidebar Navigation**: Collapsible menu with icons and labels
- **Main Content Area**: Dynamic content based on selected section
- **Mobile-First Design**: Optimized for all screen sizes
- **Quick Access Icons**: Direct navigation to key features
- **Planning Agent Interface**: Advanced AI planning capabilities at `/dashboard/planning`
- **MCP Registry**: Comprehensive plugin management system at `/dashboard/mcps`
- **AI Agent Marketplace**: Discover, install, and manage AI agents at `/dashboard/marketplace`

**How to Use:**
1. Navigate to `/dashboard` after login
2. Use sidebar menu to access different sections
3. Click hamburger menu (≡) on mobile to toggle navigation
4. Icons provide visual context for each section
5. Access AI Planning features via dedicated planning section
6. Manage MCPs (Machine Collaboration Protocols) via MCP Registry section
7. Browse and install AI agents from the marketplace

---

## 🎓 Onboarding Experience (NEW in Phase 8 - 66% Complete)

### **Interactive Onboarding Flow**
**Location**: `/onboarding`
**What it does**: Guides new users through platform setup with a comprehensive 6-step process

**Features Implemented:**
- **Step-by-Step Wizard**: Progressive onboarding with visual progress tracking
- **Persistence**: Zustand state management saves progress automatically
- **Responsive Design**: Full viewport layout with no scrolling required
- **Dark Mode Support**: Proper text visibility in both light and dark modes
- **Animated Transitions**: Smooth Framer Motion animations between steps

**Onboarding Steps:**
1. **Welcome Step**: Platform introduction and overview
2. **Project Setup**: Guided project creation with validation
3. **Agent Team**: AI agent selection and configuration
4. **Task Management**: Interactive demo of task features
5. **Communication**: Preferences and notification setup
6. **Next Steps**: Resources and completion celebration

### **Interactive Tutorials (Shepherd.js Integration)**
**Location**: Available throughout the platform
**What it does**: Provides contextual guided tours for key features

**Tour Types:**
- **Welcome Tour**: Platform introduction with UI highlights
- **Project Creation Tour**: Step-by-step project setup guidance
- **Task Management Tour**: Interactive task creation walkthrough
- **Collaboration Tour**: Team features and communication setup

**Tour Features:**
- **Element Highlighting**: Focus on specific UI elements
- **Action Validation**: Ensures users complete required steps
- **Progress Tracking**: Saves tour progress in localStorage
- **Skip Controls**: Users can skip or pause tours
- **Contextual Help**: Tooltips and help buttons throughout

### **Celebration Effects**
**Location**: Integrated throughout onboarding flow
**What it does**: Provides positive reinforcement during onboarding

**Celebration Types:**
- **Completion Modal**: Confetti animation on onboarding completion
- **Step Badges**: Visual rewards for completing steps
- **Milestone Notifications**: Achievement popups at key points
- **Progress Animations**: Smooth transitions and visual feedback

### **Analytics Integration (Planned)**
**Location**: `/onboarding/analytics`
**What it does**: Will track onboarding metrics and user behavior

**Planned Features:**
- **Conversion Funnel**: Track user progress through steps
- **Drop-off Analysis**: Identify where users abandon onboarding
- **Time Tracking**: Measure time spent on each step
- **A/B Testing**: Test different onboarding variations

---

## 🎨 Planning Canvas (NEW in Phase 9) ✅ COMPLETE

### **Interactive Visual Planning Platform**
**Location**: `/dashboard/planning` → "Planning Canvas" tab
**What it does**: Comprehensive collaborative visual planning with real-time editing, performance optimization, and responsive design

### 🏗️ **Core Canvas Features**

#### **1. Visual Planning Elements**
**Location**: Main canvas area with toolbar controls
**What it does**: Create and manage visual planning elements with drag-and-drop functionality

**Available Node Types:**
- **Task Nodes**: Actionable items with priority and assignment tracking
- **Idea Nodes**: Conceptual elements for brainstorming and planning
- **Note Nodes**: Documentation and reference materials
- **Goal Nodes**: High-level objectives and milestones (future enhancement)

**Node Features:**
- **Inline Text Editing**: Double-click any node to edit text directly
- **Comprehensive Styling**: Background colors, borders, typography, shapes, opacity
- **Auto-Save**: Changes save automatically as you type
- **Responsive Design**: Touch-optimized for mobile and tablet devices
- **Visual Feedback**: Hover effects, selection highlighting, drag indicators

**How to Use:**
1. Navigate to `/dashboard/planning` and select "Planning Canvas" tab
2. Use toolbar to add new nodes (Task, Idea, Note)
3. Double-click any node to edit text inline
4. Drag nodes to reposition on canvas
5. Use style panel to customize appearance
6. Connect nodes by dragging from connection points

#### **2. Connection System**
**Location**: Between nodes on canvas with connection controls
**What it does**: Create and manage relationships between planning elements

**Connection Features:**
- **Visual Connections**: Bezier curves with customizable styling
- **Connection Labels**: Double-click edges to add descriptive labels
- **Path Editing**: Click paths in edit mode to add control points
- **Connection Validation**: Prevents invalid connections (self-loops, duplicates)
- **Styling Options**: Color, thickness, arrow types, animation effects
- **Real-time Validation**: Live feedback on connection validity

**Connection Types:**
- **Dependencies**: Task relationships and prerequisites
- **Associations**: Idea connections and concept links
- **References**: Note linkages and documentation trails
- **Custom**: User-defined relationship types

**How to Use:**
1. Hover over node edge to see connection points
2. Drag from one node to another to create connection
3. Double-click connection label to edit
4. Use Edge Style Panel to customize appearance
5. Enable path editing mode to add control points
6. Delete connections using context menu or backspace

### 🤝 **Real-Time Collaboration Features**

#### **3. Multi-User Editing**
**Location**: Automatic when multiple users access same canvas
**What it does**: Seamless real-time collaboration with conflict resolution

**Collaboration Features:**
- **Live User Presence**: See who's online with avatar indicators
- **Real-time Cursors**: Track other users' cursor positions and selections
- **Simultaneous Editing**: Multiple users can edit different elements
- **Conflict Resolution**: Automatic conflict detection and resolution
- **Selection Highlighting**: See what other users have selected
- **Connection Status**: Live indicator of collaboration connection

**Presence Indicators:**
- **User List**: Collapsible panel showing all active users
- **Online Status**: Green indicators for active collaborators
- **Cursor Tracking**: Real-time cursor positions with user names
- **Activity Indicators**: Show recent user actions and changes

**How to Use:**
1. Share canvas URL with team members
2. See live presence indicators in top-right corner
3. Click presence panel to expand user list
4. Watch real-time cursors and selections
5. Collaborate simultaneously without conflicts

#### **4. Version Control and History**
**Location**: Version History panel (accessible via toolbar)
**What it does**: Complete change tracking with point-in-time restoration

**Version Features:**
- **Automatic Snapshots**: Captures canvas state at key moments
- **Change Tracking**: Detailed audit trail of all modifications
- **Version Comparison**: Side-by-side comparison of different versions
- **Point-in-Time Restore**: Restore canvas to any previous state
- **User Attribution**: Track who made what changes when
- **Export Capabilities**: Download version history for backup

**History Timeline:**
- **Visual Timeline**: Chronological view of all changes
- **Change Descriptions**: Detailed descriptions of modifications
- **User Actions**: Attribution for each change with timestamps
- **Filtering Options**: Filter by user, action type, or date range

**How to Use:**
1. Access Version History from toolbar
2. Browse timeline of changes
3. Click any version to preview
4. Use "Restore" to revert to previous state
5. Compare versions side-by-side
6. Export history for documentation

#### **5. Commenting and Discussion**
**Location**: Comment pins on canvas and comment panel
**What it does**: Contextual discussions with positioning and threading

**Comment Features:**
- **Positioned Comments**: Pin comments to specific canvas locations
- **Canvas Comments**: General discussions about entire canvas
- **Threaded Replies**: Organized conversation threads
- **Real-time Sync**: Live comment updates across all users
- **Comment Resolution**: Mark comments as resolved when addressed
- **Filtering**: View all, resolved, or unresolved comments

**Comment Types:**
- **Pin Comments**: Attached to specific canvas coordinates
- **Element Comments**: Associated with specific nodes or connections
- **General Comments**: Canvas-level discussions
- **Review Comments**: Structured feedback and approval workflows

**How to Use:**
1. Right-click canvas to add positioned comment
2. Use comment panel for general discussions
3. Reply to comments to create threads
4. Mark comments as resolved when complete
5. Filter comments by status or author

### ✨ **Advanced Interaction Features**

#### **6. Keyboard Shortcuts System**
**Location**: Available throughout canvas interface
**What it does**: Professional-grade keyboard shortcuts for efficient workflow

**Available Shortcuts:**
- **Ctrl/Cmd + C**: Copy selected elements
- **Ctrl/Cmd + V**: Paste elements (with smart positioning)
- **Ctrl/Cmd + X**: Cut selected elements
- **Ctrl/Cmd + Z**: Undo last action
- **Ctrl/Cmd + Y**: Redo last undone action
- **Ctrl/Cmd + A**: Select all elements
- **Ctrl/Cmd + D**: Duplicate selected elements
- **Ctrl/Cmd + G**: Group selected elements
- **Delete/Backspace**: Delete selected elements
- **Space + Drag**: Pan canvas view
- **Ctrl/Cmd + Scroll**: Zoom in/out

**Shortcut Features:**
- **Conflict Prevention**: Smart detection of input focus to prevent conflicts
- **Context Awareness**: Shortcuts adapt based on current selection
- **Visual Hints**: Tooltip display of available shortcuts
- **Customization**: Configurable shortcut assignments (future enhancement)

#### **7. Multi-Select and Selection Tools**
**Location**: Canvas interaction system
**What it does**: Advanced selection capabilities for bulk operations

**Selection Features:**
- **Ctrl/Cmd + Click**: Add/remove individual items from selection
- **Shift + Click**: Range selection between items
- **Drag Selection**: Rectangle selection for multiple items
- **Selection Persistence**: Maintain selection across operations
- **Visual Feedback**: Clear indication of selected items
- **Bulk Operations**: Perform actions on multiple selected items

**Selection Tools:**
- **Select All**: Ctrl/Cmd + A for complete selection
- **Invert Selection**: Select everything except current selection
- **Clear Selection**: Click empty canvas area or press Escape
- **Selection Statistics**: Count and summary of selected items

#### **8. Context Menus and Quick Actions**
**Location**: Right-click menus throughout canvas
**What it does**: Context-sensitive actions and quick access to features

**Context Menu Features:**
- **Element-Specific Actions**: Different menus for nodes vs. connections
- **Intelligent Positioning**: Menus stay within viewport bounds
- **Keyboard Shortcuts**: Display shortcuts alongside menu items
- **Nested Submenus**: Organized actions in logical groups
- **Quick Actions**: One-click access to common operations

**Available Actions:**
- **Copy/Paste/Delete**: Standard clipboard operations
- **Duplicate**: Create copies with smart positioning
- **Send to Front/Back**: Layer management for overlapping elements
- **Group/Ungroup**: Organize elements into logical groups
- **Lock/Unlock**: Prevent accidental modification
- **Add Comment**: Quick comment addition
- **Connection Tools**: Create, edit, or remove connections

#### **9. Snap-to-Grid and Alignment**
**Location**: Grid overlay and alignment tools
**What it does**: Precise positioning and professional alignment

**Snap Features:**
- **Grid Snapping**: Align elements to visible grid
- **Element Snapping**: Snap to other element edges and centers
- **Visual Guides**: Real-time snap feedback with colored guides
- **Smart Snapping**: Distance-based snapping with configurable threshold
- **Multi-Element Alignment**: Align multiple selected elements
- **Distribution Tools**: Evenly distribute elements (future enhancement)

**Grid Options:**
- **Grid Visibility**: Toggle grid display on/off
- **Grid Size**: Configurable grid spacing (8px, 16px, 24px, 32px)
- **Snap Threshold**: Adjustable snap sensitivity
- **Measurement Overlay**: Distance and alignment indicators

#### **10. Gesture Support for Touch Devices**
**Location**: Touch-enabled canvas interactions
**What it does**: Native mobile and tablet gesture support

**Supported Gestures:**
- **Pan**: Single finger drag to navigate canvas
- **Pinch-to-Zoom**: Two finger pinch for zoom control
- **Tap**: Select elements and activate controls
- **Double-Tap**: Quick zoom to fit or edit elements
- **Long-Press**: Context menu activation on touch devices
- **Swipe**: Navigate between canvas views (future enhancement)

**Touch Optimizations:**
- **44px Minimum Targets**: All interactive elements meet accessibility standards
- **Touch Handles**: Special controls for better mobile manipulation
- **Velocity Tracking**: Smooth momentum scrolling and gestures
- **Touch Feedback**: Visual confirmation of touch interactions

### ⚡ **Performance and Optimization Features**

#### **11. Virtualization and Scalability**
**Location**: Automatic performance optimization system
**What it does**: Handle large canvases with thousands of elements efficiently

**Performance Features:**
- **Element Virtualization**: Only render visible elements (70-90% performance gain)
- **Spatial Partitioning**: Intelligent chunking for efficient element management
- **Progressive Loading**: Priority-based loading of canvas content
- **Level-of-Detail**: Simplified rendering for distant elements
- **Viewport Culling**: Hide off-screen elements from rendering
- **Memory Management**: Efficient cleanup and garbage collection

**Scalability Achievements:**
- **10,000+ Elements**: Smooth performance with massive canvases
- **60fps Rendering**: Consistent frame rate at all zoom levels
- **Sub-second Loading**: Fast initial load times for complex projects
- **Mobile Performance**: Optimized for lower-powered devices
- **Network Efficiency**: Minimal bandwidth usage for real-time sync

#### **12. Background Synchronization**
**Location**: Automatic background process
**What it does**: Seamless data synchronization with offline support

**Sync Features:**
- **Auto-Save**: Continuous saving without user intervention
- **Offline Queue**: Queue changes when network is unavailable
- **Conflict Resolution**: Intelligent merging of simultaneous changes
- **Retry Logic**: Exponential backoff for failed sync operations
- **Bandwidth Optimization**: Batched operations to reduce network usage
- **Real-time Indicators**: Live sync status and connection health

**Offline Capabilities:**
- **Local Storage**: Cache canvas state for offline work
- **Change Detection**: Track modifications for later sync
- **Conflict Alerts**: Notify users of merge conflicts
- **Manual Sync**: Force sync operations when needed

#### **13. Performance Monitoring**
**Location**: Performance monitor panel (toggleable)
**What it does**: Real-time performance metrics and optimization insights

**Monitored Metrics:**
- **Frame Rate (FPS)**: Real-time rendering performance
- **Render Time**: Time to render each frame
- **Memory Usage**: JavaScript heap and DOM memory consumption
- **Cache Hit Rate**: Efficiency of caching systems
- **Network Latency**: Real-time collaboration response times
- **Element Count**: Current and rendered element statistics

**Performance Alerts:**
- **FPS Degradation**: Warnings when frame rate drops below 30fps
- **Memory Limits**: Alerts for high memory usage
- **Network Issues**: Notifications for sync problems
- **Performance Score**: Overall performance rating (0-100)
- **Optimization Suggestions**: Recommendations for better performance

### 📱 **Responsive Design Features**

#### **14. Mobile and Tablet Optimization**
**Location**: Responsive design throughout canvas interface
**What it does**: Optimized experience across all device types

**Mobile Features:**
- **Responsive Toolbar**: Adaptive controls for mobile screens
- **Touch Targets**: 44px minimum size for accessibility
- **Collapsible Panels**: Space-efficient mobile interface
- **Swipe Navigation**: Native mobile interaction patterns
- **Orientation Support**: Works in both portrait and landscape
- **Mobile Context Menus**: Long-press activation for touch devices

**Tablet Features:**
- **Hybrid Interface**: Combines desktop features with touch optimization
- **Split Panels**: Efficient use of tablet screen real estate
- **Touch and Stylus**: Support for both finger and stylus input
- **Keyboard Shortcuts**: Full keyboard support when connected
- **Hover Simulation**: Touch-based hover state simulation

**Breakpoint Design:**
- **Mobile**: <768px with single-column layout
- **Tablet**: 768px-1024px with adaptive two-column layout
- **Desktop**: >1024px with full multi-panel interface
- **Ultra-wide**: >1440px with expanded workspace

### 🔧 **Technical Infrastructure**

#### **Canvas Architecture:**
- **React Flow Engine**: High-performance canvas rendering
- **TypeScript**: Full type safety throughout codebase
- **Custom Hooks**: Modular architecture for all features
- **Performance Optimization**: Virtualization and progressive loading
- **Real-time Sync**: Supabase Realtime integration
- **State Management**: Optimized React state with batching

#### **Database Schema:**
- **Canvas Data**: Nodes, edges, and canvas metadata
- **Collaboration**: User presence, cursors, and real-time updates
- **Version Control**: Snapshots, changes, and history tracking
- **Comments**: Positioned comments with threading support
- **Settings**: User preferences and canvas configurations

#### **Security Features:**
- **User Authentication**: Required for all canvas operations
- **Row-Level Security**: Database-level access control
- **Real-time Authorization**: Validated access for collaboration
- **Input Validation**: Comprehensive data validation and sanitization
- **Audit Logging**: Complete tracking of all user actions

---

## 📊 Analytics Dashboard (REDESIGNED in Phase 11)

### Location: `/dashboard/analytics`
**What it does**: Comprehensive analytics and insights dashboard with modern, professional UI

**Features Available:**
- **Key Metrics Cards**: 
  - Total Revenue with trend sparklines
  - Active Users with growth indicators
  - Conversion Rate with visual progress
  - Total Sales with change percentages
- **Interactive Charts**:
  - Revenue Trend (Area Chart)
  - Traffic Sources (Pie Chart)
  - User Activity (Bar Chart)
  - Performance Metrics (Line Chart)
- **Tabbed Navigation**:
  - Overview: Combined metrics view
  - Revenue: Financial analytics
  - Traffic: User behavior insights
  - Performance: System metrics
- **Quick Actions**:
  - Quick Setup for widget configuration
  - Generate Report for instant insights
  - Schedule Reports for automation
  - Settings for preferences
- **Responsive Design**: Adapts seamlessly to all screen sizes
- **Dark Mode Support**: Full theme compatibility
- **Fixed Header**: Sticky navigation with action buttons
- **Smooth Scrolling**: Single scroll container without conflicts

**How to Use:**
1. Navigate to `/dashboard/analytics` from the sidebar
2. Use the time range selector to filter data (24h, 7d, 30d, 90d)
3. Click tabs to switch between different analytics views
4. Monitor key metrics in the top cards section
5. Analyze trends using interactive charts
6. Use quick actions for common tasks
7. Click "Manage" to access advanced settings

**Technical Implementation:**
- Built with React and TypeScript
- Charts powered by Recharts library
- Styled with Tailwind CSS
- Responsive grid layouts
- Optimized performance with proper component structure

---

## 💻 WebContainer Workspace (NEW in Phase 10 - 85% Complete)

### **In-Browser Development Environment**
**Location**: `/dashboard/workspace`
**What it does**: Provides a full-featured development environment directly in the browser with file editing, terminal access, and AI assistance

**Core Features Implemented:**
- **Monaco Editor Integration**: Full-featured code editor with syntax highlighting and IntelliSense
- **File Explorer**: Navigate and manage project files with tree view
- **Terminal Emulation**: Full terminal access via Xterm.js
- **AI Interaction Panel**: Integrated AI assistance for code suggestions and help
- **Performance Monitoring**: Real-time FPS, memory, and render time tracking
- **Error Boundaries**: Graceful error handling preventing workspace crashes

**File Management:**
- **Create Files/Folders**: Right-click context menu or toolbar buttons
- **Edit Files**: Click to open in Monaco editor with syntax highlighting
- **Delete Files**: Right-click delete with confirmation
- **Rename Files**: Right-click rename with inline editing
- **File Icons**: Visual file type indicators
- **Search**: Quick file search functionality

**Code Editing:**
- **Syntax Highlighting**: Support for 50+ languages
- **IntelliSense**: Auto-completion and suggestions
- **Multi-Tab Support**: Open multiple files simultaneously
- **Auto-Save**: Configurable auto-save functionality
- **Find & Replace**: Ctrl/Cmd+F for search, Ctrl/Cmd+H for replace
- **Code Folding**: Collapse/expand code blocks
- **Minimap**: Visual code overview
- **Themes**: Dark and light theme support

**Terminal Integration:**
- **Multiple Terminals**: Create and manage multiple terminal sessions
- **Command History**: Up/down arrows for command history
- **Copy/Paste**: Full clipboard support
- **ANSI Colors**: Proper color output support
- **Resize**: Draggable panel for terminal sizing
- **Clear**: Ctrl+L to clear terminal

**AI Assistance Panel:**
- **Code Suggestions**: Get AI-powered code completions
- **Error Explanations**: Understand and fix errors
- **Code Reviews**: AI-assisted code review
- **Documentation**: Generate docs from code
- **Refactoring**: AI-suggested improvements
- **Q&A**: Ask questions about your code

**Performance Monitoring:**
- **FPS**: Frames per second for UI smoothness
- **Memory Usage**: Browser memory consumption
- **Render Time**: Component render performance
- **Network Activity**: API call monitoring
- **Error Rate**: Track and log errors

**Recent UI Improvements:**
- **Header Cut-offs**: All workspace headers now fully visible
- **Scroll Behavior**: Proper overflow handling in all panels
- **Layout Stability**: Fixed flex layout preventing content shifts
- **Error Recovery**: Enhanced error boundaries with recovery options

**Technical Enhancements:**
- **WebContainerError Class**: Typed errors with context
- **Operation Timeouts**: Prevent hanging operations
- **Retry Logic**: Automatic retry with exponential backoff
- **Health Checks**: Verify container readiness
- **Performance Timing**: Track all operation durations

---

## 🔗 IDE Integrations (NEW in Phase 7)

### **Universal VS Code Extension**
**Location**: VS Code, Cursor, or Windsurf Extensions Marketplace
**What it does**: Brings Vibe DevSquad AI capabilities directly into your IDE

**Features:**
- **AI Chat Interface**: Streaming AI responses with modern UI
- **Quick Actions**: One-click file analysis, project analysis, task creation
- **WebSocket Bridge**: Real-time connection to Vibe DevSquad platform
- **Cross-IDE Support**: Single extension works in VS Code, Cursor, and Windsurf
- **Cursor-Style UI**: Modern dark theme matching Cursor's design language

**How to Install:**
```bash
# VS Code
code --install-extension vibe-devsquad.vibe-devsquad-vscode-extension

# Cursor
cursor --install-extension vibe-devsquad.vibe-devsquad-vscode-extension

# Windsurf
windsurf --install-extension vibe-devsquad.vibe-devsquad-vscode-extension
```

### **MCP Servers for Enhanced AI**
**Location**: npm registry and GitHub
**What it does**: Provides Model Context Protocol integration for advanced AI features

**Available MCP Servers:**
1. **Cursor MCP Server** (`@vibedevsquad/cursor-mcp-server`)
   - 7 specialized tools for development workflows
   - Streaming support for real-time responses
   - Auto-reconnection with exponential backoff

2. **Windsurf MCP Extension**
   - 10 comprehensive tools including collaboration
   - Windsurf-specific command execution
   - Full TypeScript implementation with validation

**Installation:**
```bash
# Cursor MCP Server
npm install -g @vibedevsquad/cursor-mcp-server

# Or use the automated installer
npm install -g @vibedevsquad/extension-installer
vibe-install --all
```

### **Automated Installer System**
**Location**: npm package `@vibedevsquad/extension-installer`
**What it does**: Automatically detects and installs extensions across all supported IDEs

**Features:**
- **IDE Auto-Detection**: Finds VS Code, Cursor, Windsurf installations
- **Smart Installation**: Checks existing versions, supports force reinstall
- **Cross-Platform**: Works on Windows, macOS, and Linux
- **Combined Install**: Can install both MCP servers and extensions

**Commands:**
```bash
# Install globally
npm install -g @vibedevsquad/extension-installer

# Install extension to all detected IDEs
vibe-install --all

# Install to specific IDE
vibe-install --ide cursor

# Uninstall from all IDEs
vibe-uninstall --all
```

---

## 🤖 AI Planning Agent

### Location: `/dashboard/planning` → "Planning Agent" tab
**What it does**: Interactive AI planning assistant with real-time streaming responses

**Features:**
- **Streaming Responses**: See AI responses as they're generated
- **Context Awareness**: Automatically includes workspace and file context
- **Message History**: Review and regenerate previous responses
- **Quick Actions**: Pre-configured prompts for common planning tasks
- **Dark Theme UI**: Consistent with platform design
- **Planning Canvas Integration**: Seamless integration with visual planning canvas

**How to Use:**
1. Navigate to `/dashboard/planning` and select "Planning Agent" tab
2. Type your planning question or request
3. Watch as AI streams the response in real-time
4. Use quick action buttons for common tasks
5. Click regenerate to get alternative responses
6. Switch to Planning Canvas tab to visualize AI suggestions

---

## 📋 Task Management System

### Location: `/dashboard/tasks`
**What it does**: Complete task management with Kanban board, filtering, and advanced features

## 🎯 Core Task Features

### **1. Kanban Board**
**Location**: Main area of `/dashboard/tasks`
**What it does**: Visual task management with 5 status columns and drag-and-drop functionality

**Columns Available:**
- **Backlog**: New tasks awaiting prioritization
- **To Do**: Ready to start, prioritized tasks
- **In Progress**: Currently active tasks
- **Review**: Completed tasks awaiting review
- **Done**: Fully completed and approved tasks

**Drag-and-Drop Features:**
- **@dnd-kit Integration**: Professional drag-and-drop with accessibility support
- **Visual Feedback**: Hover states and drop indicators during drag operations
- **Touch Support**: Mobile-friendly drag interactions with custom handles
- **Collision Detection**: Smart collision detection for precise dropping
- **Performance Optimized**: React.memo optimization for large task sets
- **Keyboard Shortcuts**: Full keyboard accessibility for drag operations

**How to Use:**
1. View tasks organized by status columns
2. Drag and drop tasks between columns to update status
3. Use drag handles (⋮⋮) for better mobile control
4. Each task card shows: title, description, assignee, priority, due date, tags
5. Click on task cards to view/edit details
6. Press `D` to enter dependency creation mode for connecting tasks

### **2. Task Creation & Management**
**Location**: "Add Task" button (top-right) or keyboard shortcut `N`
**What it does**: Create and manage tasks with comprehensive metadata and relationships

**Available Fields:**
- **Title**: Task name (required)
- **Description**: Detailed task information with rich text support
- **Priority**: High, Medium, Low with color coding (Red, Yellow, Green)
- **Assignee**: Team member responsible with searchable dropdown
- **Due Date**: Target completion date with calendar picker
- **Tags/Labels**: Categorization and filtering with auto-complete
- **Dependencies**: Link to other tasks that must complete first
- **Comments**: Threaded discussions on task progress
- **Attachments**: File uploads and document links
- **History**: Automatic audit trail of all changes

**Advanced Task Features:**
- **Dependency Management**: Create, view, and remove task dependencies
- **Circular Dependency Detection**: Prevents invalid dependency loops
- **Status History**: Track all status changes with timestamps
- **Comment Threading**: Organized discussions with user attribution
- **File Attachments**: Upload and manage task-related files
- **Automatic History**: All changes tracked automatically

**How to Use:**
1. Click "Add Task" button or press `N` key
2. Fill in task details in modal form
3. Set priority using dropdown (High=Red, Medium=Yellow, Low=Green)
4. Assign to team member using searchable dropdown
5. Add tags for easy filtering and categorization
6. Create dependencies by linking to existing tasks
7. Click "Create Task" to save

### **3. Task Dependencies System**
**Location**: Within task cards and dependency graph view
**What it does**: Manage complex task relationships and workflow dependencies

**Dependency Features:**
- **Visual Indicators**: Dependency badges on task cards
- **Graph Visualization**: Interactive dependency graph with zoom and pan
- **Drag-to-Connect**: Create dependencies by dragging between tasks (press `D`)
- **Circular Detection**: Prevents invalid dependency loops automatically
- **Dependency Validation**: Ensures logical workflow relationships
- **Bulk Operations**: Manage multiple dependencies efficiently

**How Dependencies Work:**
1. Tasks show dependency count badges
2. Dependent tasks cannot start until dependencies are complete
3. Visual graph shows complete dependency network
4. Automatic validation prevents circular references
5. Status changes cascade through dependency chains

### **4. Task Filtering & Search**
**Location**: Filter controls above Kanban board
**What it does**: Find specific tasks quickly using multiple criteria

**Filter Options:**
- **Search Bar**: Find tasks by title or description keywords
- **Priority Filter**: Filter by High, Medium, Low priority
- **Status Filter**: Show tasks from specific columns
- **Assignee Filter**: View tasks assigned to specific team members
- **Tag Filter**: Filter by task labels and categories
- **Date Range**: Filter by due dates and creation dates
- **Dependency Filter**: Show tasks with/without dependencies

**How to Use:**
1. Use search bar for keyword-based filtering
2. Select filters from dropdown menus
3. Multiple filters work together (AND logic)
4. Click "Clear Filters" to reset all filters
5. Press `F` key to focus search input quickly

---

## 🔗 MCP Registry & Integration System

### Location: `/dashboard/mcps`
**What it does**: Comprehensive management of Machine Collaboration Protocols (MCPs) for AI tool integration

## 🎯 Core MCP Features

### **1. MCP Registry**
**Location**: Main area of `/dashboard/mcps`
**What it does**: Browse, discover, and manage available MCP integrations

**Registry Features:**
- **MCP Catalog**: Browse available MCPs with detailed information
- **Search & Filter**: Find MCPs by category, provider, or functionality
- **Status Indicators**: Real-time status of MCP connections and health
- **Version Management**: Track and manage MCP versions
- **Provider Information**: Details about MCP providers and capabilities
- **Usage Analytics**: Monitor MCP usage and performance metrics

**Available MCP Types:**
- **Task Management**: Claude Task Master, Operative.sh
- **Memory & Context**: Mem0.ai, Context7
- **Research & Knowledge**: Perplexity, Web Search
- **Development Tools**: GitHub, Supabase
- **UI Components**: Magic UI, 21st.dev
- **Custom MCPs**: Support for custom MCP implementations

### **2. MCP Configuration Management**
**Location**: Individual MCP detail pages
**What it does**: Configure and customize MCP settings for optimal integration

**Configuration Features:**
- **Dynamic UI Generation**: Auto-generated configuration forms based on MCP schema
- **Environment Management**: Separate configs for development, staging, production
- **Credential Management**: Secure storage and encryption of API keys and secrets
- **Validation**: Real-time validation of configuration parameters
- **Testing**: Built-in connection testing and health checks
- **Versioning**: Configuration version control and rollback capabilities

**Security Features:**
- **Credential Encryption**: All sensitive data encrypted at rest
- **Permission Management**: Role-based access control for MCP operations
- **Audit Logging**: Complete audit trail of all MCP operations
- **Rate Limiting**: Configurable rate limits for MCP API calls
- **Access Controls**: Fine-grained permissions for MCP usage

### **3. Planning Agent Orchestration**
**Location**: `/dashboard/planning` with MCP integration
**What it does**: Intelligent orchestration of multiple MCPs for complex planning tasks

**Orchestration Features:**
- **Visual Workflow Builder**: Drag-and-drop interface for creating MCP workflows
- **Rule Engine**: Define conditions and actions for automatic MCP coordination
- **Priority Management**: Set MCP usage priorities for planning agents
- **Context Sharing**: Share context and data between MCPs seamlessly
- **Real-time Monitoring**: Monitor active orchestration processes
- **Performance Analytics**: Track orchestration efficiency and costs

**Workflow Capabilities:**
- **Sequential Execution**: Chain MCPs in sequence for complex workflows
- **Parallel Processing**: Execute multiple MCPs simultaneously
- **Conditional Logic**: Branch workflows based on MCP responses
- **Error Handling**: Graceful error handling and fallback strategies
- **Result Aggregation**: Combine results from multiple MCPs intelligently

### **4. Usage Analytics & Monitoring**
**Location**: MCP dashboard and individual MCP pages
**What it does**: Comprehensive monitoring and analytics for MCP usage

**Analytics Features:**
- **Usage Metrics**: Track API calls, response times, and success rates
- **Cost Tracking**: Monitor costs across different MCP providers
- **Performance Monitoring**: Real-time performance metrics and alerts
- **Usage Patterns**: Analyze usage patterns and optimization opportunities
- **Health Monitoring**: Continuous health checks and status monitoring
- **Reporting**: Generate usage reports and analytics dashboards

---

## ⌨️ Keyboard Shortcuts System

### Location: Available throughout the platform
**What it does**: Quick access to common actions via keyboard

**Global Shortcuts:**
- **`N`**: Open new task creation modal
- **`H`**: Toggle keyboard shortcuts help modal
- **`G`**: Toggle dependency graph view
- **`D`**: Enter dependency creation mode
- **`F`**: Focus search/filter input
- **`M`**: Open MCP registry
- **`P`**: Navigate to planning interface
- **`Esc`**: Close modals and exit modes
- **`Ctrl/Cmd + K`**: Global command palette (coming soon)

**Canvas-Specific Shortcuts (Planning Canvas):**
- **`Ctrl/Cmd + C/V/X`**: Copy, paste, cut operations
- **`Ctrl/Cmd + Z/Y`**: Undo and redo actions
- **`Ctrl/Cmd + A`**: Select all elements
- **`Ctrl/Cmd + D`**: Duplicate selected elements
- **`Delete/Backspace`**: Delete selected elements
- **`Space + Drag`**: Pan canvas view
- **`Ctrl/Cmd + Scroll`**: Zoom in/out

---

## 🚀 What's New in Phase 9

### **Planning Canvas Platform**
- Comprehensive visual planning with real-time collaboration
- Professional-grade performance supporting 10,000+ elements
- Mobile-optimized responsive design with touch support
- Advanced interaction features and keyboard shortcuts

### **Real-Time Collaboration**
- Multi-user editing with presence indicators
- Conflict resolution and version control
- Positioned comments with threading
- Background synchronization with offline support

### **Performance Optimizations**
- 70-90% rendering performance improvement through virtualization
- Progressive loading for sub-second initial load times
- 60fps rendering at all zoom levels
- Real-time performance monitoring and alerts

### **Mobile and Touch Support**
- Native gesture support for mobile and tablet devices
- 44px minimum touch targets for accessibility
- Responsive toolbar and panel layouts
- Touch-optimized context menus and interactions

---

## 🚀 Future Roadmap

### **Phase 10 - Advanced Analytics and Insights (Next)**
- Project progress tracking dashboard
- Team performance metrics and insights
- Predictive analytics with AI integration
- Custom reports and data visualization

### **Planned Enhancements:**
- **Mobile App**: Native mobile applications for iOS and Android
- **Advanced Analytics**: Machine learning-powered insights and recommendations
- **Team Collaboration**: Enhanced real-time collaboration features
- **Integration Marketplace**: Expanded MCP marketplace with third-party integrations
- **Enterprise Features**: Advanced security, compliance, and administration tools
- **AI Automation**: Intelligent task automation and workflow optimization
- **Global Search**: Universal search across all platform data
- **Custom Dashboards**: User-configurable dashboards and widgets

---

*This manual reflects the current state after Phase 9 completion (Planning Canvas Implementation) and will be updated as new features are added and existing features are enhanced.*

---

## 🤖 AI Agent Marketplace (NEW in Phase 12 - 100% Complete)

### **Agent Discovery and Management**
**Location**: `/dashboard/marketplace`
**What it does**: Comprehensive marketplace for discovering, installing, and managing AI agents

**Features Implemented:**
- **Agent Discovery**: Browse and search through curated AI agents
- **Advanced Search**: Filter by categories, ratings, price, and capabilities
- **Agent Installation**: One-click installation with progress tracking
- **Agent Publishing**: Submit your own AI agents to the marketplace
- **Review System**: Rate and review agents with detailed feedback
- **Drag-and-Drop Organization**: Reorder and organize your installed agents
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

**Key Components:**
1. **Agent Cards**: Beautiful cards displaying agent information, ratings, and actions
2. **Search and Filters**: Advanced filtering by category, price, rating, and capabilities
3. **Installation Management**: Track installation progress and manage installed agents
4. **Publication Workflow**: Submit agents with validation and approval process
5. **Review System**: Community-driven ratings and detailed reviews

**Agent Categories:**
- **Development**: Code generation, debugging, and development tools
- **Analytics**: Data analysis, visualization, and insights
- **Content**: Content creation, writing, and media generation
- **Productivity**: Task management, automation, and workflow optimization
- **Language**: Translation, localization, and language processing

**How to Use:**
1. Navigate to `/dashboard/marketplace`
2. Browse featured agents or use search to find specific capabilities
3. Click on agent cards to view detailed information
4. Use "Install" button to add agents to your workspace
5. Click "Publish Agent" to submit your own AI agents
6. Enable drag mode to organize your installed agents
7. Rate and review agents you've used

**Technical Features:**
- **Performance Optimized**: Lazy loading and infinite scroll for large agent catalogs
- **Security Validated**: All agents undergo security validation before publication
- **Version Management**: Support for agent updates and version control
- **Usage Analytics**: Track agent performance and usage statistics
- **API Integration**: RESTful APIs for agent management and marketplace operations
