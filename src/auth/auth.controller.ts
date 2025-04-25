import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  // UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthGuard } from './auth.guard';
import { User } from 'src/users/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request & { user: User }) {
    return req.user;
  }
}
