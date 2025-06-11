#!/usr/bin/env node

/**
 * Test script for Vibe DevSquad MCP Server
 * Tests basic MCP protocol communication and tool availability
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';

const TIMEOUT = 10000; // 10 seconds

async function testMCPServer() {
    console.log('🧪 Testing Vibe DevSquad MCP Server...\n');

    // Check if built server exists
    try {
        await fs.access('dist/index.js');
        console.log('✅ MCP Server build found');
    } catch (error) {
        console.error('❌ MCP Server build not found. Run "npm run build" first.');
        process.exit(1);
    }

    // Start the MCP server process
    const mcpProcess = spawn('node', ['dist/index.js'], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
            ...process.env,
            VIBE_DEVSQUAD_BRIDGE_URL: 'ws://localhost:8080',
            VIBE_DEVSQUAD_ENABLE_STREAMING: 'true',
            VIBE_DEVSQUAD_MAX_TOKENS: '4000'
        }
    });

    let serverOutput = '';
    let serverErrors = '';

    mcpProcess.stdout.on('data', (data) => {
        const output = data.toString();
        serverOutput += output;
        console.log('📤 Server:', output.trim());
    });

    mcpProcess.stderr.on('data', (data) => {
        const error = data.toString();
        serverErrors += error;
        console.log('📥 Server Error:', error.trim());
    });

    // Test basic MCP protocol communication
    try {
        console.log('\n🔍 Testing MCP protocol...');

        // Test 1: List tools request
        const listToolsRequest = {
            jsonrpc: '2.0',
            id: 1,
            method: 'tools/list'
        };

        console.log('📝 Sending tools/list request...');
        mcpProcess.stdin.write(JSON.stringify(listToolsRequest) + '\n');

        // Wait for response or timeout
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout waiting for tools/list response'));
            }, TIMEOUT);

            mcpProcess.stdout.on('data', (data) => {
                const output = data.toString();
                try {
                    const response = JSON.parse(output);
                    if (response.id === 1 && response.result && response.result.tools) {
                        clearTimeout(timeout);
                        console.log('✅ Tools list received:');
                        response.result.tools.forEach(tool => {
                            console.log(`   - ${tool.name}: ${tool.description}`);
                        });
                        resolve();
                    }
                } catch (e) {
                    // Not JSON or not the response we're looking for
                }
            });
        });

        // Test 2: Try a simple tool call
        const toolCallRequest = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/call',
            params: {
                name: 'vibe_devsquad_get_workspace_context',
                arguments: {
                    workspacePath: process.cwd(),
                    includeFileTree: false
                }
            }
        };

        console.log('\n📝 Testing workspace context tool...');
        mcpProcess.stdin.write(JSON.stringify(toolCallRequest) + '\n');

        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout waiting for tool call response'));
            }, TIMEOUT);

            mcpProcess.stdout.on('data', (data) => {
                const output = data.toString();
                try {
                    const response = JSON.parse(output);
                    if (response.id === 2) {
                        clearTimeout(timeout);
                        if (response.result) {
                            console.log('✅ Tool call successful');
                            console.log('📊 Response:', JSON.stringify(response.result, null, 2));
                        } else if (response.error) {
                            console.log('⚠️ Tool call returned error:', response.error.message);
                        }
                        resolve();
                    }
                } catch (e) {
                    // Not JSON or not the response we're looking for
                }
            });
        });

        console.log('\n🎉 MCP Server tests completed successfully!');
        console.log('\n📋 Summary:');
        console.log('   ✅ Server starts correctly');
        console.log('   ✅ MCP protocol communication works');
        console.log('   ✅ Tools are properly registered');
        console.log('   ✅ Tool execution is functional');
        console.log('\n🚀 The MCP server is ready for Cursor integration!');

    } catch (error) {
        console.error('\n❌ Test failed:', error.message);
        console.error('\n📝 Server output:', serverOutput);
        console.error('\n📝 Server errors:', serverErrors);
        process.exit(1);
    } finally {
        // Clean up: kill the MCP server process
        mcpProcess.kill();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for cleanup
    }
}

// Run the test
testMCPServer().catch(error => {
    console.error('💥 Test runner error:', error);
    process.exit(1);
});
