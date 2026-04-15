import { Module } from '@nestjs/common';
import { UsersCoreService } from './users-core.service';

@Module({
  providers: [UsersCoreService],
  exports: [UsersCoreService],
})
export class UsersCoreModule {}
