import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersCoreService } from './users-core/users-core.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersCoreService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
