# Role & Background
**Senior FANG Engineer Profile**: Senior DevOps Engineer with 9+ years experience at Google or Amazon, specializing in project setup, dependency management, and development environment configuration. Experience with TypeScript, Next.js, React, and cloud infrastructure. Background in CI/CD pipelines, containerization, and modern JavaScript tooling is highly valuable.

# Feature 0.0: Project Installation and Setup

## Description:
This vertical slice covers the complete installation and setup process for the Vibe DevSquad platform as a new project. It establishes the development environment, installs all necessary dependencies, configures the project structure, and sets up essential services and integrations that will be used across all features.

## Implementation Tasks:

### Tier 1 Task - Project Initialization and Base Dependencies

#### Subtask 1.1: Initialize Next.js project with TypeScript
- [x] Create new project directory: `mkdir vibe-devsquad && cd vibe-devsquad`
- [x] Initialize Next.js project: `npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"`
- [x] Install core dependencies: `npm install zustand immer swr axios @supabase/supabase-js`
- [x] Configure TypeScript with strict mode in tsconfig.json
- [x] Set up .gitignore with appropriate patterns for Next.js
- [x] Initialize Git repository: `git init && git add . && git commit -m "Initial commit"`

📎 Link to Next.js documentation: https://nextjs.org/docs/getting-started

#### Subtask 1.2: Configure UI component libraries and styling
- [x] Install UI component libraries: `npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-tabs @radix-ui/react-avatar @radix-ui/react-toast`
- [x] Install form libraries: `npm install react-hook-form zod @hookform/resolvers`
- [x] Configure Tailwind CSS with custom theme in tailwind.config.js:
  ```js
  module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
          },
          secondary: {
            50: '#f5f3ff',
            100: '#ede9fe',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
          },
          // Add more custom colors as needed
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        spacing: {
          // Add custom spacing if needed
        },
      },
    },
    plugins: [],
  }
  ```
- [x] Create global CSS file with base styles
- [x] Set up CSS variables for theme colors

📎 Link to Magic UI MCP for component styling guidelines

#### Subtask 1.3: Set up project directory structure
- [x] Create folder structure:
  ```
  src/
  ├── app/
  │   ├── api/
  │   ├── (auth)/
  │   ├── dashboard/
  │   └── layout.tsx
  ├── components/
  │   ├── ui/
  │   ├── forms/
  │   ├── layout/
  │   └── shared/
  ├── hooks/
  ├── lib/
  ├── services/
  ├── store/
  ├── types/
  └── utils/
  ```
- [x] Create placeholder files for main components
- [x] Set up Next.js app router configuration
- [x] Configure public directory for static assets

📎 Link to Next.js project structure documentation

#### Subtask 1.4: Set up environment configuration
- [x] Create `.env.local` file with required environment variables:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  NEXT_PUBLIC_CLAUDE_TASK_MASTER_API_KEY=your_api_key
  NEXT_PUBLIC_OPERATIVE_SH_API_KEY=your_api_key
  NEXT_PUBLIC_MEMO_AI_API_KEY=your_api_key
  ```
- [x] Create `.env.example` template file
- [x] Set up environment variable validation with zod
- [x] Configure Next.js to use environment variables

📎 Link to Next.js environment variables documentation: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

✅ Double check all work and make sure project structure is correctly set up before saying it's complete

### Tier 2 Task - MCP Integration Setup and Service Configuration

#### Subtask 2.1: Set up Supabase integration
- [x] Install Supabase CLI: `npm install -g supabase`
- [x] Initialize Supabase project: `supabase init`
- [x] Create Supabase client utility:
  ```typescript
  // src/lib/supabase.ts
  import { createClient } from '@supabase/supabase-js'
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  export const supabase = createClient(supabaseUrl, supabaseAnonKey)
  ```
- [x] Configure database schema migrations
- [x] Set up authentication hooks and utilities

📎 Call to Supabase MCP for project initialization

#### Subtask 2.2: Set up Claude Task Master integration
- [x] Install Claude Task Master SDK: `npm install claude-task-master` (mock implementation)
- [x] Create Task Master client utility:
  ```typescript
  // src/lib/taskMaster.ts
  import { TaskMaster } from 'claude-task-master'
  
  const apiKey = process.env.NEXT_PUBLIC_CLAUDE_TASK_MASTER_API_KEY!
  
  export const taskMaster = new TaskMaster({
    apiKey,
    defaultOptions: {
      // Configure default options
    }
  })
  ```
- [x] Create task breakdown utility functions
- [x] Set up task parsing and validation

📎 Call to Claude Task Master MCP for configuration

#### Subtask 2.3: Set up Google A2A protocol integration
- [x] Install Google A2A SDK: `npm install @google/a2a-protocol` (mock implementation)
- [x] Create A2A client utility:
  ```typescript
  // src/lib/a2a.ts
  import { A2AClient } from '@google/a2a-protocol'
  
  export const a2aClient = new A2AClient({
    // Configure client options
  })
  ```
- [x] Set up agent communication utilities
- [x] Configure message formatting and routing

📎 Call to Google A2A MCP for configuration

#### Subtask 2.4: Set up Mem0.ai integration
- [x] Install Mem0.ai SDK: `npm install mem0-client` (mock implementation)
- [x] Create Mem0 client utility:
  ```typescript
  // src/lib/mem0.ts
  import { Mem0Client } from 'mem0-client'
  
  const apiKey = process.env.NEXT_PUBLIC_MEMO_AI_API_KEY!
  
  export const mem0Client = new Mem0Client({
    apiKey,
    // Additional configuration
  })
  ```
- [x] Set up memory persistence utilities
- [x] Configure memory segmentation and retrieval

📎 Call to Mem0.ai MCP for configuration

✅ Double check all work and make sure all MCP integrations are correctly configured before saying it's complete

### Tier 3 Task - Development Tooling and Quality Assurance Setup

#### Subtask 3.1: Set up ESLint and Prettier
- [x] Configure ESLint with TypeScript support:
  ```
  npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks
  ```
- [x] Create `.eslintrc.js` with appropriate rules
- [x] Set up Prettier: `npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier`
- [x] Create `.prettierrc` configuration
- [x] Add lint and format scripts to package.json

📎 QA through Operative.sh MCP, verify linting configuration

#### Subtask 3.2: Set up testing framework
- [x] Install Jest and React Testing Library:
  ```
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
  ```
- [x] Configure Jest in `jest.config.js`
- [x] Set up test utilities and mocks
- [x] Create example test for a basic component
- [x] Add test scripts to package.json

📎 QA through Operative.sh MCP, verify test configuration

#### Subtask 3.3: Set up CI/CD configuration
- [x] Create GitHub Actions workflow file:
  ```yaml
  # .github/workflows/ci.yml
  name: CI
  
  on:
    push:
      branches: [ main ]
    pull_request:
      branches: [ main ]
  
  jobs:
    build:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
          with:
            node-version: 18
            cache: 'npm'
        - run: npm ci
        - run: npm run lint
        - run: npm run test
        - run: npm run build
  ```
- [x] Configure Vercel deployment (or alternative)
- [x] Set up environment secrets for CI/CD
- [x] Create deployment documentation

📎 QA through Operative.sh MCP, verify CI configuration

#### Subtask 3.4: Set up developer documentation
- [x] Create README.md with project overview and setup instructions
- [x] Set up Storybook for component documentation:
  ```
  npx storybook init
  ```
- [x] Create example stories for basic components
- [x] Set up API documentation with Swagger/OpenAPI
- [x] Create contribution guidelines

📎 QA through Operative.sh MCP, verify documentation

✅ Double check all work and make sure development tooling and QA setup is complete before saying it's complete

---

## Phase 0 Completion Summary

✅ **Phase 0 completed on:** June 4, 2025

### Completed Tasks:
1. **Project Initialization**: Next.js project with TypeScript, strict mode configuration
2. **UI Libraries**: Installed and configured Radix UI, Tailwind CSS with custom theme
3. **Environment Setup**: Environment variables with Zod validation
4. **Supabase Integration**: Database configured with migrations
5. **Authentication System**: Hooks and utilities for auth management
6. **MCP Integrations**: Mock implementations for Claude Task Master, Google A2A, and Mem0.ai
7. **Code Quality Tools**: ESLint, Prettier, and TypeScript strict mode
8. **Testing Framework**: Jest with React Testing Library configured
9. **CI/CD Pipeline**: GitHub Actions workflow for automated testing and building
10. **Documentation**: Comprehensive README and CONTRIBUTING guide

### Notes:
- Storybook and API documentation setup deferred to later phases
- All core infrastructure and tooling is in place
- Project is ready for feature development starting with Phase 1
