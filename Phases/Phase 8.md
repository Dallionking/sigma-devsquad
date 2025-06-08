# 08. Onboarding Experience

## Role & Background
**Senior FANG Engineer Profile**: Senior UX Engineer with 7+ years experience at Google or Apple, specializing in user onboarding flows, interactive tutorials, and progressive disclosure patterns. Experience with TypeScript, Next.js, and building engaging first-time user experiences. Background in user research, interaction design, and conversion optimization is highly valuable.

## Feature Description
The Onboarding Experience feature guides new users through the setup and initial use of the Vibe DevSquad platform, ensuring they understand core concepts and can quickly become productive. This feature implements a complete six-step guided onboarding process with interactive elements, progress tracking, and contextual help in a new Next.js project.

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

### Tier 1 Task - Onboarding Infrastructure Setup

#### Subtask 1.1: Set up onboarding database schema
- [ ] Before starting, use Context7 MCP to fetch latest Supabase schema design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/supabase/supabase"` and topic: "database schema design"
- [ ] Use Perplexity MCP to research onboarding flow best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for user onboarding database schema design and progress tracking"
- [ ] Create `onboarding_progress` table with fields: id, user_id, current_step, completed_steps, started_at, completed_at, last_activity_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `onboarding_steps` table with fields: id, step_number, title, description, completion_criteria, estimated_time
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `user_preferences` table with fields: id, user_id, onboarding_completed, show_tips, theme_preference, created_at, updated_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Create `onboarding_feedback` table with fields: id, user_id, step_number, rating, feedback_text, submitted_at
  - [ ] Use Supabase MCP with `mcp5_apply_migration` to create the table
- [ ] Set up appropriate relationships and constraints between tables
- [ ] Create database indexes for performance optimization

📎 Use Supabase MCP for database operations with `mcp5_apply_migration` command

#### Subtask 1.2: Create Next.js API routes for onboarding
- [ ] Before starting, use Context7 MCP to fetch latest Next.js route handler documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/next.js"` and topic: "route handlers"
- [ ] Use Perplexity MCP to research onboarding API patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "API design patterns for user onboarding progress tracking and step management"
- [ ] Implement `/api/onboarding/progress` route with GET and PUT methods
- [ ] Implement `/api/onboarding/steps` route with GET method
- [ ] Implement `/api/onboarding/complete` route for marking onboarding as complete
- [ ] Implement `/api/onboarding/feedback` route for submitting feedback
- [ ] Implement `/api/user/preferences` route for updating user preferences

📎 Use Context7 MCP for Next.js API routes documentation

#### Subtask 1.3: Create onboarding step components
- [ ] Before starting, use Context7 MCP to fetch latest React component design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/facebook/react"` and topic: "component design patterns"
- [ ] Use Perplexity MCP to research onboarding UI patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "UI design patterns for user onboarding flows and step-by-step tutorials"
- [ ] Create `OnboardingContainer` component for overall onboarding experience
  - [ ] Use `/ui` command: "Create onboarding container with progress tracking and step navigation"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/onboarding/container.tsx`
- [ ] Create `StepIndicator` component for showing progress
  - [ ] Use `/ui` command: "Create step indicator with progress visualization and step numbers"
  - [ ] Reference: `/Magic Ui templates/onboarding/step-indicator.tsx`
- [ ] Create `OnboardingStep` component for individual steps
  - [ ] Use `/ui` command: "Create onboarding step with content area and interactive elements"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/onboarding/step.tsx`
- [ ] Create `OnboardingNavigation` component for moving between steps
  - [ ] Use `/ui` command: "Create navigation with previous/next buttons and skip options"
  - [ ] Reference: `/Magic Ui templates/onboarding/navigation.tsx`
- [ ] Create `CompletionCelebration` component for final step
  - [ ] Use `/ui` command: "Create celebration component with confetti and success message"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/onboarding/celebration.tsx`
  - [ ] Follow Vibe DevSquad design system guidelines in `/Users/dallionking/CascadeProjects/Vibe Dev Squad/vibe-devsquad/.aigent/design/vibe_devsquad_design_system.md`

📎 Use Magic UI MCP for component styling guidelines

#### Subtask 1.4: Implement onboarding step content
- [ ] Before starting, use Context7 MCP to fetch latest content design documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/framer/motion"` and topic: "animation patterns"
- [ ] Use Perplexity MCP to research onboarding content best practices
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for onboarding content design and interactive tutorial creation"
- [ ] Create Step 1: Welcome and Platform Overview
  - [ ] Use `/ui` command: "Create welcome step with platform introduction and feature highlights"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/onboarding/welcome.tsx`
- [ ] Create Step 2: Project Setup
  - [ ] Use `/ui` command: "Create project setup step with guided project creation"
  - [ ] Reference: `/Magic Ui templates/onboarding/project-setup.tsx`
- [ ] Create Step 3: Agent Team Creation
  - [ ] Use `/ui` command: "Create team creation step with agent selection and configuration"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/onboarding/team-creation.tsx`
- [ ] Create Step 4: Task Management Introduction
  - [ ] Use `/ui` command: "Create task management step with interactive task creation demo"
  - [ ] Reference: `/Magic Ui templates/onboarding/task-management.tsx`
- [ ] Create Step 5: Communication Setup
  - [ ] Use `/ui` command: "Create communication setup with channel configuration"
  - [ ] Reference: `/.aigent/design/Magic Ui templates/agent-template/onboarding/communication.tsx`
- [ ] Create Step 6: Next Steps and Resources
  - [ ] Use `/ui` command: "Create next steps with resource links and getting started guide"
  - [ ] Reference: `/Magic Ui templates/onboarding/next-steps.tsx`
- [ ] Implement content with illustrations, animations, and interactive elements

📎 Use Magic UI MCP for content creation guidelines

✅ **Tier 1 Checkpoint**: Ensure all Tier 1 subtasks are complete and the onboarding database schema, API routes, step components, and content are properly implemented before proceeding to Tier 2

**🔄 Git Commit and Push After Tier 1:**
```bash
git add .
git commit -m "feat: implement Phase 8 Tier 1 - Onboarding Experience infrastructure setup

- Set up onboarding database schema with progress tracking and feedback
- Created Next.js API routes for onboarding flow management
- Built onboarding step components with Magic UI templates
- Developed comprehensive step content with interactive elements
- Configured progress tracking and navigation components"
git push origin main
```

### Tier 2 Task - Onboarding Business Logic and Interaction

#### Subtask 2.1: Implement onboarding flow management
- [ ] Before starting, use Context7 MCP to fetch latest state management documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/zustand/zustand"` and topic: "state management patterns"
- [ ] Use Perplexity MCP to research onboarding flow patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Best practices for onboarding flow management and user progress tracking"
- [ ] Create onboarding state management with Zustand
- [ ] Implement step navigation logic
- [ ] Develop progress tracking and persistence
- [ ] Create conditional paths based on user role
- [ ] Implement onboarding resumption logic
- [ ] Add error handling for failed operations with user feedback

📎 Use Supabase MCP for progress persistence with `mcp5_execute_sql`

#### Subtask 2.2: Implement interactive tutorials
- [ ] Before starting, use Context7 MCP to fetch latest tutorial framework documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/shepherdjs/shepherd"` and topic: "interactive tutorials"
- [ ] Use Perplexity MCP to research interactive tutorial patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Interactive tutorial design patterns and user engagement techniques"
- [ ] Create guided tour functionality
- [ ] Implement element highlighting
- [ ] Develop interactive task completion
- [ ] Create validation for required actions
- [ ] Implement contextual help tooltips

📎 Use Operative.sh MCP for UI interaction tracking with `mcp7_web_eval_agent`

#### Subtask 2.3: Implement sample data generation
- [ ] Before starting, use Context7 MCP to fetch latest data generation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/faker-js/faker"` and topic: "sample data generation"
- [ ] Use Perplexity MCP to research sample data patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Sample data generation patterns for onboarding and demo environments"
- [ ] Create sample project generation
- [ ] Implement sample agent team creation
- [ ] Develop sample task creation
- [ ] Create sample communication channels
- [ ] Implement data cleanup options

📎 Use Claude Task Master MCP for sample task generation with `mcp6_add_task`

#### Subtask 2.4: Implement progress tracking and analytics
- [ ] Before starting, use Context7 MCP to fetch latest analytics documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/vercel/analytics"` and topic: "user analytics"
- [ ] Use Perplexity MCP to research onboarding analytics patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Onboarding analytics patterns and conversion funnel optimization"
- [ ] Create step completion tracking
- [ ] Implement time spent analytics
- [ ] Develop drop-off point identification
- [ ] Create conversion funnel visualization
- [ ] Implement A/B testing framework for onboarding variants

📎 Use Operative.sh MCP for analytics visualization with `mcp7_web_eval_agent`

✅ **Tier 2 Checkpoint**: Ensure all Tier 2 subtasks are complete and onboarding flow management, interactive tutorials, sample data generation, and progress tracking work correctly before proceeding to Tier 3

**🔄 Git Commit and Push After Tier 2:**
```bash
git add .
git commit -m "feat: implement Phase 8 Tier 2 - Onboarding Experience business logic

- Built onboarding flow management with state persistence and navigation
- Created interactive tutorials with guided tours and element highlighting
- Implemented sample data generation for demo environments
- Added progress tracking and analytics with conversion funnel visualization"
git push origin main
```

### Tier 3 Task - UI Polish and Quality Assurance

#### Subtask 3.1: Enhance onboarding visualization
- [ ] Before starting, use Context7 MCP to fetch latest animation documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/framer/motion"` and topic: "animation patterns"
- [ ] Use Perplexity MCP to research onboarding visualization patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Visual design patterns for onboarding flows and progress indicators"
- [ ] Add progress indicator with step completion (6 steps, color: #4299E1)
- [ ] Implement animated transitions between steps (300ms ease-in-out)
- [ ] Create celebratory animations for step completion
- [ ] Add illustration and iconography for each step
- [ ] Implement responsive layout for all device sizes

📎 Use Operative.sh MCP for visual confirmation with `mcp7_web_eval_agent`

#### Subtask 3.2: Implement personalization elements
- [ ] Before starting, use Context7 MCP to fetch latest personalization documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/react/react"` and topic: "conditional rendering"
- [ ] Use Perplexity MCP to research personalization patterns
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Personalization patterns for user onboarding and adaptive interfaces"
- [ ] Create personalized welcome with user name
- [ ] Implement role-based content adaptation
- [ ] Develop preference-based UI customization
- [ ] Create adaptive difficulty based on user expertise
- [ ] Implement personalized recommendations

📎 Use Operative.sh MCP for personalization verification with `mcp7_web_eval_agent`

#### Subtask 3.3: Implement accessibility enhancements
- [ ] Before starting, use Context7 MCP to fetch latest accessibility documentation
  - [ ] Use command: `mcp1_get-library-docs` with `context7CompatibleLibraryID: "/w3c/wcag"` and topic: "accessibility guidelines"
- [ ] Use Perplexity MCP to research accessibility patterns for onboarding
  - [ ] Use command: `mcp3_perplexity_ask` with query: "Accessibility best practices for onboarding flows and interactive tutorials"
- [ ] Add keyboard navigation for all onboarding steps
- [ ] Implement screen reader support with proper ARIA labels
- [ ] Create high contrast mode for visual accessibility
- [ ] Add focus indicators for all interactive elements
- [ ] Implement skip options for users with disabilities
- [ ] Create alternative text for all images and illustrations

📎 Use Magic UI MCP for accessibility guidelines

✅ **Tier 3 Checkpoint**: Ensure all Tier 3 subtasks are complete and the onboarding experience is visually polished, personalized, accessible, and provides excellent user experience before saying it's complete

**🔄 Git Commit and Push After Tier 3 (Phase 8 Complete):**
```bash
git add .
git commit -m "feat: complete Phase 8 - Onboarding Experience UI polish and QA

- Enhanced onboarding visualization with progress indicators and animations
- Implemented personalization elements with role-based content adaptation
- Added comprehensive accessibility enhancements with keyboard navigation
- Completed comprehensive QA verification through Operative.sh MCP"
git push origin main
```

---

## 🎉 Phase 8 Complete!
The Onboarding Experience feature is now fully implemented with:
- ✅ Complete database schema and API infrastructure for progress tracking
- ✅ Comprehensive onboarding step components with Magic UI templates
- ✅ Interactive step content with guided tutorials and animations
- ✅ Flow management with state persistence and navigation logic
- ✅ Sample data generation for demo environments
- ✅ Progress tracking and analytics with conversion optimization
- ✅ Visual enhancements with personalization and accessibility features
- ✅ Comprehensive QA verification
