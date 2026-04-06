import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserRequestSchema,
  CreateUserResponseDto,
  CreateUserResponseSchema,
  GetUserResponseDto,
  GetUserResponseSchema,
} from './dto';
import zod from 'zod';
import {
  UpdateUserRequestSchema,
  UpdateUserResponseDto,
  UpdateUserResponseSchema,
} from './dto/update-user.schema';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() body: unknown): Promise<CreateUserResponseDto> {
    const result = CreateUserRequestSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    const createdUser = await this.userService.create(result.data);

    return CreateUserResponseSchema.parse(createdUser);
  }

  @Get()
  async get(): Promise<GetUserResponseDto[]> {
    const users = await this.userService.get();

    return users.map((user) => GetUserResponseSchema.parse(user));
  }

  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetUserResponseDto> {
    const user = await this.userService.getById(id);

    return GetUserResponseSchema.parse(user);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: unknown,
  ): Promise<UpdateUserResponseDto> {
    const result = UpdateUserRequestSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    const updatedUser = await this.userService.update({
      id,
      data: result.data,
    });

    return UpdateUserResponseSchema.parse(updatedUser);
  }
}
