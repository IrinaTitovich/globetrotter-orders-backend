import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { AuthModule } from '../auth/auth.module';
import { UsersCoreModule } from '../users-core/users-core.module';
import { JwtAuthGuard } from '../auth/jwt-auth-guard/jwt-auth-guard.service';

@Module({
  imports: [UsersCoreModule, AuthModule],
  controllers: [UsersController],
  providers: [JwtAuthGuard],
})
export class UsersModule {}
