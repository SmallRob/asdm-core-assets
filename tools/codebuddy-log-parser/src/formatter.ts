// Output formatter for parsed logs

import {
  ParsedLog,
  ParsedLogEntry,
  SystemInitEntry,
  FileHistoryEntry,
  AssistantEntry,
  UserEntry,
  ResultEntry,
  MessageContent,
} from './types';

export interface FormatterOptions {
  verbose?: boolean;
  showTimestamps?: boolean;
  showToolResults?: boolean;
  colorize?: boolean;
}

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
};

function color(text: string, colorCode: string, enabled: boolean): string {
  return enabled ? `${colorCode}${text}${colors.reset}` : text;
}

export function formatLog(log: ParsedLog, options: FormatterOptions = {}): string {
  const { verbose = false, showTimestamps = true, showToolResults = true, colorize = true } = options;
  const output: string[] = [];

  // Header
  output.push(color('═'.repeat(60), colors.cyan, colorize));
  output.push(color('  CodeBuddy Log Parser Output', colors.bold + colors.cyan, colorize));
  output.push(color('═'.repeat(60), colors.cyan, colorize));
  output.push('');

  // Session Info
  if (log.sessionInfo) {
    output.push(color('📋 Session Information', colors.bold + colors.green, colorize));
    output.push('─'.repeat(40));
    output.push(`  Session ID: ${color(log.sessionInfo.sessionId, colors.dim, colorize)}`);
    output.push(`  Model:      ${color(log.sessionInfo.model, colors.yellow, colorize)}`);
    output.push(`  Working Dir: ${log.sessionInfo.cwd}`);
    output.push(`  Start Time: ${log.sessionInfo.startTime}`);
    output.push('');
  }

  // Conversation flow
  output.push(color('💬 Conversation Flow', colors.bold + colors.green, colorize));
  output.push('─'.repeat(40));

  let turnNumber = 0;
  let lastType = '';

  for (const entry of log.entries) {
    // Skip file-history-snapshot entries
    if (entry.type === 'file-history-snapshot') continue;
    // Skip system init (already shown in session info)
    if (entry.type === 'system') continue;
    // Skip result (shown at the end)
    if (entry.type === 'result') continue;

    const timestamp = showTimestamps ? color(`[${entry.timestamp}]`, colors.dim, colorize) + ' ' : '';

    if (entry.type === 'assistant') {
      const assistantEntry = entry as AssistantEntry;
      
      // Check if this is a new turn
      if (lastType !== 'assistant') {
        turnNumber++;
        output.push('');
        output.push(color(`  ┌─ Turn ${turnNumber} ─`, colors.blue, colorize));
      }

      for (const content of assistantEntry.message.content) {
        if (content.type === 'text' && content.text) {
          const text = content.text.trim();
          if (text) {
            output.push(`  │ ${timestamp}🤖 ${color('Assistant:', colors.blue, colorize)}`);
            const lines = text.split('\n');
            for (const line of lines) {
              output.push(`  │    ${line}`);
            }
          }
        } else if (content.type === 'tool_use') {
          const toolName = content.name || 'unknown';
          const toolInput = content.input || {};
          output.push(`  │ ${timestamp}🔧 ${color('Tool:', colors.magenta, colorize)} ${color(toolName, colors.yellow, colorize)}`);
          
          if (verbose && Object.keys(toolInput).length > 0) {
            const inputStr = JSON.stringify(toolInput, null, 2);
            const inputLines = inputStr.split('\n');
            for (const line of inputLines) {
              output.push(`  │    ${color(line, colors.dim, colorize)}`);
            }
          }
        }
      }
    } else if (entry.type === 'user' && showToolResults) {
      const userEntry = entry as UserEntry;
      
      for (const content of userEntry.message.content) {
        if (content.type === 'tool_result') {
          const isError = content.is_error;
          const icon = isError ? '❌' : '✅';
          const resultColor = isError ? colors.red : colors.green;
          
          output.push(`  │ ${timestamp}${icon} ${color('Result:', resultColor, colorize)}`);
          
          for (const resultContent of content.content) {
            if (resultContent.type === 'text') {
              const lines = resultContent.text.split('\n');
              // Limit output if not verbose
              const displayLines = verbose ? lines : lines.slice(0, 5);
              for (const line of displayLines) {
                output.push(`  │    ${color(line, colors.dim, colorize)}`);
              }
              if (!verbose && lines.length > 5) {
                output.push(`  │    ${color(`... (${lines.length - 5} more lines)`, colors.dim, colorize)}`);
              }
            }
          }
        }
      }
    }

    lastType = entry.type;
  }

  output.push('');
  output.push(color('  └' + '─'.repeat(30), colors.blue, colorize));
  output.push('');

  // Result Summary
  if (log.result) {
    const result = log.result;
    output.push(color('📊 Summary', colors.bold + colors.green, colorize));
    output.push('─'.repeat(40));
    
    const statusIcon = result.is_error ? '❌' : '✅';
    const statusText = result.subtype === 'success' ? 'Success' : 'Failed';
    output.push(`  Status: ${statusIcon} ${statusText}`);
    output.push(`  Duration: ${formatDuration(result.duration_ms)}`);
    output.push(`  Turns: ${result.num_turns}`);
    output.push(`  Cost: $${result.total_cost_usd.toFixed(4)}`);
    output.push(`  Tokens: ${formatTokens(result.usage)}`);
    output.push('');

    if (verbose && result.result) {
      output.push(color('  Result:', colors.cyan, colorize));
      const lines = result.result.split('\n');
      for (const line of lines) {
        output.push(`    ${line}`);
      }
      output.push('');
    }
  }

  output.push(color('═'.repeat(60), colors.cyan, colorize));

  return output.join('\n');
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.round((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

function formatTokens(usage: { input_tokens: number; output_tokens: number }): string {
  const input = usage.input_tokens.toLocaleString();
  const output = usage.output_tokens.toLocaleString();
  return `${input} in / ${output} out`;
}

export function formatHumanChat(log: ParsedLog, options: FormatterOptions = {}): string {
  const { verbose = false, colorize = true } = options;
  const output: string[] = [];

  for (const entry of log.entries) {
    // Skip non-conversation entries
    if (entry.type === 'file-history-snapshot' || entry.type === 'system' || entry.type === 'result') {
      continue;
    }

    if (entry.type === 'assistant') {
      const assistantEntry = entry as AssistantEntry;
      
      for (const content of assistantEntry.message.content) {
        if (content.type === 'text' && content.text) {
          const text = content.text.trim();
          if (text) {
            output.push(`${color('assistant:', colors.blue, colorize)} ${text}`);
          }
        } else if (content.type === 'tool_use') {
          const toolName = content.name || 'unknown';
          output.push(`${color('tool_use:', colors.magenta, colorize)}${color(toolName, colors.yellow, colorize)}`);
          
          if (verbose && content.input && Object.keys(content.input).length > 0) {
            const inputStr = JSON.stringify(content.input);
            output.push(`  input: ${inputStr}`);
          }
        }
      }
    } else if (entry.type === 'user') {
      const userEntry = entry as UserEntry;
      
      for (const content of userEntry.message.content) {
        if (content.type === 'tool_result') {
          const isError = content.is_error;
          const resultColor = isError ? colors.red : colors.green;
          
          for (const resultContent of content.content) {
            if (resultContent.type === 'text') {
              const text = resultContent.text.trim();
              // Truncate in non-verbose mode
              const displayText = verbose ? text : text.split('\n').slice(0, 3).join('\n');
              const truncated = !verbose && text.split('\n').length > 3;
              
              output.push(`${color('tool_result:', resultColor, colorize)} ${displayText}${truncated ? '...' : ''}`);
            }
          }
        }
      }
    }
  }

  // Add summary at the end
  if (log.result) {
    output.push('');
    output.push(`${color('summary:', colors.cyan, colorize)} ${log.result.is_error ? 'error' : 'success'} | duration: ${formatDuration(log.result.duration_ms)} | turns: ${log.result.num_turns}`);
  }

  return output.join('\n');
}

export function formatJson(log: ParsedLog): string {
  const simplified = {
    session: log.sessionInfo,
    turns: [] as Array<{
      timestamp: string;
      type: string;
      content: string | Array<{ type: string; name?: string; text?: string }>;
    }>,
    result: log.result ? {
      status: log.result.is_error ? 'error' : 'success',
      duration_ms: log.result.duration_ms,
      turns: log.result.num_turns,
      cost_usd: log.result.total_cost_usd,
    } : null,
  };

  for (const entry of log.entries) {
    if (entry.type === 'assistant') {
      const assistantEntry = entry as AssistantEntry;
      simplified.turns.push({
        timestamp: entry.timestamp,
        type: 'assistant',
        content: assistantEntry.message.content.map(c => ({
          type: c.type,
          name: c.name,
          text: c.text?.substring(0, 200),
        })),
      });
    }
  }

  return JSON.stringify(simplified, null, 2);
}
