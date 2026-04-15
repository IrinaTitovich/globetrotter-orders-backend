import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserRequestDto } from '../users/dto/create-user.schema';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from '../users/dto/user.schema';
import { UpdateUserRequestDto } from '../users/dto';

@Injectable()
export class UsersCoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserRequestDto): Promise<UserDto> {
    const isEmailExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (isEmailExist) {
      throw new ConflictException('email already taken');
    }

    return this.prisma.user.create({
      data: dto,
    });
  }

  async get(): Promise<UserDto[]> {
    return this.prisma.user.findMany();
  }

  async getByEmail(email: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('user doesn`t exist');
    }

    return user;
  }

  async getById(id: number): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new BadRequestException('user doesn`t exist');
    }

    return user;
  }

  async update(payload: {
    id: number;
    data: UpdateUserRequestDto;
  }): Promise<UserDto> {
    const userWithEmail = await this.prisma.user.findUnique({
      where: {
        email: payload.data.email,
      },
    });

    if (userWithEmail?.id && userWithEmail.id !== payload.id) {
      throw new ConflictException('email already taken');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${payload.id} not found`);
    }

    return this.prisma.user.update({
      where: { id: payload.id },
      data: {
        email: payload.data.email,
        ...(payload.data.name !== undefined ? { name: payload.data.name } : {}),
      },
    });
  }
}
