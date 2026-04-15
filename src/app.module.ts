import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersCoreModule } from './users-core/users-core.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, UsersCoreModule],
})
export class AppModule {}
