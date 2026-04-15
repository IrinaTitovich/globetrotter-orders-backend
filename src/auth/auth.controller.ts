import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterUserSchema } from './dto/register-user.schema';
import zod from 'zod';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { CookieCheckerService } from './cookie-checker/cookie-checker.service';
import { LoginUserSchema } from './dto/login-user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieCheckerService,
  ) {}

  @Post('register')
  async register(@Body() body: unknown) {
    const result = RegisterUserSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    return this.authService.register(result.data);
  }

  @Post('login')
  async login(
    @Body() body: unknown,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = LoginUserSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    const { userId, ...tokens } = await this.authService.login(result.data);

    this.cookieService.setCookie(res, tokens);

    return { userId };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    this.cookieService.clear(res);
  }
}
