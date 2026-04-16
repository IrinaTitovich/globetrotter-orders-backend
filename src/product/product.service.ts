import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductRequestDto, ProductDto, ProductsDto } from './types';
import {
  UpdateProductRequestDto,
  UpdateProductResponseDto,
} from './types/update-product.schema';

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

  async get({
    pageSize,
    page,
  }: {
    pageSize: number;
    page: number;
  }): Promise<ProductsDto> {
    const skip = (page - 1) * pageSize;

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count(),
    ]);

    return {
      products,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
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

  async update(
    id: string,
    payload: UpdateProductRequestDto,
  ): Promise<UpdateProductResponseDto> {
    const productByName = await this.prisma.product.findUnique({
      where: {
        name: payload.name,
      },
    });

    if (productByName?.id && productByName.id !== id) {
      throw new ConflictException('product already exists');
    }

    const productById = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productById) {
      throw new NotFoundException(`product with id ${id} not found`);
    }

    return this.prisma.product.update({
      where: { id },
      data: payload,
    });
  }
}
