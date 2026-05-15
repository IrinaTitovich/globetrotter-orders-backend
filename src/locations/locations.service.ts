import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationRequestDto, LocationDto, LocationsDto } from './types';
import { UpdateLocationRequestDto } from './types/update-location.schema';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async get({
    pageSize,
    page,
  }: {
    pageSize: number;
    page: number;
  }): Promise<LocationsDto> {
    const skip = (page - 1) * pageSize;

    const [locations, total] = await this.prisma.$transaction([
      this.prisma.location.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.location.count(),
    ]);

    return {
      locations,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async create(dto: CreateLocationRequestDto): Promise<LocationDto> {
    const location = await this.prisma.location.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (location !== null) {
      throw new ConflictException('location already exists');
    }

    return this.prisma.location.create({
      data: dto,
    });
  }

  async update({
    dto,
    id,
  }: {
    dto: UpdateLocationRequestDto;
    id: string;
  }): Promise<LocationDto> {
    const location = await this.prisma.location.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (location !== null) {
      throw new ConflictException('location already exists');
    }

    const locationById = await this.prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!locationById) {
      throw new BadRequestException('location with such id doesn`t exists');
    }

    return this.prisma.location.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  async delete({ id }: { id: string }): Promise<void> {
    const locationById = await this.prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!locationById) {
      throw new BadRequestException('location with such id doesn`t exists');
    }

    await this.prisma.location.delete({
      where: {
        id,
      },
    });
  }
}
