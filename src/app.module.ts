import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersCoreModule } from './users-core/users-core.module';
import { ProductModule } from './product/product.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    UsersCoreModule,
    ProductModule,
    LocationsModule,
  ],
})
export class AppModule { }
