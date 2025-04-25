import { Module } from '@nestjs/common';
import { DatabaseModule } from './mongodb/database.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [DatabaseModule, RedisModule],
})
export class ConnectionsModule {}
