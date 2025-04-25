import { InjectRedis } from '@nestjs-modules/ioredis';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import Redis from 'ioredis';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user: User | null = await this.usersService.findOne(username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    const payload = { userId: user._id || user.name };

    const token = await this.jwtService.signAsync(payload);

    await this.redis.set(`session:${user._id}`, token, 'EX', 60 * 60 * 24);

    return {
      access_token: token,
    };
  }

  async signOut(userId: string) {
    await this.redis.del(`session:${userId}`);
  }

  async register(user: { name: string; password: string }): Promise<User> {
    return this.usersService.create(user);
  }
}
