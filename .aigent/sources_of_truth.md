# Sources of Truth Index

This document maintains the authoritative files for different aspects of the Vibe Dev Squad project. When conflicts arise, these files take precedence.

## Core Project Documentation

| Category | Authoritative File | Description |
|----------|-------------------|-------------|
| **Project Rules** | `/Main /.windsurf/rules` | Canonical operational rules and guidelines |
| **Project Status** | `/.aigent/current_status.md` | Current task and phase tracking |
| **Change History** | `/.aigent/CHANGELOG.md` | Project change log and completion records |
| **Project Overview** | `/.aigent/project_bio.md` | Project mission, features, and vision |
| **Design System** | `/.aigent/design/vibe_devsquad_design_system.md` | UI/UX standards and Magic UI guidelines |
| **Phase Planning** | `/Phases/` directory | Phase-specific task lists and requirements |

## Technical Specifications

| Category | Authoritative File | Description |
|----------|-------------------|-------------|
| **API Specifications** | TBD | API endpoint definitions and contracts |
| **Database Schema** | TBD | Supabase/PostgreSQL schema definitions |
| **Environment Config** | `.env.example` | Required environment variables |
| **Component Library** | `/Magic Ui templates/` | Purchased UI component references |

## Workflow Documentation

| Category | Authoritative File | Description |
|----------|-------------------|-------------|
| **Task Workflows** | `/.aigent/workflows_and_protocols/` | Standard operating procedures |
| **MCP Integration** | See rules RULE_C7_*, RULE_MU_*, RULE_TM_* | MCP usage guidelines |
| **Git Workflow** | See rules RULE_CR_* | Version control procedures |

## Update Protocol

1. **Before Creating New Files**: Always check this index first
2. **When Updating**: Make changes to the authoritative file first
3. **Propagation**: Update dependent documents after changing source of truth
4. **Conflicts**: This index determines which file is authoritative
5. **New Categories**: Update this index when establishing new sources of truth

## Notes
- Files marked "TBD" will be created as needed during project development
- All paths are relative to project root: `/Users/dallionking/CascadeProjects/Vibe Dev Squad/`
- This index itself is the source of truth for determining authoritative files
