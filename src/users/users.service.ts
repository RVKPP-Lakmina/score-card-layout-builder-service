import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ name: username }).exec();

    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  async create(userDto: Partial<User>): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }
}
