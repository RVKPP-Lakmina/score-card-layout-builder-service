import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionsModule } from './database/connections.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConnectionsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
