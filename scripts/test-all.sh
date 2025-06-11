#!/bin/bash
# Vibe DevSquad - Complete Testing Pipeline
# Run all tests across extensions and MCP servers

echo "🧪 Vibe DevSquad Test Suite"
echo "=========================="

FAILED=0

# Function to run tests in a directory
run_tests() {
    local dir=$1
    local name=$2
    
    if [ -d "$dir" ]; then
        echo ""
        echo "📦 Testing $name..."
        cd "$dir"
        
        # Install dependencies if needed
        if [ ! -d "node_modules" ]; then
            echo "Installing dependencies..."
            npm install --silent
        fi
        
        # Run linting
        echo "🔍 Linting..."
        npm run lint 2>/dev/null || {
            echo "❌ Lint failed for $name"
            FAILED=1
        }
        
        # Run tests
        echo "🧪 Running tests..."
        npm test 2>/dev/null || {
            echo "❌ Tests failed for $name"
            FAILED=1
        }
        
        # Build check
        echo "🔨 Building..."
        npm run compile 2>/dev/null || npm run build 2>/dev/null || {
            echo "❌ Build failed for $name"
            FAILED=1
        }
        
        cd ..
        echo "✅ $name testing complete"
    fi
}

# Test all projects
run_tests "vscode-extension" "VS Code Extension (Works in VS Code, Cursor, Windsurf)"
run_tests "cursor-mcp-server" "Cursor MCP Server"

echo ""
echo "=========================="

if [ $FAILED -eq 0 ]; then
    echo "✅ All tests passed!"
    exit 0
else
    echo "❌ Some tests failed!"
    exit 1
fi
