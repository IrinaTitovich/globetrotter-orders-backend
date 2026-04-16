import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductRequestDto, ProductDto } from './types';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProductRequestDto): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (product !== null) {
      throw new ConflictException('product already exists');
    }

    return this.prisma.product.create({
      data: dto,
    });
  }

  async get(): Promise<ProductDto[]> {
    return this.prisma.product.findMany();
  }

  async getById(id: string): Promise<ProductDto> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new BadRequestException('product doesn`t exist');
    }

    return product;
  }

  async update(payload: ProductDto): Promise<ProductDto> {
    const productByName = await this.prisma.product.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (productByName?.id && productByName.id !== payload.id) {
      throw new ConflictException('product already exists');
    }

    const productById = await this.prisma.product.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!productById) {
      throw new NotFoundException(`product with id ${payload.id} not found`);
    }

    return this.prisma.product.update({
      where: { id: payload.id },
      data: {
        id: payload.id,
        name: payload.name,
      },
    });
  }
}
