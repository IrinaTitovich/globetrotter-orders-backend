import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RegisterUserSchema } from './dto/register-user.schema';
import zod from 'zod';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown) {
    const result = RegisterUserSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    return this.authService.register(result.data);
  }

  @Post('login')
  async login(@Body() body: unknown) {
    const result = RegisterUserSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    return this.authService.login(result.data);
  }
}
