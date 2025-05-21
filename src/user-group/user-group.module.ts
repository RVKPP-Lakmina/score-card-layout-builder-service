import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserGroup, UserGroupSchema } from './schemas/user-group.schema';
import { UserGroupService } from './user-group.service';
import { UserGroupController } from './user-group.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserGroup.name, schema: UserGroupSchema }])
    ],
    controllers: [UserGroupController],
    providers: [UserGroupService],
})
export class UserGroupModule { }