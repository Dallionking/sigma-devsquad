# 14. Code Quality Metrics Integration

## Role & Background
**Senior FANG Engineer Profile**: Senior DevOps Engineer with 10+ years experience at Google or Microsoft, specializing in code quality systems, static analysis, and continuous integration pipelines. Experience with TypeScript, Next.js, and automated testing frameworks. Background in code metrics visualization, quality gates, and developer productivity tools is highly valuable.

## Feature Description
The Code Quality Metrics Integration feature provides automatic assessment of code quality during development, offering real-time metrics, suggestions, and visualizations to improve code health. This feature implements a complete code quality solution with static analysis, test coverage tracking, and integration with popular quality tools like SonarQube and CodeClimate in a new Next.js project.

⚠️ **IMPORTANT INSTRUCTIONS:**
1. Check off each subtask with [x] as you complete it
2. Do not proceed to the next task until ALL checkboxes in the current task are marked complete
3. Use Magic UI MCP with `/ui` command for all component generation
4. Reference `/.aigent/design/Magic Ui templates/agent-template/` for component patterns
5. Use Context7 MCP to fetch up-to-date documentation before starting each subtask
6. Use Perplexity MCP for any research needs or best practices
7. Create TaskMaster tasks for any complex implementation requirements

## Implementation Tasks:

### Tier 1 Task - Code Quality Infrastructure Setup

#### Subtask 1.1: Set up code quality database schema
- [ ] Before starting, use Context7 MCP to fetch latest Supabase documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "database schema design"
- [ ] Use Perplexity MCP to research code quality metrics storage
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best database schema patterns for storing and tracking code quality metrics over time?"
- [ ] Create `code_quality_projects` table with fields: id, project_id, repository_url, last_scan_at, quality_gate_json, created_at, updated_at
- [ ] Create `quality_scans` table with fields: id, project_id, commit_hash, branch_name, scan_timestamp, overall_score, status
- [ ] Create `code_metrics` table with fields: id, scan_id, metric_name, metric_value, threshold_value, status
- [ ] Create `code_issues` table with fields: id, scan_id, file_path, line_number, issue_type, severity, message, rule_id
- [ ] Create `test_coverage` table with fields: id, scan_id, file_path, line_coverage, branch_coverage, function_coverage
- [ ] Create `quality_rules` table with fields: id, project_id, rule_id, rule_name, enabled, severity, parameters_json
- [ ] Set up appropriate relationships and constraints between tables
- [ ] Create database indexes for performance optimization

📎 Link to Supabase MCP for database operations

#### Subtask 1.2: Create Next.js API routes for code quality
- [ ] Before starting, use Context7 MCP to fetch latest Next.js API routes documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "api routes"
- [ ] Use Perplexity MCP to research API design for metrics
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for designing APIs that handle code quality metrics and analysis results?"
- [ ] Implement `/api/code-quality/projects` route with GET (list) and POST (create) methods
- [ ] Implement `/api/code-quality/projects/[id]` route with GET (detail), PUT (update), and DELETE methods
- [ ] Implement `/api/code-quality/projects/[id]/scans` route for scan management
- [ ] Implement `/api/code-quality/scans/[id]/metrics` route for retrieving metrics
- [ ] Implement `/api/code-quality/scans/[id]/issues` route for code issues
- [ ] Implement `/api/code-quality/scans/[id]/coverage` route for test coverage
- [ ] Implement `/api/code-quality/projects/[id]/rules` route for quality rule management
- [ ] Implement webhook endpoint for CI/CD integration

📎 Link to Next.js API routes documentation: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

#### Subtask 1.3: Set up code analysis integration
- [ ] Before starting, use Context7 MCP to fetch latest static analysis documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/sonarqube/sonarqube"` and topic: "api integration"
- [ ] Use Perplexity MCP to research code quality tools
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for integrating multiple code quality tools like SonarQube and CodeClimate?"
- [ ] Create code analysis service:
  ```typescript
  // src/services/codeAnalysisService.ts
  export class CodeAnalysisService {
    private sonarqubeClient: any;
    private codeClimateClient: any;
    
    constructor(config: any) {
      // Initialize clients based on configuration
    }
    
    async analyzePullRequest(repositoryUrl: string, prNumber: number): Promise<AnalysisResult> {
      // Analyze code in pull request
    }
    
    async analyzeRepository(repositoryUrl: string, branch: string): Promise<AnalysisResult> {
      // Analyze entire repository
    }
    
    // Additional methods for specific analysis tasks
  }
  ```
- [ ] Implement SonarQube API integration
- [ ] Create CodeClimate API integration
- [ ] Set up ESLint/TSLint integration for JavaScript/TypeScript
- [ ] Implement test coverage analysis with Jest/Istanbul
- [ ] Create unified metrics collection system
- [ ] Implement webhook handlers for CI/CD events
- [ ] Set up scheduled analysis for repositories

📎 Link to SonarQube API documentation

#### Subtask 1.4: Create UI components for code quality visualization
- [ ] Before starting, use Context7 MCP to fetch latest data visualization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/recharts/recharts"` and topic: "chart components"
- [ ] Use Perplexity MCP to research code quality visualization
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for visualizing code quality metrics and trends?"
- [ ] Use Magic UI MCP to create `QualityDashboard` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "metrics dashboard with multiple charts and filters"
- [ ] Use Magic UI MCP to create `MetricCard` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "metric card with value, trend, and threshold indicator"
- [ ] Use Magic UI MCP to create `CodeIssuesList` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "sortable and filterable issue list with severity indicators"
- [ ] Use Magic UI MCP to create `CoverageViewer` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "file tree with coverage percentage indicators"
- [ ] Use Magic UI MCP to create `TrendChart` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "line chart with threshold markers and annotations"
- [ ] Use Magic UI MCP to create `QualityGate` component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "quality gate status with pass/fail conditions"
- [ ] Set up responsive layout with Tailwind CSS

📎 Link to Magic UI MCP for component styling guidelines

**⚠️ TIER 1 CHECKPOINT:** Do not proceed to Tier 2 until ALL Tier 1 subtasks are completed and verified. After completing Tier 1:
- [ ] Commit all changes: `git add . && git commit -m "Phase 14 Tier 1: Code Quality Metrics Infrastructure Setup - Database schema, Next.js API routes, code analysis integration, and UI components"`
- [ ] Push to repository: `git push origin main`

### Tier 2 Task - Code Quality Business Logic and Integration

#### Subtask 2.1: Implement code analysis workflow
- [ ] Before starting, use Context7 MCP to fetch latest CI/CD integration documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/github/actions"` and topic: "workflow integration"
- [ ] Use Perplexity MCP to research code analysis workflows
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for implementing automated code analysis in CI/CD pipelines?"
- [ ] Create repository connection and authentication
- [ ] Implement webhook processing for code pushes
- [ ] Develop pull request analysis workflow
- [ ] Create scheduled analysis for repositories
- [ ] Implement diff-based analysis for changes
- [ ] Develop analysis queuing and prioritization
- [ ] Create notification system for analysis completion

📎 Call to GitHub MCP for repository operations

#### Subtask 2.2: Implement metrics collection and aggregation
- [ ] Before starting, use Context7 MCP to fetch latest metrics aggregation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/prometheus/client_nodejs"` and topic: "metrics aggregation"
- [ ] Use Perplexity MCP to research metrics collection
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for collecting and aggregating code quality metrics from multiple sources?"
- [ ] Create unified metrics collection system
- [ ] Implement historical trend tracking
- [ ] Develop metric threshold configuration
- [ ] Create quality gate evaluation logic
- [ ] Implement team and project benchmarking
- [ ] Develop custom metric definitions
- [ ] Create metrics export functionality (CSV, JSON)

📎 Call to Supabase MCP for metrics storage

#### Subtask 2.3: Implement issue management and tracking
- [ ] Before starting, use Context7 MCP to fetch latest issue tracking documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/jira/rest-api"` and topic: "issue integration"
- [ ] Use Perplexity MCP to research issue management
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for managing and tracking code quality issues over time?"
- [ ] Create issue detection and classification
- [ ] Implement issue severity assessment
- [ ] Develop issue assignment and ownership
- [ ] Create issue lifecycle management
- [ ] Implement issue filtering and search
- [ ] Develop issue export to task systems (Jira, GitHub Issues)
- [ ] Create false positive management

📎 Call to TaskMaster MCP for issue tracking

#### Subtask 2.4: Implement IDE integration
- [ ] Before starting, use Context7 MCP to fetch latest IDE integration documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/microsoft/vscode-extension-samples"` and topic: "api integration"
- [ ] Use Perplexity MCP to research IDE integration
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for integrating code quality tools with IDEs like VS Code?"
- [ ] Create VS Code extension for real-time analysis
- [ ] Implement inline issue highlighting
- [ ] Develop quick fix suggestions
- [ ] Create quality metrics sidebar
- [ ] Implement settings synchronization
- [ ] Develop analysis on save/commit
- [ ] Create custom rule configuration in IDE

📎 Call to IDE Bridge MCP for integration

**⚠️ TIER 2 CHECKPOINT:** Do not proceed to Tier 3 until ALL Tier 2 subtasks are completed and verified. After completing Tier 2:
- [ ] Commit all changes: `git add . && git commit -m "Phase 14 Tier 2: Code Quality Metrics Business Logic and Integration - Analysis workflow, metrics collection, issue management, and IDE integration"`
- [ ] Push to repository: `git push origin main`

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance metrics visualization
- [ ] Before starting, use Context7 MCP to fetch latest data visualization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/d3/d3"` and topic: "interactive visualizations"
- [ ] Use Perplexity MCP to research metrics visualization
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for creating intuitive and informative code quality metric visualizations?"
- [ ] Implement interactive trend charts with zoom
- [ ] Create heatmap visualization for issue density
- [ ] Develop radar charts for quality dimensions
- [ ] Implement file tree visualization with metrics
- [ ] Create animated transitions between data views
- [ ] Develop comparative visualization for benchmarking
- [ ] Implement custom dashboard layouts

📎 QA through Operative.sh MCP, visually confirm visualization clarity and interactivity

#### Subtask 3.2: Implement responsive design optimizations
- [ ] Before starting, use Context7 MCP to fetch latest responsive design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/tailwindlabs/tailwindcss"` and topic: "responsive design"
- [ ] Use Perplexity MCP to research responsive dashboards
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for responsive design in data-heavy dashboard applications?"
- [ ] Optimize mobile layout (stacked cards, simplified charts)
- [ ] Create tablet layout (2-column grid, collapsible panels)
- [ ] Enhance desktop layout (multi-panel dashboard with customizable layout)
- [ ] Ensure touch targets are appropriate size (min 44px×44px)
- [ ] Implement responsive data tables with horizontal scrolling
- [ ] Create mobile-optimized filters and controls
- [ ] Develop responsive issue detail views

📎 QA through Operative.sh MCP, test all breakpoints

#### Subtask 3.3: Implement accessibility enhancements
- [ ] Before starting, use Context7 MCP to fetch latest accessibility documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/a11y/standards"` and topic: "data visualization"
- [ ] Use Perplexity MCP to research dashboard accessibility
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for making data dashboards accessible to all users?"
- [ ] Add screen reader support for charts and graphs
- [ ] Create keyboard navigation for all dashboard elements
- [ ] Implement high contrast mode for visualizations
- [ ] Add ARIA attributes for dynamic content
- [ ] Create text alternatives for visual metrics
- [ ] Implement focus management for interactive elements
- [ ] Develop color-blind friendly visualization palettes

📎 QA through Operative.sh MCP, verify accessibility compliance

#### Subtask 3.4: Implement performance optimizations
- [ ] Before starting, use Context7 MCP to fetch latest performance optimization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "performance optimization"
- [ ] Use Perplexity MCP to research dashboard performance
  - [ ] Use command: `mcp3_perplexity_ask` with query: "What are the best practices for optimizing performance in data-heavy dashboard applications?"
- [ ] Implement data pagination and virtualization
- [ ] Add lazy loading for dashboard components
- [ ] Create efficient data caching strategies
- [ ] Implement incremental static regeneration for reports
- [ ] Develop optimized rendering for large datasets
- [ ] Create background data fetching and updates
- [ ] Implement efficient state management for complex dashboards
- [ ] Utilize Next.js server components where appropriate for improved performance

📎 QA through Operative.sh MCP, verify performance with large codebases and datasets

**⚠️ TIER 3 CHECKPOINT:** After completing Tier 3:
- [ ] Commit all changes: `git add . && git commit -m "Phase 14 Tier 3: Code Quality Metrics UI Polish and Quality Assurance - Enhanced visualization, responsive design, accessibility enhancements, and performance optimizations"`
- [ ] Push to repository: `git push origin main`

## Phase Completion Summary

Upon completion of all tiers, Phase 14 will have delivered:

### **Infrastructure Achievements:**
- ✅ Comprehensive code quality database schema for metrics and issues
- ✅ Complete API routes for code quality analysis and reporting
- ✅ Robust integration with industry-standard tools (SonarQube, CodeClimate)
- ✅ Intuitive UI components for code quality visualization

### **Business Logic Features:**
- ✅ Automated code analysis workflow with CI/CD integration
- ✅ Comprehensive metrics collection and aggregation system
- ✅ Complete issue management and tracking functionality
- ✅ Seamless IDE integration for real-time quality feedback

### **Quality Assurance:**
- ✅ Interactive and informative metrics visualizations
- ✅ Fully responsive design optimized for all device sizes
- ✅ Comprehensive accessibility enhancements for inclusive usage
- ✅ Performance optimizations for large codebases and datasets

### **Technical Achievements:**
- ✅ Research-driven development using Context7 MCP and Perplexity MCP
- ✅ Magic UI component integration for consistent design patterns
- ✅ Comprehensive QA verification using Operative.sh MCP
- ✅ Git-disciplined development with tier-based commits and pushes

**Phase 14 (Code Quality Metrics Integration) is now complete and ready for production deployment.**
