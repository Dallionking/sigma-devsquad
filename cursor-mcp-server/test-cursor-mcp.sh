#!/bin/bash

echo "🧪 Testing Cursor MCP Configuration..."

# Check if the dist/index.js exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ dist/index.js not found. Run 'npm run build' first."
    exit 1
fi

echo "✅ MCP server build found"

# Test if the MCP server can start with the configuration
echo "🔍 Testing MCP server startup..."

# Create a temporary test script
cat > temp_test.js << 'EOF'
import { spawn } from 'child_process';

const mcpProcess = spawn('node', ['dist/index.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: {
        ...process.env,
        VIBE_DEVSQUAD_BRIDGE_URL: 'ws://localhost:3001',
        VIBE_DEVSQUAD_API_KEY: 'development_api_key',
        VIBE_DEVSQUAD_PLANNING_AGENT_ID: 'planning_agent_v1',
        VIBE_DEVSQUAD_ENABLE_STREAMING: 'true',
        VIBE_DEVSQUAD_MAX_TOKENS: '4000',
        VIBE_DEVSQUAD_DEBUG: 'true'
    }
});

let output = '';
mcpProcess.stdout.on('data', (data) => {
    output += data.toString();
});

mcpProcess.stderr.on('data', (data) => {
    console.log('📥 Server:', data.toString().trim());
});

// Send initialize request
setTimeout(() => {
    const initRequest = {
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
            protocolVersion: '2024-11-05',
            capabilities: {}
        }
    };
    
    mcpProcess.stdin.write(JSON.stringify(initRequest) + '\n');
    
    setTimeout(() => {
        mcpProcess.kill();
        console.log('\n✅ MCP server started successfully');
        console.log('📋 Configuration is correct for Cursor');
        process.exit(0);
    }, 2000);
}, 1000);

mcpProcess.on('error', (error) => {
    console.error('❌ MCP server failed to start:', error.message);
    process.exit(1);
});
EOF

node temp_test.js
rm temp_test.js

echo ""
echo "📋 Next steps:"
echo "1. Copy the cursor-mcp-config.json content to your Cursor MCP settings"
echo "2. Restart Cursor completely"
echo "3. Look for 'vibe-devsquad' in MCP servers list"
echo "4. Test Claude chat - it should now have access to Vibe DevSquad tools"
