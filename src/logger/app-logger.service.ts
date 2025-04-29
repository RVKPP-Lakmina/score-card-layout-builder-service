import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, renameSync } from 'fs';
import { join } from 'path';
import * as cron from 'node-cron';
import * as moment from 'moment';

@Injectable()
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

  log(message: any, context?: string): void {
    this.writeToLog('INFO', message, context);
  }

  error(message: any, trace?: string, context?: string): void {
    this.writeToLog('ERROR', message, context, trace);
  }

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
