import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserGroup, UserGroupDocument } from './schemas/user-group.schema';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
// import { UpdateUserGroupDto } from './dto/update-user-group.dto';

@Injectable()
export class UserGroupService {
    constructor(
        @InjectModel(UserGroup.name) private userGroupModel: Model<UserGroupDocument>,
    ) { }

    async create(dto: CreateUserGroupDto): Promise<UserGroup> {
        return this.userGroupModel.create(dto);
    }

    async findAll(): Promise<UserGroup[]> {
        return this.userGroupModel.find().exec();
    }

    async findOne(id: string): Promise<UserGroup> {
        const group = await this.userGroupModel.findById(id).exec();
        if (!group) throw new NotFoundException('User group not found');
        return group;
    }

    // async update(id: string, dto: UpdateUserGroupDto): Promise<UserGroup> {
    //     const updated = await this.userGroupModel
    //         .findByIdAndUpdate(id, dto, { new: true })
    //         .exec();
    //     if (!updated) throw new NotFoundException('User group not found');
    //     return updated;
    // }

    async remove(id: string): Promise<{ deleted: boolean }> {
        const res = await this.userGroupModel.findByIdAndDelete(id).exec();
        if (!res) throw new NotFoundException('User group not found');
        return { deleted: true };
    }
}