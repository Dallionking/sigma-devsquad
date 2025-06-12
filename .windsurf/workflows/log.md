---
description: Log development progress, commits, and project status
---

# Development Logging Workflow

This workflow helps track development progress, commit changes, and update project status with comprehensive documentation.

## 1. Check Current Development Status
// turbo
```bash
git status
```

## 2. Review Recent Commits
// turbo
```bash
git log --oneline -10
```

## 3. Check Current Branch and Remote Status
// turbo
```bash
git branch -v
git remote -v
```

## 4. Update Current Status Document
Edit `.aigent/current_status.md` to reflect:
- Latest completed tasks
- Current active work
- Any blockers or issues
- Next planned steps

## 5. Update Project Bio (if major milestones completed)
Edit `.aigent/project_bio.md` to reflect:
- New features completed
- Technology updates
- Architecture changes
- Success metrics updates

## 6. Comprehensive Documentation Update
When completing significant development work (bug fixes, new features, or phase completion), update ALL relevant documentation:

### 6.1 Update CHANGELOG.md
Edit `.aigent/CHANGELOG.md` with:
- **Date and Time**: Use format `### YYYY-MM-DD - HH:MM EST`
- **Summary**: Brief description of changes
- **Technical Details**: 
  - Root cause of issues fixed
  - Implementation approach
  - Files modified with specific changes
  - Code snippets if relevant
- **Bug Fixes**: List all bugs resolved
- **Performance Improvements**: Any optimizations made
- **New Components/Features**: Detailed descriptions

### 6.2 Update Features.md
Edit `Features.md` to add/update:
- **New Feature Sections**: Full documentation of new capabilities
- **Feature Enhancements**: Updates to existing features
- **Technical Implementation**: How features work
- **User Instructions**: How to use new features
- **Known Limitations**: Any constraints or issues

### 6.3 Update Main README.md
Edit `vibe-devsquad/README.md` to reflect:
- **Current Status**: Update phase and completion percentage
- **Key Features**: Add new features to feature list
- **Tech Stack**: Add new dependencies or tools
- **Getting Started**: Update if setup process changed

### 6.4 Create/Update Developer Handoff Documentation
If not exists, create `.aigent/DEVELOPER_HANDOFF.md` with:
- **Quick Start Guide**: Step-by-step setup instructions
- **Architecture Overview**: Key directories and files
- **Current Implementation Status**: What's done, in progress, not started
- **Known Issues & Workarounds**: Common problems and solutions
- **Development Patterns**: Code examples and best practices
- **Next Steps**: Clear priorities for continuing work

### 6.5 Create/Update Technical Decisions Log
If not exists, create `.aigent/TECHNICAL_DECISIONS.md` with:
- **Architecture Decisions**: Why certain approaches were chosen
- **Technology Choices**: Rationale for tools and frameworks
- **Trade-offs**: What was sacrificed for what benefit
- **Implementation Details**: Code examples of decisions
- **Future Considerations**: What might need revisiting

### 6.6 Create/Update Known Issues Document
If not exists, create `.aigent/KNOWN_ISSUES.md` with:
- **Issue Severity**: Critical, High, Medium, Low
- **Issue Description**: Clear explanation of the problem
- **Reproduction Steps**: How to trigger the issue
- **Workarounds**: Temporary fixes available
- **Permanent Fix**: Planned solution approach
- **Related Code**: File locations and functions affected

### 6.7 Create/Update Dependencies Documentation
If not exists, create `.aigent/DEPENDENCIES.md` with:
- **Core Dependencies**: Framework and runtime packages
- **Version Management**: Why certain versions are pinned
- **Known Incompatibilities**: Packages that don't work together
- **Security Considerations**: Packages needing regular updates
- **Bundle Size Impact**: Large dependencies to monitor

## 7. Log Significant Changes
Create commit with descriptive message:
```bash
git add .
git commit -m "Type: Brief description of changes

- Detailed bullet points of what changed
- Reference to issue numbers if applicable
- Note any breaking changes"
```

Common commit types:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

## 8. Push Changes (if ready)
```bash
git push origin main
```

## 9. Review Project Phases
Check relevant phase documents in `Phases/` folder:
- Mark completed subtasks with 
- Update progress percentages
- Note any implementation changes or decisions
- Document lessons learned

## 10. Update Memory (for AI sessions)
Document important context, decisions, or learnings that should be remembered for future development sessions.

## 11. Performance Check (for web apps)
If running a web application:
```bash
npm run build
npm run dev
```

## 12. Final Documentation Checklist
Before concluding the session, ensure:
- [ ] All code changes are documented in CHANGELOG.md
- [ ] README reflects current project state
- [ ] Known issues are documented with workarounds
- [ ] Technical decisions are recorded with rationale
- [ ] Developer handoff doc would enable a new developer to continue
- [ ] All file paths and dependencies are accurate
- [ ] Next steps are clearly defined

## Notes:
- **Documentation is as important as code** - Future developers (including yourself) will thank you
- **Be specific** - Include file paths, function names, and code snippets
- **Think handoff** - Write as if you're explaining to someone who's never seen the project
- **Update immediately** - Don't wait until "later" to document changes
- **Use consistent formatting** - Follow the established patterns in each document
- **Include context** - Explain WHY decisions were made, not just WHAT was done
