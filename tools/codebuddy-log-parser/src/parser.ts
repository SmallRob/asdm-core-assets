// Log parser for CodeBuddy logs

import {
  LogEntry,
  ParsedLog,
  ParsedLogEntry,
  SystemInitEntry,
  FileHistoryEntry,
  AssistantEntry,
  UserEntry,
  ResultEntry,
} from './types';

// Regex to match log line format: TIMESTAMP JSON
const LOG_LINE_REGEX = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z)\s+(.+)$/;

export function parseLogLine(line: string): ParsedLogEntry | null {
  const trimmed = line.trim();
  if (!trimmed) return null;

  const match = trimmed.match(LOG_LINE_REGEX);
  if (!match) {
    console.warn(`Failed to parse line: ${trimmed.substring(0, 100)}...`);
    return null;
  }

  const [, rawTimestamp, jsonStr] = match;
  let json: Record<string, unknown>;

  try {
    json = JSON.parse(jsonStr);
  } catch (e) {
    console.warn(`Failed to parse JSON at ${rawTimestamp}: ${jsonStr.substring(0, 100)}...`);
    return null;
  }

  const baseEntry: LogEntry = {
    timestamp: formatTimestamp(rawTimestamp),
    rawTimestamp,
    type: json.type as string,
    subtype: json.subtype as string | undefined,
    uuid: json.uuid as string,
    session_id: json.session_id as string,
    ...json,
  };

  return parseTypedEntry(baseEntry, json);
}

function parseTypedEntry(base: LogEntry, json: Record<string, unknown>): ParsedLogEntry {
  // Map the JSON timestamp to snapshotTimestamp for file-history-snapshot
  if (base.type === 'file-history-snapshot') {
    (base as FileHistoryEntry).snapshotTimestamp = json.timestamp as number;
  }
  
  switch (base.type) {
    case 'system':
      return base as SystemInitEntry;
    case 'file-history-snapshot':
      return base as FileHistoryEntry;
    case 'assistant':
      return base as AssistantEntry;
    case 'user':
      return base as UserEntry;
    case 'result':
      return base as ResultEntry;
    default:
      return base as ParsedLogEntry;
  }
}

function formatTimestamp(isoTimestamp: string): string {
  // Convert ISO timestamp to local time format
  try {
    const date = new Date(isoTimestamp);
    return date.toLocaleString('zh-CN', {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return isoTimestamp;
  }
}

export function parseLogFile(content: string): ParsedLog {
  const lines = content.split('\n');
  const entries: ParsedLogEntry[] = [];
  let sessionInfo: ParsedLog['sessionInfo'];
  let result: ResultEntry | undefined;

  for (const line of lines) {
    const entry = parseLogLine(line);
    if (!entry) continue;

    entries.push(entry);

    // Extract session info from init entry
    if (entry.type === 'system' && entry.subtype === 'init') {
      const initEntry = entry as SystemInitEntry;
      sessionInfo = {
        sessionId: initEntry.session_id,
        model: initEntry.model,
        cwd: initEntry.cwd,
        startTime: entry.timestamp,
      };
    }

    // Capture result entry
    if (entry.type === 'result') {
      result = entry as ResultEntry;
    }
  }

  return { entries, sessionInfo, result };
}
