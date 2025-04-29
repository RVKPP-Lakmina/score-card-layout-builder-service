import { Global, Module } from '@nestjs/common';
import { LoggerService } from './app-logger.service';

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
