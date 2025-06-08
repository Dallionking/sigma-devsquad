# Vercel MCP Integration

This document provides comprehensive information about the Vercel MCP (Machine Collaboration Protocol) integration in the Vibe Dev Squad project.

## Overview

The Vercel MCP integration allows the Vibe Dev Squad application to interact with Vercel's deployment platform programmatically through the Machine Collaboration Protocol. This integration enables:

- Monitoring deployment status
- Managing environment variables
- Viewing project analytics
- Checking MCP registry status

## Architecture

The integration consists of the following components:

1. **Vercel MCP Adapter** (`src/lib/mcps/vercel-adapter.ts`): Implements the MCP adapter interface for Vercel.
2. **Vercel MCP Server Route** (`src/app/api/mcps/vercel/route.ts`): Next.js API route that handles MCP requests.
3. **Vercel Dashboard UI** (`src/components/dashboard/vercel/VercelDeploymentStatus.tsx`): React component for visualizing Vercel deployment data.
4. **Vercel Dashboard Page** (`src/app/dashboard/vercel/page.tsx`): Next.js page that hosts the Vercel dashboard UI.
5. **Database Migration** (`supabase/migrations/20250607_add_vercel_mcp.sql`): Adds Vercel MCP to the registry.

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Vercel account with API access
- Supabase project

### Installation

1. Install the Vercel MCP adapter:

```bash
npm install @vercel/mcp-adapter
```

2. Configure environment variables in your `.env.local` file:

```
VERCEL_API_TOKEN=your_vercel_api_token
VERCEL_PROJECT_ID=your_project_id
VERCEL_TEAM_ID=your_team_id  # Optional
```

3. Run the Supabase migration to add Vercel MCP to the registry:

```bash
npx supabase db push
```

## Available Tools

The Vercel MCP integration provides the following tools:

### 1. get_deployment_status

Gets the current deployment status of the project.

**Parameters:**
- `projectId` (string): The Vercel project ID

**Example Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "🚀 Current Deployment Status:\n- Environment: Production\n- Status: Active\n- Last Deployed: 2025-06-07T21:15:30.123Z\n- Branch: main\n- Commit: 8f7e6d5c4b3a2e1f0d9c8b7a6e5d4c3b2a1f0e9d\n- Build Status: Success\n- Runtime Status: Healthy\n- Edge Network: Connected\n- Analytics: Enabled"
    }
  ]
}
```

### 2. list_environment_variables

Lists all environment variables for the project (names only, no values).

**Parameters:**
- `projectId` (string): The Vercel project ID

**Example Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "🔐 Environment Variables:\n- NEXT_PUBLIC_SUPABASE_URL\n- NEXT_PUBLIC_SUPABASE_ANON_KEY\n- SUPABASE_SERVICE_ROLE_KEY\n- NEXT_PUBLIC_SITE_URL\n- NEXT_PUBLIC_API_BASE_URL\n- NEXT_PUBLIC_MCP_REGISTRY_URL\n- NEXT_PUBLIC_ANALYTICS_ID\n- NEXT_PUBLIC_FEATURE_FLAGS"
    }
  ]
}
```

### 3. get_project_analytics

Gets analytics data for the project.

**Parameters:**
- `projectId` (string): The Vercel project ID
- `timeframe` (string): The timeframe for analytics data (24h, 7d, 30d, 90d)

**Example Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "📊 Project Analytics (24h):\n- Visitors: 156\n- Page Views: 423\n- API Calls: 1,567\n- Edge Function Invocations: 890\n- Average Response Time: 124ms\n- Error Rate: 0.12%"
    }
  ]
}
```

### 4. get_mcp_registry_status

Gets the status of all registered MCPs in the system.

**Parameters:** None

**Example Response:**
```json
{
  "content": [
    {
      "type": "text",
      "text": "🔌 MCP Registry Status:\n- Context7 MCP: Active\n- Perplexity MCP: Active\n- Magic UI MCP: Active\n- TaskMaster MCP: Active\n- GitHub MCP: Active\n- Supabase MCP: Active\n- Web Eval Agent MCP: Active\n- Vercel MCP: Active"
    }
  ]
}
```

## Testing

A test script is provided to verify the Vercel MCP integration:

```bash
# Make sure the development server is running
npm run dev

# In a separate terminal, run the test script
npm run test:vercel-mcp
```

The test script (`src/scripts/test-vercel-mcp.ts`) tests all available Vercel MCP tools and verifies that they return the expected responses.

## UI Components

### VercelDeploymentStatus Component

The `VercelDeploymentStatus` component (`src/components/dashboard/vercel/VercelDeploymentStatus.tsx`) provides a visual interface for:

1. Viewing deployment status with color-coded badges
2. Listing environment variables
3. Displaying project analytics with timeframe filtering

### Vercel Dashboard Page

The Vercel dashboard page (`src/app/dashboard/vercel/page.tsx`) integrates the `VercelDeploymentStatus` component into the dashboard layout and provides additional context about the Vercel MCP tools.

## Future Enhancements

1. **Real API Integration**: Replace mock data with real Vercel API calls
2. **Deployment Triggers**: Add tools for triggering new deployments
3. **Environment Variable Management**: Add tools for creating, updating, and deleting environment variables
4. **Domain Management**: Add tools for managing custom domains
5. **Team Collaboration**: Add tools for managing team access and permissions

## Troubleshooting

### Common Issues

1. **"Not found" errors when testing**: Ensure the development server is running with `npm run dev`
2. **Authentication errors**: Verify your Vercel API token is correctly set in the environment variables
3. **Missing project data**: Confirm the Vercel project ID is correctly configured

### Debugging

For detailed debugging information, enable verbose logs in the MCP server configuration:

```typescript
{
  basePath: '/api/mcps/vercel',
  maxDuration: 60,
  verboseLogs: true,
}
```

## References

- [Vercel API Documentation](https://vercel.com/docs/api)
- [Machine Collaboration Protocol](https://modelcontextprotocol.github.io/mcp/)
- [Vercel MCP Adapter](https://www.npmjs.com/package/@vercel/mcp-adapter)
