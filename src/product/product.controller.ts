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
  CreateProductRequestSchema,
  CreateProductResponseDto,
  CreateProductResponseSchema,
  GetProductsResponseDto,
} from './types';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { ProductService } from './product.service';
import zod from 'zod';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(
    @Query('pageSize') pageSize = '5',
    @Query('page') page = '1',
  ): Promise<GetProductsResponseDto> {
    const queries = {
      pageSize: Number(pageSize),
      page: Number(page),
    };
    if (Number.isNaN(queries.page) || Number.isNaN(queries.pageSize)) {
      throw new BadRequestException('incorrect type of query');
    }

    return this.productService.get(queries);
  }

  @Post('create')
  async create(@Body() body: unknown): Promise<CreateProductResponseDto> {
    const result = CreateProductRequestSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(zod.treeifyError(result.error));
    }

    const product = await this.productService.create(result.data);

    return CreateProductResponseSchema.parse(product);
  }
}
