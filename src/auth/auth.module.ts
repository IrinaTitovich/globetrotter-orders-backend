import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password/password.service';
import { TokenModule } from './token/token.module';
import { CookieCheckerService } from './cookie-checker/cookie-checker.service';
import { JwtAuthGuard } from './jwt-auth-guard/jwt-auth-guard.service';

@Module({
  imports: [TokenModule],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    PasswordService,
    CookieCheckerService,
    JwtAuthGuard,
  ],
  exports: [PasswordService],
})
export class AuthModule {}
