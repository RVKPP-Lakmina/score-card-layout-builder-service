import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionsModule } from './database/connections.module';
import { AuthModule } from './auth/auth.module';
import { TemplateBuilderController } from './template-builder/template-builder.controller';
import { TemplateBuilderService } from './template-builder/template-builder.service';
import { TemplateService } from './template-builder/template/template.service';
import { LoggerModule } from './logger/logger.module';
import { TemplateModule } from './template-builder/template/template.module';
import { TemplateBuilderModule } from './template-builder/template-builder.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [LoggerModule, ConnectionsModule, AuthModule, TemplateBuilderModule, ProductModule, TemplateModule],
  controllers: [AppController, TemplateBuilderController],
  providers: [AppService, TemplateBuilderService, TemplateService],
})
export class AppModule { }
