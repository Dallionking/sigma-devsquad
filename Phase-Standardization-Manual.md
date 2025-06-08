# Phase Standardization Manual: Building AI-Powered Development Workflows

## Table of Contents
1. [Introduction](#introduction)
2. [The Phase Structure Philosophy](#the-phase-structure-philosophy)
3. [MCP Integration Strategy](#mcp-integration-strategy)
4. [Standardization Framework](#standardization-framework)
5. [Implementation Guide](#implementation-guide)
6. [Quality Assurance Protocol](#quality-assurance-protocol)
7. [Git Workflow Integration](#git-workflow-integration)
8. [Best Practices and Lessons Learned](#best-practices-and-lessons-learned)
9. [Templates and Examples](#templates-and-examples)
10. [Troubleshooting and Common Issues](#troubleshooting-and-common-issues)

---

## Introduction

This manual documents the systematic approach developed for the Vibe DevSquad platform to standardize development phases using Model Context Protocol (MCP) integration. The methodology combines AI-powered research, automated component generation, comprehensive quality assurance, and disciplined version control into a cohesive development workflow.

### What You'll Learn
- How to structure complex development projects into manageable phases
- How to integrate multiple MCP servers for research, development, and QA
- How to create consistent, trackable development workflows
- How to implement research-driven development practices
- How to ensure quality through automated testing and verification

### Prerequisites
- Basic understanding of software development workflows
- Familiarity with Git version control
- Access to MCP-compatible AI assistants (Claude, etc.)
- Understanding of modern web development frameworks

---

## The Phase Structure Philosophy

### Core Principles

#### 1. **Research-First Development**
Every implementation begins with comprehensive research using specialized MCP tools:
- **Context7 MCP**: Fetch up-to-date documentation for specific technologies
- **Perplexity MCP**: Research best practices and design patterns
- **Sequential Thinking MCP**: Break down complex problems systematically

#### 2. **Three-Tier Architecture**
Each phase follows a consistent three-tier structure:

**Tier 1: Infrastructure Setup**
- Database schema design and implementation
- API route creation and configuration
- Core framework and library setup
- Basic component scaffolding

**Tier 2: Business Logic and Integration**
- Feature implementation and workflows
- Service integrations and data processing
- User interaction patterns and state management
- Real-time functionality and collaboration features

**Tier 3: UI Polish and Quality Assurance**
- Visual design enhancement and animations
- Responsive design implementation
- Performance optimization and testing
- Comprehensive QA verification

#### 3. **Checkpoint-Driven Progress**
- No progression to next tier until current tier is 100% complete
- Explicit verification checkpoints at each tier boundary
- Git commits and pushes required after each tier completion

### Phase Structure Template

```markdown
# [Phase Number]. [Phase Name]

## Role & Background
**Senior FANG Engineer Profile**: [Specific expertise and background relevant to this phase]

## Feature Description
[Comprehensive description of what this phase delivers]

⚠️ **IMPORTANT INSTRUCTIONS:**
1. Check off each subtask with [x] as you complete it
2. Do not proceed to the next task until ALL checkboxes in the current task are marked complete
3. Use Magic UI MCP with `/ui` command for all component generation
4. Reference [template directories] for component patterns
5. Use Context7 MCP to fetch up-to-date documentation before starting each subtask
6. Use Perplexity MCP for any research needs or best practices
7. Create TaskMaster tasks for any complex implementation requirements

## Implementation Tasks:

### Tier 1 Task - [Infrastructure Focus]
[Subtasks with research, implementation, and verification steps]

**⚠️ TIER 1 CHECKPOINT:** [Verification requirements and Git instructions]

### Tier 2 Task - [Business Logic Focus]
[Subtasks with research, implementation, and verification steps]

**⚠️ TIER 2 CHECKPOINT:** [Verification requirements and Git instructions]

### Tier 3 Task - [UI Polish and QA Focus]
[Subtasks with research, implementation, and verification steps]

**⚠️ TIER 3 CHECKPOINT:** [Verification requirements and Git instructions]

## Phase Completion Summary
[Comprehensive summary of achievements and deliverables]
```

---

## MCP Integration Strategy

### Core MCP Servers Used

#### 1. **Context7 MCP** - Documentation Research
**Purpose**: Fetch up-to-date, authoritative documentation for specific technologies

**Usage Pattern**:
```markdown
- [ ] Before starting, use Context7 MCP to fetch latest [technology] documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/[org]/[project]"` and topic: "[specific topic]"
```

**Common Library IDs**:
- `/supabase/supabase` - Database and backend services
- `/vercel/next.js` - Next.js framework documentation
- `/facebook/react` - React component patterns
- `/tailwindlabs/tailwindcss` - Styling and responsive design
- `/recharts/recharts` - Data visualization components

#### 2. **Perplexity MCP** - Best Practices Research
**Purpose**: Research current best practices, design patterns, and implementation strategies

**Usage Pattern**:
```markdown
- [ ] Use Perplexity MCP to research [domain] best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "[specific research question about patterns, practices, or approaches]"
```

**Research Categories**:
- Database schema design patterns
- API architecture and design patterns
- UI/UX design patterns and accessibility
- Performance optimization strategies
- Security and compliance best practices

#### 3. **Magic UI MCP** - Component Generation
**Purpose**: Generate consistent, styled UI components following design system patterns

**Usage Pattern**:
```markdown
- [ ] Use Magic UI MCP to create [ComponentName] component
  - [ ] Use command: `mcp0_21st_magic_component_builder` with searchQuery: "[component description]"
```

**Component Categories**:
- Layout components (grids, containers, panels)
- Form components (inputs, selectors, validation)
- Data display (tables, cards, lists)
- Navigation (menus, breadcrumbs, tabs)
- Feedback (modals, alerts, notifications)

#### 4. **Operative.sh MCP** - Quality Assurance
**Purpose**: Automated testing and visual verification of implemented features

**Usage Pattern**:
```markdown
📎 QA through Operative.sh MCP, [verification description] with `mcp7_web_eval_agent` command
```

**QA Categories**:
- Visual confirmation and layout testing
- Responsive design verification across breakpoints
- Performance testing with complex datasets
- User interaction flow validation
- Accessibility and keyboard navigation testing

#### 5. **Supabase MCP** - Database Operations
**Purpose**: Database schema management and real-time functionality

**Usage Pattern**:
```markdown
- [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
```

#### 6. **Task Master MCP** - Project Management
**Purpose**: AI-powered task breakdown and project orchestration

**Usage Pattern**:
```markdown
- [ ] Create TaskMaster tasks for any complex implementation requirements
```

### MCP Integration Workflow

1. **Research Phase** (Context7 + Perplexity)
   - Fetch authoritative documentation
   - Research best practices and patterns
   - Understand current industry standards

2. **Implementation Phase** (Magic UI + Supabase + Task Master)
   - Generate components using design system
   - Implement database operations
   - Break down complex tasks systematically

3. **Verification Phase** (Operative.sh)
   - Automated testing and validation
   - Visual confirmation of implementations
   - Performance and accessibility verification

---

## Standardization Framework

### Subtask Structure Template

Each subtask follows this exact pattern:

```markdown
#### Subtask X.Y: [Descriptive Title]
- [ ] Before starting, use Context7 MCP to fetch latest [technology] documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/[org]/[project]"` and topic: "[topic]"
- [ ] Use Perplexity MCP to research [domain] patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "[research question]"
- [ ] [Implementation step 1]
- [ ] [Implementation step 2]
- [ ] [Implementation step 3]
- [ ] [Additional steps as needed]

📎 [MCP reference for this subtask's domain]
```

### Tier Checkpoint Template

```markdown
**⚠️ TIER [X] CHECKPOINT:** Do not proceed to Tier [X+1] until ALL Tier [X] subtasks are completed and verified. After completing Tier [X]:
- [ ] Commit all changes: `git add . && git commit -m "Phase [N] Tier [X]: [Tier Description] - [Key achievements summary]"`
- [ ] Push to repository: `git push origin main`
```

### Completion Summary Template

```markdown
## Phase [N] Completion Summary

Upon completion of all tiers, Phase [N] will have delivered:

### **Infrastructure Achievements:**
- ✅ [Infrastructure accomplishment 1]
- ✅ [Infrastructure accomplishment 2]
- ✅ [Infrastructure accomplishment 3]

### **Business Logic Features:**
- ✅ [Business logic accomplishment 1]
- ✅ [Business logic accomplishment 2]
- ✅ [Business logic accomplishment 3]

### **Quality Assurance:**
- ✅ [QA accomplishment 1]
- ✅ [QA accomplishment 2]
- ✅ [QA accomplishment 3]

### **Technical Achievements:**
- ✅ Research-driven development using Context7 MCP and Perplexity MCP
- ✅ Magic UI component integration for consistent design patterns
- ✅ Comprehensive QA verification using Operative.sh MCP
- ✅ Git-disciplined development with tier-based commits and pushes

**Phase [N] ([Phase Name]) is now complete and ready for production deployment.**
```

---

## Implementation Guide

### Step 1: Project Setup

1. **Initialize MCP Environment**
   ```bash
   # Ensure MCP servers are configured
   # Context7, Perplexity, Magic UI, Operative.sh, Supabase, Task Master
   ```

2. **Create Phase Directory Structure**
   ```
   /Phases/
   ├── Phase 4.md
   ├── Phase 5.md
   ├── Phase 6.md
   ├── Phase 7.md
   ├── Phase 8.md
   ├── Phase 9.md
   └── Phase 10.md
   ```

3. **Set Up Template Directories**
   ```
   /.aigent/design/Magic Ui templates/agent-template/
   /Magic Ui templates/
   ```

### Step 2: Phase Standardization Process

1. **Analyze Existing Phase Structure**
   - Review current phase documentation
   - Identify inconsistencies in format
   - Note missing MCP integration points

2. **Apply Standardization Template**
   - Update header structure with role & background
   - Add important instructions section
   - Restructure tasks into three tiers

3. **Add MCP Integration Points**
   - Insert Context7 research steps before each subtask
   - Add Perplexity research for best practices
   - Include Magic UI component generation commands
   - Add Operative.sh QA verification steps

4. **Insert Tier Checkpoints**
   - Add checkpoint warnings between tiers
   - Include Git commit and push instructions
   - Specify verification requirements

5. **Create Completion Summary**
   - Document expected achievements
   - Highlight technical accomplishments
   - Confirm production readiness

### Step 3: Validation and Testing

1. **Review Consistency**
   - Verify all phases follow identical structure
   - Check MCP command syntax and parameters
   - Ensure Git workflow instructions are clear

2. **Test MCP Integration**
   - Validate Context7 library IDs are correct
   - Test Perplexity research queries
   - Verify Magic UI component generation works
   - Confirm Operative.sh QA commands function

3. **Documentation Review**
   - Ensure instructions are clear and actionable
   - Verify checkbox format for task tracking
   - Confirm template directory references are accurate

---

## Quality Assurance Protocol

### Research Verification Checklist

- [ ] Context7 MCP commands include correct library IDs
- [ ] Perplexity MCP queries are specific and actionable
- [ ] Research steps precede all implementation tasks
- [ ] Documentation topics are relevant to subtask goals

### Implementation Verification Checklist

- [ ] Magic UI MCP commands include appropriate search queries
- [ ] Supabase MCP commands specify correct operations
- [ ] Task Master MCP integration points are identified
- [ ] Implementation steps are granular and trackable

### QA Verification Checklist

- [ ] Operative.sh MCP commands specify testing objectives
- [ ] Visual confirmation requirements are explicit
- [ ] Performance testing criteria are defined
- [ ] Accessibility verification is included

### Tier Checkpoint Verification

- [ ] All subtasks have checkbox format for tracking
- [ ] Tier boundaries are clearly marked with warnings
- [ ] Git commit messages follow consistent format
- [ ] Push instructions are explicit and actionable

---

## Git Workflow Integration

### Commit Message Structure

```
Phase [N] Tier [X]: [Tier Name] - [Brief description of key achievements]
```

**Examples**:
```
Phase 9 Tier 1: Planning Canvas Infrastructure Setup - Database schema, Next.js API routes, interactive canvas framework, and UI components

Phase 9 Tier 2: Planning Canvas Business Logic and Integration - Element management, connection handling, AI research integration, and real-time collaboration

Phase 9 Tier 3: UI Polish and Quality Assurance - Enhanced visualization, responsive design, interaction polish, and performance optimizations
```

### Branch Strategy

- **Main Branch**: Production-ready code
- **Phase Branches**: Optional for complex phases
- **Feature Branches**: For individual subtasks if needed

### Tier-Based Development Flow

1. **Tier 1 Completion**
   ```bash
   git add .
   git commit -m "Phase [N] Tier 1: [Description] - [Achievements]"
   git push origin main
   ```

2. **Tier 2 Completion**
   ```bash
   git add .
   git commit -m "Phase [N] Tier 2: [Description] - [Achievements]"
   git push origin main
   ```

3. **Tier 3 Completion**
   ```bash
   git add .
   git commit -m "Phase [N] Tier 3: [Description] - [Achievements]"
   git push origin main
   ```

---

## Best Practices and Lessons Learned

### Research-First Development

**Best Practice**: Always research before implementing
- Use Context7 MCP to get authoritative documentation
- Use Perplexity MCP to understand current best practices
- Research saves time and prevents architectural mistakes

**Lesson Learned**: Skipping research leads to rework
- Implementations without research often require refactoring
- Best practices research prevents common pitfalls
- Documentation research ensures API compatibility

### Component Consistency

**Best Practice**: Use Magic UI MCP for all components
- Ensures consistent design system adherence
- Reduces custom styling and maintenance overhead
- Provides accessible and responsive components by default

**Lesson Learned**: Manual component creation creates inconsistency
- Custom components often lack accessibility features
- Styling inconsistencies emerge across the application
- Maintenance becomes more complex over time

### Quality Assurance Integration

**Best Practice**: Use Operative.sh MCP for systematic testing
- Automated testing catches issues early
- Visual verification ensures design compliance
- Performance testing validates scalability

**Lesson Learned**: Manual testing is insufficient
- Human testing misses edge cases
- Visual inconsistencies are hard to spot manually
- Performance issues only emerge under load

### Tier-Based Development

**Best Practice**: Complete each tier fully before proceeding
- Prevents incomplete foundations from causing issues
- Ensures proper testing at each level
- Creates natural review and validation points

**Lesson Learned**: Skipping tiers creates technical debt
- Incomplete infrastructure causes integration problems
- Missing business logic creates user experience gaps
- Inadequate QA leads to production issues

### Git Discipline

**Best Practice**: Commit and push after each tier
- Creates clear development history
- Enables easy rollback if needed
- Provides natural collaboration points

**Lesson Learned**: Irregular commits create confusion
- Large commits are hard to review
- Missing history makes debugging difficult
- Collaboration becomes challenging without clear checkpoints

---

## Templates and Examples

### Phase Template (Complete)

```markdown
# [NN]. [Phase Name]

## Role & Background
**Senior FANG Engineer Profile**: [Specific expertise description with years of experience, company background, and relevant technical skills]

## Feature Description
[Comprehensive description of what this phase delivers, including key capabilities and integration points]

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

### Tier 1 Task - [Infrastructure Focus]

#### Subtask 1.1: [Database/Schema Setup]
- [ ] Before starting, use Context7 MCP to fetch latest [technology] documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/[org]/[project]"` and topic: "[topic]"
- [ ] Use Perplexity MCP to research [domain] best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "[research question]"
- [ ] [Implementation steps with checkboxes]

📎 Use [Relevant MCP] for [specific operations]

#### Subtask 1.2: [API/Routes Setup]
[Similar structure]

#### Subtask 1.3: [Framework/Library Setup]
[Similar structure]

#### Subtask 1.4: [Component Setup]
[Similar structure]

**⚠️ TIER 1 CHECKPOINT:** Do not proceed to Tier 2 until ALL Tier 1 subtasks are completed and verified. After completing Tier 1:
- [ ] Commit all changes: `git add . && git commit -m "Phase [N] Tier 1: [Description] - [Achievements]"`
- [ ] Push to repository: `git push origin main`

### Tier 2 Task - [Business Logic Focus]

#### Subtask 2.1: [Core Feature Implementation]
[Research + Implementation structure]

#### Subtask 2.2: [Integration Implementation]
[Research + Implementation structure]

#### Subtask 2.3: [Workflow Implementation]
[Research + Implementation structure]

#### Subtask 2.4: [Advanced Features Implementation]
[Research + Implementation structure]

**⚠️ TIER 2 CHECKPOINT:** Do not proceed to Tier 3 until ALL Tier 2 subtasks are completed and verified. After completing Tier 2:
- [ ] Commit all changes: `git add . && git commit -m "Phase [N] Tier 2: [Description] - [Achievements]"`
- [ ] Push to repository: `git push origin main`

### Tier 3 Task - [UI Polish and Quality Assurance]

#### Subtask 3.1: [Visual Enhancement]
[Research + Implementation + QA structure]

#### Subtask 3.2: [Interaction Enhancement]
[Research + Implementation + QA structure]

#### Subtask 3.3: [Responsive Design]
[Research + Implementation + QA structure]

#### Subtask 3.4: [Performance Optimization]
[Research + Implementation + QA structure]

**⚠️ TIER 3 CHECKPOINT:** After completing Tier 3:
- [ ] Commit all changes: `git add . && git commit -m "Phase [N] Tier 3: [Description] - [Achievements]"`
- [ ] Push to repository: `git push origin main`

## Phase [N] Completion Summary

Upon completion of all tiers, Phase [N] will have delivered:

### **Infrastructure Achievements:**
- ✅ [Achievement 1]
- ✅ [Achievement 2]
- ✅ [Achievement 3]

### **Business Logic Features:**
- ✅ [Feature 1]
- ✅ [Feature 2]
- ✅ [Feature 3]

### **Quality Assurance:**
- ✅ [QA Achievement 1]
- ✅ [QA Achievement 2]
- ✅ [QA Achievement 3]

### **Technical Achievements:**
- ✅ Research-driven development using Context7 MCP and Perplexity MCP
- ✅ Magic UI component integration for consistent design patterns
- ✅ Comprehensive QA verification using Operative.sh MCP
- ✅ Git-disciplined development with tier-based commits and pushes

**Phase [N] ([Phase Name]) is now complete and ready for production deployment.**
```

### Subtask Template

```markdown
#### Subtask X.Y: [Descriptive Action-Oriented Title]
- [ ] Before starting, use Context7 MCP to fetch latest [specific technology] documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/[organization]/[repository]"` and topic: "[specific documentation topic]"
- [ ] Use Perplexity MCP to research [specific domain] patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "[detailed research question about best practices or patterns]"
- [ ] [Specific implementation step 1]
- [ ] [Specific implementation step 2]
- [ ] [Specific implementation step 3]
- [ ] [Additional implementation steps as needed]
- [ ] [Reference template directories if using Magic UI]
- [ ] [Include Supabase MCP commands if database operations]

📎 [Relevant MCP reference with specific command if applicable]
```

---

## Troubleshooting and Common Issues

### MCP Integration Issues

**Problem**: Context7 library ID not found
```
Error: Library "/invalid/library" not found
```
**Solution**: 
1. Use `mcp1_resolve-library-id` to find correct library ID
2. Verify organization and repository names
3. Check if library is supported by Context7

**Problem**: Perplexity research queries too broad
```
Result: Generic information not specific to use case
```
**Solution**:
1. Make queries more specific to the implementation context
2. Include technology stack in the query
3. Ask for specific patterns or approaches

**Problem**: Magic UI components not matching design system
```
Result: Inconsistent styling across components
```
**Solution**:
1. Reference template directories in search queries
2. Use more specific component descriptions
3. Include design system keywords in search

### Tier Checkpoint Issues

**Problem**: Unclear when tier is "complete"
```
Issue: Subjective completion criteria
```
**Solution**:
1. Define specific verification criteria for each subtask
2. Use Operative.sh MCP for objective testing
3. Create explicit acceptance criteria

**Problem**: Git commits too large or unclear
```
Issue: Difficult to review or rollback changes
```
**Solution**:
1. Follow exact commit message format
2. Ensure commits only include tier-specific changes
3. Use descriptive achievement summaries

### Research Integration Issues

**Problem**: Research not actionable
```
Issue: Generic best practices not applicable to specific implementation
```
**Solution**:
1. Make research queries more context-specific
2. Include current technology stack in queries
3. Ask for specific implementation patterns

**Problem**: Documentation research outdated
```
Issue: Context7 returns deprecated information
```
**Solution**:
1. Specify version in library ID if available
2. Cross-reference with Perplexity for current practices
3. Verify information against official sources

### Quality Assurance Issues

**Problem**: Operative.sh testing not comprehensive
```
Issue: QA verification missing edge cases
```
**Solution**:
1. Define specific testing scenarios
2. Include performance and accessibility criteria
3. Test across multiple device types and browsers

**Problem**: Visual verification subjective
```
Issue: Design compliance unclear
```
**Solution**:
1. Reference specific design system components
2. Include accessibility requirements
3. Define objective visual criteria

---

## Conclusion

This Phase Standardization Manual provides a comprehensive framework for implementing systematic, AI-powered development workflows. By following this methodology, development teams can:

- **Ensure Consistency**: Every phase follows the same structure and quality standards
- **Leverage AI Research**: Make informed decisions based on current best practices
- **Maintain Quality**: Systematic testing and verification at every stage
- **Track Progress**: Clear checkboxes and milestones for project management
- **Enable Collaboration**: Standardized processes that any team member can follow

The integration of multiple MCP servers creates a powerful development ecosystem that combines human expertise with AI-powered research, component generation, and quality assurance. This approach has been proven effective in the Vibe DevSquad platform development and can be adapted to any complex software project.

### Key Success Factors

1. **Discipline**: Following the tier-based approach without shortcuts
2. **Research**: Always researching before implementing
3. **Consistency**: Using the same structure across all phases
4. **Quality**: Comprehensive testing and verification at every step
5. **Documentation**: Clear, actionable instructions that anyone can follow

By implementing this standardization framework, development teams can achieve higher quality outcomes, reduce technical debt, and create maintainable, scalable software systems with confidence.

---

*This manual represents the culmination of systematic development practices refined through the implementation of the Vibe DevSquad platform. It serves as both a historical record of our methodology and a practical guide for future projects.*
