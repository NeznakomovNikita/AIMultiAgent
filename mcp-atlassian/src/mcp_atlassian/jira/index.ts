#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError,
} from '@modelcontextprotocol/sdk/types.js';
import JiraClient from 'jira-client'; // Используем новый пакет

const JIRA_URL = process.env.JIRA_URL;
const JIRA_USERNAME = process.env.JIRA_USERNAME;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

if (!JIRA_URL || !JIRA_USERNAME || !JIRA_API_TOKEN) {
    throw new Error('JIRA_URL, JIRA_USERNAME, and JIRA_API_TOKEN environment variables are required');
}

// Убираем https:// из JIRA_URL для host и / из конца, если есть
const jiraHostWithProtocol = JIRA_URL.endsWith('/') ? JIRA_URL.slice(0, -1) : JIRA_URL;
const jiraHost = jiraHostWithProtocol.replace('https://', '');


const jira = new JiraClient({
    protocol: 'https',
    host: jiraHost,
    username: JIRA_USERNAME,
    password: JIRA_API_TOKEN,
    apiVersion: '2',
    strictSSL: true,
});

class JiraMcpServer {
    private server: Server;

    constructor() {
        this.server = new Server(
            {
                name: 'jira-mcp-server',
                version: '0.1.0',
            },
            {
                capabilities: {
                    resources: {}, 
                    tools: {},
                },
            }
        );

        this.setupToolHandlers();
        
        this.server.onerror = (error: any) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    private setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'get_jira_project_issue_types',
                    description: 'Get available issue types for a Jira project',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            projectKey: {
                                type: 'string',
                                description: 'Jira project key (e.g., SCRUM)',
                            },
                        },
                        required: ['projectKey'],
                    },
                },
                {
                    name: 'create_jira_subtask',
                    description: 'Create a new subtask for a Jira issue',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            parentIssueKey: {
                                type: 'string',
                                description: 'Key of the parent issue (e.g., SCRUM-6)',
                            },
                            projectKey: {
                                type: 'string',
                                description: 'Jira project key (e.g., SCRUM)',
                            },
                            summary: {
                                type: 'string',
                                description: 'Summary of the subtask',
                            },
                            description: {
                                type: 'string',
                                description: 'Detailed description of the subtask (optional)',
                            },
                            // issuetypeName для подзадач обычно "Подзадача" или "Sub-task"
                            // или можно использовать issuetypeId, если известен
                            issuetypeName: {
                                type: 'string',
                                description: 'Type of the subtask (e.g., Подзадача)',
                                default: 'Подзадача',
                            },
                             issuetypeId: {
                                type: 'string',
                                description: 'ID of the subtask issue type (e.g., 10008)',
                            },
                        },
                        required: ['parentIssueKey', 'projectKey', 'summary'],
                    },
                },
                {
                    name: 'create_jira_issue',
                    description: 'Create a new issue in Jira',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            projectKey: { // Исправлено на projectKey в соответствии с jira-client
                                type: 'string',
                                description: 'Jira project key (e.g., PROJ)',
                            },
                            summary: {
                                type: 'string',
                                description: 'Summary of the issue',
                            },
                            description: {
                                type: 'string',
                                description: 'Detailed description of the issue (optional)',
                            },
                            issuetypeName: {
                                type: 'string',
                                description: 'Name of the issue type (e.g., Task, Bug, Story)',
                            },
                            issuetypeId: { // Добавляем issuetypeId
                                type: 'string',
                                description: 'ID of the issue type (e.g., 10003)',
                            },
                        },
                        // Либо имя, либо ID должны быть указаны, поэтому убираем их из required в схеме
                        // и проверяем в коде
                        required: ['projectKey', 'summary'],
                    },
                },
            ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async (request: any): Promise<any> => {
            const toolName = request.params.name;
            const toolArgs = request.params.arguments as any; // Переименовываем args в toolArgs

            if (toolName === 'create_jira_issue') {
                // Проверяем, что есть либо issuetypeName, либо issuetypeId
                if (!toolArgs.projectKey || !toolArgs.summary || !(toolArgs.issuetypeName || toolArgs.issuetypeId) ) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing required arguments: projectKey, summary, and (issuetypeName or issuetypeId)'
                    );
                }

                try {
                    const newIssue = await jira.addNewIssue({ // Используем toolArgs
                        fields: {
                            project: {
                                key: toolArgs.projectKey,
                            },
                            summary: toolArgs.summary,
                            description: toolArgs.description || '',
                            issuetype: toolArgs.issuetypeId ? { id: toolArgs.issuetypeId } : { name: toolArgs.issuetypeName },
                        },
                    });
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(newIssue, null, 2),
                            },
                        ],
                    };
                } catch (error: any) {
                    console.error("Error creating Jira issue:", error);
                    let errorMessage = 'Unknown error creating Jira issue';
                    if (error.message) {
                        errorMessage = error.message;
                    }
                    if (error.error && error.error.errorMessages && error.error.errorMessages.length > 0) {
                        errorMessage = error.error.errorMessages.join('; ');
                    } else if (typeof error.error === 'string') {
                        errorMessage = error.error;
                    }
                    return {
                        content: [{ type: 'text', text: `Jira API error: ${errorMessage}` }],
                        isError: true,
                    };
                }
            } else if (toolName === 'get_jira_project_issue_types') {
                if (!toolArgs.projectKey) { // Используем toolArgs
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing required argument for get_jira_project_issue_types: projectKey'
                    );
                }
                try {
                    // Используем listIssueTypes для получения всех типов задач
                    const allIssueTypes = await jira.listIssueTypes();
                    
                    // Пока не фильтруем по проекту, т.к. projectKey не используется в listIssueTypes
                    // Если понадобится фильтрация, нужно будет найти другой способ или доработать
                    const issueTypes = allIssueTypes.map((it: any) => ({
                        id: it.id,
                        name: it.name,
                        description: it.description,
                        subtask: it.subtask
                    }));

                    if (issueTypes && issueTypes.length > 0) {
                        return {
                            content: [{ type: 'text', text: JSON.stringify(issueTypes, null, 2) }],
                        };
                    } else {
                        throw new McpError(ErrorCode.InternalError, `No issue types found for project ${toolArgs.projectKey}`);
                    }
                } catch (error: any) {
                    console.error("Error getting Jira project issue types:", error);
                    let errorMessage = 'Unknown error getting Jira project issue types';
                     if (error.message) {
                        errorMessage = error.message;
                    }
                    if (error.error && error.error.errorMessages && error.error.errorMessages.length > 0) {
                        errorMessage = error.error.errorMessages.join('; ');
                    } else if (typeof error.error === 'string') {
                        errorMessage = error.error;
                    }
                    return {
                        content: [{ type: 'text', text: `Jira API error: ${errorMessage}` }],
                        isError: true,
                    };
                }
            } else if (toolName === 'create_jira_subtask') {
                if (!toolArgs.parentIssueKey || !toolArgs.projectKey || !toolArgs.summary || !(toolArgs.issuetypeName || toolArgs.issuetypeId)) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing required arguments for create_jira_subtask: parentIssueKey, projectKey, summary and (issuetypeName or issuetypeId)'
                    );
                }
                try {
                    const newSubtask = await jira.addNewIssue({
                        fields: {
                            project: {
                                key: toolArgs.projectKey,
                            },
                            parent: {
                                key: toolArgs.parentIssueKey,
                            },
                            summary: toolArgs.summary,
                            description: toolArgs.description || '',
                            issuetype: toolArgs.issuetypeId ? { id: toolArgs.issuetypeId } : { name: toolArgs.issuetypeName || 'Подзадача' },
                        },
                    });
                    return {
                        content: [{ type: 'text', text: JSON.stringify(newSubtask, null, 2) }],
                    };
                } catch (error: any) {
                    console.error("Error creating Jira subtask:", error);
                    let errorMessage = 'Unknown error creating Jira subtask';
                    if (error.message) {
                        errorMessage = error.message;
                    }
                    if (error.error && error.error.errorMessages && error.error.errorMessages.length > 0) {
                        errorMessage = error.error.errorMessages.join('; ');
                    } else if (typeof error.error === 'string') {
                        errorMessage = error.error;
                    }
                    return {
                        content: [{ type: 'text', text: `Jira API error: ${errorMessage}` }],
                        isError: true,
                    };
                }
            } else {
                throw new McpError(
                    ErrorCode.MethodNotFound,
                    `Unknown tool: ${toolName}`
                );
            }
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Jira MCP server (using jira-client) running on stdio');
    }
}

const server = new JiraMcpServer();
server.run().catch(console.error);
