import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerService } from 'src/logger/app-logger.service';

@Injectable()
export class UsersService {
  private fileName = 'users.service.ts';
  constructor(
    private readonly loggerService: LoggerService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ name: username }).exec();

    if (!user) {
      this.loggerService.error('User not found', 'findOne', this.fileName);
      throw new BadRequestException(`User with username ${username} not found`);
    }
    return user;
  }

  async create(userDto: Partial<User>): Promise<User> {
    const user = await this.userModel.findOne({ name: userDto.name }).exec();

    if (user) {
      this.loggerService.error('User already exists', 'create', this.fileName);
      throw new BadRequestException('User already exists');
    }

    userDto._id = Math.random().toString(36).substring(2, 15);
    const createdUser = new this.userModel(userDto);
    return createdUser.save();
  }
}
