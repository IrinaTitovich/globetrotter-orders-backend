import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetProductsResponseDto } from './types';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';
import { ProductService } from './product.service';

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
}
