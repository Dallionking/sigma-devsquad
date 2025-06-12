---
description: Log development progress, commits, and project status
---

# Development Logging Workflow

This workflow helps track development progress, commit changes, and update project status.

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

## 6. Log Significant Changes
Create commit with descriptive message:
```bash
git add .
git commit -m "Type: Brief description of changes"
```

Common commit types:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding/updating tests
- `chore:` Maintenance tasks

## 7. Push Changes (if ready)
```bash
git push origin main
```

## 8. Review Project Phases
Check relevant phase documents in `Phases/` folder:
- Mark completed subtasks with 
- Update progress indicators
- Note any implementation changes or decisions

## 9. Update Memory (for AI sessions)
Document important context, decisions, or learnings that should be remembered for future development sessions.

## 10. Performance Check (for web apps)
If running a web application:
```bash
npm run build
npm run dev
```

## Notes:
- Use this workflow at the end of significant development sessions
- Keep commit messages descriptive and consistent
- Update documentation as you go, not just at the end
- Regular logging helps maintain project continuity
