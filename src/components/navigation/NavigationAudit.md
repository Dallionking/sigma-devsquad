
# Navigation Structure Audit

## Current Navigation Elements Identified:

### 1. Primary Navigation (Main Sidebar)
- **File**: `src/components/navigation/EnhancedUnifiedSidebar.tsx`
- **Purpose**: Main application navigation
- **Items**: Dashboard, Planning Agent, Projects, Presentations, Agent Config, MCP Management, LLM Integration, IDE Integration, Profile, Account, Teams, Settings
- **Status**: ✅ Well-structured, collapsible

### 2. Secondary Navigation (Dashboard Sidebar)
- **File**: `src/components/dashboard/SidebarRenderer.tsx`
- **Purpose**: Context-specific content (agents, teams, tasks)
- **Items**: Agent lists, team hierarchy, task management
- **Status**: ⚠️ Overlaps with main navigation in some areas

### 3. Top Header Navigation
- **File**: `src/components/dashboard/header/OptimizedConsolidatedNavigation.tsx`
- **Purpose**: Quick access to main sections + dropdowns
- **Items**: Dashboard, Planning, Projects, Presentations + Config/Account dropdowns
- **Status**: ⚠️ Duplicates primary navigation

### 4. Breadcrumb Navigation
- **File**: `src/components/navigation/HierarchicalBreadcrumb.tsx`
- **Purpose**: Show current location in hierarchy
- **Status**: ✅ Good implementation but not consistently used

### 5. Modal/Onboarding Navigation
- **File**: `src/components/onboarding/OnboardingModal.tsx`
- **Purpose**: Onboarding flow navigation
- **Status**: ✅ Isolated, appropriate for context

### 6. Mobile Navigation
- **File**: `src/components/layout/MobileNavigation.tsx`
- **Purpose**: Mobile-specific navigation
- **Status**: ⚠️ Duplicates primary navigation items

## Proposed Hierarchy:

```
Primary Navigation (Sidebar)
├── Dashboard
├── Planning Agent
├── Projects
├── Presentations
└── Configuration
    ├── Agent Config
    ├── MCP Management
    ├── LLM Integration
    └── IDE Integration
└── Account
    ├── Profile
    ├── Account & Billing
    ├── Teams
    └── Settings

Secondary Navigation (Context-specific)
├── Dashboard: Agent/Team management
├── Planning: Workflow steps
├── Projects: Project-specific tools
└── Configuration: Setting categories

Breadcrumb Navigation
├── Always show current location
├── Enable quick navigation up hierarchy
└── Show context (Team view vs Individual view)
```

## Issues to Fix:
1. **Redundant top header navigation** - duplicates sidebar items
2. **Inconsistent breadcrumb usage** - not shown everywhere
3. **Mobile navigation duplication** - repeats primary nav
4. **Context switching confusion** - unclear when in team vs individual view
