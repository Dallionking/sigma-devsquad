import * as vscode from 'vscode';
import { PlanningService } from './planningService';
import { Logger } from '../utils/logger';

const logger = new Logger('Commands');

/**
 * Register all VS Code commands for the Vibe DevSquad extension
 */
export function registerCommands(context: vscode.ExtensionContext, planningService: PlanningService): void {
    const commands = [
        // Core Planning Agent commands
        vscode.commands.registerCommand('vibeDevSquad.openPlanningAgent', openPlanningAgent),
        
        vscode.commands.registerCommand('vibeDevSquad.createTaskFromSelection', () => 
            createTaskFromSelection(planningService)
        ),
        
        vscode.commands.registerCommand('vibeDevSquad.analyzeCurrentFile', () => 
            analyzeCurrentFile(planningService)
        ),
        
        vscode.commands.registerCommand('vibeDevSquad.quickCreateTask', () => 
            quickCreateTask(planningService)
        ),
        
        vscode.commands.registerCommand('vibeDevSquad.analyzeProject', () => 
            analyzeProject(planningService)
        ),
        
        // Connection management commands
        vscode.commands.registerCommand('vibeDevSquad.connect', () => 
            connectToPlatform(planningService)
        ),
        
        vscode.commands.registerCommand('vibeDevSquad.disconnect', () => 
            disconnectFromPlatform(planningService)
        ),
        
        vscode.commands.registerCommand('vibeDevSquad.showConnectionStatus', () => 
            showConnectionStatus(planningService)
        )
    ];
    
    context.subscriptions.push(...commands);
    logger.info('All commands registered successfully');
}

/**
 * Open the Planning Agent panel
 */
async function openPlanningAgent(): Promise<void> {
    try {
        await vscode.commands.executeCommand('vibeDevSquad.planningView.focus');
        logger.info('Planning Agent panel opened');
    } catch (error) {
        logger.error('Failed to open Planning Agent panel', error);
        vscode.window.showErrorMessage('Failed to open Planning Agent panel');
    }
}

/**
 * Create a task from the current text selection
 */
async function createTaskFromSelection(planningService: PlanningService): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }
    
    const selection = editor.document.getText(editor.selection);
    if (!selection.trim()) {
        vscode.window.showWarningMessage('No text selected');
        return;
    }
    
    try {
        // Check connection
        if (!planningService.isConnected()) {
            vscode.window.showWarningMessage('Not connected to Vibe DevSquad platform');
            return;
        }
        
        const fileName = editor.document.fileName;
        const description = `Implement selected code: ${selection.substring(0, 100)}${selection.length > 100 ? '...' : ''}`;
        
        vscode.window.showInformationMessage('Creating task from selection...');
        
        const task = await planningService.createTask(description);
        logger.info(`Task created from selection: ${task.title}`);
        
        vscode.window.showInformationMessage(`Task created: ${task.title}`);
        
    } catch (error) {
        logger.error('Failed to create task from selection', error);
        vscode.window.showErrorMessage(
            `Failed to create task: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Analyze the current file
 */
async function analyzeCurrentFile(planningService: PlanningService): Promise<void> {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showWarningMessage('No active editor found');
        return;
    }
    
    try {
        // Check connection
        if (!planningService.isConnected()) {
            vscode.window.showWarningMessage('Not connected to Vibe DevSquad platform');
            return;
        }
        
        const document = editor.document;
        const fileName = document.fileName;
        const content = document.getText();
        
        vscode.window.showInformationMessage('Analyzing current file...');
        
        const analysis = await planningService.analyzeFile(fileName, content);
        logger.info(`File analyzed: ${fileName}`);
        
        // Show analysis results
        const message = `File Analysis Complete:\n` +
            `Language: ${analysis.language}\n` +
            `Complexity: ${analysis.complexity}\n` +
            `Issues: ${analysis.issues.length}\n` +
            `Suggestions: ${analysis.suggestions.length}`;
        
        vscode.window.showInformationMessage(message);
        
        // Show detailed results in output channel
        const outputChannel = vscode.window.createOutputChannel('Vibe DevSquad Analysis');
        outputChannel.appendLine(`=== File Analysis: ${fileName} ===`);
        outputChannel.appendLine(`Language: ${analysis.language}`);
        outputChannel.appendLine(`Complexity Score: ${analysis.complexity}`);
        
        if (analysis.issues.length > 0) {
            outputChannel.appendLine('\n--- Issues ---');
            analysis.issues.forEach(issue => {
                outputChannel.appendLine(`${issue.type.toUpperCase()}: ${issue.message}${issue.line ? ` (Line ${issue.line})` : ''}`);
            });
        }
        
        if (analysis.suggestions.length > 0) {
            outputChannel.appendLine('\n--- Suggestions ---');
            analysis.suggestions.forEach((suggestion, index) => {
                outputChannel.appendLine(`${index + 1}. ${suggestion}`);
            });
        }
        
        outputChannel.show();
        
    } catch (error) {
        logger.error('Failed to analyze current file', error);
        vscode.window.showErrorMessage(
            `Failed to analyze file: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Quick create task with user input
 */
async function quickCreateTask(planningService: PlanningService): Promise<void> {
    try {
        // Check connection
        if (!planningService.isConnected()) {
            vscode.window.showWarningMessage('Not connected to Vibe DevSquad platform');
            return;
        }
        
        const description = await vscode.window.showInputBox({
            prompt: 'Enter task description',
            placeHolder: 'What needs to be done?',
            validateInput: (value) => {
                if (!value.trim()) {
                    return 'Task description cannot be empty';
                }
                return null;
            }
        });
        
        if (!description) {
            return; // User cancelled
        }
        
        vscode.window.showInformationMessage('Creating task...');
        
        const task = await planningService.createTask(description.trim());
        logger.info(`Quick task created: ${task.title}`);
        
        vscode.window.showInformationMessage(`Task created: ${task.title}`);
        
    } catch (error) {
        logger.error('Failed to create quick task', error);
        vscode.window.showErrorMessage(
            `Failed to create task: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Analyze the current project
 */
async function analyzeProject(planningService: PlanningService): Promise<void> {
    try {
        // Check connection
        if (!planningService.isConnected()) {
            vscode.window.showWarningMessage('Not connected to Vibe DevSquad platform');
            return;
        }
        
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showWarningMessage('No workspace folder found');
            return;
        }
        
        const workspacePath = workspaceFolders[0].uri.fsPath;
        
        vscode.window.showInformationMessage('Analyzing project...');
        
        const analysis = await planningService.analyzeProject(workspacePath);
        logger.info(`Project analyzed: ${analysis.projectId}`);
        
        // Show analysis results
        const message = `Project Analysis Complete:\n` +
            `Files: ${analysis.structure.totalFiles}\n` +
            `Languages: ${analysis.structure.languages.join(', ')}\n` +
            `Complexity Score: ${analysis.complexity.score}\n` +
            `Suggestions: ${analysis.recommendations.length}`;
        
        vscode.window.showInformationMessage(message);
        
        // Show detailed results in output channel
        const outputChannel = vscode.window.createOutputChannel('Vibe DevSquad Analysis');
        outputChannel.appendLine(`=== Project Analysis ===`);
        outputChannel.appendLine(`Project ID: ${analysis.projectId}`);
        outputChannel.appendLine(`Total Files: ${analysis.structure.totalFiles}`);
        outputChannel.appendLine(`Languages: ${analysis.structure.languages.join(', ')}`);
        outputChannel.appendLine(`Frameworks: ${analysis.structure.frameworks.join(', ')}`);
        outputChannel.appendLine(`Complexity Score: ${analysis.complexity.score}`);
        
        if (analysis.complexity.factors.length > 0) {
            outputChannel.appendLine('\n--- Complexity Factors ---');
            analysis.complexity.factors.forEach(factor => {
                outputChannel.appendLine(`- ${factor}`);
            });
        }
        
        if (analysis.recommendations.length > 0) {
            outputChannel.appendLine('\n--- Recommendations ---');
            analysis.recommendations.forEach((rec, index) => {
                outputChannel.appendLine(`${index + 1}. ${rec}`);
            });
        }
        
        if (analysis.suggestedTasks.length > 0) {
            outputChannel.appendLine('\n--- Suggested Tasks ---');
            analysis.suggestedTasks.forEach((task, index) => {
                outputChannel.appendLine(`${index + 1}. ${task.title}: ${task.description}`);
            });
        }
        
        outputChannel.show();
        
    } catch (error) {
        logger.error('Failed to analyze project', error);
        vscode.window.showErrorMessage(
            `Failed to analyze project: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Connect to the platform
 */
async function connectToPlatform(planningService: PlanningService): Promise<void> {
    try {
        if (planningService.isConnected()) {
            vscode.window.showInformationMessage('Already connected to Vibe DevSquad platform');
            return;
        }
        
        vscode.window.showInformationMessage('Connecting to Vibe DevSquad platform...');
        // Connection logic is handled in the main extension activation
        
    } catch (error) {
        logger.error('Failed to connect to platform', error);
        vscode.window.showErrorMessage(
            `Failed to connect: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Disconnect from the platform
 */
async function disconnectFromPlatform(planningService: PlanningService): Promise<void> {
    try {
        if (!planningService.isConnected()) {
            vscode.window.showInformationMessage('Not connected to Vibe DevSquad platform');
            return;
        }
        
        // Disconnect logic would be implemented here
        vscode.window.showInformationMessage('Disconnected from Vibe DevSquad platform');
        
    } catch (error) {
        logger.error('Failed to disconnect from platform', error);
        vscode.window.showErrorMessage(
            `Failed to disconnect: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
    }
}

/**
 * Show connection status
 */
async function showConnectionStatus(planningService: PlanningService): Promise<void> {
    const status = planningService.getConnectionStatus();
    const isConnected = planningService.isConnected();
    
    let message = `Connection Status: ${isConnected ? 'Connected' : 'Disconnected'}`;
    
    if (status.lastConnected) {
        message += `\nLast Connected: ${status.lastConnected.toLocaleString()}`;
    }
    
    if (status.error) {
        message += `\nError: ${status.error}`;
    }
    
    vscode.window.showInformationMessage(message);
}
