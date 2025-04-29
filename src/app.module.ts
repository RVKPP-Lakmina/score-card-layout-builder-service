import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionsModule } from './database/connections.module';
import { AuthModule } from './auth/auth.module';
import { TemplateBuilderController } from './template-builder/template-builder.controller';
import { TemplateBuilderService } from './template-builder/template-builder.service';
import { TemplateService } from './template-builder/template/template.service';
import { UtilityModule } from './utility/utility.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, UtilityModule, ConnectionsModule, AuthModule],
  controllers: [AppController, TemplateBuilderController],
  providers: [AppService, TemplateBuilderService, TemplateService],
})
export class AppModule { }
