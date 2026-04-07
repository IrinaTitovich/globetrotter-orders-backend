import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password/password.service';
import { TokenService } from './token/token.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret_hey-dev',
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, AuthService, PasswordService, TokenService],
  exports: [PasswordService],
})
export class AuthModule {}
