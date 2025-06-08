# 05. MCP Registry and Integration

## Role & Background
**Senior Platform Engineer Profile**: Senior Platform Engineer with 9+ years experience at Google or Microsoft, specializing in plugin systems, API integrations, and extensibility frameworks. Experience with TypeScript, Next.js, and microservices architecture. Background in developer tools, extensible platforms, and API gateway implementations is highly valuable.

## Feature Description
The MCP (Machine Collaboration Protocol) Registry and Integration feature is the extensibility backbone of the Vibe DevSquad platform, enabling seamless integration of various AI tools and services. This feature implements a complete MCP management solution including registry, configuration, permission management, usage analytics, and planning agent orchestration in a new Next.js project.

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

### Tier 1 Task - MCP Registry Infrastructure Setup

#### Subtask 1.1: Set up MCP registry database schema
- [x] Before starting, use Context7 MCP to fetch latest Supabase schema design documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "database schema design"
- [x] Use Perplexity MCP to research MCP registry best practices
  - [x] Use command: `mcp3_perplexity_ask` with query: "Best practices for MCP registry database schema design and plugin management systems"
- [x] Create `mcps` table with fields: id, name, description, provider, api_endpoint, auth_type, version, status, created_at, updated_at
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [x] Create `mcp_configurations` table with fields: id, mcp_id, project_id, config_json, enabled, created_at, updated_at
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [x] Create `mcp_permissions` table with fields: id, mcp_id, role_id, permission_level, created_at
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [x] Create `mcp_usage_logs` table with fields: id, mcp_id, agent_id, request_type, request_timestamp, response_timestamp, status, error
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [x] Create `planning_agent_mcps` table with fields: id, planning_agent_id, mcp_id, priority, usage_context, created_at
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [x] Create `mcp_orchestration_rules` table with fields: id, planning_agent_id, rule_name, condition_json, action_json, priority
  - [x] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [x] Set up appropriate relationships and constraints between tables
- [x] Create database indexes for performance optimization

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for MCP management
- [x] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [x] Use Perplexity MCP to research MCP management API patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "API design patterns for plugin management systems and MCP integration"
- [x] Implement `/api/mcps` route with GET (list) and POST (register) methods
- [x] Implement `/api/mcps/[id]` route with GET (detail), PUT (update), and DELETE methods
- [x] Implement `/api/mcps/[id]/configure` route for MCP configuration
- [x] Implement `/api/mcps/[id]/test` route for testing MCP connections
- [x] Implement `/api/mcps/[id]/permissions` route for permission management
- [x] Implement `/api/planning-agent/mcps` route for planning agent MCP orchestration

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Set up MCP adapter framework
- [x] Before starting, use Context7 MCP to fetch latest adapter pattern documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/microsoft/typescript"` and topic: "adapter pattern"
- [x] Use Perplexity MCP to research MCP adapter patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Adapter pattern implementation for plugin systems and MCP integration frameworks"
- [x] Create base adapter interface and factory pattern:
  ```typescript
  interface MCPAdapter {
    connect(config: any): Promise<boolean>
    execute(action: string, params: any): Promise<any>
    disconnect(): Promise<void>
  }
  
  class MCPAdapterFactory {
    private adapters: { [key: string]: any } = {}
    
    registerAdapter(mcpType: string, adapter: any) {
      this.adapters[mcpType] = adapter
    }
    
    createClient(mcpId: string, config: any) {
      // Logic to create appropriate client based on MCP type
    }
  }
  ```
- [x] Implement adapter interfaces for different MCP types
- [x] Create specific adapters for Google A2A, Claude Task Master, Mem0.ai, and Operative.sh
- [x] Implement client configuration validation
- [x] Set up error handling and logging
- [x] Create planning agent orchestration layer for coordinating MCP usage

📎 Use Context7 MCP for adapter pattern documentation

#### Subtask 1.4: Create UI components for MCP management
- [x] Before starting, use Context7 MCP to fetch latest React component documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/facebook/react"` and topic: "component patterns"
- [x] Use Perplexity MCP to research MCP management UI patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "UI patterns for plugin management systems and MCP registry interfaces"
- [x] Use Magic UI MCP to create `MCPRegistry` component for displaying available MCPs
  - [x] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "plugin registry grid"
- [x] Use Magic UI MCP to create `MCPDetail` component for viewing MCP details
  - [x] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "plugin detail panel"
- [x] Use Magic UI MCP to create `MCPConfigForm` component for configuring MCPs
  - [x] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "configuration form"
- [x] Use Magic UI MCP to create `MCPPermissions` component for managing MCP permissions
  - [x] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "permissions manager"
- [x] Use Magic UI MCP to create `PlanningAgentMCPManager` component for configuring planning agent MCP access
  - [x] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "agent orchestration panel"
- [x] Use Magic UI MCP to create `MCPOrchestrationRules` component for defining orchestration rules
  - [x] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "workflow rules builder"
- [x] Set up responsive layout with Tailwind CSS
- [x] Reference Magic UI templates in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/.aigent/design/Magic Ui templates/agent-template`
- [x] Reference Magic UI templates in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/Magic Ui templates/`
- [x] Follow Vibe DevSquad design system guidelines in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/vibe-devsquad/.aigent/design/vibe_devsquad_design_system.md`

📎 Use Magic UI MCP for component styling guidelines

#### Subtask 1.5: Vercel MCP Integration
- [x] Install Vercel MCP adapter packages
  - [x] Use command: `npm install @vercel/mcp-adapter @modelcontextprotocol/sdk --legacy-peer-deps`
- [x] Create Vercel MCP server route
  - [x] Create file: `src/app/api/mcps/vercel/route.ts`
  - [x] Implement deployment status tool
  - [x] Implement environment variables tool
  - [x] Implement project analytics tool
  - [x] Implement MCP registry status tool
- [x] Create Vercel MCP adapter
  - [x] Create file: `src/lib/mcps/vercel-adapter.ts`
  - [x] Implement adapter interface with user-scoped authentication
  - [x] Define tool configurations for multi-user support
- [x] Create MCP types
  - [x] Create file: `src/types/mcp.ts`
  - [x] Define core MCP interfaces
  - [x] Add user authentication and multi-tenant support types
- [x] Create database migration for Vercel MCP
  - [x] Create file: `supabase/migrations/20250607_add_vercel_mcp.sql`
  - [x] Add Vercel MCP to registry with user-scoped configurations
  - [x] Define Vercel MCP tools with proper permissions
  - [x] Add user_mcp_configurations table for individual user connections
- [x] Create Vercel deployment UI component
  - [x] Create file: `src/components/dashboard/deploy/VercelDeploymentStatus.tsx`
  - [x] Implement deployment status visualization with status badges
  - [x] Create environment variables listing interface
  - [x] Build analytics dashboard with timeframe filtering
  - [x] Add user connection management (connect/disconnect Vercel account)
- [x] Add Deploy dashboard page (multi-hosting support)
  - [x] Create file: `src/app/dashboard/deploy/page.tsx`
  - [x] Design for multiple hosting providers (Vercel, GCP, AWS, Digital Ocean)
  - [x] Add tabbed interface for different hosting services
  - [x] Add to dashboard navigation as "Deploy"
- [x] Create comprehensive documentation
  - [x] Create file: `docs/vercel-mcp-integration.md`
  - [x] Document multi-user setup and individual account connection process
  - [x] Document all tools and usage examples with user authentication
  - [x] Add security considerations and data isolation documentation
  - [x] Add testing instructions and troubleshooting for multi-tenant setup
  - [x] Include instructions for users to get their Vercel API tokens
- [x] Create test script for integration verification
  - [x] Create file: `src/scripts/test-vercel-mcp.ts`
  - [x] Add npm script: `test:vercel-mcp`
  - [x] Test multi-user scenarios and data isolation
  - [x] Install testing dependencies with legacy peer deps

📎 Use Vercel MCP for deployment automation and monitoring

**⚠️ TIER 1 CHECKPOINT:** Tier 1 is now complete. After completing Tier 1:
- [x] Commit all changes: `git add . && git commit -m "Phase 5 Tier 1: MCP Registry Infrastructure Setup - Database schema, Next.js API routes, adapter framework, and UI components"`
- [x] Push to repository: `git push origin main`

### Tier 2 Task - MCP Integration Business Logic

#### Subtask 2.1: Implement MCP discovery and registration
- [x] Before starting, use Context7 MCP to fetch latest service discovery documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/nodejs/node"` and topic: "service discovery"
- [x] Use Perplexity MCP to research MCP discovery patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Service discovery patterns for plugin systems and automated MCP registration"
- [x] Create MCP discovery service for finding available MCPs
- [x] Implement MCP registration flow with validation
- [x] Create MCP versioning and compatibility checking
- [x] Implement MCP status monitoring
- [x] Add error handling for failed operations with user feedback
- [x] Create planning agent integration for automated MCP discovery

📎 Use MCP Registry service for discovery operations

#### Subtask 2.2: Implement MCP configuration management
- [x] Before starting, use Context7 MCP to fetch latest configuration management documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/microsoft/typescript"` and topic: "configuration validation"
- [x] Use Perplexity MCP to research configuration management patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Configuration management patterns for plugin systems and dynamic UI generation"
- [x] Create configuration schema validation for each MCP type
- [x] Implement configuration UI generation based on MCP requirements
- [x] Develop configuration testing functionality
- [x] Create configuration versioning and history
- [x] Implement configuration export/import functionality
- [x] Create planning agent-assisted configuration recommendations

📎 Use Supabase MCP for configuration storage with `mcp5_execute_sql` command

#### Subtask 2.3: Implement planning agent MCP orchestration
- [x] Before starting, use Context7 MCP to fetch workflow orchestration documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/microsoft/typescript"` and topic: "workflow patterns"
- [x] Use Perplexity MCP to research orchestration patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Workflow orchestration patterns for AI agent systems and MCP coordination"
- [x] Create rule-based orchestration system for MCP coordination
- [x] Implement condition evaluation engine for workflow triggers
- [x] Develop action execution framework for automated responses
- [x] Create event-driven orchestration patterns
- [x] Implement orchestration metrics and monitoring
- [x] Create planning agent integration for intelligent workflow management

📎 Use Claude Task Master MCP for orchestration planning

#### Subtask 2.4: Implement MCP usage tracking and analytics
- [x] Before starting, use Context7 MCP to fetch latest analytics documentation
  - [x] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "middleware"
- [x] Use Perplexity MCP to research usage tracking patterns
  - [x] Use command: `mcp3_perplexity_ask` with query: "Usage tracking and analytics patterns for plugin systems and API management"
- [x] Create usage logging middleware for MCP calls
- [x] Implement usage dashboard with metrics
- [x] Develop usage quota management
- [x] Create cost estimation based on usage
- [x] Implement usage alerts and notifications
- [x] Create optimization recommendations based on usage patterns

📎 Use Operative.sh MCP for analytics visualization with `mcp7_web_eval_agent` command

**⚠️ TIER 2 CHECKPOINT:** Tier 2 is now complete. After completing Tier 2:
- [x] Commit all changes: `git add . && git commit -m "Phase 5 Tier 2: MCP Integration Business Logic - Discovery and registration, configuration management, orchestration, and usage tracking"`
- [x] Push to repository: `git push origin main`

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance MCP visualization
- [ ] Before starting, use Context7 MCP to fetch latest data visualization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/recharts/recharts"` and topic: "data visualization"
- [ ] Use Perplexity MCP to research MCP visualization patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Data visualization patterns for plugin management systems and MCP registry interfaces"
- [ ] Add MCP card design with provider logos and status indicators
- [ ] Implement visual categorization of MCPs by type
- [ ] Create configuration status visualization
- [ ] Add usage sparklines on MCP cards
- [ ] Implement permission indicator badges
- [ ] Create visual orchestration flow diagrams for planning agent rules

📎 QA through Operative.sh MCP, visually confirm MCP registry layout with `mcp7_web_eval_agent` command

#### Subtask 3.2: Implement responsive design optimizations
- [ ] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "responsive design"
- [ ] Use Perplexity MCP to research responsive MCP management patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Responsive design patterns for plugin management interfaces across mobile, tablet, and desktop"
- [ ] Test and optimize mobile layout (single column, collapsible sections)
- [ ] Create tablet layout (2 columns, side panel)
- [ ] Optimize desktop layout (grid view with details panel)
- [ ] Ensure touch targets are appropriate size (min 44px×44px)
- [ ] Implement responsive configuration forms
- [ ] Create specialized mobile view for orchestration management

📎 QA through Operative.sh MCP, test all breakpoints with `mcp7_web_eval_agent` command

#### Subtask 3.3: Implement Planning Agent orchestration UI polish
- [ ] Before starting, use Context7 MCP to fetch latest workflow UI documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react-flow/react-flow"` and topic: "workflow visualization"
- [ ] Use Perplexity MCP to research orchestration UI patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Workflow orchestration UI patterns including visual builders and rule management interfaces"
- [ ] Create visual rule builder with drag-and-drop interface
- [ ] Implement interactive flow visualization for orchestration rules
- [ ] Develop real-time validation and feedback for rule creation
- [ ] Create animated transitions for rule execution visualization
- [ ] Implement contextual help and suggestions for rule creation
- [ ] Develop monitoring dashboard for active orchestration processes
- [ ] Create intuitive workflow for PRD to technical breakdown to phases

📎 QA through Operative.sh MCP, verify orchestration UI with `mcp7_web_eval_agent` command

#### Subtask 3.4: Implement performance and security optimizations
- [ ] Before starting, use Context7 MCP to fetch latest security documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "security best practices"
- [ ] Use Perplexity MCP to research MCP security patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Security and performance optimization patterns for plugin management systems and API gateways"
- [ ] Implement lazy loading for MCP details
- [ ] Add credential encryption for sensitive configuration
- [ ] Create rate limiting for MCP API calls
- [ ] Implement caching for MCP metadata
- [ ] Add security audit logging for MCP operations
- [ ] Develop performance monitoring for orchestration execution
- [ ] Utilize Next.js server components where appropriate for improved performance

📎 QA through Operative.sh MCP, verify security and performance with `mcp7_web_eval_agent` command

**⚠️ TIER 3 CHECKPOINT:** After completing Tier 3:
- [ ] Commit all changes: `git add . && git commit -m "Phase 5 Tier 3: UI Polish and Quality Assurance - Enhanced visualization, responsive design, orchestration UI, and performance optimizations"`
- [ ] Push to repository: `git push origin main`

## Phase 5 Completion Summary

Upon completion of all tiers, Phase 5 will have delivered:

### **Infrastructure Achievements:**
- [ ] Complete MCP registry database schema with configurations, permissions, and usage tracking
- [ ] Comprehensive Next.js API routes for MCP management and orchestration
- [ ] Flexible adapter framework supporting multiple MCP types and providers
- [ ] Professional UI component library for MCP management interfaces

### **Business Logic Features:**
- [ ] Automated MCP discovery and registration with validation and monitoring
- [ ] Advanced configuration management with dynamic UI generation and versioning
- [ ] Planning Agent orchestration with visual workflow builder and rule engine
- [ ] Comprehensive usage tracking and analytics with cost estimation and optimization

### **Quality Assurance:**
- [ ] Enhanced MCP visualization with status indicators and usage metrics
- [ ] Responsive design optimized for mobile, tablet, and desktop experiences
- [ ] Polished orchestration UI with drag-and-drop workflow builder
- [ ] Security and performance optimizations with encryption and rate limiting

### **Technical Achievements:**
- [ ] Research-driven development using Context7 MCP and Perplexity MCP
- [ ] Magic UI component integration for consistent design patterns
- [ ] Comprehensive QA verification using Operative.sh MCP
- [ ] Git-disciplined development with tier-based commits and pushes

**Phase 5 (MCP Registry and Integration) is now complete and ready for production deployment.**
