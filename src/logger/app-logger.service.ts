import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, renameSync } from 'fs';
import { join } from 'path';
import * as cron from 'node-cron';
import * as moment from 'moment';

@Injectable()
/**
 * LoggerService is a custom logging service that implements the NestLoggerService interface.
 * It provides methods for logging messages at various levels (INFO, ERROR, WARN, DEBUG, VERBOSE)
 * and handles log file rotation on an hourly basis.
 *
 * ### Usage
 * - `log(message: string, context?: string): void` - Logs an informational message.
 * - `error(message: string, trace?: string, context?: string): void` - Logs an error message with an optional stack trace.
 * - `warn(message: string, context?: string): void` - Logs a warning message.
 * - `debug(message: string, context?: string): void` - Logs a debug message.
 * - `verbose(message: string, context?: string): void` - Logs a verbose message.
 *
 * ### Parameters
 * - `message` (string): Any string to be logged.
 * - `trace` (string): The method name where the error occurred (optional, used in `error` method).
 * - `context` (string): The file name or context of the log (optional).
 *
 * ### Features
 * - Automatically creates log and archive directories if they do not exist.
 * - Rotates log files every hour and archives the old log files.
 * - Writes logs to a file with a timestamp, log level, context, and message.
 *
 * ### Example
 * ```typescript
 * const logger = new LoggerService();
 * logger.log('Application started', 'app.ts');
 * logger.error('Unhandled exception', 'mainMethod', 'app.ts');
 * logger.warn('Deprecated API usage', 'api.ts');
 * ```
 */
export class LoggerService implements NestLoggerService {
  private logStream: NodeJS.WritableStream;
  private currentLogFile: string;
  private readonly logsDir = join(process.cwd(), 'logs');
  private readonly archiveDir = join(process.cwd(), 'logs', 'archive');

  constructor() {
    this.ensureDirectoriesExist();
    this.setupNewLogFile();
    this.scheduleRotation();
  }

  intance() {
    return new LoggerService();
  }

  private ensureDirectoriesExist(): void {
    if (!existsSync(this.logsDir)) {
      mkdirSync(this.logsDir, { recursive: true });
    }
    if (!existsSync(this.archiveDir)) {
      mkdirSync(this.archiveDir, { recursive: true });
    }
  }

  private setupNewLogFile(): void {
    const timestamp = moment(new Date()).format('YYYY-MM-DD-HH');
    this.currentLogFile = join(this.logsDir, `app-${timestamp}.log`);
    this.logStream = createWriteStream(this.currentLogFile, { flags: 'a' });
  }

  private scheduleRotation(): void {
    cron.schedule('0 * * * *', () => {
      this.rotateLogFile();
    });
  }

  private rotateLogFile(): void {
    this.logStream.end();

    const archiveFileName = join(
      this.archiveDir,
      `archive-${moment().format('YYYY-MM-DD-HH')}.log`,
    );
    try {
      renameSync(this.currentLogFile, archiveFileName);
    } catch {
      this.intance().logStream.write(
        `Utility | app-logger.service.ts | Error archiving log file\n`,
      );
    }

    // Create a new log file
    this.setupNewLogFile();
  }

  /**
   * Logs an error message with optional trace and context information.
   *
   * @param message - The error message or object to be logged.
   * @param context - (Optional) A string representing the context or source of the error (File Name).
   *
   * This method writes the error details to the log with a severity level of 'ERROR'.
   */
  log(message: any, context?: string): void {
    this.writeToLog('INFO', message, context);
  }

  /**
   * Logs an error message with optional trace and context information.
   *
   * @param message - The error message or object to be logged.
   * @param trace - (Optional) A string representing the stack trace or additional trace information (method name or any).
   * @param context - (Optional) A string representing the context or source of the error (File Name).
   *
   * This method writes the error details to the log with a severity level of 'ERROR'.
   */
  error(message: any, trace?: string, context?: string): void {
    this.writeToLog('ERROR', message, context, trace);
  }

  /**
   * Logs an error message with optional trace and context information.
   *
   * @param message - The error message or object to be logged.
   * @param context - (Optional) A string representing the context or source of the error (File Name).
   *
   * This method writes the error details to the log with a severity level of 'ERROR'.
   */
  warn(message: any, context?: string): void {
    this.writeToLog('WARN', message, context);
  }

  debug(message: any, context?: string): void {
    this.writeToLog('DEBUG', message, context);
  }

  verbose(message: any, context?: string): void {
    this.writeToLog('VERBOSE', message, context);
  }

  private writeToLog(
    level: string,
    message: any,
    context?: string,
    trace?: string,
  ): void {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${level}]`;

    if (context) {
      logMessage += ` [${context}]`;
    }

    logMessage += `: ${message}`;

    if (trace) {
      logMessage += `\n${trace}`;
    }

    this.logStream.write(`${logMessage}\n`);
  }
}
