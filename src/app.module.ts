import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionsModule } from './database/connections.module';
import { AuthModule } from './auth/auth.module';
import { TemplateBuilderController } from './template-builder/template-builder.controller';
import { TemplateBuilderService } from './template-builder/template-builder.service';
import { TemplateService } from './template-builder/template/template.service';
import { TemplateBuilderModule } from './template-builder/template-builder.module';

@Module({
  imports: [ConnectionsModule, AuthModule, TemplateBuilderModule],
  controllers: [AppController, TemplateBuilderController],
  providers: [AppService, TemplateBuilderService, TemplateService],
})
export class AppModule { }
