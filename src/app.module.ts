import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionsModule } from './database/connections.module';
import { AuthModule } from './auth/auth.module';
import { TemplateBuilderController } from './template-builder/template-builder.controller';
import { TemplateBuilderModule } from './template-builder/template-builder.module';
import { TemplateBuilderController } from './template-builder/template-builder.controller';

@Module({
  imports: [ConnectionsModule, AuthModule, TemplateBuilderModule],
  controllers: [AppController, TemplateBuilderController],
  providers: [AppService],
})
export class AppModule {}
