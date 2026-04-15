import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password/password.service';
import { TokenModule } from './token/token.module';
import { CookieCheckerService } from './cookie-checker/cookie-checker.service';
import { JwtAuthGuard } from './jwt-auth-guard/jwt-auth-guard.service';
import { UsersCoreModule } from '../users-core/users-core.module';

@Module({
  imports: [TokenModule, UsersCoreModule],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieCheckerService, JwtAuthGuard],
  exports: [PasswordService, TokenModule, CookieCheckerService, JwtAuthGuard],
})
export class AuthModule {}
