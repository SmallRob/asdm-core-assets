#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { parseLogFile } from './parser';
import { formatLog, formatJson, formatHumanChat, FormatterOptions } from './formatter';

interface CliOptions {
  input: string;
  output?: string;
  format: 'text' | 'json' | 'human-chat';
  verbose: boolean;
  noColor: boolean;
  help: boolean;
}

function printHelp(): void {
  console.log(`
CodeBuddy Log Parser - Parse and format CodeBuddy conversation logs

Usage: codebuddy-log-parser [options] <input-file>

Options:
  -i, --input <file>    Input log file (required)
  -o, --output <file>   Output file (default: stdout)
  -f, --format <format> Output format: text, json, human-chat (default: text)
  -v, --verbose         Show detailed output including full tool inputs/results
  --no-color            Disable colored output
  -h, --help            Show this help message

Examples:
  codebuddy-log-parser log.txt
  codebuddy-log-parser -i log.txt -o output.txt
  codebuddy-log-parser -i log.txt -f json -o result.json
  codebuddy-log-parser -i log.txt -f human-chat
  codebuddy-log-parser -v log.txt
`);
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    input: '',
    format: 'text',
    verbose: false,
    noColor: false,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-h' || arg === '--help') {
      options.help = true;
    } else if (arg === '-i' || arg === '--input') {
      options.input = args[++i];
    } else if (arg === '-o' || arg === '--output') {
      options.output = args[++i];
    } else if (arg === '-f' || arg === '--format') {
      const format = args[++i];
      if (format !== 'text' && format !== 'json' && format !== 'human-chat') {
        console.error(`Invalid format: ${format}. Use 'text', 'json', or 'human-chat'.`);
        process.exit(1);
      }
      options.format = format;
    } else if (arg === '-v' || arg === '--verbose') {
      options.verbose = true;
    } else if (arg === '--no-color') {
      options.noColor = true;
    } else if (!arg.startsWith('-') && !options.input) {
      // Positional argument as input file
      options.input = arg;
    }
  }

  return options;
}

function main(): void {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  if (!options.input) {
    console.error('Error: Input file is required.');
    console.error('Use -i <file> or provide file as positional argument.');
    process.exit(1);
  }

  // Read input file
  const inputPath = resolve(options.input);
  let content: string;
  
  try {
    content = readFileSync(inputPath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file: ${inputPath}`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  // Parse the log
  const parsedLog = parseLogFile(content);

  // Format output
  const formatterOptions: FormatterOptions = {
    verbose: options.verbose,
    colorize: !options.noColor && !options.output,
  };

  const output = options.format === 'json' 
    ? formatJson(parsedLog)
    : options.format === 'human-chat'
      ? formatHumanChat(parsedLog, formatterOptions)
      : formatLog(parsedLog, formatterOptions);

  // Write or print output
  if (options.output) {
    const outputPath = resolve(options.output);
    try {
      writeFileSync(outputPath, output, 'utf-8');
      console.log(`Output written to: ${outputPath}`);
    } catch (error) {
      console.error(`Error writing file: ${outputPath}`);
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  } else {
    console.log(output);
  }
}

main();
