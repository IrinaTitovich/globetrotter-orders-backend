import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateLocationRequestSchema,
  CreateLocationResponseDto,
  CreateLocationResponseSchema,
  GetLocationsResponseDto,
} from './types';
import zod from 'zod';
import { LocationsService } from './locations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';

@UseGuards(JwtAuthGuard)
@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  async get(
    @Query('pageSize') pageSize = '5',
    @Query('page') page = '1',
  ): Promise<GetLocationsResponseDto> {
    const queries = {
      pageSize: Number(pageSize),
      page: Number(page),
    };
    if (Number.isNaN(queries.page) || Number.isNaN(queries.pageSize)) {
      throw new BadRequestException('incorrect type of query');
    }

    return this.locationsService.get(queries);
  }

  @Post('create')
  async create(@Body() body: unknown): Promise<CreateLocationResponseDto> {
    const result = CreateLocationRequestSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    const location = await this.locationsService.create(result.data);

    return CreateLocationResponseSchema.parse(location);
  }
}
