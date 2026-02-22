// Log entry types for CodeBuddy log parser

export interface LogEntry {
  timestamp: string;
  rawTimestamp: string;
  type: string;
  subtype?: string;
  uuid: string;
  session_id: string;
  [key: string]: unknown;
}

export interface SystemInitEntry extends LogEntry {
  type: 'system';
  subtype: 'init';
  cwd: string;
  model: string;
  tools: string[];
  permissionMode: string;
  apiKeySource: string;
}

export interface FileHistoryEntry extends LogEntry {
  type: 'file-history-snapshot';
  id: string;
  snapshotTimestamp: number;
  isSnapshotUpdate: boolean;
  snapshot: {
    messageId: string;
    trackedFileBackups: Record<string, unknown>;
  };
}

export interface AssistantEntry extends LogEntry {
  type: 'assistant';
  message: {
    id: string;
    content: MessageContent[];
    model: string;
    role: 'assistant';
    stop_reason: string | null;
    stop_sequence: string | null;
    type: 'message';
    usage: UsageInfo;
  };
  parent_tool_use_id: string | null;
}

export interface UserEntry extends LogEntry {
  type: 'user';
  message: {
    content: ToolResultContent[];
    role: 'user';
  };
  parent_tool_use_id: string | null;
}

export interface ResultEntry extends LogEntry {
  type: 'result';
  subtype?: 'success' | 'error';
  is_error: boolean;
  result: string;
  duration_ms: number;
  duration_api_ms: number;
  num_turns: number;
  total_cost_usd: number;
  usage: UsageInfo;
  permission_denials: unknown[];
}

export interface MessageContent {
  type: 'text' | 'tool_use';
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
}

export interface ToolResultContent {
  type: 'tool_result';
  tool_use_id: string;
  content: Array<{
    type: 'text';
    text: string;
  }>;
  is_error: boolean;
}

export interface UsageInfo {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number | null;
  cache_read_input_tokens: number | null;
  cache_creation: unknown | null;
  server_tool_use: unknown | null;
  service_tier: unknown | null;
}

export type ParsedLogEntry = SystemInitEntry | FileHistoryEntry | AssistantEntry | UserEntry | ResultEntry;

export interface ParsedLog {
  entries: ParsedLogEntry[];
  sessionInfo?: {
    sessionId: string;
    model: string;
    cwd: string;
    startTime: string;
  };
  result?: ResultEntry;
}
