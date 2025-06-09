# 📋 Vibe DevSquad Platform Features - User Manual

*Last Updated: Phase 5 Complete - MCP Registry & Integration + Task Management System - June 2025*

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

**How to Use:**
1. Navigate to `/dashboard` after login
2. Use sidebar menu to access different sections
3. Click hamburger menu (≡) on mobile to toggle navigation
4. Icons provide visual context for each section
5. Access AI Planning features via dedicated planning section
6. Manage MCPs (Machine Collaboration Protocols) via MCP Registry section

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

## 🔌 MCP Registry & Integration System

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

## 🔗 Advanced Integration Features

### **1. Adapter Framework**
**Location**: Backend architecture
**What it does**: Flexible adapter pattern supporting multiple MCP types and providers

**Adapter Features:**
- **Universal Interface**: Consistent interface across all MCP types
- **Factory Pattern**: Dynamic adapter creation based on MCP configuration
- **Type Safety**: Full TypeScript support with type-safe MCP interactions
- **Error Handling**: Comprehensive error handling and retry logic
- **Connection Pooling**: Efficient connection management and reuse
- **Caching**: Intelligent caching for improved performance

### **2. Real-Time Synchronization**
**Location**: Backend WebSocket infrastructure
**What it does**: Live synchronization of MCP status and data across users

**Real-Time Features:**
- **Live Status Updates**: Real-time MCP status and health updates
- **Configuration Sync**: Live synchronization of configuration changes
- **Usage Monitoring**: Real-time usage metrics and alerts
- **Collaborative Editing**: Multiple users can configure MCPs simultaneously
- **Instant Notifications**: Immediate alerts for MCP issues or changes

---

## ⌨️ Keyboard Shortcuts System

### Location: Available throughout the platform
**What it does**: Quick access to common actions via keyboard

**Available Shortcuts:**
- **`N`**: Open new task creation modal
- **`H`**: Toggle keyboard shortcuts help modal
- **`G`**: Toggle dependency graph view
- **`D`**: Enter dependency creation mode
- **`F`**: Focus search/filter input
- **`M`**: Open MCP registry
- **`P`**: Navigate to planning interface
- **`Esc`**: Close modals and exit modes
- **`Ctrl/Cmd + K`**: Global command palette (coming soon)

---

## 🔧 Technical Infrastructure

### **Database Architecture**
**Location**: Supabase backend
**What it does**: Comprehensive data management with optimized schemas

**Task Management Tables:**
- **tasks**: Core task data with metadata and relationships
- **task_dependencies**: Task dependency relationships with cycle detection
- **task_comments**: Threaded comments with user attribution
- **task_attachments**: File attachments and document links
- **task_history**: Complete audit trail of all task changes

**MCP Registry Tables:**
- **mcps**: MCP registry with provider and capability information
- **mcp_configurations**: Environment-specific MCP configurations
- **mcp_permissions**: Role-based access control for MCPs
- **mcp_usage_logs**: Comprehensive usage tracking and analytics
- **planning_agent_mcps**: Planning agent MCP associations
- **mcp_orchestration_rules**: Workflow rules and orchestration logic

### **API Architecture**
**Location**: Next.js API routes
**What it does**: RESTful APIs with comprehensive validation and security

**Task Management APIs:**
- **`/api/tasks`**: Full CRUD operations with filtering and pagination
- **`/api/tasks/[id]/dependencies`**: Dependency management with cycle detection
- **`/api/tasks/[id]/comments`**: Comment management with threading
- **`/api/tasks/[id]/attachments`**: File attachment management
- **`/api/tasks/[id]/history`**: History tracking and retrieval
- **`/api/tasks/[id]/status`**: Status management with automatic history

**MCP Management APIs:**
- **`/api/mcps`**: MCP registry management and discovery
- **`/api/mcps/[id]/configure`**: Dynamic configuration management
- **`/api/mcps/[id]/test`**: Connection testing and validation
- **`/api/mcps/[id]/permissions`**: Permission management
- **`/api/planning-agent/mcps`**: Orchestration and workflow management

### **Security Features**
- **Authentication**: Supabase Auth with role-based access control
- **Authorization**: Row-Level Security (RLS) policies for data protection
- **Encryption**: Credential encryption for sensitive MCP configurations
- **Validation**: Comprehensive input validation and sanitization
- **Rate Limiting**: Configurable rate limits for API protection
- **Audit Logging**: Complete audit trails for security monitoring

---

## 🏗️ Development & Deployment

### **Environment Management**
**Location**: Multiple environment configurations
**What it does**: Seamless development, staging, and production workflows

**Available Environments:**
- **Development**: Local development with mock services and hot reload
- **Staging**: Production-like environment for testing and QA
- **Production**: Full production deployment with all services enabled

**Deployment Features:**
- **Automated Deployments**: CI/CD pipeline with automated testing
- **Environment Variables**: Secure configuration management
- **Service Factory**: Automatic switching between mock and real services
- **Health Checks**: Comprehensive health monitoring across environments
- **Rollback Capabilities**: Quick rollback to previous versions

### **Performance Optimization**
- **Virtualization**: Efficient rendering for large datasets
- **Caching**: Intelligent caching for improved performance
- **Lazy Loading**: On-demand loading of components and data
- **Code Splitting**: Optimized bundle sizes with dynamic imports
- **Performance Monitoring**: Real-time performance metrics and alerts

---

## 📱 Responsive Design

### **Mobile Optimization**
- **Touch-Friendly**: 44px minimum touch targets throughout
- **Swipe Gestures**: Native mobile interactions for task management
- **Collapsible Navigation**: Space-efficient mobile menu
- **Optimized Drag**: Touch-friendly drag handles for mobile devices
- **Responsive Layouts**: Adaptive layouts for all screen sizes

### **Accessibility Features**
- **Keyboard Navigation**: Full keyboard accessibility throughout
- **Screen Reader Support**: ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast themes
- **Focus Management**: Proper focus management for modals and interactions
- **Alternative Text**: Comprehensive alt text for images and icons

---

## 📊 Analytics & Monitoring

### **Usage Analytics**
- **Task Metrics**: Task creation, completion, and cycle time tracking
- **MCP Analytics**: MCP usage patterns and performance metrics
- **User Behavior**: User interaction patterns and feature adoption
- **Performance Metrics**: Real-time performance monitoring and alerts
- **Cost Tracking**: MCP usage costs and optimization recommendations

### **Health Monitoring**
- **System Health**: Real-time system health and status monitoring
- **Error Tracking**: Comprehensive error logging and alerting
- **Performance Monitoring**: Response times and throughput tracking
- **Uptime Monitoring**: Service availability and uptime tracking
- **Alert System**: Configurable alerts for critical issues

---

## 🚀 Future Roadmap

### **Planned Enhancements:**
- **Mobile App**: Native mobile applications for iOS and Android
- **Advanced Analytics**: Machine learning-powered insights and recommendations
- **Team Collaboration**: Enhanced real-time collaboration features
- **Integration Marketplace**: Expanded MCP marketplace with third-party integrations
- **Enterprise Features**: Advanced security, compliance, and administration tools
- **AI Automation**: Intelligent task automation and workflow optimization
- **Global Search**: Universal search across all platform data
- **Custom Dashboards**: User-configurable dashboards and widgets

### **Current Limitations:**
- Some MCP integrations still in development
- Mobile app not yet available
- Advanced analytics features coming soon
- Enterprise security features in development

---

*This manual reflects the current state after Phase 5 completion and will be updated as new features are added and existing features are enhanced.*
