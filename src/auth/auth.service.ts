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
import { LoggerService } from 'src/logger/app-logger.service';
import { Helpers } from 'src/utility/helpers.utility';
@Injectable()
export class AuthService extends Helpers {
  constructor(
    private readonly loggerService: LoggerService,
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRedis() private readonly redis: Redis,
  ) { super() }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ accessToken: string, status: number, user: User }> {
    try {
      const user: User | null = await this.usersService.findOne(username);

      if (!user) {
        this.loggerService.error('User not found', 'signIn', 'auth.service.ts');
        throw new UnauthorizedException('User not found');
      }

      const isMatch = await this.comparePasswords(pass, user.password);
      if (!isMatch) {
        this.loggerService.error(
          'Invalid credentials',
          'signIn',
          'auth.service.ts',
        );
        throw new UnauthorizedException('Invalid credentials');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      const payload = { userId: user._id || user.name };

      const token = await this.jwtService.signAsync(payload);

      await this.redis.set(`session:${user._id}`, token, 'EX', 60 * 60 * 24);

      return {
        accessToken: token,
        user: user,
        status: 1,
      };
    } catch {
      this.loggerService.error('Error signing in', 'signIn', 'auth.service.ts');
      throw new BadRequestException('Error signing in');
    }
  }

  async signOut(userId: string) {
    await this.redis.del(`session:${userId}`);
  }

  async register(user: { name: string; password: string, confirmPassword: string, }): Promise<{ message: string, status: number }> {
    const isRegistered: User | null = await this.usersService.findOne(user.name);

    if (isRegistered) {
      this.loggerService.error('User already exists', 'register', 'auth.service.ts');
      throw new BadRequestException('User already exists');
    }

    if (user.password !== user.confirmPassword) {
      this.loggerService.error('Passwords do not match', 'register', 'auth.service.ts');
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = this.hashPassword(user.password);
    user.password = hashedPassword;
    const newUser = this.usersService.create(user);

    return { message: 'User Created successfully', status: 1 };
  }
}
