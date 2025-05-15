import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { ConfigModule } from '@nestjs/config';
import { HistoryService } from 'src/history/history.service';
import { HistoryModule } from 'src/history/history.module';
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
    HistoryModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
