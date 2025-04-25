import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
// import { MongooseModule } from '@nestjs/mongoose';
// import { User, UserSchema } from './users.schema';
import { UsersController } from './users.controller';
// import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  // imports: [
  //   MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  // ],

  providers: [
    UsersService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: AuthGuard,
    // },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
