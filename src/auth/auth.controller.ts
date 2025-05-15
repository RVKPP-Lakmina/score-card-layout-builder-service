import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotAcceptableException,
  Post,
  // UseGuards,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/users.schema';
import { AuthGuard } from './auth.guard';
import { currentUser } from './user.decorator';
@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.name, signInDto.password);
  }

  @Post('register')
  async register(@Body() signUpDto: Record<string, string>, @currentUser('username') username: string) {
    const { name, password, confirmPassword } = signUpDto;

    if (!name || !password) {
      throw new Error('Name and password are required');
    }

    const user: {
      name: string;
      password: string;
      confirmPassword: string;
    } = {
      name,
      password,
      confirmPassword
    };

    return this.authService.register(user, username);
  }

  @Post('logout')
  async signOut(@Request() req: Request & { user: User }) {
    const userId = req.user._id || req.user.name;
    if (!userId) {
      throw new NotAcceptableException('User not found');
    }
    await this.authService.signOut(userId);
  }

  @Get('profile')
  getProfile(@Request() req: Request & { user: User }) {
    return req.user;
  }
}
